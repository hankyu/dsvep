<?php

namespace App\Http\Controllers;

use View;
use Illuminate\Http\Request;

class WorkerController extends Controller
{
    public function create()
    {
        if (!$this->member->isWorker()) { \App::abort(404); }
        else
        {
            return View::make('site.worker.create')
              ->with('title', '創建課程');
        }
    }

    public function rollcall_report()
    {
        if (!$this->member->isWorker()) { \App::abort(404); }
        else
        {
            return View::make('site.worker.rollcall-report')
                       ->with('title', '點名管理');
        }
    }
}
