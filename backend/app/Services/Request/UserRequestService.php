<?php

namespace App\Services\Request;

use App\Enums\RequestStatus;
use App\Models\Request as AssetRequest;

class UserRequestService
{
    public function create(array $data, int $userId): AssetRequest
    {
        return AssetRequest::create([
            'ndk' => 'REQ-' . now()->format('YmdHis'),
            'asset_id' => $data['asset_id'],
            'requester_id' => $userId,
            'quantity_requested' => $data['quantity_requested'],
            'department' => $data['department'],
            'description' => $data['description'] ?? null,
            'status' => RequestStatus::MENUNGGU_PERSETUJUAN->value,
        ]);
    }
}
