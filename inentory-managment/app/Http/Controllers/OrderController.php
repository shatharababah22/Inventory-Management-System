<?php

namespace App\Http\Controllers;
use App\Models\Order;
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
     
            $orders = Order::select('orders.*',
               
                'buyers.firstname as buyer_firstname',
                'buyers.email as buyer_email',
             'products.name as product_name',
                'payment_methods.payment_type',
                'orders_details.quantity_ordered'
            )
            ->join('buyers', 'orders.buyer_id', '=', 'buyers.id')
            ->join('orders_details', 'orders_details.order_id', '=', 'orders.id')
            ->join('payment_methods', 'orders.paymentmethod_id', '=', 'payment_methods.id')
            ->join('products', 'orders_details.product_id', '=', 'products.id')
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
        $order = Order::find($id);
        
        if (!$order) {
            return response()->json(['message' => 'Category not found'], 404);
        }

        $order->delete();

        return response()->json(['message' => 'Category deleted successfully'], 200);
    }
}
