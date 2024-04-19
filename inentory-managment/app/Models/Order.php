<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{	

    use HasFactory;

    protected $fillable = [
        " date",
        "total_amount",
        "paymentmethod_id",
       
    ];

    public $timestamps = false;
}
