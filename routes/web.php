<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\StateController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\LocationController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('login');
});
Route::get('/login', function () {
    return view('login');
});
Route::post('/signin', [AdminController::class, 'index'])->name('signin');
Route::get('/addCountry', [CountryController::class, 'addCountry'])->name('addCountry');
Route::post('/addCountry', [CountryController::class, 'addCountry'])->name('addCountry');
Route::get('/editCountry/{id}/edit', [CountryController::class, 'updateCountry'])->name('editCountry');
Route::put('/updateCountry/{id}', [CountryController::class, 'updateCountry'])->name('updateCountry');
Route::get('/deleteCountry/{id}', [CountryController::class, 'deleteCountry'])->name('deleteCountry');
Route::get('/dtState', [StateController::class, 'getState'])->name('dtState');
Route::get('/addState', [StateController::class, 'addState'])->name('addState');
Route::post('/addState', [StateController::class, 'addState'])->name('addState');
Route::get('/editState/{id}/edit', [StateController::class, 'updateState'])->name('editState');
Route::put('/updateState/{id}', [StateController::class, 'updateState'])->name('updateState');
Route::get('/deleteState', [StateController::class, 'deleteState'])->name('deleteState');
Route::get('/getStateList', [CityController::class, 'getStateList'])->name('getStateList');
Route::get('/getCityList', [LocationController::class, 'getCityList'])->name('getCityList');
Route::get('/city', [CityController::class, 'index'])->name('city');
Route::get('/dtCity', [CityController::class, 'getCity'])->name('dtCity');
Route::get('/addCity', [CityController::class, 'addCity'])->name('addCity');
Route::get('/editData', [CityController::class, 'editData'])->name('editData');
Route::post('/addCity', [CityController::class, 'addCity'])->name('addCity');
Route::get('/editCity/{id}/edit', [CityController::class, 'updateCity'])->name('editCity');
Route::put('/updateCity/{id}', [CityController::class, 'updateCity'])->name('updateCity');
Route::get('/deleteCity', [CityController::class, 'deleteCity'])->name('deleteCity');
Route::get('/location', [LocationController::class, 'index'])->name('location');
Route::get('/dtLocation', [LocationController::class, 'getLocation'])->name('dtLocation');
Route::get('/addLocation', [LocationController::class, 'addLocation'])->name('addLocation');
Route::get('/editLocationData', [LocationController::class, 'editData'])->name('editLocationData');
Route::post('/addLocation', [LocationController::class, 'addLocation'])->name('addLocation');
Route::get('/editLocation/{id}/edit', [LocationController::class, 'updateLocation'])->name('editLocation');
Route::put('/updateLocation/{id}', [LocationController::class, 'updateLocation'])->name('updateLocation');
Route::get('/deleteLocation', [LocationController::class, 'deleteLocation'])->name('deleteLocation');
Route::get('/logout', [AdminController::class, 'logout'])->name('logout');

Route::middleware(['guard'])->group(function(){
    Route::get('/location', [LocationController::class, 'index'])->name('location');
    Route::get('/city', [CityController::class, 'index'])->name('city');
    Route::get('/country', [CountryController::class, 'index'])->name('country');
    Route::get('/state', [StateController::class, 'index'])->name('state');
});