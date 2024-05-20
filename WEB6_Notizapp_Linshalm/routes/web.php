<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

//Eine Route um die Listen anzeigen zu lassen
Route::get('/',[\App\Http\Controllers\KwmListController::class, "index"]);


//Eine Route um die Listen anzeigen zu lassen
Route::get('/lists', [\App\Http\Controllers\KwmListController::class, "index"]);


Route::get('/lists/{id}', function ($id) {
    $list = \App\Models\KwmList::find($id);
    return view('lists.show', compact( 'list'));


});



