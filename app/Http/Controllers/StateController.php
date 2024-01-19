<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginModel;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class StateController extends Controller
{
    protected $admin;

    public function __construct(LoginModel $admin)
    {
        $this->admin = $admin;

        if (Session::has('admin') && Session::get('admin.username')) {
            // Set the admin property
            $this->admin = Session::get('admin');
        } else {
            return redirect('login');
        }
    }

    public function index()
    {
        $page_data['page_name'] = 'admin/state/state';
        $page_data['pgScript'] = 'state/state';
        $page_data['page_title'] = 'state';
        $page_data['name']		 = 'state';
        return view('main', $page_data);
    }
    public function getState(){
        $data = $this->admin->getState();
        echo json_encode($data);
    }

    public function addState(Request $request)
    {
        $page_data['page_name'] = 'admin/state/stateAdd';
        $page_data['country_data'] = $this->admin->countryList();
        $page_data['pgScript'] = 'state/state';
        $page_data['page_title'] = 'State';
        $page_data['name']		 = 'state';
        if ($request->isMethod('post')) {
            $post = [
                'country_name' => $request->input('country_name'),
                'state_name' => $request->input('state_name'),
                'state_short_name' => $request->input('state_short_name'),
                'state_code' => $request->input('state_code'),
            ];
            $validator = Validator::make($post, [
                'country_name' => 'required',
                'state_name' => 'required',
            ]);

            if ($validator->fails()) {
                return view('main', $page_data);
            } else {
                $data = $this->admin->addData($post,$table='state');
                // Session::flash('msg', 'State added successfully.');
                echo json_encode($data);
            }
        }else{
            return view('main', $page_data);
        }
    }

    public function updateState(Request $request,$id)
    {
        $page_data['state_data']= $this->admin->editData($id,$table='state');
        $page_data['country_data'] = $this->admin->countryList();
        $page_data['page_name'] = 'admin/state/stateUpdate';
        $page_data['pgScript'] = 'state/state';
        $page_data['page_title'] = 'State';
        $page_data['name']		 = 'state';
        if ($request->isMethod('put')) {
            $post = [
                'country_name' => $request->input('country_name'),
                'state_name' => $request->input('state_name'),
                'state_short_name' => $request->input('state_short_name'),
                'state_code' => $request->input('state_code'),
            ];
            $validator = Validator::make($post, [
                'country_name' => 'required',
                'state_name' => 'required',
            ]);

            if ($validator->fails()) {
                return view('main', $page_data);
            } else {
                $this->admin->updateData($id,$post,$table='state');
                Session::flash('msg', 'State updated successfully.');
                return redirect('state');
            }
        }else{
            return view('main', $page_data);
        }
    }

    public function deleteState(Request $request)
    {
        $id = $request->input('id');
    
        $result = $this->admin->deleteData($id, $table='state');
    
        if ($result['success']) {
            Session::flash('msg', 'State deleted successfully.');
        }
    
        return response()->json($result);
    }
    
}
