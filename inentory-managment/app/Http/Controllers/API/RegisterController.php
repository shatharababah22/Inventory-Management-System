<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\Buyer;
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
       
    }

    public function user(Request $request)
    {
        $user = $request->user(); 

       
        return response()->json([
            'name' => $user->name,
            'email' => $user->email,
            'image' => $user->image, 
          
        ]);
    }

    // public function updateProfile(Request $request)
    // {
    //     $user = $request->user();

    //     $request->validate([
    //         'name' => 'required|string|max:255',
    //         'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
    //         'phone' => 'nullable|string|max:20',
    //         'birthday' => 'nullable|date',
    //         // Assuming you want to upload an image
    //     ]);



    //     if ($request->hasFile('image')) {
    //         $image = $request->file('image');
    //         $filename = time() . '.' . $image->getClientOriginalExtension();
    //         $destinationPath = public_path('/img');
    //         $image->move($destinationPath, $filename);
    //         $user->image = $filename;
    //     }
    //     $user->name = $request->name;
    //     $user->email = $request->email;
    //     $user->phone = $request->phone;
    //     $user->birthday = $request->birthday;
    //     $user->save();

    //     return response()->json(['message' => 'Profile updated successfully']);
    // }

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
            ],
            [
                'name.regex' => 'The name must not start with a number.',
                'password.regex' => 'The password must contain at least one capital letter and one symbol (!@#$%^&*).',
            ]
        );
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }
    
        $user = new Buyer();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->input('password')); // Assign hashed password
    
        $user->save();
    
        $success['token'] = $user->createToken('token')->plainTextToken;
        $success['name'] = $user->name;
    
        return $this->sendResponse($success, 'User registered successfully.');
    }
    
    public function Register_admin(Request $request)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'name' => ['required', 'string', 'regex:/^[^0-9].*/'],
                'email' => 'email|required|unique:users',
                'phone' => 'required', // Add phone validation if necessary
                'birthday' => 'required|date', // Add birthday validation
                'password' => [
                    'required',
                    'min:8',
                    'regex:/^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/',
                ],
                'image' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validate image if uploaded
            ],
            [
                'name.regex' => 'The name must not start with a number.',
                'password.regex' => 'The password must contain at least one capital letter and one symbol (!@#$%^&*).',
            ]
        );
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422); // Return validation errors with proper status code
        }
    
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->birthday = $request->birthday;
        $user->role = 0;
        $user->password = Hash::make($request->input('password'));
    
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $user->image = $filename;
        }
    
        $user->save();
    
        $success['token'] = $user->createToken('token')->plainTextToken;
        $success['name'] = $user->name;
    
        return response()->json($success, 200); // Return success response
    }
    
    

    public function Alladmin()
    {
        $admins= User::all();
        return $this->sendResponse( $admins, 'Displaying all adminsdata');
    }


    /**
     * Login api
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        if (Auth::guard('buyers')->attempt(['email' => $request->email, 'password' => $request->password])) {
    
            $buyer = Auth::guard('buyers')->user();
    
            if ($buyer) {
                $token = $buyer->createToken('token')->plainTextToken;
    
                $success['name'] =  $buyer->name;
                $success['token'] = $token;
                return $this->sendResponse($success, 'Buyer login successfully.');
            } else {
                return $this->sendError('Unauthorized.', ['error' => 'Unauthorized']);
            }
        } else {
            return $this->sendError('Unauthorized.', ['error' => 'Unauthorized']);
        }
    }
    










public function Login_admin(Request $request)
{
    if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {

        $user = Auth::user();
        $token = $request->user()->createToken('token')->plainTextToken;


        $success['name'] =  $user->name;
        $success['token'] = $token;
        return $this->sendResponse($success, 'User login successfully.');
    } else {
        return $this->sendError('Unauthorized.', ['error' => 'Unauthorized']);
    }
}


    public function Logout_admin(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }


    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
