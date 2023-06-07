<?php

namespace App\Http\Middleware;

use \Auth;
use \App\Member;
use Closure;

class AuthorityPlatform
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
        else
        {
            if (Member::isBasicAdmin() || Member::isMasterAdmin())
            {
                if (session()->has('admin_auth') == false) { \App::abort(404); }
            }
            else { \App::abort(404); }
        }
        return $next($request);
    }
}
