<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function login(Request $request)
    { 
        $request->validate(['email' => 'required|exists:users,email', 'password' => 'required']);
        $check = User::where('email', $request->email)->first();
        
        if (!empty($check)) {
            if (Hash::check($request->password, $check->password)) {
                $credentials = request(['email', 'password']);
                if (!$token = auth()->attempt($credentials)) {            
                    return response()->json(['message' => 'Password invalid', 'errors' => ['password' => ['Password invalid']]]);        
                }
                return $this->respondWithToken($token, $check);
            }
            return response()->json(['message' => 'Password invalid', 'errors' => ['password' => ['Password invalid']]]);
        }

    }

    public function me()
    {
        return response()->json(auth()->user());
    }

    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }


    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    protected function respondWithToken($token, $user)
    {
        return response()->json([
            'data' => [
                'user' => $user,
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth()->factory()->getTTL() * 60
            ]
        ]);
    }

}
