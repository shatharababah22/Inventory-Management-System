<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{	
    use HasFactory;
    protected $fillable = [
        'name',
        'description',
        'category_id',
        'image2',
        'image1',
        'status',
    ];
    public $timestamps = false;

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }
    
}
