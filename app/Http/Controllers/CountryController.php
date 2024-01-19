<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginModel; // Assuming your model is named LoginModel
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class CountryController extends Controller
{
    protected $admin;

    public function __construct(LoginModel $admin)
    {
        $this->admin = $admin;
        if (Session::has('admin') && Session::get('admin.username')) {
            // Set the admin and validator properties
            $this->admin = Session::get('admin');
            $this->validator = app('validator'); // Access Validator through app() function
            return $next($request);
        } else {
            return redirect('login');
        }
    }

    public function index()
    {
        $page_data['country_list'] = $this->admin->get_country();
        $page_data['page_name'] = 'admin/country/country';
        $page_data['pgScript'] = 'country/country';
		$page_data['page_title'] = 'Country';
		$page_data['name']		 = 'country';

        return view('main', $page_data);
    }

    public function addCountry(Request $request)
    {
        $page_data['page_name'] = 'admin/country/countryAdd';
        $page_data['pgScript'] = 'country/country';
        $page_data['page_title'] = 'Country';
        $page_data['name']		 = 'country';
        if ($request->isMethod('post')) {
            $post = [
                'country_name' => $request->input('countryname'),
                'country_short_name' => $request->input('countryshort'),
                'country_code' => $request->input('countrycode'),
            ];
            $validator = Validator::make($post, [
                'country_name' => 'required',
            ]);

            if ($validator->fails()) {
                return view('main', $page_data);
            } else {
                $this->admin->addCountry($post);
                Session::flash('msg', 'Country added successfully.');
                return redirect('country');
            }
        }else{
            return view('main', $page_data);
        }
    }

    public function updateCountry(Request $request,$id)
    {
        $page_data['country']= $this->admin->editCountry($id);
        $page_data['page_name'] = 'admin/country/countryUpdate';
        $page_data['pgScript'] = 'country/country';
        $page_data['page_title'] = 'Country';
        $page_data['name']		 = 'country';
        if ($request->isMethod('put')) {
            $post = [
                'country_name' => $request->input('country_name'),
                'country_short_name' => $request->input('country_short_name'),
                'country_code' => $request->input('country_code'),
            ];
            $validator = Validator::make($post, [
                'country_name' => 'required',
            ]);

            if ($validator->fails()) {
                return view('main', $page_data);
            } else {
                $this->admin->updateCountry($id,$post);
                Session::flash('msg', 'Country updated successfully.');
                return redirect('country');
            }
        }else{
            return view('main', $page_data);
        }
    }

    public function deleteCountry($id)
    {
        $this->admin->deleteCountry($id);
    
        Session::flash('msg', 'Country deleted successfully.');
    
        return redirect('country');
    }
}
