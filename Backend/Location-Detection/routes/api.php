<?php

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/add-place', [Controller::class, 'add_place']);

Route::get('/get-places', [Controller::class, 'get_places']);

Route::post('/add-history', [Controller::class, 'add_history']);

Route::get('/get-history', [Controller::class, 'get_history']);
