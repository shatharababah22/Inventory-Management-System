<?php

namespace App\Http\Controllers;
use App\Models\Supplier;
use App\Models\OrderSupplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $suppliers = Supplier::all();
        return response()->json($suppliers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){

        $validator = Validator::make($request->all(), [
            'firstname' => 'required|regex:/^[^0-9][a-zA-Z\s]+$/',
            'lastname' => 'required|regex:/^[^0-9][a-zA-Z\s]+$/',
            'email' => 'required|email|unique:suppliers',
            'birthday' => 'required|date|before_or_equal:today',
            'phone' => 'required|regex:/^07[0-9]{8}$/',
            'password' => [
                'required',
                'min:8',
                'regex:/^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/',
            ],
        ], [
            'firstname.regex' => 'The firstname must not start with a number.',
            'lastname.regex' => 'The lastname must not start with a number.',
            'email.required' => 'The email field is required.',
            'email.email' => 'The email must be a valid email address.',
            'email.unique' => 'The email has already been taken.',
            'birthday.required' => 'The birthday field is required.',
            'birthday.date' => 'The birthday must be a valid date.',
            'birthday.before_or_equal' => 'The birthday must be before or equal to today.',
            'phone.required' => 'The phone field is required.',
            'phone.regex' => 'The phone must be a valid 10-digit number starting with 07.',
            'password.required' => 'The password field is required.',
            'password.min' => 'The password must be at least :min characters.',
            'password.regex' => 'The password format is invalid.',
        ]);
    
        if ($validator->fails()) {
            $errors = $validator->errors()->all();
            return response()->json(['errors' => $errors], 422);
        }
    
    
        $supplier = new Supplier();
    
        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $supplier->image = $filename;
        }
    
        $supplier->firstname = $request->firstname;
        $supplier->lastname = $request->lastname;
        $supplier->email = $request->email;
        $supplier->birthday = $request->birthday;
        $supplier->phone = $request->phone;
        $supplier->password = bcrypt($request->password);
    
    
        $supplier->save();
    
        return response()->json([
            'message' => 'Supplier Created Successfully!!'
        ]);
    }
    

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make(
            $request->all(),
            [
                'firstname' => ['required'],
                'lastname' => ['required'],
                'email' => ['required', 'email', 'unique:suppliers,email,'.$id],
                'birthday' => ['required', 'date'],
                'phone' => ['required'],
                'password' => [
                    'sometimes', // password is only required if provided
                    'min:8',
                    'regex:/^(?=.*[A-Z])(?=.*[!@#$%^&*]).*$/',
                ],
                'image' => ['sometimes', 'image', 'mimes:jpeg,png,jpg,gif', 'max:2048'], // Adjust max file size as needed
               
            ]
        );
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()]);
        }
    
        $supplier = Supplier::findOrFail($id);
    
        if($request->hasFile('image')){
            $image = $request->file('image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $supplier->image = $filename;
        }
    
        $supplier->firstname = $request->firstname;
        $supplier->lastname = $request->lastname;
        $supplier->email = $request->email;
        $supplier->birthday = $request->birthday;
        $supplier->phone = $request->phone;
        
        // Update password if provided
        if ($request->has('password')) {
            $supplier->password = bcrypt($request->password);
        }
    
    
        $supplier->save();
    
        return response()->json([
            'message' => 'Supplier Updated Successfully!!'
        ]);
    }
    

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $supplier = Supplier::findOrFail($id);
    
 
        $hasOrders = OrderSupplier::where('supplier_id', $id)->exists();
    
        if ($hasOrders) {
            return response()->json(['message' => 'Supplier has associated orders. Can not delete.'], 400);
        }
    

        $supplier->delete();
    
        return response()->json(['message' => 'Supplier deleted successfully'], 200);
    }
    
    
}
