<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;


  
    class VerifyCsrfTokenForSanctum
    {
        public function handle(Request $request, Closure $next)
        {
            if ($request->route()->named('login')) {
                return $next($request);
            }
    
            if ($request->route()->named('password.confirm')) {
                return $next($request);
            }
    
            if (!$request->expectsJson()) {
                return response()->json(['message' => 'CSRF token mismatch'], 419);
            }
    
            return $next($request);
        }
    }
    

