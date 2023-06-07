<?php

namespace App\Http\Middleware;

use Closure;

class SaveBrowseRecord
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
        \App\Browse::save_browse($request);
        return $next($request);
    }
}
