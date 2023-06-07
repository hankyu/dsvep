<?php

namespace App\Http\Controllers;

use Crypt;
use Illuminate\Http\Request;
use View;

class AdminController extends Controller
{
    public function adminAccountingPage()
    {
        return View::make('admin.accounting.layout')->with('title', '會計系統');
    }

    public function auditLessonPage()
    {
        return View::make('admin.audit.lesson.overview')->with('title', '審核課程');
    }

    public function auditLessonPreviewPage($id)
    {
        $lesson_data    = $this->lesson->find($id);
        $l_teacher_data = $this->teacher->find($lesson_data->t_id);
        $l_member_data  = $this->member->find($l_teacher_data->m_id);
        $unit_data      = $this->unit->getUnitData($id);
        $media_type     = $this->unit->getMediaExtension($lesson_data->media);
        $unit_num       = array_unique($this->unit->getUnitSortData($unit_data, 'u_id'));
        $unit_name      = $this->unit->getUnitSortData($unit_data, 'u_name');
        $condition_data = $this->goal->getLessonGoalData($id, 'condition');
        $suit_data      = $this->goal->getLessonGoalData($id, 'suit');
        $learn_data     = $this->goal->getLessonGoalData($id, 'learn');
        return View::make('admin.audit.lesson.preview.layout')
                   ->with('title', $lesson_data->l_name . ' 的預覽畫面')
                   ->with('lesson_data', $lesson_data)
                   ->with('unit_data', $unit_data)
                   ->with('unit_num', $unit_num)
                   ->with('unit_name', $unit_name)
                   ->with('condition_data', $condition_data)
                   ->with('suit_data', $suit_data)
                   ->with('learn_data', $learn_data)
                   ->with('media_type', $media_type)
                   ->with('l_teacher_data', $l_teacher_data)
                   ->with('l_member_data', $l_member_data);
    }

    public function auditTeacherPage()
    {
        return View::make('admin.audit.teacher.overview')->with('title', '審核講師');
    }

    public function browseOverviewPage()
    {
        return View::make('admin.statistic.browse.overview')->with('title', '瀏覽歷程列表');
    }

    public function browseAnalyzePage()
    {
        return View::make('admin.statistic.browse_analyze.overview')->with('title', '瀏覽歷程列表');
    }

    public function clickAnalyzePage()
    {
        return View::make('admin.statistic.click_analyze.overview')->with('title', '項目點擊歷程列表');
    }

    public function clickOverviewPage()
    {
        return View::make('admin.statistic.click.overview')->with('title', '瀏覽歷程列表');
    }

    public function eventOverviewPage()
    {
        return View::make('admin.event.overview')->with('title', '活動管理');
    }

    public function topicOverviewPage()
    {
        return View::make('admin.topic.overview')->with('title', '分類管理');
    }

    public function exitAdmin()
    {
        // Check Click 離開 Button, If Session Exist Will Be Delete
        if (session()->has('admin_auth')) { session()->forget('admin_auth'); }

        return redirect('/');
    }

    public function index()
    {
        return View::make('admin.index')->with('title', '管理頁面');
    }

    public function memberOverviewPage()
    {
        return View::make('admin.member.overview')->with('title', '會員總覽');
    }

    public function lessonDataManagePage()
    {
        return View::make('admin.sql.lesson.overview')->with('title', '課程資料庫資料');
    }

    public function memberDataManagePage()
    {
        return View::make('admin.sql.member.overview')->with('title', '會員資料庫資料');
    }

    public function orderDataManagePage()
    {
        return View::make('admin.sql.order.overview')->with('title', '訂單資料庫資料');
    }

    public function wishListPage()
    {
        return View::make('admin.wish.overview')->with('title', '願望清單');
    }

    public function rollcall_report()
    {
        return View::make('admin.rollcall.overview')->with('title', '出席管理');
    }
}
