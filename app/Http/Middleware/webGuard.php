<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session; 

class webGuard
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if (Session::has('admin')) {
            $adminData = Session::get('admin');

            // Check if 'username' property exists and is not empty
            if (isset($adminData->username) && !empty($adminData->username)) {
                // 'admin' session and 'username' property are set
                return $next($request);
            }
        } else {
            return redirect('login');
        }
    }
}
