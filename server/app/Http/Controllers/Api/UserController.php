<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function __construct(private readonly UserService $userService) {}

    public function index()
    {
        $search = request('search', '');

        $users =  $this->userService->getAllUser($search);

        return response()->json([
            'message'       => 'All user fetched successfully',
            'data'          => $users
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $request->validated();

        $user =  $this->userService->storeUser($request);

        return response()->json([
            'message'       => 'User created successfully',
            'data'          => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return response()->json([
            'message'       => 'Single user fetched successfully',
            'data'          => $user
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $request->validated();

        $user =  $this->userService->updateUser($request, $user);

        return response()->json([
            'message'       => 'User updated successfully',
            'data'          => $user
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user =  $this->userService->deleteUser($user);

        return response()->json([
            'message'       => 'User deleted successfully',
            'data'          => $user
        ], 200);
    }
}
