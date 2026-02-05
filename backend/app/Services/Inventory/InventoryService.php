<?php

namespace App\Services\Inventory;

use App\Models\Asset;
use App\Models\Stock;
use App\Models\StockMovement;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\Request as AssetRequest;


class InventoryService
{
    public function addStock(int $assetId, int $quantity, ?string $note = null): Stock
    {
        return DB::transaction(function () use ($assetId, $quantity, $note) {
            $asset = Asset::findOrFail($assetId);

            $stock = Stock::firstOrCreate(
                ['asset_id' => $asset->id],
                [
                    'qty_current' => 0,
                    'updated_by' => Auth::id(),
                ]
            );

            $stock->increment('qty_current', $quantity);
            $stock->update(['updated_by' => Auth::id()]);

            StockMovement::create([
                'asset_id' => $asset->id,
                'type' => 'in',
                'quantity' => $quantity,
                'note' => $note,
                'created_by' => Auth::id(),
                'created_at' => now(),
            ]);

            return $stock;
        });
    }

    public function getStockDetail(int $assetId): array
    {
        $asset = Asset::with(['stock', 'stockMovements.creator:id,name'])
            ->findOrFail($assetId);

        return [
            'asset' => $asset,
            'stock' => $asset->stock,
            'movements' => $asset->stockMovements
                ->sortByDesc('created_at')
                ->values(),
        ];
    }



    public function registerAsset(array $data): Asset
    {
        return DB::transaction(function () use ($data) {
            $assetCode = $data['asset_code'] ?? 'AST-' . strtoupper(uniqid());

            $asset = Asset::create([
                'asset_code' => $assetCode,
                'asset_name' => $data['asset_name'],
                'brand' => $data['brand'] ?? null,
            ]);

            Stock::create([
                'asset_id' => $asset->id,
                'qty_current' => 0,
                'updated_by' => Auth::id(),
            ]);

            return $asset;
        });
    }

    public function updateAsset(int $assetId, array $data): Asset
    {
        $asset = Asset::findOrFail($assetId);

        $asset->update([
            'asset_code' => $data['asset_code'],
            'asset_name' => $data['asset_name'],
            'brand' => $data['brand'] ?? null,
        ]);

        return $asset;
    }

    public function deleteAsset(int $assetId): void
    {
        $asset = Asset::findOrFail($assetId);
        $asset->delete();
    }

    public function listAssets()
    {
        $assets = Asset::with('stock')
            ->whereNull('deleted_at')
            ->get();

        $requestsSummary = AssetRequest::select(
            'asset_id',
            DB::raw('SUM(quantity_requested) as total_requested'),
            DB::raw('SUM(quantity_filled) as total_filled')
        )
            ->groupBy('asset_id')
            ->get()
            ->keyBy('asset_id');

        return $assets->map(function ($asset) use ($requestsSummary) {
            $summary = $requestsSummary->get($asset->id);

            $totalRequested = $summary?->total_requested ?? 0;
            $totalFilled = $summary?->total_filled ?? 0;

            return [
                'asset_id' => $asset->id,
                'asset_code' => $asset->asset_code,
                'asset_name' => $asset->asset_name,
                'brand' => $asset->brand,
                'created_at' => $asset->created_at,
                'qty_total' => ($asset->stock?->qty_current ?? 0) + $totalFilled,
                'qty_available' => $asset->stock?->qty_current ?? 0,
                'qty_used' => $totalFilled,
                'qty_requested' => $totalRequested,
            ];
        });
    }
}
