<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderSupplier extends Model
{
    use HasFactory;
    protected $fillable = [
        "date",
        "total_amount",
        "supplier_id",
       
    ];

    public $timestamps = false;
}


