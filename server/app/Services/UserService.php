<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Str;

class UserService
{
    public function getAllUser(string $search = '')
    {
        $users = User::query()
            ->when(
                $search,
                fn($query)
                =>
                $query->where(
                    fn($user)
                    =>
                    $user->whereAny([
                        'name',
                        'email'
                    ], 'like', "%{$search}%")
                )
            )
            ->latest()
            ->get();

        return $users;
    }

    public function storeUser($request)
    {
        $user = User::query()->create([
            'name'      => Str::title($request->name),
            'email'     => Str::lower($request->email),
            'password'  => $request->password
        ]);

        return $user;
    }

    public function updateUser($request, $user)
    {
        $data = [
            'name'      => Str::title($request->name),
            'email'     => $request->email,
        ];

        if ($request->password) {
            $data['password'] = $request->password;
        }

        $user->update($data);

        return $user;
    }

    public function deleteUser($user)
    {
        $user->delete();

        return $user;
    }
}
