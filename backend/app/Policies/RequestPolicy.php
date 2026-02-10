<?php

namespace App\Policies;

use App\Enums\RequestStatus;
use App\Models\Request;
use App\Models\User;

class RequestPolicy
{
    public function view(User $user, Request $request): bool
    {
        return $request->requester_id === $user->id;
    }

    public function approve(User $user, Request $request): bool
    {
        return $user->role === 'admin'
            && $request->status === RequestStatus::MENUNGGU_PERSETUJUAN;
    }

    public function allocate(User $user, Request $request): bool
    {
        return $user->role === 'admin'
            && $request->status === RequestStatus::MENUNGGU_BARANG
            && $request->quantity_filled < $request->quantity_requested;
    }
}
