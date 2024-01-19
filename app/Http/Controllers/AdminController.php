<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginModel; 
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    protected $admin;

    public function __construct(LoginModel $admin)
    {
        $this->admin = $admin;
    }

    public function index(Request $request)
    {
        // Check if the form is submitted
        if ($request->isMethod('post')) {
            $credentials = $request->only('username', 'password');
            
            // Validate the request
            $request->validate([
                'username' => 'required',
                'password' => 'required',
            ]);

            // Call the checkLogin function
            $result = $this->checkLogin($credentials['password'], $credentials['username']);
            if ($result) {
    
                // Authentication passed
                 return redirect('country');
            } else {
                // Authentication failed
                return redirect('login')->with('error', 'Username or password is wrong.');
            }
        } else {
            // If no form submission, redirect to the login page
            return view('login');
        }
    }

    public function checkLogin($password, $username)
    {
        if($this->admin->checkLogin($username,$password)){		
			return true;
		}else{
			return false;
		}
    }  

    public function logout()
    {
        // Log out the user
        Auth::logout();

        // Clear specific session data
        Session::forget('admin_login');
        Session::forget('admin');

        // Redirect to the login page
        return redirect('login');
    }
}
