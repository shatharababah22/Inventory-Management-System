<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stock;

class StockResourceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $stock = Stock::select('stocks.*', 'products.name as product_name', 'products.image1 as product_image')
                ->join('products', 'products.id', '=', 'stocks.product_id')
                ->get();

            return response()->json($stock);
        } catch (\Exception $e) {
            // Log the error or handle it appropriately
            // For debugging purposes, you can return the error message
            return response()->json(['error' => $e->getMessage()], 500);
        }
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $stock = Stock::select('stocks.*', 'products.name as product_name', 'products.image1 as product_image')
            ->join('products', 'products.id', '=', 'stocks.product_id')
            ->get();


        return response()->json($stock);
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
        $stock = Stock::find($id);

        if (!$stock) {
            return response()->json(['message' => 'stock not found'], 404);
        }
        $request->validate([
            'min_qty' => 'required|numeric',
            'max_qty' => 'required|numeric|gt:min_qty', // Ensure max_qty is greater than min_qty
            'current_qty' => 'required|numeric',
        ], [
            'max_qty.gt' => 'The maximum quantity must be greater than the minimum quantity.',
        ]);

        $stock->min_qty = $request->min_qty;
        $stock->max_qty = $request->max_qty;
        $stock->current_qty = $request->current_qty;



        $stock->save();

        return response()->json(['message' => 'Stock updated successfully', 'stock' => $stock]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $stock = Stock::find($id);
    
        if (!$stock) {
            return response()->json(['message' => 'Stock not found'], 404);
        }
    

        $product = $stock->product;
    

        $stock->delete();
    

        if ($product) {
            $product->delete();
        }
    
        return response()->json(['message' => 'Stock and associated product deleted successfully'], 200);
    }
    
}
