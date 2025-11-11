<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\Request;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request, AuthService $authService)
    {
        $request->validated();

        $data = $authService->authenticate($request);

        return response()->json([
            'message' => 'User logged in successfully',
            'token'   => $data['token'],
            'user'    => $data['user']
        ], 200);
    }
}
