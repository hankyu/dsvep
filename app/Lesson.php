<?php

namespace App;

use \Auth;
use App\Click;
use App\Coupon;
use App\Favorite;
use App\Goal;
use App\Main;
use App\Member;
use App\Order;
use App\Shorturl;
use App\Teacher;
use App\Sms;
use App\Unit;
use DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Lesson extends Model
{
    protected $primaryKey = 'l_id';

    private $click;
    private $coupon;
    private $goal;
    private $main;
    private $unit;
    private $favorite;
    private $order;

    public function __construct()
    {
        $this->click  = new Click();
        $this->goal   = new Goal();
        $this->main   = new Main();
        $this->unit   = new Unit();
        $this->favorite = new Favorite();
        $this->order = new Order();
    }

    public function calc_end_time($start_time, $during_time)
    {
        $start_timestamp = strtotime($start_time);
        $end_timestamp   = strtotime('+' . $during_time . ' day', $start_timestamp);
        return date('Y-m-d', $end_timestamp);
    }

    public function cancel_audit($id)
    {
        $lesson_data = self::find($id);

        if ($lesson_data->pub_situation == true) { return '該課程已發布'; }
        else if (($lesson_data->pub_situation == false) && ($lesson_data->apply_situation == 'fail')) { return '該課程已被審核不通過'; }
        else
        {
            $lesson_data->apply_situation = 'no apply';
            $lesson_data->save();
            return 'finish';
        }
    }

    public function check_column_value_correct($value, $min, $max)
    {
        return ($value === null) || (($value > $max) || ($value < $min)) ? false : true;
    }

    public function check_column_value_correct_for_entity($value, $min, $max, $type)
    {
        if ($type == 'online') { return true; }
        else { return ($value === null) || (($value > $max) || ($value < $min)) ? false : true; }
    }

    public function check_content_file($t_id, $l_id)
    {
        $member_data = Member::find(Teacher::find($t_id)->m_id);
        $file_path   = '../public/json/' . $member_data->m_id . '_' . $member_data->account . '/' . $t_id . '_' . $l_id . '.json';
        return (!file_exists($file_path)) || (filesize($file_path) <= 23) ? false : true;
    }

    public function checkCurrentPrice($id = null)
    {
        if (is_null($id))
        {
            $id = self::get()->pluck('l_id');

            foreach ($id as $value) { $this->saveCurrentPrice($value); }
        }
        else { $this->saveCurrentPrice($id); }
    }

    public function saveCurrentPrice($id)
    {
        $lesson_data = self::find($id);
        $lesson_data->current_fee = getCurrentFee($lesson_data);
        $lesson_data->save();
    }

    public function check_date_is_vaild($first_date, $second_data)
    {
        return strtotime($first_date) > strtotime($second_data) ? true : false;
    }

    public function checkLessonFundraisingIsFail($l_id)
    {
        $lesson_data = self::find($l_id);

        if (date('Y-m-d') > $lesson_data->end_fund)
        {
            $buy_people = Order::lessonBuyerOrderData($l_id)->count();
            return $lesson_data->least_people > $buy_people;
        }
        else { return false; }
    }

    public function checkOnlineLessonStart()
    {
        // Get Online Lesson Data If Start Time Is Today
        $lesson_data = self::whereDate('start_time', date('Y-m-d'))->where('type', 'online')->get();

        foreach ($lesson_data as $lesson)
        {
            // Get Buyer Data
            $order_data = Order::getCheckoutQueue()->where('l_id', $lesson->l_id)->get();

            // Send Online Lesson Start Notice For Member
            foreach ($order_data as $order)
            {
                $member_data = Member::find(Teacher::find($lesson->t_id)->m_id);
                $data =
                [
                    'account'      => Member::find($order->m_id)->nickname,
                    'lesson_name'  => $lesson->l_name,
                    'lesson_URL'   => 'https://www.ds-vep.com/lesson/' . $lesson->l_id,
                    'teacher_name' => $member_data->m_name ? $member_data->nickname : ($member_data->nickname . '(' . $member_data->m_name . ')'),
                    'time'         => $lesson->start_time,
                ];

                $this->main->send_email($data, 'site.personal.lesson.classroom.mail.online_notify_mail', Member::find($order->m_id)->email, '【大俠學習平台】' . $lesson->l_name . ' 開放觀看教學影片通知信', 1);
            }
        }
    }

    // Check lessons start or cancel after today.
    // The online and free lessons are not allow to cancel
    public function checkLessonWhetherStart()
    {
        $order       = new Order();
        $today       = date('Y-m-d');
        $lesson_data = self::where('pub_situation', true)->where('cancel_lesson', false)->get();

        for ($i = 0; $i < count($lesson_data); $i++)
        {
            if ($today > $lesson_data[$i]->end_fund)
            {
                $id               = $lesson_data[$i]->l_id;
                $temp_lesson_data = self::where('l_id', $id)->first();
                $temp_lesson_data->cancel_lesson_init = false;
                $temp_lesson_data->save();

                $buy_people = $order->lessonBuyerOrderData($lesson_data[$i]->l_id);

                if ($lesson_data[$i]->least_people > count($buy_people))
                {
                    if (!($temp_lesson_data->type == "online" && $temp_lesson_data->offer_fee == 0))
                    {
                        $temp_lesson_data->cancel_lesson = true;
                        $temp_lesson_data->save();

                        $order->cencelOrder($lesson_data[$i]->l_id);
                    }
                }
                else if (date('Y-m-d',strtotime('-1 day')) == $lesson_data[$i]->end_fund)
                {
                    $temp_lesson_data->cancel_lesson_init = false;
                    $temp_lesson_data->save();

                    $this->send_open_lesson_mail($lesson_data[$i], $buy_people);
                }
            }
        }
    }

    public function check_location_fill_in($location, $type)
    {
        if ($type == 'entity') { return $location == null ? false : true; }
        else { return true; }
    }

    public function check_media($id, $media)
    {
        if ($media == null) { return false; }

        $file_path = '../public/media/' . $id . '/cover/' . $media;

        if (!file_exists($file_path)) { return false; }

        return true;
    }

    public function check_open_lesson($l_id, $people)
    {
        $order      = new Order();
        $buy_people = $order->lessonBuyerOrderData($l_id)->count();
        return $people > $buy_people ? false : true;
    }

    public function check_price_is_correct($price, $id)
    {
        if (self::find($id)->origin_fee >= $price)
        {
            if (self::find($id)->origin_fee - $price >= self::find($id)->origin_fee)
            {
                return false;
            }
            else { return true; }
        }
        else { return false; }
    }

    public function check_teacher_is_this_lesson($m_id, $l_id)
    {
        $teacher_data = Teacher::findMemberId($m_id);

        if($teacher_data)
        {
            $t_id = $teacher_data->t_id;

            if (self::find($l_id)->t_id == $t_id) {
                return true;
            }
            else {
                return false;
            }
        }
        else { return false; }
    }

    public function check_reg_code($id, $reg_code)
    {
        $account         = Member::find(Teacher::find(self::find($id)->t_id)->m_id)->account;
        $reg_code_decode = base64_decode($reg_code);
        return $reg_code_decode == ($account . $id);
    }

    public function check_worker_edit($id)
    {
        $worker_t_id = Teacher::data()->t_id ?? null;

        if (self::find($id)->t_id != $worker_t_id)
        {
            $lesson_data = self::find($id);
            $lesson_data->worker_edit = true;
            $lesson_data->save();
        }
    }

    public function checkOpenLesson($l_id)
    {
        $lessonData = self::where('pub_situation', true)
                        ->where('delete_lesson', false)
                        ->where('cancel_lesson', false)
                        ->where('l_id', $l_id)
                        ->whereDate('start_time', '<=', date('Y-m-d'))
                        ->get();

        return isset($lessonData[0]->l_id) ? 1 : 0;
    }

    public function copy_lesson($l_id, $t_id)
    {
        $member_data = Member::find(Teacher::find($t_id)->m_id);
        $lesson_data = self::find($l_id);
        $this->t_id = $t_id;
        $this->l_name = $lesson_data->l_name;
        $this->l_sub_name = $lesson_data->l_sub_name;
        $this->type = $lesson_data->type;
        $this->cover = $lesson_data->cover;
        $this->media = $lesson_data->media;
        $this->least_people = $lesson_data->least_people;
        $this->location = $lesson_data->location;
        $this->location_note = $lesson_data->location_note;
        $this->topic = $lesson_data->topic;
        $this->category = $lesson_data->category;
        $this->pub_situation = false;
        $this->worker_edit = false;
        $this->apply_situation = 'no apply';
        $this->cancel_lesson = false;
        $this->delete_lesson = false;
        $this->save();
        $this->copy_media($lesson_data->l_id, $this->l_id, $lesson_data->cover, $lesson_data->media);
        $this->goal->copy_lesson_goal($lesson_data->l_id, $this->l_id);
        $this->unit->copy_lesson_unit($lesson_data->l_id, $this->l_id);

        if (self::find($l_id)->description !== null)
        {
            $lesson_data = self::find($this->l_id);
            $this->description = $member_data->m_id . '_' . $member_data->account . '/' . $lesson_data->t_id . '_' . $lesson_data->l_id . '.json';
            $this->save();
            $this->copy_lesson_description_file($this->l_id, $l_id, $member_data, $this->t_id, self::find($l_id)->description);
        }
        return $data = ['l_id' => $this->l_id, 'account' => $member_data->account];
    }

    public function copy_lesson_description_file($new_l_id, $old_l_id, $member_data, $t_id, $old_path)
    {
        $old_path = '../public/json/' . $old_path;
        $file_folder = '../public/json/' . $member_data->m_id . '_' . $member_data->account;
        $new_path    = $file_folder . '/' . $t_id . '_' . $new_l_id . '.json';
        $this->main->create_file($file_folder);
        copy($old_path, $new_path);
        return;
    }

    public function copy_media($old_id, $new_id, $cover, $media)
    {
        $origin_destination_path = public_path('/media/' . $old_id. '/cover/');
        $new_destination_path = public_path('/media/' . $new_id. '/cover/');
        $this->main->create_file($new_destination_path);

        if ($cover != null)
        {
            copy($origin_destination_path . $cover, $new_destination_path . $cover);
        }

        if ($media != null)
        {
            copy($origin_destination_path . $media, $new_destination_path . $media);
        }
        return;
    }

    public function create_lesson($t_id, $lesson_name, $lesson_type, $lesson_teacher)
    {
        $this->t_id = $lesson_teacher == null ? $t_id : $lesson_teacher;
        $this->l_name = $lesson_name;
        $this->type = $lesson_type == '線上教學' ? 'online' : 'entity';
        $this->pub_situation = false;
        $this->apply_situation = 'no apply';
        $this->worker_edit = $lesson_teacher == null ? false : true;
        $this->cancel_lesson = false;
        $this->cancel_lesson_init = 1;
        $this->delete_lesson = false;
        $this->save();
        return $this->l_id;
    }

    public function delete_lesson($id)
    {
        $lesson_data = self::find($id);

        if (Member::isWorker()) { $t_id = $lesson_data->t_id; }
        else if (Teacher::data() != '') { $t_id = Teacher::data()->t_id; }
        else { $t_id = null; }

        if ($lesson_data->t_id != $t_id) { return '無此課程'; }
        else if ($lesson_data->pub_situation == true) { return '該課程已發布'; }
        else if ($lesson_data->delete_lesson == true) { return '此課程已從其他地方被刪除'; }
        else if (($lesson_data->pub_situation == false) && ($lesson_data->apply_situation == 'audit')) { return '該課程正在審核中'; }
        else
        {
            $lesson_data->delete_lesson = true;
            $lesson_data->delete_lesson_at = date('Y-m-d H:i:s');
            $lesson_data->save();
            return 'finish';
        }
    }

    public static function getCurrentFee($data)
    {
        $today = strtotime(date('Y-m-d'));

        if (is_null($data->end_fund)) { return $data->offer_fee; }
        else { return $today > strtotime($data->end_fund) ? $data->origin_fee : $data->offer_fee; }
    }

    public function get_expire_lesson()
    {
        $today       = strtotime(date('Y-m-d H:i:s'));
        $lesson_data = self::where('pub_situation', true)->where('delete_lesson', false)->get();
        $l_id        = $lesson_data->pluck('l_id');
        $l_end_time  = Unit::filter_last_time($l_id, 'ASC')->pluck('l_end_time');
        $expire_data = array();

        foreach ($lesson_data as $key => $value)
        {
            if ($value->cancel_lesson) { array_push($expire_data, $value); }
            else
            {
                if ((!is_null(strtotime($l_end_time[$key]))) && ($value->type == 'entity'))
                {
                    if ($today > strtotime($l_end_time[$key]) ) { array_push($expire_data, $value); }
                }
            }
        }

        $expire_data = $this->get_order_data_by_lesson($expire_data);
        return $expire_data;
    }

    public function getFavoriteLessonData()
    {
        $member_data = Member::user();

        if (!is_null($member_data))
        {
            $id          = Favorite::where('m_id', $member_data->m_id)->get()->pluck('l_id');
            $lesson_data = self::whereIn('l_id', $id)->get();

            foreach ($lesson_data as $key => $value)
            {
                $teacher_data = Member::find(Teacher::find($value->t_id)->m_id);
                $lesson_data[$key]->avg_img = $teacher_data->avg_img;
                $lesson_data[$key]->nickname = $teacher_data->nickname;
                $lesson_data[$key]->m_name = $teacher_data->m_name;
                $lesson_data[$key]->buyer = Order::lessonBuyerOrderData($value->l_id)->count();
                $lesson_data[$key]->l_start_time = Unit::filter_first_time([$value->l_id])[0]->l_start_time;
                $lesson_data[$key]->l_end_time = Unit::filter_last_time([$value->l_id])[0]->l_end_time;
            }

            return $lesson_data;
        }
        else { return []; }
    }

    public function get_order_data_by_lesson($data)
    {
        $b         = 'buy_people';
        $order     = new Order();
        $payment   = [
                         'CREDIT' => '信用卡',
                         'VACC'   => 'ATM',
                         'CVS'    => '超商',
                         'FREE'   => '免費',
                         'CASH'   => '現金',
                     ];

        foreach ($data as $key => $value)
        {
            $lesson_data              = self::find($value->l_id);
            $buy_people               = $order->where('l_id', $value->l_id)->get();
            $data[$key]['buy_count']  = Order::lessonBuyerOrderData($value->l_id)->count();
            $data[$key][$b]           = $buy_people;
            $data[$key]['click']      = $this->click->getClickData($value->l_id, 'lesson')->count();
            $data[$key]['teacher']    = Member::find(Teacher::find($value->t_id)->m_id)->nickname;
            $data[$key]['hash']       = md5($value->l_id);

            foreach ($buy_people as $k => $v)
            {
                $buyer_data                      = Member::find($v->m_id);
                $data[$key][$b][$k]['buyer']     = $buyer_data->nickname ?? '無';
                $data[$key][$b][$k]['cellphone'] = $buyer_data->cellphone ?? '';
                $data[$key][$b][$k]['email']     = $buyer_data->email ?? '';

                if ($v->checkout_time == null) { $restrict = ''; }
                else { $restrict = $v->restrict ? '否' : '是'; }

                $data[$key][$b][$k]['id']            = $v->id;
                $data[$key][$b][$k]['buyer']         = $buyer_data->nickname ?? '無';
                $data[$key][$b][$k]['phone']         = $buyer_data->cellphone ?? '';
                $data[$key][$b][$k]['email']         = $buyer_data->email ?? '無';
                $data[$key][$b][$k]['order_id']      = $v->o_id;
                $data[$key][$b][$k]['payment']       = $payment[$v->payment] ?? '尚未付款';
                $data[$key][$b][$k]['order']         = $v->order_time ?? '';
                $data[$key][$b][$k]['checkout']      = $v->checkout_time ?? '';
                $data[$key][$b][$k]['cancel']        = $v->delete_time ?? '';
                $data[$key][$b][$k]['refund']        = $v->refund_time ?? '';
                $data[$key][$b][$k]['price']         = $v->checkout_time ? $v->price : '尚未付款';
                $data[$key][$b][$k]['payee']         = $v->payee ?? '自行付款';
                $data[$key][$b][$k]['refund_price']  = $v->refund_price ?? '';
                $data[$key][$b][$k]['refund_payee']  = $v->refund_payee ?? '';
                $data[$key][$b][$k]['refund_reason'] = $v->refund_reason ?? '';
                $data[$key][$b][$k]['restrict']      = $restrict;
                $data[$key][$b][$k]['note']          = $v->note;
                $data[$key][$b][$k]['note_member']   = $v->note_member;
                $data[$key][$b][$k]['note_time']     = $v->note_time ;
                $data[$key][$b][$k]['has_receipt']   = $v->receipt;
                $data[$key][$b][$k]['receipt']       = $v->receipt_number ?? '';
                $data[$key][$b][$k]['receipt_abort'] = $v->receipt_abort;

                if (Member::isMasterAdmin() || Member::isBasicAdmin())
                {
                    $data[$key][$b][$k]['bank']         = true;
                    $data[$key][$b][$k]['bank_id']      = $buyer_data->bank_number ?? '尚未填寫';
                    $data[$key][$b][$k]['bank_account'] = $buyer_data->account_number ?? '尚未填寫';
                    $data[$key][$b][$k]['bank_name']    = $buyer_data->account_name ?? '尚未填寫';
                }
                else { $data[$key][$b][$k]['bank'] = false; }

                if($v->coupon!='') {
                    $data[$key][$b][$k]['buyer'] .= "<div style='color:red; font-size: 6px;'>折價券: ".$v->coupon."</div>";
                }
            }
        }

        return $data;
    }

    public function get_audit_lesson_data()
    {
        return self::where('apply_situation', 'audit')->get();
    }

    public function getHotLessonData($all_lesson_data)
    {
        $lesson_id   = array();
        $now         = time();
        $last_month  = date('Y-m-d', strtotime('-1 month'));
        $lesson_data = DB::table('lessons')
                         ->selectRaw('lessons.l_id AS l_id, count(*) AS click_count')
                         ->leftjoin('clicks', 'clicks.number', 'lessons.l_id')
                         ->where('clicks.item', 'lesson')
                         ->whereDate('clicks.created_at', '>=', $last_month)
                         ->where('pub_situation', true)
                         ->where('cancel_lesson', false)
                         ->where('delete_lesson', false)
                         ->groupBy('l_id')
                         ->orderBy('click_count', 'DESC')
                         ->get();

        foreach ($lesson_data as $lessons)
        {
              $type       = $all_lesson_data[$lessons->l_id]->type;
              $start_time = strtotime($all_lesson_data[$lessons->l_id]['start_time']);
              $last_time  = strtotime($all_lesson_data[$lessons->l_id]['last_time']);

              if (!empty($lesson_id[10])) { break; }
              elseif ((($type == 'entity') && ($start_time >= $now) && ($last_time >= $now)) || ($type == 'online')) { $lesson_id[] = $all_lesson_data[$lessons->l_id]; }
        }

        return $lesson_id;
    }

    public function getIndexLessonData()
    {
        // Get Public Lesson Data
        $lesson_data = array();
        $lessons     = self::where('pub_situation', true)->where('cancel_lesson', false)
                           ->select('l_id', 't_id', 'l_name', 'type', 'cover', 'start_time',
                                    'least_people', 'max_people', 'location', 'origin_fee', 'offer_fee', 'end_fund')
                           ->get();

        foreach ($lessons as $lesson)
        {
            $lesson_data[$lesson->l_id]                = $lesson;
            $lesson_data[$lesson->l_id]['buyer']       = Order::lessonBuyerOrderData($lesson->l_id)->count();
            $lesson_data[$lesson->l_id]['start_time']  = Unit::getEntityLessonFirstUnitStartTime($lesson->l_id) ?? $lesson->start_time;
            $lesson_data[$lesson->l_id]['end_time']    = Unit::getEntityLessonFirstUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']   = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
        }

        $index_lesson_data    = array();
        $index_lesson_data[0] = ['title' => '近期開課課程', 'lesson_data' => $this->getPublicLessonData('coming', $lesson_data, true, 11)];
        $index_lesson_data[1] = ['title' => '本月熱門課程', 'lesson_data' => $this->getHotLessonData($lesson_data)];
        $index_lesson_data[2] = ['title' => '近期免費課程', 'lesson_data' => $this->getPublicLessonData('free', $lesson_data, true, 11)];
        $index_lesson_data[3] = ['title' => '實體最新課程', 'lesson_data' => $this->getPublicLessonData('entity', $lesson_data, true, 11)];
        $index_lesson_data[4] = ['title' => '線上最新課程', 'lesson_data' => $this->getPublicLessonData('online', $lesson_data, true, 11)];

        // Get Teacher Data
        $teacher_id   = array();
        $teacher_data = array();

        foreach ($index_lesson_data as $key => $lesson)
        {
            foreach ($lesson['lesson_data'] as $data) { $teacher_id[] = $data->t_id; }
        }

        $t_id     = array_values(array_unique($teacher_id));
        $teachers = DB::table('teachers')->whereIn('t_id', $t_id)
                      ->join('members', 'members.m_id', 'teachers.m_id')
                      ->select('teachers.t_id', 'members.nickname', 'members.m_name', 'members.avg_img')
                      ->get();

        foreach ($teachers as $teacher) { $teacher_data[$teacher->t_id] = $teacher; }

        $index_lesson_data['teacher_data'] = $teacher_data;

        return $index_lesson_data;
    }

    public function get_approval_list()
    {
        $today         = strtotime(date('Y-m-d H:i:s'));
        $lesson_data   = self::where('pub_situation', true)
                               ->where('delete_lesson', false)
                               ->where('cancel_lesson', false)
                               ->get();
        $l_id          = $lesson_data->pluck('l_id');
        $l_end_time    = Unit::filter_last_time($l_id, 'ASC')->pluck('l_end_time');
        $approval_data = array();

        foreach ($lesson_data as $key => $value)
        {
            if ($value->type == 'online') { array_push($approval_data, $value);}
            else if (strtotime($l_end_time[$key]) > $today) { array_push($approval_data, $value);}
        }

        $approval_data = $this->get_order_data_by_lesson($approval_data);
        return $approval_data;
    }

    public function get_lesson_by_keyword($keyword)
    {
        $member      = new Member();
        $full_data   = array();
        $lesson_data = self::where('pub_situation', true)
                             ->where(function ($query) use ($keyword)
                             {
                                  $query->where('l_name', 'Like', '%' . $keyword . '%')
                                        ->orWhere('l_sub_name', 'Like', '%' . $keyword . '%')
                                        ->orWhere('location', 'Like', '%' . $keyword . '%')
                                        ->orWhere('location_note', 'Like', '%' . $keyword . '%')
                                        ->orWhere('topic', 'Like', '%' . $keyword . '%')
                                        ->orWhere('category', 'Like', '%' . $keyword . '%');
                             })
                             ->get()->pluck('l_id');

        $teacher_data = $member->get_teacher_by_keyword($keyword);
        $unit_data    = $this->unit->get_unit_by_keyword($keyword);

        for ($i = 0; $i < count($lesson_data); $i++)
        {
            $full_data[$lesson_data[$i]] = $lesson_data[$i];
        }

        for ($i = 0; $i < count($teacher_data); $i++)
        {
            $full_data[$teacher_data[$i]] = $teacher_data[$i];
        }

        for ($i = 0; $i < count($unit_data); $i++)
        {
            $full_data[$unit_data[$i]] = $unit_data[$i];
        }

        $full_data = array_values(array_filter($full_data));

        for ($i = 0; $i < count($full_data); $i++)
        {
            $order         = new Order();
            $now           = date('Y-m-d H:i:s');
            $id            = $full_data[$i];
            $lesson_data   = self::find($id);
            $buy_people    = $order->lessonBuyerOrderData($id)->count();

            if ($lesson_data->type == 'entity')
            {
                if (($now > $lesson_data->end_fund) && ($now < $lesson_data->start_time))
                {
                    if ($lesson_data->cancel_lesson == false)
                    {
                        $full_data[$i] = $lesson_data;
                        $full_data[$i]->buy_people = $buy_people;
                        $full_data[$i]->unit_data = $this->unit->getUnitData($id);
                    }
                }
                else if ($now <= $lesson_data->end_fund)
                {
                    $full_data[$i] = $lesson_data;
                    $full_data[$i]->buy_people = $buy_people;
                    $full_data[$i]->unit_data = $this->unit->getUnitData($id);
                }
            }
            else if ($lesson_data->type == 'online')
            {
                if ($now > $lesson_data->end_fund)
                {
                    if ($lesson_data->cancel_lesson == false)
                    {
                        $full_data[$i] = $lesson_data;
                        $full_data[$i]->buy_people = $buy_people;
                        $full_data[$i]->unit_data = $this->unit->getUnitData($id);
                    }
                }
                else
                {
                    $full_data[$i] = $lesson_data;
                    $full_data[$i]->buy_people = $buy_people;
                    $full_data[$i]->unit_data = $this->unit->getUnitData($id);
                }
            }

            if (is_numeric($full_data[$i])) { $full_data[$i] = null; }
        }

        return array_values(array_filter($full_data));
    }

    public function getLessonDescriptionFile($file_path)
    {
        $file    = fopen($file_path, 'r') or die('no flie');
        $content = json_decode(fread($file, filesize($file_path)));
        fclose($file);
        return $content;
    }

    public static function getLessonDataViaTeacher($t_id, $public = false)
    {
        $order = new Order();
        $unit  = new Unit();

        if ($public)
        {
            $lesson_data = self::where('t_id', $t_id)
                               ->where('delete_lesson', false)
                               ->where('pub_situation', $public)
                               ->where('cancel_lesson', false)
                               ->orderBy('created_at', 'DESC')
                               ->get();
        }
        else { $lesson_data = self::where('t_id', $t_id)->where('delete_lesson', false)->orderBy('created_at', 'DESC')->get(); }

        for ($i = 0; $i < count($lesson_data); $i++)
        {
            $lesson_data[$i]->unit_data  = $unit->getUnitData($lesson_data[$i]->l_id);
            $lesson_data[$i]->buy_people = $order->getLessonClassmate($lesson_data[$i]->l_id);
        }

        return $lesson_data;
    }

    public function get_lesson_filter_data($data = [], $time_range = [], $params = [], $all_area)
    {
        // Init Data
        $sort      = $params['sort'] ?? 'latest_DESC';
        $start_num = $params['start_num'] ?? 0;
        $limit     = $params['limit'] ?? false;
        $init      = $params['init'] ?? false;

        $click    = new Click();
        $res_data = [];

        // Init Vaild Lesson
        $now   = date('Y-m-d H:i:s');
        $query = DB::table('lessons')
                   ->where('pub_situation', true)
                   ->where('cancel_lesson', false)
                   ->where('delete_lesson', false)
                   ->where(function ($query) use ($now)
                   {
                       $query->where(function ($q) use ($now)
                       {
                           $q->where('type', 'entity')
                             ->where('start_time', '>', $now);
                       });
                       $query->orWhere(function ($q)
                       {
                          $q->where('type', 'online');
                       });
                   })
                   ->join('teachers', 'teachers.t_id', '=', 'lessons.t_id')
                   ->join('members', 'teachers.m_id', '=', 'members.m_id')
                   ->select('lessons.*', 'members.nickname', 'members.m_name', 'members.avg_img');

        // Get Lesson during date
        $range_lesson = [];

        if (!empty($time_range))
        {
            $lesson_time      = Unit::filter_time();
            $range_start_time = strtotime($time_range[0]);
            $range_end_time   = strtotime($time_range[1]) + 86399;

            for ($i = 0; $i < count($lesson_time); $i++)
            {
                $lesson_start_time = strtotime($lesson_time[$i]->l_start_time);
                $lesson_end_time   = strtotime($lesson_time[$i]->l_end_time);

                if (!is_null($lesson_time[$i]->l_start_time))
                {
                    if (($range_end_time > $lesson_start_time) && ($lesson_end_time > $range_start_time))
                    {
                        array_push($range_lesson, $lesson_time[$i]->l_id);
                    }
                }
                else { array_push($range_lesson, $lesson_time[$i]->l_id); }
            }
        }

        $query = empty($range_lesson) ? $query : $query->whereIn('lessons.l_id', $range_lesson);

        // Search Lesson Filter
        $keys = !empty($data) ? array_keys($data) : [];

        foreach ($keys as $value)
        {
            if (($value === 'nickname') && !empty($data['nickname']))
            {
                $t_id  = Teacher::whereIn('m_id', Member::whereIn('nickname', $data['nickname'])->pluck('m_id'))->pluck('t_id');
                $query = $query->whereIn('lessons.t_id', $t_id);
            }

            if (($value === 'type') && !empty($data['type']))
            {
                $query = $query->where('lessons.type', $data[$value]);
            }

            if (($value === 'category') && !empty($data['category']))
            {
                $query = $query->whereIn('lessons.category', $data[$value]);
            }

            if (($value === 'location') && !empty($data['location']))
            {
                if (!((count($data['location']) == 1) && ($data['location'][0] == '其他')))
                {
                    if (array_search('其他', $data['location']) !== false)
                    {
                        $location = array_diff((array)$all_area, $data['location']);

                        $query = $query->where(function ($q) use ($location)
                        {
                            foreach ($location as $v)
                            {
                                if ($v != '其他') { $q->where('lessons.location', 'Not Like', $v . '%'); }
                            }
                        });
                    }
                    else
                    {
                        $location = $data['location'];

                        $query = $query->where(function ($q) use ($location)
                        {
                            foreach ($location as $v) { $q->orwhere('lessons.location', 'Like', $v . '%'); }
                        });
                    }
                }
                else
                {
                    $location = array_diff((array)$all_area, $data['location']);

                    $query = $query->where(function ($q) use ($location)
                    {
                        foreach ($location as $v)
                        {
                            if ($v != '其他') { $q->where('lessons.location', 'Not Like', $v . '%'); }
                        }
                    });
                }
            }
        }

        // Lesson Sort
        $sort_data    = explode('_', $sort);
        $sort_refer   = $sort_data[0];
        $sort_method  = $sort_data[1];
        $populat_l_id = [];

        switch ($sort_refer)
        {
            case 'latest':
                $query = $query->orderby('audit_time', $sort_method);
                break;
            case 'hot':
                $popular = $click::selectRaw('number AS l_id, count(*) AS click_count')
                                 ->where('item', '=', 'lesson')
                                 ->groupBy('number')
                                 ->orderby('click_count', $sort_method)
                                 ->orderby('number', 'DESC')
                                 ->get()->pluck('l_id');

                foreach ($popular as $value) { array_push($populat_l_id, $value); }

                $lesson_id = $query->get()->pluck('l_id');

                foreach ($lesson_id as $value)
                {
                    if (array_search($value, $populat_l_id) === false)
                    {
                        if ($sort_method == 'ASC') { array_unshift($populat_l_id, $value); }

                        if ($sort_method == 'DESC') { array_push($populat_l_id, $value); }
                    }
                }

                if (!empty($populat_l_id)) { $query = $query->orderByRaw('FIELD(l_id, ' . join(', ', $populat_l_id) . ')'); }

                break;
            default:
                break;
        }

        // if limit = 0 default to get all the data
        if ($init || $limit == false)
        {
            $max_num = [];
            $max_num = $query->count();
            $res_data[1] = $max_num;
        }

        $lesson_data = $query->offset(is_bool($start_num) ? 0 : $start_num)
                             ->limit((is_bool($limit) || ($limit == 0)) ? $max_num : $limit)
                             ->get();

        // Get Others Data
        $order = new Order;
        $unit  = new Unit;

        foreach ($lesson_data as $key => $value)
        {
            $lesson_data[$key]->buy_people = $order->lessonBuyerOrderData($value->l_id)->count();
            $lesson_data[$key]->l_start_time = $unit->filter_first_time([$value->l_id])[0]->l_start_time;
            $lesson_data[$key]->l_end_time = $unit->filter_last_time([$value->l_id])[0]->l_end_time;
        }

        $res_data[0] = $lesson_data;
        return $res_data;
    }

    public function getTeacherLesson($type, $sort = 'create_DESC', $params = [])
    {
        $start_num    = $params['start_num'] ?? 0;
        $limit        = $params['limit'] ?? false;
        $init         = $params['init'] ?? false;
        $teacher_data = Teacher::data();

        if (!is_null($teacher_data) && Teacher::isTeacher())
        {
            $query = self::where('t_id', $teacher_data->t_id)->where('delete_lesson', false);

            switch ($type)
            {
                case 'draft':
                    $query = $query->where('pub_situation', false)->where('apply_situation', 'no apply');
                    break;
                case 'public':
                    $query = $query->where('pub_situation', true)->where('apply_situation', 'success');
                    break;
                case 'audit':
                    $query = $query->where('pub_situation', false)->where('apply_situation', 'audit');
                    break;
                case 'fail':
                    $query = $query->where('pub_situation', false)->where('apply_situation', 'fail');
                    break;
            }

            // Lesson Sort
            $sort_data    = explode('_', $sort);
            $sort_refer   = $sort_data[0];
            $sort_method  = $sort_data[1];

            switch ($sort_refer)
            {
                case 'create':
                    $query = $query->orderby('created_at', $sort_method);
                    break;
            }

            // if limit = 0 default to get all the data
            if ($init || $limit == false)
            {
                $max_num = [];
                $max_num = $query->count();
                $res_data[1] = $max_num;
            }

            $data = $query->offset(is_bool($start_num) ? 0 : $start_num)
                          ->limit((is_bool($limit) || ($limit == 0)) ? $max_num : $limit)
                          ->get();

            // Get Others Data
            $order       = new Order;
            $unit        = new Unit;
            $lesson_data = array();

            foreach ($data as $key => $value)
            {
                $lesson_data[$key]['l_id'] = $value->l_id;
                $lesson_data[$key]['t_id'] = $value->t_id;
                $lesson_data[$key]['l_name'] = $value->l_name;
                $lesson_data[$key]['type'] = $value->type;
                $lesson_data[$key]['cover'] = $value->cover;
                $lesson_data[$key]['least_people'] = $value->least_people;
                $lesson_data[$key]['max_people'] = $value->max_people;
                $lesson_data[$key]['location'] = $value->location;
                $lesson_data[$key]['start_fund'] = $value->start_fund;
                $lesson_data[$key]['end_fund'] = $value->end_fund;
                $lesson_data[$key]['start_time'] = $value->start_time;
                $lesson_data[$key]['offer_fee'] = $value->offer_fee;
                $lesson_data[$key]['origin_fee'] = $value->origin_fee;
                $lesson_data[$key]['cancel_lesson'] = $value->cancel_lesson;
                $lesson_data[$key]['pub_situation'] = $value->pub_situation;
                $lesson_data[$key]['apply_situation'] = $value->apply_situation;
                $lesson_data[$key]['buy_people'] = $order->lessonBuyerOrderData($value->l_id)->count();
                $lesson_data[$key]['l_start_time'] = $unit->filter_first_time([$value->l_id])[0]->l_start_time ?? null;
                $lesson_data[$key]['l_end_time'] = $unit->filter_last_time([$value->l_id])[0]->l_end_time ?? null;
            }

            $res_data[0] = $lesson_data;
            return $res_data;
        }
        else
        {
            return false;
        }
    }

    public static function getOpenLesson()
    {
        return self::where('pub_situation', true)
                   ->where('delete_lesson', false)
                   ->where('cancel_lesson', false)
                   ->whereDate('start_time', '<=', date('Y-m-d'))
                   ->get();
    }

    public function getPublicLessonDataIncludeCancel()
    {
        $lesson_data = self::where('pub_situation', true)->where('delete_lesson', false)->get();

        foreach ($lesson_data as $key => $value)
        {
            $lesson_data[$key]->l_start_time  = Unit::filter_first_time([$value->l_id])[0]->l_start_time;
            $lesson_data[$key]->l_end_time  = Unit::filter_last_time([$value->l_id])[0]->l_end_time;
        }

        return $lesson_data;
    }

    public function getRealPrice($l_id, $coupon)
    {
        if (is_null($coupon)) { return self::getCurrentFee(self::find($l_id)); }
        else { return Coupon::getDiscountPrice($coupon, self::find($l_id)->origin_fee); }
    }

    /**********************************************************************************
     * $mode = the data is latest, coming, entity, online, etc
     *
     * $limit = 0               // unlimited number of data
     * $limit = 1               // limit the number of data
     *
     * $limit_max = number      // limit the maximum number of data when $limit = 1
     **********************************************************************************/
    public function getPublicLessonData($mode, $all_lesson_data, $limit = false, $limit_max = 12)
    {
        $lesson_id   = array();
        $today       = date('Y-m-d');
        $now         = time();
        $lesson_data = self::where('pub_situation', true)->where('cancel_lesson', false)->where('delete_lesson', false);

        switch ($mode)
        {
            case 'latest':
                $lesson_data = $lesson_data->orderBy('offer_fee', 'DESC')->orderBy('audit_time', 'DESC')->get()->pluck('l_id');
                break;
            case 'coming':
                $lesson_data = $lesson_data->whereDate('start_time', '>=', $today)->orderBy('offer_fee', 'DESC')->orderBy('start_time', 'ASC')->get()->pluck('l_id');
                break;
            case 'free':
                $lesson_data = $lesson_data ->where(function ($query2) use ($today)
                                            {
                                               $query2->where(function ($query) use ($today)
                                               {
                                                   $query->where('origin_fee', 0)->whereDate('start_time', '>=', $today);
                                               })
                                               ->orWhere(function ($query) use ($today)
                                               {
                                                   $query->where('offer_fee', 0)->whereDate('end_fund', '>=', $today);
                                               });
                                            })
                                            ->orderBy('offer_fee', 'DESC')
                                            ->orderBy('start_time', 'ASC')
                                            ->get()->pluck('l_id');
                break;
            default:
                $lesson_data = $lesson_data->where('type', $mode)->orderBy('offer_fee', 'DESC')->orderBy('audit_time', 'DESC')->get()->pluck('l_id');
                break;
        }

        if ($limit) { $sum = ((count($lesson_data) < $limit_max ? count($lesson_data) : $limit_max)); }
        else { $sum = count($lesson_data); }

        foreach ($lesson_data as $l_id)
        {
            $type       = $all_lesson_data[$l_id]->type;
            $start_time = strtotime($all_lesson_data[$l_id]['start_time']);
            $last_time  = strtotime($all_lesson_data[$l_id]['last_time']);

            if (count($lesson_id) >= $sum) { break; }
            else if ((($type == 'entity') && ($start_time >= $now) && ($last_time >= $now)) || ($type == 'online')) { $lesson_id[] = $all_lesson_data[$l_id]; }
        }

        return $lesson_id;
    }

    public static function getTeacherMemberDataOfLesson($id)
    {
        // Get Teacher Of Member Data At This Lesson
        return Member::find(Teacher::find(Lesson::find($id)->t_id)->m_id);
    }

    public function getRollcallTeacherLessonList($id)
    {
        $lesson_list = Lesson::where('t_id', $id)
                             ->where('type', 'entity')
                             ->where('cancel_lesson', false)
                             ->where('pub_situation', true)
                             ->select('l_id', 'l_name', 'location')->get();

        foreach ($lesson_list as $lesson)
        {
            $first_lesson = Unit::getEntityLessonFirstUnitStartTime($lesson->l_id);
            $lesson->start_time = $first_lesson;
        }

        return $lesson_list;
    }

    public function send_audit($lesson_data)
    {
        $lesson_data->apply_situation = 'audit';
        $lesson_data->save();
    }

    public function send_notify_lesson_mail()
    {
        $order       = new Order();
        $lesson_data = self::where('pub_situation', true)->where('cancel_lesson', false)->where('type', 'entity')->get();
        $today       = date('Y-m-d');

        for ($i = 0; $i < count($lesson_data); $i++)
        {
            $l_start_time      = $this->unit->getUnitData($lesson_data[$i]->l_id)[0]->l_start_time;
            $lesson_start_time = !$l_start_time ? $lesson_data[$i]->start_time : substr($l_start_time, 0, 11);

            if (($lesson_start_time > $today) && ($today > $lesson_data[$i]->end_fund))
            {
                $check_open_lesson = $this->check_open_lesson($lesson_data[$i]->l_id, $lesson_data[$i]->least_people);

                if ($check_open_lesson === true)
                {
                    $time_difference = strtotime($lesson_start_time) - strtotime($today);
                    $buy_people      = $order->lessonBuyerOrderData($lesson_data[$i]->l_id);
                    $day             = null;

                    if ($time_difference == 86400) { $day = '明天'; }
                    else if ($time_difference == 86400 * 3) { $day = '3天後'; }

                    if ($day != null)
                    {
                        $teacher_data = Member::find(Teacher::find($lesson_data[$i]->t_id)->m_id);

                        for ($j = 0; $j < count($buy_people); $j++)
                        {
                            $data =
                            [
                                'account'      => Member::find($buy_people[$j]->m_id)->nickname,
                                'address'      => ($lesson_data[$i]->location === null) ? null : ($lesson_data[$i]->location . (($lesson_data[$i]->location_note === null) ? '' : ('(' . $lesson_data[$i]->location_note . ')'))),
                                'day'          => $day,
                                'lesson_name'  => $lesson_data[$i]->l_name,
                                'lesson_URL'   => 'https://www.ds-vep.com/lesson/' . $lesson_data[$i]->l_id,
                                'teacher_name' => ($teacher_data->m_name === null) ? $teacher_data->nickname : ($teacher_data->nickname . '(' . $teacher_data->m_name . ')'),
                                'time'         => $lesson_start_time,
                            ];

                            $this->main->send_email($data, 'site.personal.lesson.classroom.mail.notify_mail', Member::find($buy_people[$j]->m_id)->email, '【大俠學習平台】提醒上課通知信', 1);

                            if ($day == '明天')
                            {
                                $sms = new Sms();

                                // Send Classmate Notify Tomorrow Has Lesson SMS
                                $sms->sendSMSLessonClassmateNotify($lesson_data[$i]->l_id, Member::find($buy_people[$j]->m_id)->cellphone);
                            }
                        }

                        $data =
                        [
                            'account'     => ($teacher_data->m_name === null) ? $teacher_data->nickname : ($teacher_data->nickname . '(' . $teacher_data->m_name . ')'),
                            'address'     => ($lesson_data[$i]->location === null) ? null : ($lesson_data[$i]->location . (($lesson_data[$i]->location_note === null) ? '' : ('(' . $lesson_data[$i]->location_note . ')'))),
                            'day'         => $day,
                            'lesson_name' => $lesson_data[$i]->l_name,
                            'lesson_URL'  => 'https://www.ds-vep.com/lesson/' . $lesson_data[$i]->l_id,
                            'time'        => $lesson_start_time,
                        ];

                        $this->main->send_email($data, 'site.personal.lesson.classroom.mail.notify_teacher_mail', $teacher_data->email, '【大俠學習平台】提醒上課通知信', 1);

                        // Send Teacher Notify Tomorrow Has Lesson SMS
                        $sms->sendSMSLessonTeacherNotify($lesson_data[$i]->l_id, $teacher_data->cellphone, $lesson_data[$i]->t_id);
                    }
                }
            }
        }
    }

    public function send_open_lesson_mail($lesson_data, $buy_people)
    {
        $order             = new Order();
        $teacher_data      = Member::find(Teacher::find($lesson_data->t_id)->m_id);
        $l_start_time      = $this->unit->getUnitData($lesson_data->l_id)[0]->l_start_time;
        $lesson_start_time = ($l_start_time === null) ? $lesson_data->start_time : $l_start_time;

        for ($i = 0; $i < count($buy_people); $i++)
        {
            if ($buy_people[$i]->notice_mail == false)
            {
                $data =
                [
                    'account'      => Member::find($buy_people[$i]->m_id)->nickname,
                    'address'      => ($lesson_data->location === null) ? null : ($lesson_data->location . (($lesson_data->location_note === null) ? '' : ('(' . $lesson_data->location_note . ')'))),
                    'lesson_name'  => $lesson_data->l_name,
                    'lesson_URL'   => 'https://www.ds-vep.com/lesson/' . $lesson_data->l_id,
                    'teacher_name' => ($teacher_data->m_name === null) ? $teacher_data->nickname : ($teacher_data->nickname . '(' . $teacher_data->m_name . ')'),
                    'time'         => $lesson_start_time,
                ];

                $this->main->send_email($data, 'site.personal.lesson.classroom.mail.open_lesson', Member::find($buy_people[$i]->m_id)->email, '【大俠學習平台】確定開班通知信', 1);
                $temp_buy_people = $order->find($buy_people[$i]->id);
                $temp_buy_people->notice_mail = true;
                $temp_buy_people->save();
            }
        }

        $data =
        [
            'account'     => ($teacher_data->m_name === null) ? $teacher_data->nickname : ($teacher_data->nickname . '(' . $teacher_data->m_name . ')'),
            'address'     => ($lesson_data->location === null) ? null : ($lesson_data->location . (($lesson_data->location_note === null) ? '' : ('(' . $lesson_data->location_note . ')'))),
            'lesson_name' => $lesson_data->l_name,
            'lesson_URL'  => 'https://www.ds-vep.com/lesson/' . $lesson_data->l_id,
            'time'        => $lesson_start_time,
        ];

        $this->main->send_email($data, 'site.personal.lesson.classroom.mail.open_lesson_for_teacher', $teacher_data->email, '【大俠學習平台】確定開班通知信', 1);
    }

    public function update_content($file_folder, $file_path, $lesson_description)
    {
        $this->main->create_file($file_folder);
        $fp = fopen($file_path, 'wb') or die("Unable to open file!");
        chmod($file_path, 0777);
        $content = json_encode($lesson_description);
        fwrite($fp, $content);
        fclose($fp);
        return;
    }

    public function update_info_data($id, $lesson_name, $lesson_sub_name, $lesson_description)
    {
        $member_data = Member::find(Teacher::find(self::find($id)->t_id)->m_id);;
        $lesson_data = self::find($id);
        $file_folder = '../public/json/' . $member_data->m_id . '_' . $member_data->account;
        $file_path   = $file_folder . '/' . $lesson_data->t_id . '_' . $lesson_data->l_id . '.json';
        $this->update_content($file_folder, $file_path, $lesson_description);
        $lesson_data->l_name      = $lesson_name;
        $lesson_data->l_sub_name  = $lesson_sub_name;
        $lesson_data->description = $member_data->m_id . '_' . $member_data->account . '/' . $lesson_data->t_id . '_' . $lesson_data->l_id . '.json';
        $lesson_data->save();
    }

    public function update_lesson_cover($id, $cover, $destination_path)
    {
        if ($cover['error'] != 4)
        {
            $lesson_data    = self::find($id);
            $cover_filename = $this->unit->encrypt_video_name($cover['name']);
            $this->main->create_file($destination_path);
            $cover_no_error = move_uploaded_file($cover['tmp_name'], $destination_path . $cover_filename);

            if ($cover_filename != '')
            {
                $lesson_data->cover = $cover_filename;
                $lesson_data->save();
            }

            return $cover_no_error;
        }
        else { return 'no'; }
    }

    public function update_lesson_data($id, $request)
    {
        $lesson_data = self::find($id);
        $lesson_data->topic = $request->topic;
        $lesson_data->category = $request->category;
        $lesson_data->end_fund = $request->fundraising_day;
        $lesson_data->start_time = $request->start_day;
        $lesson_data->offer_fee = $request->offer_fee;
        $lesson_data->origin_fee = $request->origin_fee;
        $lesson_data->current_fee = self::getCurrentFee($lesson_data);
        $lesson_data->least_people = $request->least_people;
        $lesson_data->max_people = $request->max_people;
        $lesson_data->location = $request->lesson_location;
        $lesson_data->location_note = $request->lesson_location_note;
        $lesson_data->deadline = $request->deadline ?? 999;
        $lesson_data->save();
    }

    public function update_lesson_data_after_audit($l_id, $audit_result, $audit_reason, $member_account)
    {
        $lesson_data = self::find($l_id);
        $lesson_data->apply_situation = $audit_result;
        $lesson_data->audit_reason = $audit_reason;
        $lesson_data->audit_member = $member_account;
        $lesson_data->audit_time = date('Y-m-d H:i:s');
        $lesson_data->pub_situation = $audit_result == 'success' ? true : false;

        if ($audit_result == 'success')
        {
            //Evaluate Fundraising Time
            $fundraising_start_time = date("Y-m-d");
            $lesson_data->start_fund = $fundraising_start_time;
        }

        $lesson_data->save();
        return 'success';
    }

    public function update_lesson_media($id, $media, $destination_path)
    {
        if ($media['error'] != 4)
        {
            $lesson_data    = self::find($id);
            $media_filename = $this->unit->encrypt_video_name($media['name']);
            $this->main->create_file($destination_path);
            $media_no_error = move_uploaded_file($media['tmp_name'], $destination_path . $media_filename);

            if ($media_filename != '')
            {
                $lesson_data->media = $media_filename;
                $lesson_data->save();
            }

            return $media_no_error;
        }
        else { return 'no'; }
    }

    public function updateData($request)
    {
        self::where('l_id', $request->id)->update([$request->column => $request->data]);
        return 'ok';
    }

    public function checkPromotingLessonsSave()
    {
        // Get Public Lesson Data
        $lesson_data = array();
        $lessons     = self::where('pub_situation', true)->where('cancel_lesson', false)
            ->select('l_id', 'lessons.t_id AS lesson_t_id', 'l_name', 'type', 'cover', 'start_time',
                'least_people', 'max_people', 'location', 'origin_fee', 'offer_fee', 'current_fee',
                'end_fund', 'deadline', 'apply_situation', 'cancel_lesson', 'cancel_lesson_init',
                'members.m_name AS t_name', 'members.nickname AS t_nickname', 'members.avg_img AS t_avg_img')
            ->leftjoin('teachers', 'lessons.t_id', 'teachers.t_id')
            ->leftjoin('members', 'members.m_id', 'teachers.m_id')
            ->get();

        foreach ($lessons as $lesson)
        {
            $lesson_data[$lesson->l_id]                 = $lesson;
            $lesson_data[$lesson->l_id]['t_id']         = $lesson->lesson_t_id;
            $lesson_data[$lesson->l_id]['buyers']       = Order::lessonBuyerOrderData($lesson->l_id)->count();
            $lesson_data[$lesson->l_id]['start_time']   = Unit::getEntityLessonFirstUnitStartTime($lesson->l_id) ?? $lesson->start_time;
            $lesson_data[$lesson->l_id]['end_time']     = Unit::getEntityLessonFirstUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['l_start_time'] = Unit::filter_first_time([$lesson->l_id])[0]->l_start_time ?? null;
            $lesson_data[$lesson->l_id]['l_end_time']   = Unit::filter_last_time([$lesson->l_id])[0]->l_end_time ?? null;
        }

        $promoting_lesson_data    = array();
        $promoting_lesson_data[0] = $this->getPublicLessonDataAjax('coming', $lesson_data, true, 12, true);
        $promoting_lesson_data[1] = $this->getHotLessonDataAjax($lesson_data, true);
        $promoting_lesson_data[2] = $this->getPublicLessonDataAjax('free', $lesson_data, true, 12, true);
        $promoting_lesson_data[3] = $this->getPublicLessonDataAjax('entity', $lesson_data, true, 12, true);
        $promoting_lesson_data[4] = $this->getPublicLessonDataAjax('online', $lesson_data, true, 12, true);

        foreach ($promoting_lesson_data as $key => $lesson_data_type)
        {
            $value = implode(",", $lesson_data_type);

            $lesson_cron = DB::table('lesson_cron')
                ->where('id', $key+1)
                ->update(['l_ids' => $value, 'createdtime' => date("Y-m-d H:i:s")]);
        }
    }

    public function getPromotingLessonsAjax2($mode, $m_id)
    {
        $promoting_lesson_data    = array();

        $l_cron = DB::table('lesson_cron')
                    ->where('id', $mode+1)
                    ->get();

        if($l_cron[0]->l_ids!='')
        {
            $lesson_id_arr = explode(",", $l_cron[0]->l_ids);
            $lesson_data = array();

            foreach ($lesson_id_arr as $l_id)
            {
                $lesson = Lesson::find($l_id);

                $lesson_data[$l_id] = $lesson;
                $lesson_data[$l_id]['t_id']         = $lesson->t_id;

                $teacher_memberdata = Member::find(Teacher::find($lesson->t_id)->m_id);
                $lesson_data[$l_id]['t_name']       = $teacher_memberdata->m_name;
                $lesson_data[$l_id]['t_nickname']   = $teacher_memberdata->nickname;
                $lesson_data[$l_id]['t_avg_img']    = $teacher_memberdata->avg_img;

                $lesson_data[$l_id]['buyers']       = Order::lessonBuyerOrderData($l_id)->count();
                $lesson_data[$l_id]['start_time']   = Unit::getEntityLessonFirstUnitStartTime($l_id) ?? $lesson->start_time;
                $lesson_data[$l_id]['end_time']     = Unit::getEntityLessonFirstUnitEndTime($l_id);
                $lesson_data[$l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($l_id);
                $lesson_data[$l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($l_id);
                $lesson_data[$l_id]['l_start_time'] = Unit::filter_first_time([$l_id])[0]->l_start_time ?? null;
                $lesson_data[$l_id]['l_end_time']   = Unit::filter_last_time([$l_id])[0]->l_end_time ?? null;

                $order_data = Order::checkLessonBuyerOrderData($l_id, $m_id);

                if(empty($order_data)) {
                    $lesson_data[$l_id]['orderDeadline'] = null;
                    $lesson_data[$l_id]['restrict'] = null;
                    $lesson_data[$l_id]['owned'] = 0;
                }
                elseif($order_data['checkout_time']!='')
                {
                    $lesson_data[$l_id]['orderDeadline'] = $order_data['deadline'];
                    $lesson_data[$l_id]['restrict'] = $order_data['restrict'];

                    if(!is_null($order_data['deadline'])) {
                        if(strtotime(Date('Y-m-d')) > strtotime($order_data['deadline']) ) {
                            $lesson_data[$l_id]['owned'] = 3;
                        }
                        else {
                            $lesson_data[$l_id]['owned'] = 2;
                        }
                    }
                    else {
                        $lesson_data[$l_id]['owned'] = 2;
                    }
                }
                elseif(is_null($order_data['checkout_time']))
                {
                    $lesson_data[$l_id]['orderDeadline'] = $order_data['deadline'];
                    $lesson_data[$l_id]['restrict'] = $order_data['restrict'];
                    $lesson_data[$l_id]['owned'] = 1;
                }
            }

            foreach($lesson_data as $lesson) {
                $promoting_lesson_data[] = $lesson;
            }

        }

        return $promoting_lesson_data;
    }

    public function getPromotingLessonsAjax($mode, $m_id)
    {
        // Get Public Lesson Data
        $lesson_data = array();
        $lessons     = self::where('pub_situation', true)->where('cancel_lesson', false)
            ->select('l_id', 'lessons.t_id AS lesson_t_id', 'l_name', 'type', 'cover', 'start_time',
                'least_people', 'max_people', 'location', 'origin_fee', 'offer_fee', 'current_fee',
                'end_fund', 'deadline', 'apply_situation', 'cancel_lesson', 'cancel_lesson_init',
                'members.m_name AS t_name', 'members.nickname AS t_nickname', 'members.avg_img AS t_avg_img')
            ->leftjoin('teachers', 'lessons.t_id', 'teachers.t_id')
            ->leftjoin('members', 'members.m_id', 'teachers.m_id')
            ->get();

        foreach ($lessons as $lesson)
        {
            $lesson_data[$lesson->l_id]                 = $lesson;
            $lesson_data[$lesson->l_id]['t_id']         = $lesson->lesson_t_id;
            $lesson_data[$lesson->l_id]['buyers']       = Order::lessonBuyerOrderData($lesson->l_id)->count();
            $lesson_data[$lesson->l_id]['start_time']   = Unit::getEntityLessonFirstUnitStartTime($lesson->l_id) ?? $lesson->start_time;
            $lesson_data[$lesson->l_id]['end_time']     = Unit::getEntityLessonFirstUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['l_start_time'] = Unit::filter_first_time([$lesson->l_id])[0]->l_start_time ?? null;
            $lesson_data[$lesson->l_id]['l_end_time']   = Unit::filter_last_time([$lesson->l_id])[0]->l_end_time ?? null;

            $order_data = Order::checkLessonBuyerOrderData($lesson->l_id, $m_id);

            if(empty($order_data)) {
                $lesson_data[$lesson->l_id]['orderDeadline'] = null;
                $lesson_data[$lesson->l_id]['owned'] = 0;
            }
            elseif($order_data['checkout_time']!='')
            {
                $lesson_data[$lesson->l_id]['orderDeadline'] = $order_data['deadline'];
                $lesson_data[$lesson->l_id]['restrict'] = $order_data['restrict'];

                if(!is_null($order_data['deadline'])) {
                    if(strtotime(Date('Y-m-d')) > strtotime($order_data['deadline']) ) {
                        $lesson_data[$lesson->l_id]['owned'] = 3;
                    }
                    else {
                        $lesson_data[$lesson->l_id]['owned'] = 2;
                    }
                }
                else {
                    $lesson_data[$lesson->l_id]['owned'] = 2;
                }
            }
            elseif(is_null($order_data['checkout_time']))
            {
                $lesson_data[$lesson->l_id]['orderDeadline'] = $order_data['deadline'];
                $lesson_data[$lesson->l_id]['restrict'] = $order_data['restrict'];
                $lesson_data[$lesson->l_id]['owned'] = 1;
            }

        }

        $promoting_lesson_data    = array();

        switch ($mode) {
            case 0:
                $promoting_lesson_data = $this->getPublicLessonDataAjax('coming', $lesson_data, true, 12);
                break;
            case 1:
                $promoting_lesson_data = $this->getHotLessonDataAjax($lesson_data);
                break;
            case 2:
                $promoting_lesson_data = $this->getPublicLessonDataAjax('free', $lesson_data, true, 12);
                break;
            case 3:
                $promoting_lesson_data = $this->getPublicLessonDataAjax('entity', $lesson_data, true, 12);
                break;
            case 4:
                $promoting_lesson_data = $this->getPublicLessonDataAjax('online', $lesson_data, true, 12);
                break;
            default:
                break;
        }

        return $promoting_lesson_data;
    }

    public function getPublicLessonDataAjax($mode, $all_lesson_data, $limit = false, $limit_max = 12, $only_l_id = false)
    {
        $lesson_id   = array();
        $today       = date('Y-m-d');
        $now         = time();

        $lesson_data = self::where('pub_situation', true)->where('cancel_lesson', false)->where('delete_lesson', false);

        switch ($mode)
        {
            case 'latest':
                $lesson_data = $lesson_data->orderBy('offer_fee', 'DESC')->orderBy('audit_time', 'DESC')->get()->pluck('l_id');
                break;
            case 'coming':
                $lesson_data = $lesson_data->where('offer_fee', '!=', 0)->whereDate('start_time', '>=', $today)->orderBy('start_time', 'ASC')->get()->pluck('l_id');
                break;
            case 'free':
                $lesson_data = $lesson_data ->where(function ($query2) use ($today)
	                {
	                    $query2->where(function ($query) use ($today)
	                    {
	                        $query->where('origin_fee', 0)->whereDate('start_time', '>=', $today);
	                    })
	                        ->orWhere(function ($query) use ($today)
	                        {
	                            $query->where('offer_fee', 0)->whereDate('end_fund', '>=', $today);
	                        });
	                })
                    ->orderBy('offer_fee', 'DESC')
                    ->orderBy('start_time', 'ASC')
                    ->get()->pluck('l_id');
                break;
            default:
                $lesson_data = $lesson_data->where('type', $mode)->where('offer_fee', '!=', 0)->orderBy('audit_time', 'DESC')->get()->pluck('l_id');
                break;
        }

        if ($limit) { $sum = ((count($lesson_data) < $limit_max ? count($lesson_data) : $limit_max)); }
        else { $sum = count($lesson_data); }

        /* if($mode=='coming')
        {
            $new_lesson_data = $new_lesson_data2 = array();

            foreach ($lesson_data as $l_id)
            {
                $order         = new Order();
                $buy_people    = $order->lessonBuyerOrderData($l_id)->count();

                if($buy_people > $all_lesson_data[$l_id]->least_people)  $new_lesson_data[] = $l_id;
                else $new_lesson_data2[] = $l_id;
            }

            $lesson_data = array_merge($new_lesson_data, $new_lesson_data2);
        } */

        foreach ($lesson_data as $l_id)
        {
            $type       = $all_lesson_data[$l_id]->type;
            $start_time = strtotime($all_lesson_data[$l_id]['start_time']);
            $last_time  = strtotime($all_lesson_data[$l_id]['last_time']);

            if (count($lesson_id) >= $sum) { break; }
            else if ((($type == 'entity') && ($start_time >= $now) && ($last_time >= $now)) || ($type == 'online')) { $lesson_id[] = $all_lesson_data[$l_id]; }
        }

        if($only_l_id)
        {
            $lesson_id2 = array();
            foreach ($lesson_id as $lessondata) {
                $lesson_id2[] = $lessondata->l_id;
            }

            $lesson_id = $lesson_id2;
        }

        return $lesson_id;
    }

    public function getHotLessonDataAjax($all_lesson_data, $only_l_id=false)
    {
        $lesson_id   = array();
        $now         = time();
        $last_month  = date('Y-m-d', strtotime('-1 month'));
        $lesson_data = DB::table('lessons')
            ->selectRaw('lessons.l_id AS l_id, count(*) AS click_count')
            ->leftjoin('clicks', 'clicks.number', 'lessons.l_id')
            ->where('clicks.item', 'lesson')
            ->whereDate('clicks.created_at', '>=', $last_month)
            ->where('pub_situation', true)
            ->where('cancel_lesson', false)
            ->where('delete_lesson', false)
            ->groupBy('l_id')
            ->orderBy('click_count', 'DESC')
            ->get();

        foreach ($lesson_data as $lessons)
        {
            $type       = $all_lesson_data[$lessons->l_id]->type;
            $start_time = strtotime($all_lesson_data[$lessons->l_id]['start_time']);
            $last_time  = strtotime($all_lesson_data[$lessons->l_id]['last_time']);

            if (count($lesson_id) > 12) { break; }
            elseif ((($type == 'entity') && ($start_time >= $now) && ($last_time >= $now)) || ($type == 'online')) { $lesson_id[] = $all_lesson_data[$lessons->l_id]; }
        }

        if($only_l_id)
        {
            $lesson_id2 = array();
            foreach ($lesson_id as $lessondata) {
                $lesson_id2[] = $lessondata->l_id;
            }

            $lesson_id = $lesson_id2;
        }

        return $lesson_id;
    }

    public function getMyLessonsAjax($m_id)
    {
        // Get Public Lesson Data
        $lesson_data = array();
        $lessons     = self::where('pub_situation', true)->where('cancel_lesson', false)
            ->select('lessons.l_id AS l_id', 'lessons.t_id AS lesson_t_id', 'l_name', 'type', 'cover', 'start_time',
                'least_people', 'max_people', 'location', 'origin_fee', 'offer_fee', 'current_fee',
                'end_fund', 'lessons.deadline AS deadline', 'apply_situation', 'lessons.cancel_lesson', 'lessons.cancel_lesson_init',
                'members.m_name AS t_name', 'members.nickname AS t_nickname', 'members.avg_img AS t_avg_img')
            ->leftjoin('teachers', 'lessons.t_id', 'teachers.t_id')
            ->leftjoin('members', 'members.m_id', 'teachers.m_id')
            ->orderBy('start_time', 'ASC')
            ->get();

        foreach ($lessons as $lesson)
        {
            $order_data = Order::checkLessonBuyerOrderData($lesson->l_id, $m_id);

            if(empty($order_data)) {
                continue;
            }

            $lesson_data[$lesson->l_id]                 = $lesson;
            $lesson_data[$lesson->l_id]['t_id']         = $lesson->lesson_t_id;
            $lesson_data[$lesson->l_id]['buyers']       = Order::lessonBuyerOrderData($lesson->l_id)->count();
            $lesson_data[$lesson->l_id]['start_time']   = Unit::getEntityLessonFirstUnitStartTime($lesson->l_id) ?? $lesson->start_time;
            $lesson_data[$lesson->l_id]['end_time']     = Unit::getEntityLessonFirstUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['l_start_time'] = Unit::filter_first_time([$lesson->l_id])[0]->l_start_time ?? null;
            $lesson_data[$lesson->l_id]['l_end_time']   = Unit::filter_last_time([$lesson->l_id])[0]->l_end_time ?? null;
            $lesson_data[$lesson->l_id]['orderDeadline']= $order_data['deadline'];
            $lesson_data[$lesson->l_id]['orderPrice']   = $order_data['price'];
            $lesson_data[$lesson->l_id]['restrict']     = $order_data['restrict'];

            if($order_data['checkout_time']!='')
            {
                if(!is_null($order_data['deadline']))
                {
                    if(strtotime(Date('Y-m-d')) > strtotime($order_data['deadline']) ) {
                        $lesson_data[$lesson->l_id]['owned'] = 3;
                    }
                    else {
                        $lesson_data[$lesson->l_id]['owned'] = 2;
                    }
                }
                else {
                    $lesson_data[$lesson->l_id]['owned'] = 2;
                }
            }
            elseif(is_null($order_data['checkout_time'])) {
                $lesson_data[$lesson->l_id]['owned'] = 1;
            }
        }

        $my_lesson_data    = array();

        foreach ($lesson_data as $lesson_entry)
        {
            $my_lesson_data[] = $lesson_entry;
        }

        return $my_lesson_data;
    }

    public function getLessonDetailAjax($lesson_data, $m_id)
    {
        $lesson_data['buyers']       = Order::lessonBuyerOrderData($lesson_data->l_id)->count();
        $lesson_data['l_start_time'] = Unit::filter_first_time([$lesson_data->l_id])[0]->l_start_time ?? null;
        $lesson_data['l_end_time']   = Unit::filter_last_time([$lesson_data->l_id])[0]->l_end_time ?? null;

        $booking_data = Order::checkLessonBuyerBookingData($lesson_data['l_id'], $m_id);
        $order_data = Order::checkLessonBuyerOrderData($lesson_data['l_id'], $m_id);

        if($booking_data)
        {
            $lesson_data['orderDeadline'] = null;
            $lesson_data['restrict'] = null;
            $lesson_data['payment'] = $booking_data['payment'];
            $lesson_data['owned'] = 1;
        }
        elseif(empty($order_data))
        {
            $lesson_data['orderDeadline'] = null;
            $lesson_data['restrict'] = null;
            $lesson_data['payment'] = null;
            $lesson_data['owned'] = 0;
        }
        elseif($order_data['checkout_time']!='')
        {
            $lesson_data['orderDeadline']   = $order_data['deadline'];
            $lesson_data['restrict']        = $order_data['restrict'];
            $lesson_data['restrict']        = $order_data['payment'];

            if(!is_null($order_data['deadline']))
            {
                if(strtotime(Date('Y-m-d')) > strtotime($order_data['deadline']) ) {
                    $lesson_data['owned'] = 3;
                }
                else {
                    $lesson_data['owned'] = 2;
                }
            }
            else {
                $lesson_data['owned'] = 2;
            }
        }

        $isMyfavorite = $this->favorite->isMyFavorite($lesson_data['l_id'], $m_id);
        $conditions = $this->goal->getLessonGoalData($lesson_data['l_id'], "condition");
        $suits = $this->goal->getLessonGoalData($lesson_data['l_id'], "suit");
        $learns = $this->goal->getLessonGoalData($lesson_data['l_id'], "learn");

        //Record Enter Lesson
        $this->click->addClickRecord('lesson', $lesson_data['l_id']);

        $condition_arr = array();
        foreach ($conditions as $condition) {
            $condition_arr[] = $condition->content;
        }

        $suit_arr = array();
        foreach ($suits as $suit) {
            $suit_arr[] = $suit->content;
        }

        $learn_arr = array();
        foreach ($learns as $learn) {
            $learn_arr[] = $learn->content;
        }

        $lesson_data['favorite'] = $isMyfavorite ? 1 : 0;
        $lesson_data['condition'] = $condition_arr;
        $lesson_data['suit'] = $suit_arr;
        $lesson_data['learn'] = $learn_arr;

        return $lesson_data;
    }

    public function getLessonUnitDetailAjax($l_id, $m_id, $mode, $l_t_id = null, $m_authority = null)
    {
        $lessonUnitDatas = $this->unit->getUnitData($l_id);
        $order_data = Order::checkLessonBuyerOrderData($l_id, $m_id);

        foreach ($lessonUnitDatas as $key => $lessonUnitData)
        {
            if($mode==0) {
                if($lessonUnitData->c_video_situation!="free") {
                    $lessonUnitDatas[$key]->c_video = null;
                }
            }
            elseif($mode==1)
            {
                if(!empty($order_data))
                {
                    $checkOpenLesson = Lesson::checkOpenLesson($l_id);

                    if(!$checkOpenLesson) {
                        if($lessonUnitData->c_video_situation!='free') {
                            $lessonUnitDatas[$key]->c_video = null;
                        }
                    }
                }
                else {
                    $role = Member::getRole($m_authority);
                    $teacher_data = Teacher::findMemberId($m_id);

                    if ($teacher_data) {
                        $t_id = $teacher_data->t_id;
                        if($l_t_id==$t_id)  $role += 16;
                    }

                    if (!((2 & $role)==2 || (16 & $role)==16))  // 行政人員 or 老師
                    {
                        $lessonUnitDatas[$key]->c_video = null;
                    }
                }
            }
        }

        return $lessonUnitDatas;
    }

    public function getLessonUnitTimesAjax($l_id)
    {
        $lessonUnitDatas = $this->unit->getUnitData($l_id);

        $lessonUnit_arr = array();
        foreach ($lessonUnitDatas as $lessonUnitData) {
            $lessonUnit_arr[] = $lessonUnitData->l_start_time;
        }

        return $lessonUnit_arr;
    }

    public function startStudyAjax($l_id, $m_id)
    {
        $lesson_data = self::find($l_id);

        if ($lesson_data->type == 'online')
        {
            if($lesson_data->deadline=="999") {
                return 4;   //此課程為永久觀看
            }
            else {
                $order_data = Order::getCheckoutQueue()->where('l_id', $l_id)->where('m_id', $m_id)->get();
                if($order_data->deadline!="") {
                    return 3;   //此課程為永久觀看
                }
                else {               
                    $status = $this->order->saveDeadlineByStartStudy($l_id, $m_id);

                    return $status;
                }
            }
        }
        else {
            return 1;   //只處理線上課程
        }
    }

    public function checkAllLessonsSave()
    {
        $lesson_sort  = array();            // sort 為 null
        $lesson_sort2 = array();            // sort 不為 null
        $lesson_teacher_sort = array();     // 王牌教師近期開課排序
        $teacher_sort = array();            // 王牌教師近期開課排序
        $today = date('Y-m-d');
        $num = 0;
        $sort_num = 0;
        $sort_num2 = 0;

        // cancel_lesson=1 OR pub_situation=0 的課程 sort 欄位通通設成NULL
        $lesson_data =  DB::table('lessons')
            ->where(function ($query)
            {
                $query->where('pub_situation', false)
                    ->orWhere('cancel_lesson', true)
                    ->orWhere('delete_lesson', true);
            })
            ->get()
            ->pluck('l_id');

        foreach ($lesson_data as $l_id)
        {
            $num++;
            $lesson_sort[$l_id] = NULL;
        }

        // 距今天天數從小排到大（距今天天數 cancel_lesson_init=1 的課程是看end_fund，cancel_lesson_init=0 的是看 start_time)
        $lesson_data2 = self::where('pub_situation', true)->where('cancel_lesson', false)->where('delete_lesson', false);
        $lesson_data2 = $lesson_data2->where('cancel_lesson_init', 1)->whereDate('end_fund', '>=', $today)->orderBy('end_fund', 'ASC')->get();

        foreach ($lesson_data2 as $lesson_entry)
        {
            $datetime1 = date_create($lesson_entry->end_fund);
            $datetime2 = date_create($today);
            $date_diff = date_diff($datetime1, $datetime2);
            $totalDays = $date_diff->format("%a");
            $num++;

            $lesson_sort2[$lesson_entry->l_id] = $totalDays;
        }

        $lesson_data2A = self::where('pub_situation', true)->where('cancel_lesson', false)->where('delete_lesson', false);
        $lesson_data2A = $lesson_data2A->where('cancel_lesson_init', 0)->whereDate('start_time', '>=', $today)->orderBy('start_time', 'ASC')->get();

        foreach ($lesson_data2A as $lesson_entry)
        {
            $datetime1 = date_create($lesson_entry->start_time);
            $datetime2 = date_create($today);
            $date_diff = date_diff($datetime1, $datetime2);
            $totalDays = $date_diff->format("%a");
            $num++;

            $lesson_sort2[$lesson_entry->l_id] = $totalDays;
        }

        asort($lesson_sort2);
        $lesson_teacher_sort = $lesson_sort2;

        // 接下還排早已開課的付費線上課，start_time 晚的排到早的
        $lesson_data3 = self::where('pub_situation', true)->where('cancel_lesson', false)->where('delete_lesson', false);
        $lesson_data3 = $lesson_data3->where('type', 'online')->where('offer_fee', '!=', 0)->whereDate('start_time', '<', $today)->orderBy('start_time', 'DESC')->get();

        foreach ($lesson_data3 as $lesson_entry)
        {
            $datetime1 = date_create($lesson_entry->start_time);
            $datetime2 = date_create($today);
            $date_diff = date_diff($datetime1, $datetime2);
            $totalDays = $date_diff->format("%a");
            $num++;

            $lesson_sort2[$lesson_entry->l_id] = $totalDays;
            //$lesson_sort_array[$lesson_entry->l_id] = array($lesson_entry->start_time, $totalDays, $lesson_entry->type);
        }

        // 接著排早已開課的免費線上課，start_time 晚的排到早的
        $lesson_data4 = self::where('pub_situation', true)->where('cancel_lesson', false)->where('delete_lesson', false);
        $lesson_data4 = $lesson_data4->where('type', 'online')->where('offer_fee', '=', 0)->whereDate('start_time', '<', $today)->orderBy('start_time', 'DESC')->get();

        foreach ($lesson_data4 as $lesson_entry)
        {
            $datetime1 = date_create($lesson_entry->start_time);
            $datetime2 = date_create($today);
            $date_diff = date_diff($datetime1, $datetime2);
            $totalDays = $date_diff->format("%a");
            $num++;

            $lesson_sort2[$lesson_entry->l_id] = $totalDays;
            //$lesson_sort_array[$lesson_entry->l_id] = array($lesson_entry->start_time, $totalDays, $lesson_entry->type);
        }

        // 其他的是早已開課的實體課， sort 欄位通通設成 NULL
        $lesson_data5 = self::where('pub_situation', true)->where('cancel_lesson', false)->where('delete_lesson', false);
        $lesson_data5 = $lesson_data5->where('type', 'entity')->whereDate('start_time', '<', $today)->orderBy('start_time', 'DESC')->get();

        foreach ($lesson_data5 as $lesson_entry)
        {
            $num++;
            $lesson_sort[$lesson_entry->l_id] = NULL;
            //$lesson_sort_array[$lesson_entry->l_id] = array($lesson_entry->start_time, $totalDays, $lesson_entry->type);
        }

        foreach ($lesson_sort as $l_id => $sort_value)
        {
            $lesson_cron = DB::table('lessons')
                ->where('l_id', $l_id)
                ->update(['sort' => $sort_value, 'sort_updatetime' => date("Y-m-d H:i:s")]);
        }

        foreach ($lesson_sort2 as $l_id => $daydiff)
        {
            $sort_num++;
            $lesson_cron = DB::table('lessons')
                ->where('l_id', $l_id)
                ->update(['sort' => $sort_num, 'sort_updatetime' => date("Y-m-d H:i:s")]);
        }

        foreach ($lesson_teacher_sort as $l_id => $daydiff)
        {
            $t_id = Lesson::find($l_id)->t_id;

            if(!in_array($t_id, $teacher_sort))    $teacher_sort[] = $t_id;
        }

        DB::table('teachers')->update(['sort' => NULL, 'sort_updatetime' => NULL]);

        foreach ($teacher_sort as $t_id)
        {
            $sort_num2++;
            $teacher_cron = DB::table('teachers')
                ->where('t_id', $t_id)
                ->update(['sort' => $sort_num2, 'sort_updatetime' => date("Y-m-d H:i:s")]);
        }

        return $num;
    }

    /**
     * @param string $keyword
     * @param $rangeStartTime
     * @param $rangeEndTime
     * @param $type
     * @param $pay_type
     * @param $cancel_lesson
     * @param $teachers
     * @param $areas
     * @param $topicLabels
     * @param $m_id
     * @return array
     */
    public function getLessonsAjax($keyword='', $rangeStartTime, $rangeEndTime, $type, $pay_type, $cancel_lesson, $teachers, $areas, $topicLabels, $m_id, $startIndex, $limitNum)
    {
        // Get Public Lesson Data
        $lesson_data = array();

        $lessons = self::where('pub_situation', true)->where('delete_lesson', false)->whereNotNull('lessons.sort')
            ->select('l_id', 'lessons.t_id AS lesson_t_id', 'l_name', 'type', 'cover', 'start_time',
                'least_people', 'max_people', 'location', 'origin_fee', 'offer_fee', 'current_fee',
                'end_fund', 'deadline', 'apply_situation', 'cancel_lesson', 'cancel_lesson_init', 'lessons.sort AS lessons_sort',
                'members.m_name', 'members.nickname', 'members.avg_img')
            ->leftjoin('teachers', 'lessons.t_id', 'teachers.t_id')
            ->leftjoin('members', 'members.m_id', 'teachers.m_id');

        switch ($cancel_lesson)
        {
            case 0:
                $lessons = $lessons->where('cancel_lesson', false)->where('cancel_lesson_init', false);
                break;
            case 1:
                $lessons = $lessons->where('cancel_lesson', true);
                break;
            case 2:
                $lessons = $lessons->where('cancel_lesson', false)->where('cancel_lesson_init', true);
                break;
            default:
                $lessons = $lessons->where('cancel_lesson', false);
                break;
        }

        if($keyword!='')
        {
            $lessons = $lessons
                ->where(function ($query) use ($keyword)
                {
                    $query->where('l_name', 'Like', '%' . $keyword . '%')
                        ->orWhere('nickname', 'Like', '%' . $keyword . '%')
                        ->orWhere('m_name', 'Like', '%' . $keyword . '%')
                        ->orWhere('l_sub_name', 'Like', '%' . $keyword . '%')
                        ->orWhere('location', 'Like', '%' . $keyword . '%')
                        ->orWhere('location_note', 'Like', '%' . $keyword . '%')
                        ->orWhere('topic', 'Like', '%' . $keyword . '%')
                        ->orWhere('category', 'Like', '%' . $keyword . '%');
                });
        }

        if($type==1) {
            $lessons = $lessons->where('type', 'online');
        }
        elseif ($type==2) {
            $lessons = $lessons->where('type', 'entity');
        }

        if($pay_type==1) {
            $lessons = $lessons->where('offer_fee', '!=', 0);
        }
        elseif($pay_type==2) {
            $lessons = $lessons->where('offer_fee', 0);
        }

        if($teachers) {
            $lessons = $lessons->whereIn('lessons.t_id', $teachers);
        }

        if(is_array($areas) && count($areas)>=1)
        {
            $lessons = $lessons
                ->where(function ($query) use ($areas)
                {
                    $query->where('location', 'Like', $areas[0] . '%');

                    for($i=1; $i<count($areas); $i++) {
                        $query->orWhere('location', 'Like', $areas[$i] . '%');
                    }
                });
        }

        if(is_array($topicLabels) && count($topicLabels)>=1)
        {
            $lessons = $lessons
                ->where(function ($query) use ($topicLabels)
                {
                    $query->where('topic', $topicLabels[0]['topic'])
                            ->where('category', $topicLabels[0]['label']);

                    for($i=1; $i < count($topicLabels)-1; $i++)
                    {
                        $topic_val = $topicLabels[$i]['topic'];
                        $label_val = $topicLabels[$i]['label'];

                        $query->orWhere(function ($q) use ($topic_val, $label_val)
                        {
                            $q->where('topic', $topic_val)->where('category', $label_val);
                        });
                    }
                });
        }

        // Get Lesson during date
        $range_lesson = [];

        if (!empty($rangeStartTime) && !empty($rangeEndTime))
        {
            $lesson_time      = Unit::filter_time();
            $range_start_time = strtotime($rangeStartTime);
            $range_end_time   = strtotime($rangeEndTime) + 86399;

            for ($i = 0; $i < count($lesson_time); $i++)
            {
                $lesson_start_time = strtotime($lesson_time[$i]->l_start_time);
                $lesson_end_time   = strtotime($lesson_time[$i]->l_end_time);

                if (!is_null($lesson_time[$i]->l_start_time))
                {
                    if (($range_end_time > $lesson_start_time) && ($lesson_end_time > $range_start_time))
                    {
                        array_push($range_lesson, $lesson_time[$i]->l_id);
                    }
                }
                else { array_push($range_lesson, $lesson_time[$i]->l_id); }
            }
        }

        $lessons = empty($range_lesson) ? $lessons : $lessons->whereIn('l_id', $range_lesson);

        $lessons = $lessons->orderBy('lessons.sort', 'ASC');

        // if limit = 0 default to get all the data
        if ($limitNum == false) {
            $max_num = $lessons->count();
        }

        DB::enableQueryLog();
        $lessons = $lessons->offset(is_bool($startIndex) ? 0 : $startIndex)
            ->limit((is_bool($limitNum) || ($limitNum == 0)) ? $max_num : $limitNum)
            ->get();
        $sql = DB::getQueryLog();
        //error_log(print_r($sql, true), 3, "log_getLessonsAjax_sql.log");

        foreach ($lessons as $key => $lesson)
        {
            $lesson_data[$key]                 = $lesson;
            $lesson_data[$key]['t_id']         = $lesson->lesson_t_id;
            $lesson_data[$key]['t_name']       = $lesson->m_name;
            $lesson_data[$key]['t_nickname']   = $lesson->nickname;
            $lesson_data[$key]['t_avg_img']    = $lesson->avg_img;
            $lesson_data[$key]['buyers']       = Order::lessonBuyerOrderData($lesson->l_id)->count();
            $lesson_data[$key]['start_time']   = Unit::getEntityLessonFirstUnitStartTime($lesson->l_id) ?? $lesson->start_time;
            $lesson_data[$key]['end_time']     = Unit::getEntityLessonFirstUnitEndTime($lesson->l_id);
            $lesson_data[$key]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$key]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$key]['l_start_time'] = Unit::filter_first_time([$lesson->l_id])[0]->l_start_time ?? null;
            $lesson_data[$key]['l_end_time']   = Unit::filter_last_time([$lesson->l_id])[0]->l_end_time ?? null;

            if($m_id)   $order_data = Order::checkLessonBuyerOrderData($lesson->l_id, $m_id);

            if(empty($order_data)) {
                $lesson_data[$key]['orderDeadline'] = null;
                $lesson_data[$key]['owned'] = 0;
            }
            elseif($order_data['checkout_time']!='')
            {
                $lesson_data[$key]['orderDeadline'] = $order_data['deadline'];
                $lesson_data[$key]['restrict'] = $order_data['restrict'];

                if(!is_null($order_data['deadline'])) {
                    if(strtotime(Date('Y-m-d')) > strtotime($order_data['deadline']) ) {
                        $lesson_data[$key]['owned'] = 3;
                    }
                    else {
                        $lesson_data[$key]['owned'] = 2;
                    }
                }
                else {
                    $lesson_data[$key]['owned'] = 2;
                }
            }
            elseif(is_null($order_data['checkout_time']))
            {
                $lesson_data[$key]['orderDeadline'] = $order_data['deadline'];
                $lesson_data[$key]['restrict'] = $order_data['restrict'];
                $lesson_data[$key]['owned'] = 1;
            }

        }

        return $lesson_data;
    }

    public function getAreasAjax()
    {
        $area_data = $return_areas = array();

        $area_data = DB::table('lessons')
            ->selectRaw('LEFT(`location` , 3) AS area')
            ->groupBy('area')
            ->get();

        foreach ($area_data as $area_entry)
        {
            if(!is_null($area_entry->area)) $return_areas[] = $area_entry->area;
        }

        return $return_areas;
    }

    public function getTopicLabels()
    {
        $area_data = $return_areas = array();

        $area_data = DB::table('lessons')
            ->selectRaw('LEFT(`location` , 3) AS area')
            ->groupBy('area')
            ->get();

        foreach ($area_data as $area_entry)
        {
            if(!is_null($area_entry->area)) $return_areas[] = $area_entry->area;
        }

        return $return_areas;
    }

    public function getTeacherLessons($m_id, $t_id, $public_only)
    {
        // Get Public Lesson Data
        $lesson_data = array();

        //DB::enableQueryLog();
        $lessons     = self::select('lessons.l_id AS l_id', 'lessons.t_id', 'l_name', 'type', 'cover', 'start_time',
            'least_people', 'max_people', 'location', 'origin_fee', 'offer_fee', 'current_fee', 'end_fund',
            'lessons.deadline AS deadline', 'apply_situation', 'lessons.cancel_lesson', 'lessons.cancel_lesson_init',
            'members.m_name AS t_name', 'members.nickname AS t_nickname', 'members.avg_img AS t_avg_img');

        if($public_only==1 || !$m_id) {
            $lessons = $lessons->where('pub_situation', true);
        }

        if($t_id) {
            $lessons = $lessons->where('lessons.t_id', $t_id);
        }

        $lessons = $lessons->where('delete_lesson', false)
            ->leftjoin('teachers', 'lessons.t_id', 'teachers.t_id')
            ->leftjoin('members', 'members.m_id', 'teachers.m_id')
            ->orderBy('l_id', 'DESC')
            ->get();

        //$sql = DB::getQueryLog();
        //error_log(print_r($sql, true), 3, "log_getTeacherLessons_sql.log");

        foreach ($lessons as $lesson)
        {
            $lesson_data[$lesson->l_id]                 = $lesson;
            $lesson_data[$lesson->l_id]['buyers']       = Order::lessonBuyerOrderData($lesson->l_id)->count();
            $lesson_data[$lesson->l_id]['start_time']   = Unit::getEntityLessonFirstUnitStartTime($lesson->l_id) ?? $lesson->start_time;
            $lesson_data[$lesson->l_id]['end_time']     = Unit::getEntityLessonFirstUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['last_time']    = Unit::getEntityLessonLastUnitEndTime($lesson->l_id);
            $lesson_data[$lesson->l_id]['l_start_time'] = Unit::filter_first_time([$lesson->l_id])[0]->l_start_time ?? null;
            $lesson_data[$lesson->l_id]['l_end_time']   = Unit::filter_last_time([$lesson->l_id])[0]->l_end_time ?? null;

            if($m_id) {
                $order_data = Order::checkLessonBuyerOrderData($lesson->l_id, $m_id);
            }

            if(!empty($order_data))
            {
                $lesson_data[$lesson->l_id]['orderDeadline']= $order_data['deadline'];
                $lesson_data[$lesson->l_id]['orderPrice']   = $order_data['price'];
                $lesson_data[$lesson->l_id]['restrict']     = $order_data['restrict'];

                if($order_data['checkout_time']!='')
                {
                    if(!is_null($order_data['deadline']))
                    {
                        if(strtotime(Date('Y-m-d')) > strtotime($order_data['deadline']) ) {
                            $lesson_data[$lesson->l_id]['owned'] = 3;
                        }
                        else {
                            $lesson_data[$lesson->l_id]['owned'] = 2;
                        }
                    }
                    else {
                        $lesson_data[$lesson->l_id]['owned'] = 2;
                    }
                }
                elseif(is_null($order_data['checkout_time'])) {
                    $lesson_data[$lesson->l_id]['owned'] = 1;
                }
            }
            else
            {
                $lesson_data[$lesson->l_id]['orderDeadline']= null;
                $lesson_data[$lesson->l_id]['orderPrice']   = null;
                $lesson_data[$lesson->l_id]['restrict']     = null;
                $lesson_data[$lesson->l_id]['owned']        = 0;
            }
        }

        $my_lesson_data    = array();

        foreach ($lesson_data as $lesson_entry)
        {
            $my_lesson_data[] = $lesson_entry;
        }

        return $my_lesson_data;
    }

}
