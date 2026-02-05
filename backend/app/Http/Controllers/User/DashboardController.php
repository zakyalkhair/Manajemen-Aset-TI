<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use App\Models\Request as AssetRequest;

class DashboardController extends Controller
{
    public function dashboard(): JsonResponse
    {
        $requests = AssetRequest::with([
            'asset:id,asset_name',
        ])
            ->where('requester_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(fn ($r) => [
                'id' => $r->id,
                'ndk' => $r->ndk,
                'asset_name' => $r->asset->asset_name,
                'quantity' => $r->quantity_requested,
                'description' => $r->description,
                'status' => $r->status->value,
            ]);

        return response()->json([
            'success' => true,
            'message' => null,
            'data' => $requests,
        ]);
    }
}
