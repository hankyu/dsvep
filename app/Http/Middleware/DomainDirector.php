<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class DomainDirector
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
        $url = url()->current();

        if (env('APP_ENV') == 'production')
        {
            if (!Str::startsWith($url, 'https://'))
            {
                $domain = $_SERVER['HTTP_HOST'];
                return redirect("https://$domain");
            }
        }
        return $next($request);
    }
}
