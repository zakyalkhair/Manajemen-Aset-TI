<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\Admin\AddStockRequest;
use App\Http\Requests\Admin\StoreAssetRequest;
use App\Http\Requests\Admin\UpdateAssetRequest;
use App\Services\Inventory\InventoryService;
use Illuminate\Http\JsonResponse;

class InventoryController
{
    public function __construct(
        private InventoryService $service
    ) {}

    public function index(): JsonResponse
    {
        $data = $this->service->listAssets();

        return response()->json([
            'success' => true,
            'message' => null,
            'data' => $data,
        ]);
    }

    public function showStock(int $assetId): JsonResponse
    {
        $data = $this->service->getStockDetail($assetId);

        return response()->json([
            'success' => true,
            'message' => null,
            'data' => [
                'asset' => [
                    'id' => $data['asset']->id,
                    'asset_code' => $data['asset']->asset_code,
                    'asset_name' => $data['asset']->asset_name,
                    'brand' => $data['asset']->brand,
                    'created_at' => $data['asset']->created_at,
                ],
                'stock' => [
                    'qty_current' => $data['stock']?->qty_current ?? 0,
                    'updated_at' => $data['stock']?->updated_at,
                ],
                'movements' => $data['movements']->map(fn ($m) => [
                    'type' => $m->type,
                    'quantity' => $m->quantity,
                    'note' => $m->note,
                    'created_at' => $m->created_at,
                    'creator_name' => $m->creator?->name,
                ]),
            ],
        ]);
    }

    public function addStock(AddStockRequest $request, int $assetId): JsonResponse
    {
        $stock = $this->service->addStock(
            assetId: $assetId,
            quantity: (int) $request->quantity,
            note: $request->note
        );

        return response()->json([
            'success' => true,
            'message' => "Stok berhasil ditambahkan (+{$request->quantity})",
            'data' => [
                'asset_id' => $assetId,
                'qty_current' => $stock->qty_current,
            ],
        ]);
    }

    public function store(StoreAssetRequest $request): JsonResponse
    {
        $asset = $this->service->registerAsset($request->validated());

        return response()->json([
            'success' => true,
            'message' => "Aset '{$asset->asset_name}' berhasil didaftarkan.",
            'data' => $asset,
        ], 201);
    }

    public function update(UpdateAssetRequest $request, int $assetId): JsonResponse
    {
        $asset = $this->service->updateAsset($assetId, $request->validated());

        return response()->json([
            'success' => true,
            'message' => "Data aset '{$asset->asset_name}' berhasil diperbarui.",
            'data' => $asset,
        ]);
    }

    public function destroy(int $assetId): JsonResponse
    {
        $this->service->deleteAsset($assetId);

        return response()->json([
            'success' => true,
            'message' => 'Aset berhasil dihapus',
            'data' => null,
        ]);
    }
}
