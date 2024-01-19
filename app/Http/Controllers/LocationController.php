<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginModel;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class LocationController extends Controller
{
    protected $admin;

    public function __construct(LoginModel $admin)
    {
        $this->admin = $admin;
        // if (Session::has('admin') && Session::get('admin.username')) {
        //     $this->admin = Session::get('admin');
        // } else {
        //     return redirect('login');
        // }
    }

    public function index()
    {
        $page_data['page_name'] = 'admin/location/location';
        $page_data['page_title'] = 'location';
        $page_data['name']		 = 'location';
        $page_data['pgScript'] = 'location/location';
        return view('main', $page_data);
    }

    public function getLocation(){
        $data = $this->admin->getLocation();
        echo json_encode($data);
    }

    public function addLocation(Request $request){
        $page_data['page_name'] = 'admin/location/locationAdd';
        $page_data['page_title'] = 'location';
        $page_data['name']		 = 'location';
        $page_data['pgScript'] = 'location/location';
        $page_data['country_data'] = $this->admin->countryList();

        if($request->isMethod('post')){
            $post=[
                'country_name' => $request->input('country_name'),
                'state_name' => $request->input('state_name'),
                'city_name' => $request->input('city_name'),
                'location_name' => $request->input('location_name'),
                'location_short_name' => $request->input('location_short_name'),
                'location_code' => $request->input('location_code'),
            ];
            $validator = Validator :: make($post,[
                'country_name' => 'required',
                'state_name' => 'required',
                'city_name' => 'required',
                'location_name' => 'required',
            ]);
            if($validator -> fails()){
                return view('main', $page_data);
            }else{
                $data = $this->admin->addData($post,$table='location');
                echo json_encode($data);
            }
        }
        else{
            return view('main', $page_data);
        }
    }

    public function updateLocation(Request $request,$id)
    {
        $page_data['location_data']= $this->admin->editData($id,$table='location');
        $page_data['page_name'] = 'admin/location/locationUpdate';
        $page_data['page_title'] = 'location';
        $page_data['name']		 = 'location';
        $page_data['pgScript'] = 'location/location';
        $page_data['country_data'] = $this->admin->countryList();
        // $page_data['cid'] = $id;
        // echo json_encode($page_data);
        if ($request->isMethod('put')) {
            $post=[
                'country_name' => $request->input('country_name'),
                'state_name' => $request->input('state_name'),
                'city_name' => $request->input('city_name'),
                'location_name' => $request->input('location_name'),
                'location_short_name' => $request->input('location_short_name'),
                'location_code' => $request->input('location_code'),
            ];
            $validator = Validator :: make($post,[
                'country_name' => 'required',
                'state_name' => 'required',
                'city_name' => 'required',
                'location_name' => 'required',
            ]);

            if ($validator->fails()) {
                return view('main', $page_data);
            } else {
                $data = $this->admin->updateData($id,$post,$table='location');
                echo json_encode($data);
            }
        }else{
            return view('main', $page_data);
        }
    }

    public function getStateList(Request $request)
    {
        $id = $request->query('id');
        $data = $this->admin->getStateList($id);
        return response()->json($data);
    }

    public function getCityList(Request $request)
    {
        $id = $request->query('id');
        $data = $this->admin->getCityList($id);
        return response()->json($data);
    }

    public function editData(Request $request)
    {
        $id = $request->get('id');
        $data = $this->admin->editData($id,$table='location');
        return response()->json($data);
    }

    public function deleteLocation(Request $request)
    {
        $id = $request->input('id');
    
        $result = $this->admin->deleteData($id, $table='location');
    
        if ($result['success']) {
            Session::flash('msg', 'Location deleted successfully.');
        }
    
        return response()->json($result);
    }
}
