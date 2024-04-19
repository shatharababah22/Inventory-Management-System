<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

use Illuminate\Support\Str;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();
        return response()->json($categories);
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
    public function store(Request $request)

    {
        $validator = Validator::make(
            $request->all(),
            [
                
                'Name' => ['required'],
                'description' => ['required'],
                // 'Image' => 'required|image'
                
            ]
        );

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all() ]);
        }


        // $category = new Category;
        // $category->Name = $request->Name;

        // $category->description = $request->description;
     

        
        // $imageName = Str::random().'.'.$request->Image->getClientOriginalExtension();
        
        // // Store the uploaded image
        // Storage::disk('public')->put('product/image', $request->Image, $imageName);
        
        // // Create the product
        // $category = Category::create($request->post() + ['Image' => $imageName]);
   
        // return response()->json($category);
      

        // $validatedData = $request->validate([
        //     'Name' => 'required',
        //     'description' => 'required',
        //     'Image' => 'required|image'
        // ]);
        
        // $imageName = Str::random().'.'.$request->Image->getClientOriginalExtension();
        
        // Storage::disk('public')->put('product/image', $request->Image, $imageName);
        
        // Category::create(array_merge($validatedData, ['Image' => $imageName]));
        
        // return response()->json([
        //     'message' => 'Product Created Successfully!!'
        // ]);


        $categories = new Category();

        if($request->hasFile('Image')){
            $image = $request->file('Image');
            $filename = time().'.'.$image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $categories->Image = $filename;
        }

        $categories->Name = $request->Name;
        $categories->description = $request->description;
        
    
        $categories->save();
  return response()->json([
            'message' => 'Product Created Successfully!!'
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
        $category = Category::find($id);
        return response()->json($category);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
     
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
        $category = Category::find($id);
    
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }
    
        $request->validate([
            'Name' => 'required',
            'description' => 'required',

        ]);
    
        $category->Name = $request->Name;
        $category->description = $request->description;
    
        if ($request->hasFile('Image')) {
            $image = $request->file('Image');
            $filename = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/img');
            $image->move($destinationPath, $filename);
            $category->Image = $filename;
        }
    
        $category->save();
    
        return response()->json($category);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    
    public function destroy($id)
    {
        $category = Category::find($id);
        
        if (!$category) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
