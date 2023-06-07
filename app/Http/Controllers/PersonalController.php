<?php

namespace App\Http\Controllers;

use \Auth;
use Carbon\Carbon;
use Crypt;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Input;
use View;

class PersonalController extends Controller
{
    public function profile()
    {
        $nickname = Auth::user()->nickname;
        $m_name   = Auth::user()->m_name ?? '尚無暱稱';
        $id_code  = Auth::user()->id_code ? Crypt::decrypt(Auth::user()->id_code) : '';
        $member   = "$nickname ($m_name)";

        if (session()->has('auth')) { $this->member->checkTeacherDemand(); }

        return View::make('site.personal.profile')->with('title', "$member 的Profile")->with('identity_code', $id_code);;
    }

    public function memberPossessLessonOverviewPage()
    {
        // Get Possess Lesson Include Order Situation And Teacher Avatar
        $order_data = $this->order->getLessonNeedDataFromOrder();
        return View::make('site.personal.lesson.overview.layout')
                   ->with('order_data', $order_data)
                   ->with('expired', session()->get('expired', ''))
                   ->with('title', $this->member->user()->nickname . '的課程');
    }

    public function lesson_classroom($id)
    {
        $lesson_data = $this->lesson->find($id);

        if (($lesson_data != '') && is_numeric($id))
        {
            if ($lesson_data->pub_situation)
            {
                $is_teacher = $lesson_data->t_id == ($this->teacher->data()->t_id ?? null);
                $is_worker  = $this->member->isWorker();
                $pay        = $is_teacher ? true : $this->order->checkMemberHasPaid(Auth::user()->m_id, $id);

                if ($pay || $is_worker)
                {
                    //Check Order Has Lesson
                    $member_id     = $this->member->user()->m_id;
                    $has_order     = Auth::check() ? $this->order->checkOrderHasLesson($id) : '';
                    $restrict      = $this->order->checkOrderHasRestrict($member_id, $id);
                    $over_deadline = $this->order->checkOrderIsOverDeadline($member_id, $id);

                    if ($over_deadline)
                    {
                        session()->flash('expired', '<span class="color-emphasized2">' . $lesson_data->l_name . '</span> 的課程觀看期限已到期，可至課程商店續購課程');
                        return redirect('/profile/lesson/overview');
                    }
                    else if (!$restrict && !$is_teacher && !$is_worker) { return redirect('/profile/lesson/overview'); }
                    else
                    {
                        $teacher_data_for_lesson = $this->teacher->find($lesson_data->t_id);
                        $member_data_for_teacher = $this->member->find($teacher_data_for_lesson->m_id);
                        $unit_data               = $this->unit->getUnitData($id);
                        $media_type              = $this->unit->getMediaExtension($lesson_data->media);
                        $unit_num                = array_unique($this->unit->getUnitSortData($unit_data, 'u_id'));
                        $unit_name               = $this->unit->getUnitSortData($unit_data, 'u_name');
                        $title                   = $lesson_data->l_name;
                        $content                 = $this->lesson->getLessonDescriptionFile('json/' . $member_data_for_teacher->m_id . '_' . $member_data_for_teacher->account . '/' . $teacher_data_for_lesson->t_id . '_' . $lesson_data->l_id . '.json');
                        $classmate               = $this->order->getLessonClassmate($id);
                        $buy_people_num          = $this->order->lessonBuyerOrderData($id)->count();
                        $rank_data               = $this->rank->get_rank_data($id);
                        $coupon_data             = $this->coupon->getLessonCouponList($id);
                        $lesson_last_unit        = $this->unit->getEntityLessonLastUnitEndTime($id);
                        $lesson_start_time       = $lesson_data->start_time;
                        $rollcall_status         = session()->get('rollcall_status', null);

                        return View::make('site.personal.lesson.classroom.layout')
                          ->with('title', $title)
                          ->with('buy_people_num', $buy_people_num)
                          ->with('classmate', $classmate)
                          ->with('content', $content)
                          ->with('coupon_data', $coupon_data)
                          ->with('member_data_for_teacher', $member_data_for_teacher)
                          ->with('teacher_data_for_lesson', $teacher_data_for_lesson)
                          ->with('lesson_data', $lesson_data)
                          ->with('rank_data', $rank_data)
                          ->with('unit_data', $unit_data)
                          ->with('unit_num', $unit_num)
                          ->with('unit_name', $unit_name)
                          ->with('media_type', $media_type)
                          ->with('lesson_last_unit', $lesson_last_unit)
                          ->with('lesson_start_time', $lesson_start_time)
                          ->with('deadline', $this->order->where('m_id', Auth::user()->m_id)->where('l_id', $id)->latest()->first()->deadline ?? null)
                          ->with('rollcall_status', $rollcall_status);
                    }
                }
                else { \App::abort(404); }
            }
            else { \App::abort(404); }
        }
        else { \App::abort(404); }
    }

    public function modifyProfileData(Request $request)
    {
        // Get Current Member ID
        $m_id = Auth::user()->m_id;

        // Get Request Key And Value
        $keys   = array_keys($request->all());
        $values = array_values($request->all());

        // Send New Profile Data To Verify And Save
        $message = $this->member->updateProfileData($keys, $values, $m_id);
        return response()->json($message, $message ? 202 : 200);
    }

    public function message()
    {
        return View::make('site.personal.message.layout')
          ->with('title', $this->member->user()->account . ' 的訊息');
    }

    public function modify_avatar(Request $request)
    {
        if ($request->ava_hidden_crop_image != '')
        {
            $this->member->saveAvatarFile($this->member->user()->account . '_ava.jpeg', $request->ava_hidden_crop_image);
            return redirect('/profile/detail');
        }
        else
        {
            return 'QQ';
        }
    }

    public function order()
    {
        $this->order->checkOrderCancel();
        $this->order->checkOrderExpire();
        $order_data = $this->order->getMemberAllOrder();
        return View::make('site.personal.order.layout')
                   ->with('title', Auth::user()->account . ' 的訂單')
                   ->with('order_data', $order_data);
    }

    public function favorite()
    {
        return View::make('site.personal.favorite.layout')->with('title', '我的收藏');
    }

    public function personalWishPage()
    {
        return View::make('site.personal.wish.layout')->with('title', $this->member->user()->nickname . ' 的願望');
    }

    public function rollcall($l_hash, $u_hash)
    {
        $m_id = Auth::user()->m_id;
        $l_id = (int) ceil(pow(hexdec($l_hash) - 48763, 1 / 3));
        $u_id = (int) ceil(pow(hexdec($u_hash) - 9487, 1 / 3));
        $status = $this->rollcall->check($m_id, $l_id, $u_id);

        if ($status == '無此課程') { return redirect('/404'); }
        else if ($status == 'ok') { $status = '於 ' . $this->rollcall->saveRollcall($m_id, $l_id, $u_id) . ' 點名完成'; }

        session()->flash('rollcall_status', $status);
        return redirect('/#/profile/lesson/classroom/' . $l_id . '#rollcall');
    }

    public function rollcallReportPage()
    {
        return View::make('site.personal.rollcall-report')->with('title', '我的出席');
    }
}
