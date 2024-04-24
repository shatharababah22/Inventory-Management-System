<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
 
    protected $except = [
        // 'api/register', // Adjust the route path as per your actual registration route
        // 'api/login',
        // // 'api/products/*',
        // // 'api/products/*/edit', 

        
    ];

    
}
