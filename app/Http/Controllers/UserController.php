<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;


class UserController extends Controller
{
    public function index(Request $request) {

        if (!Gate::allows('view-user')) {
            abort(403);
        }

        $skip = ($request->page - 1) * $request->perPage;
        $limit = $request->perPage;

        $query = User::where(function($query) use ($request) {
            if ($request->keyword) {
                $query->where('name', 'like', '%'.$request->keyword.'%');
            }
        });

        $users = (clone $query)
                ->skip($skip)
                ->take($limit)
                ->when($request->orderBy, function($query) use ($request) {
                    $query->orderBy($request->orderBy, $request->orderDirection);
                })
                ->get();

        $total = (clone $query)
                ->count();

        return response()->json(['data' => $users, 'total' => $total]);

    }

    public function store(Request $request){

        if (!Gate::allows('store-user')) {
            abort(403);
        }

        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users',
            'password' => 'required|confirmed|min:6'
        ]);

        $user = new User;
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->type = $request->type;
        $user->save();

        return response()->json(['message' => 'User created successfully'], 201);
    }

    public function show($id){
        if (!Gate::allows('get-user')) {
            abort(403);
        }

        $user = User::find($id);
        return response()->json(['data' => $user]);
    }

    public function update(Request $request, $id){
        if (!Gate::allows('update-user')) {
            abort(403);
        }

        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,'.$id,
        ]);

        $user = User::find($id);
        $user->name = $request->name;
        $user->email = $request->email;
        if (!empty($request->password)) {
            $user->password = Hash::make($request->password);
        }
        $user->type = $request->type;
        $user->save();

        return response()->json(['message' => 'User updated successfully'], 201);
    }

    public function delete($id){
        if (!Gate::allows('delete-user')) {
            abort(403);
        }
        
        $user = User::find($id)->delete();
        return response()->json(['message' => 'User deleted successfully'], 201);
    }
}
