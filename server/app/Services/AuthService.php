<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function authenticate($request)
    {
        $user = User::where(
            'email',
            $request->email
        )
            ->first();

        if (!$user) {
            abort(404, 'The email you entered does not exists to our system');
        }

        if (!Auth::attempt([
            'email'     => $request->email,
            'password'  => $request->password
        ])) {
            abort(400, 'Invalid credentials. Please check your password.');
        };

        $token = $user->createToken('token')->plainTextToken;

        return [
            'token' => $token,
            'user'  => $user
        ];
    }

    public function logout()
    {
        Auth::user()->tokens()->delete();

        return;
    }
}
