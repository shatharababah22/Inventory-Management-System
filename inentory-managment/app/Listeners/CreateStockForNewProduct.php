<?php

namespace App\Listeners;

use App\Events\ProductCreated;
use App\Models\Stock;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class CreateStockForNewProduct implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Handle the event.
     *
     * @param  ProductCreated  $event
     * @return void
     */
    public function handle(ProductCreated $event)
    {
        try {
     
            $product = $event->product;
    
            $stock = new Stock();
            $stock->current_qty = 1; 
            $stock->max_qty = 0;
            $stock->min_qty = 0;
            $stock->product_id = $product->id;
            $stock->save();
        } catch (\Exception $e) {
       
            Log::error('Failed to create stock for product: ' . $e->getMessage());
        }
    }
}
