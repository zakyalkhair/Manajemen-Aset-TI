<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')
                ->constrained('assets');
            $table->enum('type', ['in', 'out', 'adjust']);
            $table->integer('quantity');
            $table->text('note')->nullable();
            $table->foreignId('created_by')
                ->constrained('users');
            $table->timestamp('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};
