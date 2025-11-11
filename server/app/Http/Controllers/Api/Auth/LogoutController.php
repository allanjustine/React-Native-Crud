<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Services\AuthService;
use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function __invoke(AuthService $authService)
    {
        $authService->logout();

        return response()->json([
            'message' => 'You have been logged out successfully'
        ], 200);
    }
}
