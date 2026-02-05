<?php

namespace App\Http\Controllers\User;

use App\Models\Request as AssetRequest;
use App\Models\Asset;
use Illuminate\Support\Facades\Auth;
use App\Services\Request\UserRequestService;
use App\Http\Requests\User\StoreAssetRequest;
use App\Http\Controllers\Controller;

class RequestController extends Controller
{
    public function __construct(
        private UserRequestService $service
    ) {}

    public function availableAssets()
    {
        $assets = Asset::with('stock')
            ->whereNull('deleted_at')
            ->whereHas('stock', fn($q) => $q->where('qty_current', '>', 0))
            ->get()
            ->map(fn($asset) => [
                'id' => $asset->id,
                'asset_name' => $asset->asset_name,
                'brand' => $asset->brand,
                'qty_available' => $asset->stock->qty_current,
            ]);

        return response()->json([
            'success' => true,
            'data' => $assets
        ]);
    }

    public function store(StoreAssetRequest $request)
    {
        $newRequest = $this->service->create(
            $request->validated(),
            Auth::id()
        );

        return response()->json([
            'success' => true,
            'data' => $newRequest
        ]);
    }

    public function show(int $id)
    {
        $request = AssetRequest::with([
            'asset',
            'requester',
            'approver',
            'rejector'
        ])->findOrFail($id);

        $this->authorize('view', $request);

        return response()->json([
            'success' => true,
            'data' => [
                'id' => $request->id,
                'ndk' => $request->ndk,
                'status' => $request->status->value,
                'status_label' => $request->status_label,
                'created_at' => $request->created_at,
                'requester_name' => optional($request->requester)->name,
                'department' => $request->department,
                'asset_name' => optional($request->asset)->asset_name,
                'brand' => optional($request->asset)->brand,
                'quantity_requested' => $request->quantity_requested,
                'description' => $request->description,
                'approved_by_name' => optional($request->approver)->name,
                'rejected_by_name' => optional($request->rejector)->name,
                'rejection_reason' => $request->rejection_reason,
            ]
        ]);
    }
}
