<?php

namespace App\Http\Controllers;

use View;
use Illuminate\Http\Request;

class ApprovalController extends Controller
{
    public function lessonApprovalManagePage()
    {
        if ($this->member->authority() >= 2)
        {
            return View::make('site.approval.layout')->with('title', '課程報名管理系統');
        }
        else { \App::abort(404); }
    }

    public function expireLessonApprovalManagePage()
    {
        if ($this->member->authority() >= 2)
        {
            return View::make('site.approval.expire.layout')->with('title', '課程報名管理系統(已下架)');
        }
        else { \App::abort(404); }
    }
}
