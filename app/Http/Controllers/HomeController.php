<?php

namespace App\Http\Controllers;

use \Auth;
use Crypt;
use View;

class HomeController extends Controller
{
    public function aboutUsPage()
    {
        return View::make('site.contact.about')->with('title', '關於大俠學習');
    }

    public function announcementPage()
    {
        return View::make('site.contact.announcement')->with('title', '關於大俠學習');
    }

    public function index()
    {
        header('Expires: Mon, 26 Jul 1990 05:00:00 GMT');
        header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
        header('Cache-Control: no-store, no-cache, must-revalidate');
        header('Cache-Control: post-check=0, pre-check=0', false);
        header('Pragma: no-cache');
        return View::make('site.index');
    }

    public function becomeTeacherIntroducePage()
    {
        return View::make('site.teacher.becometeacher.becometeacher-intro')->with('title', '成為講師介紹');
    }

    public function applyBecomeTeacherPage()
    {
        if (Auth::check())
        {
            $teacher_data = $this->teacher->data();

            if (!is_null($teacher_data))
            {
                if ($teacher_data->auth_situation != 'success')
                {
                    $teacher_intro = array();
                    $res_item      =
                    [
                        'intro_exp', 'works_exp', 'book_exp', 'certificate_exp', 'awards_exp',
                        'repo_exp', 'pub_exp', 'teach_type', 'teach_exp'
                    ];

                    $teacher_item  =
                    [
                        't_id', 'edu_school', 'edu_dapartment', 'edu_degree', 'intro_link',
                        'works_link', 'book_link', 'cerificate_link', 'awards_link', 'repo_link',
                        'pub_link', 'auth_situation', 'audit_reason'
                    ];

                    foreach ($res_item as $value) { $teacher_intro[$value] = $this->main->removeBrString($teacher_data[$value]); }

                    foreach ($teacher_item as $value) { $teacher_intro[$value] = $teacher_data[$value]; }

                    return View::make('site.teacher.becometeacher.becometeacher')
                               ->with('title', '成為講師')
                               ->with('teacher_data', $teacher_intro);
                }
                else { return redirect('/teacher/' . $teacher_data->t_id); }
            }
            else
            {
                if (!$this->member->checkTeacherDemand()) { return redirect('/profile/detail'); }
                else { return View::make('site.teacher.becometeacher.becometeacher')->with('title', '成為講師'); }
            }
        }
        else
        {
            return View::make('site.teacher.becometeacher.becometeacher')->with('title', '成為講師');
        }
    }

    public function allPublicLessonPage()
    {
        return View::make('site.all-lesson.layout')->with('title', '所有課程');
    }

    public function verifyEmail($code)
    {
        if (is_null($this->member->where('email_verify_code', $code)->first())) { $message = '驗證碼有誤，請確認信箱是否有收到最新的驗證信'; }
        else
        {
            $this->member->verifyEmailSuccess($code);
            $message = '認證成功';
        }

        session()->flash('verify_result', $message);
        return redirect('/');
    }

    public function termsOfServicePage()
    {
        return View::make('site.contact.terms')->with('title', '服務條款與隱私政策');
    }

    public function webUseTutorialPage()
    {
        return View::make('site.tutorial.index')->with('title', '網站使用教學手冊');
    }

    public function loginPage()
    {
        if (Auth::check()) { return redirect('/'); }
        else { return View::make('site.login')->with('title', '登入頁面'); }
    }

    public function shorturl($shorturl)
    {
        $url = $this->shorturl->search($shorturl);

        if ($url) { return redirect($url); }
        else { \App::abort(404); }
    }
}
