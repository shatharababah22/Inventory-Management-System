<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class RegisterController extends BaseController

{
    /**
    * Register api
    *
    * @return \Illuminate\Http\Response
    */

    /** get all users */
    public function index()
    {
        $users = User::all();
        return $this->sendResponse($users, 'Displaying all users data');
    }

    public function register(Request $request)
    {
      
        $validator = Validator::make(
            $request->all(),
            [
                'name' => ['required', 'string', 'regex:/^[^0-9].*/'],
                'email' => 'email|required|unique:users',
                'password' => [
                    'required',
                    'min:8',
                    'regex:/^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/',
                ],
                // 'phone' => 'required|min:10|max:10',
                // 'image' => 'image|mimes:jpeg,png,jpg,gif|max:5048',
            ],
            [
                'name.regex' => 'The name must not start with a number.',
                'password.regex' => 'The password must contain at least one capital letter and one symbol (!@#$%^&*).',
            ]
        );
        

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }
        
        $input = $request->all();
        // $input['password'] = bcrypt($input['password']);
        $input['password'] = Hash::make($request->input('password'));
        $user = User::create($input);
        $success['token'] =  $user->createToken('token')->plainTextToken;
        $success['name'] =  $user->name;
         return $this->sendResponse($success, 'User register successfully.');





     

    }

    /**
    * Login api
    *
    * @return \Illuminate\Http\Response
    */

    public function login(Request $request)
    {
        if(Auth::attempt(['email' => $request->email, 'password' => $request->password]))
        { 

            $user = Auth::user();
            $token = $request->user()->createToken('token')->plainTextToken;

            $success['name'] =  $user->name;
            return $this->sendResponse($success, 'User login successfully.');
        } else { 
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        } 
    }
}