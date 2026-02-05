<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Enums\RequestStatus;


class Request extends Model
{
    use HasFactory;
    protected $fillable = [
        'ndk',
        'asset_id',
        'requester_id',
        'quantity_requested',
        'quantity_filled',
        'department',
        'description',
        'status',
        'approved_by',
        'approved_at',
        'rejected_by',
        'rejected_at',
        'rejection_reason',
        'fulfilled_at',
    ];

    protected $casts = [
        'approved_at'  => 'datetime',
        'rejected_at'  => 'datetime',
        'fulfilled_at' => 'datetime',
        'status'       => RequestStatus::class,
    ];

    protected $appends = [
        'status_label',
    ];

    public function getStatusLabelAttribute(): ?string
    {
        return $this->status?->label();
    }
    public function asset()
    {
        return $this->belongsTo(Asset::class);
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function approver()
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    public function rejector()
    {
        return $this->belongsTo(User::class, 'rejected_by');
    }

    public function allocations()
    {
        return $this->hasMany(Allocation::class);
    }
}
