<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Buyer extends Model
{
    use HasFactory;
    protected $fillable = [
        'firstname',
        'email',
        'phone',
        'image',
        'birthday',
        'lastname',
        'password'
    ];
}
