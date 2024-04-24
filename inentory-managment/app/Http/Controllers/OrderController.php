<?php

namespace App\Http\Controllers;

use App\Models\Buyer;
use App\Models\OrderSupplier;
use App\Models\Product;
use App\Models\OrderDetail;
use App\Models\Supplier;
use App\Models\Stock;
use App\Models\SupplierOrderDetail;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        
        $orders = OrderSupplier::select(
            'order_suppliers.*',

            'suppliers.firstname as buyer_firstname',
            'suppliers.email as buyer_email',
            'products.name as product_name',
            'supplier_order_details.quantity_ordered'
        )
            ->join('suppliers', 'order_suppliers.supplier_id', '=', 'suppliers.id')
            ->join('supplier_order_details', 'supplier_order_details.order_id', '=', 'order_suppliers.id')
            ->join('products', 'supplier_order_details.product_id', '=', 'products.id')
            ->get();

        return response()->json($orders);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    public function AllBuyers()
    {
        $buyers = Buyer::all();
        return response()->json($buyers);
    }


    
    public function AllSuppliers()
    {
        $buyers = Supplier::all();
        return response()->json($buyers);
    }

    public function Orders_details(Request $request)
    {
        $request->validate([
            'order_id' => 'required',
            'product_id' => 'required|exists:products,id',
            'quantity_ordered' => 'required|numeric|min:1',
          
        ]);
    

        $product = Product::findOrFail($request->input('product_id'));

        if ($product->status == 0) {
            return response()->json(['error' => 'The product is inactive. Please try again.'], 422);
        }
        
        $stock = $product->stock;
        $currentQty = $stock->current_qty;
        $maxQty = $stock->max_qty;
    

        $subTotal = $product->price * $request->input('quantity_ordered');
    

        $updatedQty = $currentQty + $request->input('quantity_ordered');
        if ($updatedQty > $maxQty) {
            return response()->json(['error' => 'The quantity ordered exceeds the maximum allowed'], 422);
        }
    

        $orderDetail = SupplierOrderDetail::create([
            'order_id' => $request->input('order_id'),
            'product_id' => $request->input('product_id'),
            'quantity_ordered' => $request->input('quantity_ordered'),
            'sub_total' => $subTotal,
        ]);
    
   
        $stock->update(['current_qty' => $updatedQty]);

        return response()->json(['message' => 'Order detail created successfully', 'order_detail' => $orderDetail], 201);
    }
    


    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'date' => 'required|date|after_or_equal:' . now()->format('Y-m-d'),
            'total_amount' => 'required|numeric',
            'supplier_id' => 'required|exists:suppliers,id',
        ], [
            'date.before_or_equal' => 'The date must be before or equal to today.',
            'total_amount.required' => 'The total amount field is required.',
            'total_amount.numeric' => 'The total amount must be a number.',
            'supplier_id.exists' => 'The selected supplier does not exist.',
        ]);
        

        $order = OrderSupplier::create([
            'date' => $request->input('date'),
            'total_amount' => $request->input('total_amount'),
            'supplier_id' => $request->input('supplier_id'),
        ]);

        return response()->json(['message' => 'Order created successfully', 'order' => $order], 201);
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
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    //     $order = Order::find($id);

    //     if (!$order) {
    //         return response()->json(['message' => 'Order not found'], 404);
    //     }

    //     $order->delete();

    //     return response()->json(['message' => 'Order deleted successfully'], 200);
    // }
}
}