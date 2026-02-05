<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Allocation extends Model
{
    use HasFactory;
    protected $fillable = [
        'request_id',
        'allocated_qty',
        'note',
        'allocated_by',
        'allocated_at',
    ];
    protected $casts = [
        'allocated_at' => 'datetime',
    ];
    public function request()
    {
        return $this->belongsTo(Request::class);
    }
    public function allocator()
    {
        return $this->belongsTo(User::class, 'allocated_by');
    }
}
