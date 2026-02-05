<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\RequestController as UserRequestController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\RequestController as AdminRequestController;
use App\Http\Controllers\Admin\InventoryController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:api');
Route::post('/refresh', [AuthController::class, 'refresh'])->middleware('auth:api');
Route::middleware(['auth:api', 'role:admin'])
    ->prefix('admin')
    ->group(function () {
        Route::get('/dashboard', [AdminDashboardController::class, 'dashboard']);
        Route::get('/profile', [ProfileController::class, 'show']);
        Route::get('/request', [AdminRequestController::class, 'index']);
        Route::get('/request/{id}', [AdminRequestController::class, 'show']);
        Route::patch('/request/{id}/approve', [AdminRequestController::class, 'approve']);
        Route::patch('/request/{id}/reject', [AdminRequestController::class, 'reject']);
        Route::post('/request/{id}/allocate', [AdminRequestController::class, 'allocate']);
        Route::get('/inventory', [InventoryController::class, 'index']);
        Route::get('/inventory/{assetId}/stock', [InventoryController::class, 'showStock']);
        Route::post('/inventory/{assetId}/add-stock', [InventoryController::class, 'addStock']);
        Route::post('/inventory/register-assets', [InventoryController::class, 'store']);
        Route::put('/inventory/{assetId}/stock/edit', [InventoryController::class, 'update']);
        Route::delete('/inventory/{assetId}', [InventoryController::class, 'destroy']);
    });
Route::middleware(['auth:api', 'role:user'])
    ->prefix('user')
    ->group(function () {
        Route::get('/dashboard', [UserDashboardController::class, 'dashboard']);
        Route::get('/assets', [UserRequestController::class, 'availableAssets']);
        Route::post('/request', [UserRequestController::class, 'store']);
        Route::get('/request/{id}', [UserRequestController::class, 'show']);
        Route::get('/profile', [ProfileController::class, 'show']);
    });
