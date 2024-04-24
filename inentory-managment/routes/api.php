<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductResourceController;
use App\Http\Controllers\StockResourceController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\API\RegisterController;
use App\Http\Controllers\SupplierController;
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
    Route::post('register_admin', 'Register_admin');
    Route::post('loginadmin', 'Login_admin');
});





/** -----------Users --------------------- */

Route::middleware(['auth:sanctum'])->group(function () {

        Route::resource('categories', CategoryController::class);
        Route::apiResource('products', ProductResourceController::class);
        Route::resource('stock', StockResourceController::class);
        Route::resource('orders', OrderController::class);
        Route::get('buyers', [OrderController::class, 'AllBuyers']);
        Route::resource('suppliers',  SupplierController::class);
        Route::get('expire_products', [ProductResourceController::class, 'ExpireProducts']);
        Route::post('/orders_details', [OrderController::class, 'Orders_details']);

        Route::get('/logout', [RegisterController::class, 'logout']);
        Route::get('/alluser', [RegisterController::class, 'user']);
        Route::get('/alladmin', [RegisterController::class, 'Alladmin']);
        Route::post('/profile', [RegisterController::class, 'UpdateProfile']);
});




Route::middleware('auth:sanctum')->controller(RegisterController::class)->group(function() {
  

});





