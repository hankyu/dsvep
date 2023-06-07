<?php

namespace App\Http\Middleware;

use \Auth;
use Closure;

class ManageDataAuthority
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
        if (!\App\Member::isMasterAdmin()) { \App::abort(404); }

        return $next($request);
    }
}
