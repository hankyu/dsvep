<?php

namespace App;

use App\Member;
use App\Lesson;
use App\Order;
use App\Teacher;
use App\Unit;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Rollcall extends Model
{
    public $timestamps = false;
    protected $id;

    // Rollcall Status Code:
    //     101: 課程補點
    //     102: 取消點名
    //     201: 點名重複
    //     202: 無此點名紀錄
    //     203: 該課程無此章節
    //     204: 行政無法點名課程
    //     205: 老師無法點名自己的課程
    //     206: 該會員無購買此課程
    //     207: 該課程今日沒有上課

    public function check($m_id, $l_id, $u_id, $status = 'true')
    {
        // Get Lesson Data To Check Lesson Situation
        $lesson_data = Lesson::find($l_id);

        if (!$lesson_data) { return '無此課程'; }
        else if ($lesson_data->cancel_lesson == true) { return '無此課程'; }

        // Check Unit Data Is Exist
        $unit_data = Unit::where('l_id', $l_id)->where('u_id', $u_id)->first()->l_start_time;

        if (!$unit_data) { return 203; }

        // Check Member Isn't Worker
        if (Member::authority(Member::find($m_id)->authority) == 2) { return 204; }

        // Check Member Isn't Teacher Of This Lesson
        if ($m_id === Teacher::find($lesson_data->t_id)->m_id) { return 205; }

        // Check Member Possess Lesson
        $orders = new Order();
        if (!$orders->checkMemberHasPaid($m_id, $l_id)) { return 206; }

        // Check Today Has Lesson
        $today = date('Y-m-d');

        // Check Member Already Rollcall This Lesson
        if (self::checkRepeatRollcall($m_id, $l_id, $u_id) && $status == 'true') { return 201; }

        if (!Str::startsWith($unit_data, $today))
        {
            if ($today > mb_substr($unit_data, 0, 10))  { return 101; }
            else { return 207; }
        }
        else
        {
            $time        = date('H:i:s', strtotime('+1 hour'));
            $lesson_time = mb_substr($unit_data, 11);

            if (strtotime($time) >= strtotime($lesson_time)) { return 'ok'; }
            else
            {
                $datetime = new \DateTime($lesson_time);
                return '尚未開放點名，請於 ' . $datetime->modify('-1 hour')->format('H:i:s') . ' 再進行點名';
            }
        }
    }

    public static function checkRepeatRollcall($m_id, $l_id, $u_id)
    {
        return self::where('m_id', $m_id)->where('l_id', $l_id)->where('u_id', $u_id)->first();
    }

    public function getRollcallList($l_id, $m_id = null)
    {
        // Get Lesson Unit Start Time
        $unit_time = Unit::getLessonUnitStartTime($l_id, 'time');

        // Create A Rollcall Object
        $rollcall_data = new \stdClass();
        $rollcall_data->l_name = Lesson::find($l_id)->l_name;

        // Get Every Unit Classmate Rollcall Record
        $rollcall_list = DB::table('rollcalls')
                           ->where('l_id', $l_id)
                           ->leftjoin('members', 'members.m_id', 'rollcalls.m_id')
                           ->select('rollcalls.*', 'members.m_name', 'members.nickname');

        if ($m_id) { $rollcall_list->where('members.m_id', $m_id); }

        $rollcall_list = $rollcall_list->get();
        $rollcall_data->unit_time = $unit_time;
        $rollcall_data->unit_data = $rollcall_list;

        return (array)$rollcall_data;
    }

    public function getRollcallQRCode(int $l_id, int $u_id)
    {
        // Set QR Code Path
        $rollcallpath = '../public/media/rollcall/';
        $filepath     = md5($l_id) . '/';
        $filename     = md5($u_id) . '.svg';

        // Check File And Folder Is Exist, If Not Will Create One
        if (!is_file($rollcallpath . $filepath . $filename))
        {
            if (!is_dir($rollcallpath)) { mkdir($rollcallpath); }

            if (!is_dir($rollcallpath . $filepath)) { mkdir($rollcallpath . $filepath); }

            // Create A Short URL For QR Code
            $link     = 'profile/lesson/rollcall/' . dechex(pow($l_id, 3) + 48763) . '/' . dechex(pow($u_id, 3) + 9487);
            $shorturl = Shorturl::create($link);
            Main::createQRCode($shorturl, $rollcallpath . $filepath . $filename);
        }

        // Return QR Code Path
        return $rollcallpath . $filepath . $filename;
    }

    public function sendRollcallData($rollcall_data)
    {
        $error_data = [];

        foreach ($rollcall_data as $data)
        {
            $m_name     = Member::find($data['m_id'])->m_name;
            $nickname   = Member::find($data['m_id'])->nickname;
            $error_code = self::check($data['m_id'], $data['l_id'], $data['u_id'], $data['status']);

            if ($error_code == 'ok' || $error_code == 101)
            {
                if ($data['status'] == 'true')
                {
                    if (self::checkRepeatRollcall($data['m_id'], $data['l_id'], $data['u_id']))
                    {
                        $error_data[] = ['m_id' => $data['m_id'], 'm_name' => $m_name, 'nickname' => $nickname, 'u_id' => $data['u_id'], 'status' => 201];
                    }
                    else
                    {
                        $this->saveRollcall($data['m_id'], $data['l_id'], $data['u_id']);

                        if ($error_code == 101)
                        {
                            $error_data[] = ['m_id' => $data['m_id'], 'm_name' => $m_name, 'nickname' => $nickname, 'u_id' => $data['u_id'], 'status' => 101];
                        }
                    }
                }
                else
                {
                    if (self::checkRepeatRollcall($data['m_id'], $data['l_id'], $data['u_id']))
                    {
                        self::where('m_id', $data['m_id'])->where('l_id', $data['l_id'])->where('u_id', $data['u_id'])->delete();
                        $error_data[] = ['m_id' => $data['m_id'], 'm_name' => $m_name, 'nickname' => $nickname, 'u_id' => $data['u_id'], 'status' => 102];
                    }
                    else
                    {
                        $error_data[] = ['m_id' => $data['m_id'], 'm_name' => $m_name, 'nickname' => $nickname, 'u_id' => $data['u_id'], 'status' => 202];
                    }
                }
            }
            else
            {
                $error_data[] = ['m_id' => $data['m_id'], 'm_name' => $m_name, 'nickname' => $nickname, 'u_id' => $data['u_id'], 'status' => $error_code];
            }
        }

        return $error_data;
    }

    public function saveRollcall($m_id, $l_id, $u_id)
    {
        $rollcall = new Rollcall();
        $rollcall->m_id = $m_id;
        $rollcall->l_id = $l_id;
        $rollcall->u_id = $u_id;
        $rollcall->rollcall_time = date('Y-m-d H:i:s');
        $rollcall->rollcall_member = Member::user()->m_id;
        $rollcall->save();
        return $rollcall->rollcall_time;
    }

    public function getRollcallListAjax($l_id, $m_id = null)
    {
        // Get Lesson Unit Start Time
        $unit_time = Unit::getLessonUnitStartTime($l_id, 'time');

        // Create A Rollcall Object
        $rollcall_data = array();

        // Get Every Unit Classmate Rollcall Record
        $rollcall_lists = DB::table('rollcalls')
            ->where('l_id', $l_id)
            ->leftjoin('members', 'members.m_id', 'rollcalls.m_id');


        if ($m_id) {
            $rollcall_lists->select('rollcalls.*', 'members.m_name', 'members.nickname')
                ->where('members.m_id', $m_id);
        }
        else {
            $rollcall_lists->select('rollcalls.*', 'members.m_name', 'members.nickname', 'members.m_id');
        }

        $rollcall_lists = $rollcall_lists->get();

        $idx = 0;
        foreach ($rollcall_lists as $rollcall_list)
        {
            $rollcall_data[$idx]['id'] = $rollcall_list->id;
            $rollcall_data[$idx]['rollcall_time'] = $rollcall_list->rollcall_time;
            $rollcall_data[$idx]['u_id'] = $rollcall_list->u_id;

            if ($m_id==null) {
                $rollcall_data[$idx]['m_id'] = $rollcall_list->m_id;
            }

            $idx++;
        }

        return (array)$rollcall_data;
    }

    public function saveRollcallAjax($m_id, $l_id, $u_id, $rollcall_member)
    {
        $rollcall = self::checkRepeatRollcall($m_id, $l_id, $u_id);

        if($rollcall)
        {
            $rollcall->rollcall_time = date('Y-m-d H:i:s');
            $rollcall->rollcall_member = $rollcall_member;
            $rollcall->save();
        }
        else
        {
            $rollcall = new Rollcall();
            $rollcall->m_id = $m_id;
            $rollcall->l_id = $l_id;
            $rollcall->u_id = $u_id;
            $rollcall->rollcall_time = date('Y-m-d H:i:s');
            $rollcall->rollcall_member = $rollcall_member;
            $rollcall->save();
        }

        return Member::find($m_id)->nickname;
    }

    public function removeRollcallAjax($m_id, $l_id, $u_id)
    {
        Rollcall::where('l_id', '=', $l_id)->where('u_id', '=', $u_id)->where('m_id', '=', $m_id)->delete();
        
        return Member::find($m_id)->nickname;
    }

    public function getRollcallQRCodeAjax(int $l_id, int $u_id)
    {
        // Set QR Code Path
        $rollcallpath = '../public/media/rollcall/';
        $filepath     = md5($l_id) . '/';
        $filename     = md5($u_id) . '.svg';

        // Check File And Folder Is Exist, If Not Will Create One
        if (!is_file($rollcallpath . $filepath . $filename))
        {
            if (!is_dir($rollcallpath)) { mkdir($rollcallpath); }

            if (!is_dir($rollcallpath . $filepath)) { mkdir($rollcallpath . $filepath); }

            // Create A Short URL For QR Code
            $link     = 'profile/lesson/rollcall/' . dechex(pow($l_id, 3) + 48763) . '/' . dechex(pow($u_id, 3) + 9487);
            $shorturl = Shorturl::create($link);
            Main::createQRCode($shorturl, $rollcallpath . $filepath . $filename);
        }

        // Return QR Code Path
        return $rollcallpath . $filepath . $filename;
    }
}
