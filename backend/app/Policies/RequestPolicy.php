<?php

namespace App\Policies;

use App\Models\Request;
use App\Models\User;

class RequestPolicy
{
    public function view(User $user, Request $request): bool
    {
        return $request->requester_id === $user->id;
    }

    public function approve(User $user): bool
    {
        return $user->role === 'admin';
    }
    public function allocate(User $user): bool
    {
        return $user->role === 'admin';
    }
}
