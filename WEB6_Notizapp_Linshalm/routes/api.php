<?php

use App\Http\Controllers\KwmNotesController;
use App\Http\Controllers\KwmTagController;
use App\Http\Controllers\KwmTodoController;
use App\Http\Controllers\KwmUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\KwmListController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

/*Listen
Diese Methode beabsichtigt, alle Listen zu finden*/
Route::get('lists', [KwmListController::class, 'index']);
//Diese Methode beabsichtigt, eine Liste anhand ihrer ID zu finden
Route::get('lists/{id}', [KwmListController::class, 'findByID']);
//Lege eine neue Liste an


//Suche nach einer Liste anhand eines Namens
Route::get('lists/search/{searchTerm}', [KwmListController::class, 'findBySearchTerm']);


//Benutzer
Route::get('/users', [KwmUserController::class, 'index']);
Route::get('/users/{id}', [KwmUserController::class, 'show']);
Route::post('/users', [KwmUserController::class, 'store']);
Route::put('/users/{id}', [KwmUserController::class, 'update']);
Route::delete('/users/{id}', [KwmUserController::class, 'destroy']);
Route::get('/users/search/{searchTerm}', [KwmUserController::class, 'findBySearchTerm']);


// CRUD-Routen für Notizen
Route::get('/notes', [KwmNotesController::class, 'index']);
Route::get('/notes/{id}', [KwmNotesController::class, 'show']);
Route::post('/notes', [KwmNotesController::class, 'store']);
Route::put('/notes/{id}', [KwmNotesController::class, 'update']);
Route::delete('/notes/{id}', [KwmNotesController::class, 'destroy']);
// Suchfunktion für Notizen
Route::get('/notes/search/{searchTerm}', [KwmNotesController::class, 'findBySearchTerm']);


// CRUD-Routen für To-dos
Route::get('/todos', [KwmTodoController::class, 'index']);
Route::get('/todos/{id}', [KwmTodoController::class, 'show']);
Route::post('/todos', [KwmTodoController::class, 'store']);
Route::put('/todos/{id}', [KwmTodoController::class, 'update']);
Route::delete('/todos/{id}', [KwmTodoController::class, 'destroy']);
// Suchfunktion für To-dos
Route::get('/todos/search/{searchTerm}', [KwmTodoController::class, 'findBySearchTerm']);


// CRUD-Routen für Tags
Route::get('/tags', [KwmTagController::class, 'index']);
Route::get('/tags/{id}', [KwmTagController::class, 'show']);
Route::post('/tags', [KwmTagController::class, 'store']);
Route::put('/tags/{id}', [KwmTagController::class, 'update']);
Route::delete('/tags/{id}', [KwmTagController::class, 'destroy']);
// Suchfunktion für Tags
Route::get('/tags/search/{searchTerm}', [KwmTagController::class, 'findBySearchTerm']);



// Authentifizierung
Route::post('auth/login',[\App\Http\Controllers\AuthController::class, 'login']);

Route::group(['middleware' => ['api', 'auth.jwt']] , function(){
    Route::post('lists', [KwmListController::class, 'save']);
    Route::put('/lists/{id}', [KwmListController::class, 'update']);
    Route::delete('/lists/{id}', [KwmListController::class, 'destroy']);
    Route::post('auth/logout',[\App\Http\Controllers\AuthController::class, 'logout']);
});
