<?php

namespace App\Http\Middleware;

use \Auth;
use Closure;

class Approve
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if (!Auth::check()) { \App::abort(404); }
        else if (!\App\Member::checkEmailVerify()) { session()->flash('verify', 'no'); }

        return $next($request);
    }
}
