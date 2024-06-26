<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('supplier_products', function (Blueprint $table) {
   
                $table->id();
                $table->unsignedBigInteger('supplier_id');
                $table->foreign('supplier_id')->references('id')->on('suppliers');
                $table->unsignedBigInteger('product_id');
                $table->foreign('product_id')->references('id')->on('products');
            });
    
            Schema::enableForeignKeyConstraints();
        }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('supplier_products');
    }
};
