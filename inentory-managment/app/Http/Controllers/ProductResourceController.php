<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Stock;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use App\Events\ProductCreated;
use Illuminate\Support\Facades\Storage;
class ProductResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::select(
                'products.*',
                'categories.Name as category_name',
                'stocks.current_qty',
                'stocks.max_qty',
                'stocks.min_qty'
            )
            ->join('categories', 'categories.id', '=', 'products.category_id')
            ->join('stocks', 'stocks.product_id', '=', 'products.id')
            ->get();
    
        return response()->json($products);
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
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric',
                'category_id' => 'required',
                'status' => 'required',
                'image1' => 'required|image',
                'image2' => 'required|image',
            ]);
    
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()->all()], 422);
            }
    
            $product = new Product();
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->category_id = $request->category_id;
            $product->status = $request->status;
    
            if ($request->hasFile('image1')) {
                $image1 = $request->file('image1');
                $image1Name = time() . '_1.' . $image1->getClientOriginalExtension();
                $image1->move(public_path('img'), $image1Name);
                $product->image1 = $image1Name;
            }
    
            if ($request->hasFile('image2')) {
                $image2 = $request->file('image2');
                $image2Name = time() . '_2.' . $image2->getClientOriginalExtension();
                $image2->move(public_path('img'), $image2Name);
                $product->image2 = $image2Name;
            }
      
            $product->save();


            event(new ProductCreated($product));
    
            return response()->json(['message' => 'Product Created Successfully!!'], 201);
        } catch (\Exception $e) {
            // Log the exception for debugging
            Log::error('Failed to store product: ' . $e->getMessage());
            // Return detailed error message
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $product = Product::select('products.*', 'categories.Name as category_name')
    ->join('categories', 'categories.id', '=', 'products.category_id')
    ->find($id);


        return response()->json($product);
    }

    
    public function ExpireProducts()
    {
        $products = Product::where('status', 0)->get();
        return response()->json($products);
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
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'category_id' => 'required',
            'status' => 'required',
            'image1' => 'image',
            'image2' => 'image',
        ]);
    
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()->all()], 422);
        }
    
        try {
      
            $product = Product::find($id);
    
            // Update the product properties
            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->category_id = $request->category_id;
            $product->status = $request->status;

            if ($request->hasFile('image1')) {
                $image1 = $request->file('image1');
                $image1Name = time() . '_1.' . $image1->getClientOriginalExtension();
                $image1->move(public_path('img'), $image1Name);
                $product->image1 = $image1Name;
            }

            if ($request->hasFile('image2')) {
                $image2 = $request->file('image2');
                $image2Name = time() . '_2.' . $image2->getClientOriginalExtension();
                $image2->move(public_path('img'), $image2Name);
                $product->image2 = $image2Name;
            }
    

            $product->save();
            $categories = Category::all();
            return response()->json(['message' => 'Product updated successfully', 'categories' => $categories], 200);

 
            return response()->json(['message' => 'Product updated successfully'], 200);
        } catch (\Exception $e) {
         
            return response()->json(['error' => 'Failed to update product'], 500);
        }
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $stock = Stock::where('product_id', $id)->first();
        if (!$product) {
            return response()->json(['message' => 'Category not found'], 404);
        }
        $stock->delete();
        $product->delete();
   
        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
