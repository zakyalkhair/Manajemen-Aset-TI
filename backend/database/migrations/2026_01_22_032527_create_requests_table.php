<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
return new class extends Migration {
    public function up(): void
    {
        Schema::create('requests', function (Blueprint $table) {
            $table->id();
            $table->string('ndk')->unique();
            $table->foreignId('asset_id')
                ->constrained('assets');
            $table->foreignId('requester_id')
                ->constrained('users');
            $table->integer('quantity_requested');
            $table->string('department');
            $table->text('description')->nullable();
            $table->enum('status', [
                'menunggu_persetujuan',
                'menunggu_barang',
                'dipakai',
                'ditolak'
            ])->default('menunggu_persetujuan');
            $table->foreignId('approved_by')
                ->nullable()
                ->constrained('users');
            $table->timestamp('approved_at')->nullable();
            $table->foreignId('rejected_by')
                ->nullable()
                ->constrained('users');
            $table->timestamp('rejected_at')->nullable();
            $table->text('rejection_reason')->nullable();
            $table->timestamp('fulfilled_at')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
