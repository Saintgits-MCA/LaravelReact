<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;

// API test route
Route::get('/test', function () {
    return response()->json([
        'success' => true,
        'message' => 'Laravel API is working!'
    ]);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Contact form API
Route::post('/contact', [ContactController::class, 'store']);

Route::get('/contacts', [ContactController::class, 'index']);

Route::put('/contacts/{id}', [ContactController::class, 'update']);
