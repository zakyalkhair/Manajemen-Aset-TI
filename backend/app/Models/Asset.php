<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Asset extends Model
{
    use HasFactory, SoftDeletes;
    protected $fillable = [
        'asset_code',
        'asset_name',
        'brand',
    ];

    public function stock()
    {
        return $this->hasOne(Stock::class);
    }

    public function requests()
    {
        return $this->hasMany(Request::class);
    }

    public function stockMovements()
    {
        return $this->hasMany(StockMovement::class);
    }
}
