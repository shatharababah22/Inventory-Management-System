<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
				
class Stock extends Model
{
    use HasFactory;
    protected $fillable = [
        "current_qty",
        "max_qty",
        "min_qty",
        "product_id"
    ];

    public $timestamps = false;

    
    public function product()
    {
        return $this->belongsTo(Product::class);
    }

}
