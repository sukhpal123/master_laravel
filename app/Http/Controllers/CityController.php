<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginModel;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\Validator;

class CityController extends Controller
{
    protected $admin;

    public function __construct(LoginModel $admin)
    {
        $this->admin = $admin;
        if (Session::has('admin') && Session::get('admin.username')) {
            $this->admin = Session::get('admin');
        } else {
            return redirect('login');
        }
    }

    public function index()
    {
        $page_data['page_name'] = 'admin/city/city';
        $page_data['pgScript'] = 'city/city';
        $page_data['page_title'] = 'city';
        $page_data['name']		 = 'city';
        return view('main', $page_data);
    }

    public function getCity(){
        $data = $this->admin->getCity();
        echo json_encode($data);
    }

    public function addCity(Request $request){
        $page_data['page_name'] = 'admin/city/cityAdd';
        $page_data['pgScript'] = 'city/city';
        $page_data['page_title'] = 'city';
        $page_data['name']		 = 'city';
        $page_data['country_data'] = $this->admin->countryList();

        if($request->isMethod('post')){
            $post=[
                'country_name' => $request->input('country_name'),
                'state_name' => $request->input('state_name'),
                'city_name' => $request->input('city_name'),
                'city_short_name' => $request->input('city_short_name'),
                'city_code' => $request->input('city_code'),
            ];
            $validator = Validator :: make($post,[
                'country_name' => 'required',
                'state_name' => 'required',
                'city_name' => 'required',
            ]);
            if($validator -> fails()){
                return view('main', $page_data);
            }else{
                $data = $this->admin->addCity($post,$table='city');
                echo json_encode($data);
            }
        }
        else{
            return view('main', $page_data);
        }
    }

    public function updateCity(Request $request,$id)
    {
        $page_data['city_data']= $this->admin->editData($id,$table='city');
        $page_data['page_name'] = 'admin/city/cityUpdate';
        $page_data['pgScript'] = 'city/city';
        $page_data['page_title'] = 'city';
        $page_data['name']		 = 'city';
        $page_data['country_data'] = $this->admin->countryList();
        // $page_data['cid'] = $id;
        // echo json_encode($page_data);
        if ($request->isMethod('put')) {
            $post = [
                'country_name' => $request->input('country_name'),
                'state_name' => $request->input('state_name'),
                'city_name' => $request->input('city_name'),
                'city_short_name' => $request->input('city_short_name'),
                'city_code' => $request->input('city_code'),
            ];
            $validator = Validator::make($post, [
                'country_name' => 'required',
                'state_name' => 'required',
            ]);

            if ($validator->fails()) {
                return view('main', $page_data);
            } else {
                $data = $this->admin->updateData($id,$post,$table='city');
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

    public function editData(Request $request)
    {
        $id = $request->get('id');
        $data = $this->admin->editData($id,$table='city');
        return response()->json($data);
    }

    public function deleteCity(Request $request)
    {
        $id = $request->input('id');
    
        $result = $this->admin->deleteData($id, $table='city');
    
        if ($result['success']) {
            Session::flash('msg', 'City deleted successfully.');
        }
    
        return response()->json($result);
    }
}
