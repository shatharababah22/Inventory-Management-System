<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
   
        $categories = [
            [
                'Name' => 'Sofas',
                'description' => 'Explore our collection of comfortable and stylish sofas.',
                'Image'=>'sofas.jpg'
            ],
            [
                'Name' => 'Tables',
                'description' => 'Find the perfect table for your dining room or living space.',
                'Image'=>'table.jpg'
            ],
            [
                'Name' => 'Chairs',
                'description' => 'Discover our wide range of chairs, from accent chairs to dining chairs.',
                'Image'=>'charis.jpg'
            ],
        
        ];

        // Loop through the sample data and insert into the database
        foreach ($categories as $categoryData) {
            Category::create($categoryData);
        }
    }
}
