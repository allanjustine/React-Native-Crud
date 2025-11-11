<?php

use App\Http\Controllers\Api\Auth\LoginController;
use App\Http\Controllers\Api\Auth\LogoutController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    // Auth User
    Route::get('/profile', function (Request $request) {
        return $request->user();
    });

    // Logout Function
    Route::post('/logout', LogoutController::class);
});

Route::post('/login', LoginController::class);
Route::apiResource('users', UserController::class);
