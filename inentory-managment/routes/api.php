<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductResourceController;
use App\Http\Controllers\StockResourceController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\API\RegisterController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/** ---------Register and Login ----------- */
Route::controller(RegisterController::class)->group(function()
{
    Route::post('register', 'register');
    Route::post('login', 'login');
    // Route::post('users', 'login')->name('index');

});

/** -----------Users --------------------- */



Route::middleware('api')->group(function () {
    Route::resource('categories', CategoryController::class);
    Route::resource('products', ProductResourceController::class);
    Route::resource('stock', StockResourceController::class);
    Route::resource('orders', OrderController::class);
    Route::get('buyers', [OrderController::class, 'AllBuyers']);
    Route::get('suppliers', [OrderController::class, 'AllSuppliers']);
    Route::get('expire_products', [ProductResourceController::class, 'ExpireProducts']);
  
});


Route::middleware('auth:sanctum')->controller(RegisterController::class)->group(function() {
    Route::get('/users','index')->name('index');

});



