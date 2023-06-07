<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        '/verify/{id}',
        '/order/checkOrderCancel',
        '/order/notify',
        '/order/customer',
        '/order/clientBACK',
        '/lesson/checkAllLessonsSave',
        '/lesson/checkAllTeachersSave'
    ];
}
