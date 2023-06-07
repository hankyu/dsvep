<?php

namespace App\Http\Controllers;

use \Auth;
use App\Browse;
use App\Click;
use App\Coupon;
use App\Event;
use App\Favorite;
use App\Goal;
use App\Imgur;
use App\Lesson;
use App\Main;
use App\Member;
use App\Order;
use App\Qa;
use App\Rank;
use App\Rollcall;
use App\Search;
use App\Shorturl;
use App\Teacher;
use App\Topic;
use App\Unit;
use App\Wish;
use App\WishCategory;
use Illuminate\Http\Request;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use View;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $this->middleware(function ($request, $next)
        {
            //Initial Model Parameter
            $this->browse       = new Browse();
            $this->click        = new Click();
            $this->coupon       = new Coupon();
            $this->event        = new Event();
            $this->favorite     = new Favorite();
            $this->goal         = new Goal();
            $this->imgur        = new Imgur();
            $this->lesson       = new Lesson();
            $this->main         = new Main();
            $this->member       = new Member();
            $this->order        = new Order();
            $this->qa           = new Qa();
            $this->rank         = new Rank();
            $this->rollcall     = new Rollcall();
            $this->search       = new Search();
            $this->shorturl     = new Shorturl();
            $this->teacher      = new Teacher();
            $this->topic        = new Topic();
            $this->unit         = new Unit();
            $this->wish         = new Wish();
            $this->wishCategory = new WishCategory();
            View::share('member_data', $this->member->user());
            View::share('verify_result', session()->get('verify_result', ''));
            View::share('oauth_register', session()->get('oauth_register', ''));
            View::share('url', session()->get('previous_url', ''));

            if (!Auth::check()) { View::share('avatar', 'avatar-vistor.png'); }
            else
            {
                View::share('avatar', $this->member->user()->avg_img ?? 'avatar-vistor.png');
                View::share('verify', !$this->member->user()->email_verify ? 'no' : 'yes');
                View::share('teacher_data', $this->teacher->data());
            }

            return $next($request);
        });
    }
}
