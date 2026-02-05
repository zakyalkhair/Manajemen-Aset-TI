<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AssetSeeder::class,
            StockSeeder::class,
            RequestSeeder::class,
            AllocationSeeder::class,
            StockMovementSeeder::class,
        ]);
    }
}
