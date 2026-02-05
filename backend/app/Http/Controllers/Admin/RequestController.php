<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AllocateRequest;
use App\Http\Requests\Admin\RejectRequest;
use App\Models\Request as AssetRequest;
use App\Services\Request\AdminRequestService;
use Illuminate\Http\JsonResponse;

class RequestController extends Controller
{
    public function __construct(
        private AdminRequestService $service
    ) {}

    public function index(): JsonResponse
    {
        $requests = AssetRequest::with([
            'requester:id,name',
            'asset:id,asset_name',
            'approver:id,name',
        ])
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return response()->json([
            'success' => true,
            'message' => null,
            'data' => $requests,
        ]);
    }

    public function approve(int $id): JsonResponse
    {
        $request = AssetRequest::findOrFail($id);

        $this->authorize('approve', $request);

        $this->service->approve($id);

        return response()->json([
            'success' => true,
            'message' => 'Status permintaan berubah menjadi Menunggu Barang',
            'data' => null,
        ]);
    }

    public function reject(RejectRequest $request, int $id): JsonResponse
    {
        $assetRequest = AssetRequest::findOrFail($id);

        $this->authorize('approve', $assetRequest);

        $this->service->reject(
            $id,
            $request->input('reason')
        );

        return response()->json([
            'success' => true,
            'message' => 'Permintaan berhasil ditolak',
            'data' => null,
        ]);
    }

    public function allocate(AllocateRequest $request, int $id): JsonResponse
    {
        $assetRequest = AssetRequest::findOrFail($id);

        $this->authorize('allocate', $assetRequest);

        $this->service->allocate(
            requestId: $id,
            qtyToGive: (int) $request->input('qty_to_allocate'),
            note: $request->input('note')
        );

        return response()->json([
            'success' => true,
            'message' => 'Alokasi berhasil diproses',
            'data' => null,
        ]);
    }

    public function show(int $id): JsonResponse
    {
        $data = $this->service->getDetail($id);

        $request = $data['request'];

        return response()->json([
            'success' => true,
            'message' => null,
            'data' => [
                'id' => $request->id,
                'ndk' => $request->ndk,
                'status' => $request->status->value,
                'status_label' => $request->status_label,
                'requester' => $request->requester,
                'department' => $request->department,
                'asset' => [
                    'id' => $request->asset->id,
                    'asset_name' => $request->asset->asset_name,
                    'brand' => $request->asset->brand,
                ],
                'quantity_requested' => $request->quantity_requested,
                'quantity_filled' => $request->quantity_filled,
                'description' => $request->description,
                'created_at' => $request->created_at,
                'approver' => $request->approver,
                'stock_available' => $data['stock_available'],
                'allocations' => $request->allocations->map(fn ($a) => [
                    'id' => $a->id,
                    'allocated_qty' => $a->allocated_qty,
                    'note' => $a->note,
                    'allocated_at' => $a->allocated_at,
                    'allocator' => $a->allocator,
                ]),
            ],
        ]);
    }
}
