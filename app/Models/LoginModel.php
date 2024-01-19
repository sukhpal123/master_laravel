<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class LoginModel extends Model
{
    use HasFactory;

    // Define the table associated with the model
    protected $table = 'login';

    // Login functions
    public function checkLogin($username, $password)
    {
        $result = DB::table($this->table)
            ->where('username', $username)
            ->where('password', $password)
            ->first();
        if ($result) {
            $data = [
                'lastlogin' => 0,
            ];

            Session::put('admin_login', 1);
            Session::put('admin', $result);

            return true;
        } else {
            return false;
        }
    }

    /************** To get list of country */

	public function get_country(){
		
		$q = "SELECT country.* FROM country order by country.id ASC" ;
		$query = DB::select($q);
        return $query;
	}

    /************* To insert new country into database */

	function addCountry($post)
	{
		$post['created_on'] = now(); // Use Laravel's now() helper function
        $countryId = DB::table('country')->insertGetId($post);
        return $countryId;
	}

    /************ To get country data****************/
	function editCountry($id)
	{	
        $country = DB::table('country')->where('id', $id)->first();
        return $country;
	}

    /****************To update data into Country database */

	function updateCountry($id,$post){
		$affectedRows = DB::table('country')
            ->where('id', $id)
            ->update($post);

        return $affectedRows > 0;
	}

    /************** To delete particular Country ******/

	function deleteCountry($id){
		DB::table('country')->where('id', $id)->delete();

        return true;
	}

    /************** To get list of state */

	function getState()
    {
        $draw = intval(request()->input("draw"));
        $start = intval(request()->input("start"));
        $length = intval(request()->input("length"));
        $i = 1;
        $output = [];

        $exp = DB::table('state as st')
            ->join('country as cn', 'cn.id', '=', 'st.country_name')
            ->orderBy('st.id', 'ASC')
            ->select('st.*', 'cn.country_name')
            ->get();


        foreach ($exp as $row) {
            $actionButton = '
            <ul class="list-inline">  
                <li class="list-inline-item"><a class="btn text-info btn-xs" role="button"
                    href="' . route('editState', ['id' => $row->id]) . '"> <span class="fa-regular fa-pen-to-square"></span></a></li>
                <li class="list-inline-item d-print-none"><a class="btn text-red btn-xs" role="button" id="delete_state" data-id="'.$row->id.'" data-toggle="tooltip" title="Delete State"> <span class="fa-regular fa-trash-can"></span></a></li>                                
            </ul>';

            $output[] = array(
                $i++, 
                ucwords($row->country_name),
                ucwords($row->state_name),
                $row->state_short_name,  
                $row->state_code,     
                $actionButton
            ); 
        } 

        $result = array(
            "draw" => $draw,
              "recordsTotal" => count($exp),
              "recordsFiltered" => count($exp),
              "data" => $output
         );
     return $result; 
    }

    function countryList(){
        $q = "SELECT id,country_name FROM country order by country.id ASC" ;
		$query = DB::select($q);
        return $query;
	}

    /************* To insert new country into database */

	function addData($post,$table)
	{
		$post['created_on'] = now(); // Use Laravel's now() helper function
        $insertId = DB::table($table)->insertGetId($post);
        if($insertId){
            $output['success'] = true;
            $output['messages'] = 'Successfully added!';  
        }
        else{
            $output['success'] = false;
            $output['messages'] = 'Ooops! something went wrong';
        }
        return $output;
	}

    /************ To get country data****************/
	function editData($id,$table)
	{	
        $data = DB::table($table)->where('id', $id)->first();
        return $data;
	}

    /****************To update data into Country database */

	function updateData($id,$post,$table){
		$affectedRows = DB::table($table)
            ->where('id', $id)
            ->update($post);

        if($affectedRows){
            $output['success'] = true;
            $output['messages'] = 'Successfully updated!';  
        }
        else{
            $output['success'] = false;
            $output['messages'] = 'Ooops! something went wrong';
        }
            return $output;
	}

    /************** To delete particular Country ******/

	function deleteData($id,$table){
		$result = DB::table($table)->where('id', $id)->delete();
        if($result){
            $output['success'] = true;
            $output['messages'] = 'Successfully Removed Data';
        }else{
            $output['success'] = false;
            $output['messages'] = 'Error while removing Data!';
        }
        return($output);
	}

    /************** To get list of state */

	function getCity()
    {
        $draw = intval(request()->input("draw"));
        $start = intval(request()->input("start"));
        $length = intval(request()->input("length"));
        $i = 1;
        $output = [];

        $exp = DB::table('city as ct')
            ->join('country as cn', 'cn.id', '=', 'ct.country_name')
            ->join('state as st', 'st.id', '=', 'ct.state_name')
            ->orderBy('ct.id', 'ASC')
            ->select('ct.*', 'cn.country_name', 'st.state_name')
            ->get();

        foreach ($exp as $row) {
            $actionButton = '
            <ul class="list-inline">  
                <li class="list-inline-item"><a class="btn text-info btn-xs" role="button"
                    href="' . route('editCity', ['id' => $row->id]) . '"> <span class="fa-regular fa-pen-to-square"></span></a></li>
                <li class="list-inline-item d-print-none"><a class="btn text-red btn-xs" role="button" id="delete_city" data-id="'.$row->id.'" data-toggle="tooltip" title="Delete City"> <span class="fa-regular fa-trash-can"></span></a></li>                                
            </ul>';

            $output[] = array(
                $i++, 
                ucwords($row->country_name),
                ucwords($row->state_name),
                ucwords($row->city_name),
                $row->city_short_name,  
                $row->city_code,     
                $actionButton
            ); 
        } 

        $result = array(
            "draw" => $draw,
              "recordsTotal" => count($exp),
              "recordsFiltered" => count($exp),
              "data" => $output
         );
     return $result; 
    }

    public function getStateList($id)
    {
        $q = "SELECT id, state_name FROM state WHERE country_name = '$id' ORDER BY state.id ASC";
        $query = DB::select($q);
        return $query;
    }

    public function getCityList($id)
    {
        $q = "SELECT id, city_name FROM city WHERE state_name = '$id' ORDER BY city.id ASC";
        $query = DB::select($q);
        return $query;
    }

        /************* To insert new country into database */

	function addCity($post,$table)
	{
		$post['created_on'] = now(); 
        $verify = DB::table($table)->where('city_name', $post['city_name'])->exists();

        if ($verify) {
            $output['success'] = false;
            $output['messages'] = 'City name already exist!'; 
        }else{
            $insertId = DB::table($table)->insertGetId($post);
            if($insertId){
                $output['success'] = true;
                $output['messages'] = 'Successfully added!';  
            }
            else{
                $output['success'] = false;
                $output['messages'] = 'Ooops! something went wrong';
            }
        }
        
        return $output;
	}

    /************** To get list of Location */

	function getLocation()
    {
        $draw = intval(request()->input("draw"));
        $start = intval(request()->input("start"));
        $length = intval(request()->input("length"));
        $i = 1;
        $output = [];

        $exp = DB::table('location as loc')
            ->join('country as cn', 'cn.id', '=', 'loc.country_name')
            ->join('state as st', 'st.id', '=', 'loc.state_name')
            ->join('city as ct', 'ct.id', '=', 'loc.city_name')
            ->orderBy('loc.id', 'ASC')
            ->select('loc.*', 'cn.country_name', 'st.state_name','ct.city_name')
            ->get();

        foreach ($exp as $row) {
            $actionButton = '
            <ul class="list-inline">  
                <li class="list-inline-item"><a class="btn text-info btn-xs" role="button"
                    href="' . route('editLocation', ['id' => $row->id]) . '"> <span class="fa-regular fa-pen-to-square"></span></a></li>
                <li class="list-inline-item d-print-none"><a class="btn text-red btn-xs" role="button" id="delete_location" data-id="'.$row->id.'" data-toggle="tooltip" title="Delete Location"> <span class="fa-regular fa-trash-can"></span></a></li>                                
            </ul>';

            $output[] = array(
                $i++, 
                ucwords($row->country_name),
                ucwords($row->state_name),
                ucwords($row->city_name),
                ucwords($row->location_name),
                $row->location_short_name,  
                $row->location_code,     
                $actionButton
            ); 
        } 

        $result = array(
            "draw" => $draw,
              "recordsTotal" => count($exp),
              "recordsFiltered" => count($exp),
              "data" => $output
         );
     return $result; 
    }
}
