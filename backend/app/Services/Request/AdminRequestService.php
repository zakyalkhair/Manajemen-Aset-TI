<?php

namespace App\Services\Request;

use App\Enums\RequestStatus;
use App\Models\Allocation;
use App\Models\Request as AssetRequest;
use App\Models\Stock;
use App\Models\StockMovement;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Exceptions\DomainException;

class AdminRequestService
{
    public function approve(int $requestId): AssetRequest
    {
        $assetRequest = AssetRequest::findOrFail($requestId);

        if ($assetRequest->status !== RequestStatus::MENUNGGU_PERSETUJUAN) {
            throw new DomainException('Permintaan tidak dapat disetujui', 400);
        }

        $assetRequest->update([
            'status' => RequestStatus::MENUNGGU_BARANG->value,
            'approved_by' => Auth::id(),
            'approved_at' => now(),
        ]);

        return $assetRequest;
    }

    public function reject(int $requestId, string $reason): AssetRequest
    {
        $assetRequest = AssetRequest::findOrFail($requestId);

        if ($assetRequest->status !== RequestStatus::MENUNGGU_PERSETUJUAN) {
            throw new DomainException('Permintaan tidak dapat ditolak', 400);
        }

        $assetRequest->update([
            'status' => RequestStatus::DITOLAK->value,
            'rejected_by' => Auth::id(),
            'rejected_at' => now(),
            'rejection_reason' => $reason,
        ]);

        return $assetRequest;
    }

    public function allocate(int $requestId, int $qtyToGive, ?string $note = null): AssetRequest
    {
        $assetRequest = AssetRequest::findOrFail($requestId);

        if ($assetRequest->status !== RequestStatus::MENUNGGU_BARANG) {
            throw new DomainException('Permintaan tidak dapat dialokasikan', 400);
        }

        return DB::transaction(function () use ($assetRequest, $qtyToGive, $note) {
            $remainingNeeded = $assetRequest->quantity_requested - $assetRequest->quantity_filled;

            if ($qtyToGive > $remainingNeeded) {
                throw new DomainException("Jumlah input ($qtyToGive) melebihi sisa kebutuhan ($remainingNeeded).", 400);
            }

            $stock = Stock::where('asset_id', $assetRequest->asset_id)
                ->lockForUpdate()
                ->first();

            if (!$stock || $stock->qty_current < $qtyToGive) {
                throw new DomainException('Stok di gudang tidak mencukupi', 400);
            }

            $stock->decrement('qty_current', $qtyToGive);

            Allocation::create([
                'request_id' => $assetRequest->id,
                'allocated_qty' => $qtyToGive,
                'note' => $note,
                'allocated_by' => Auth::id(),
                'allocated_at' => now(),
            ]);

            StockMovement::create([
                'asset_id' => $assetRequest->asset_id,
                'type' => 'out',
                'quantity' => $qtyToGive,
                'note' => $note,
                'created_by' => Auth::id(),
                'created_at' => now(),
            ]);

            $assetRequest->increment('quantity_filled', $qtyToGive);

            $fresh = $assetRequest->fresh();

            if ($fresh->quantity_filled >= $fresh->quantity_requested) {
                $fresh->update([
                    'status' => RequestStatus::DIPAKAI->value,
                    'fulfilled_at' => now(),
                ]);
            }

            return $fresh;
        });
    }

    public function getDetail(int $requestId): array
    {
        $request = AssetRequest::with([
            'requester:id,name',
            'asset:id,asset_name,brand',
            'approver:id,name',
            'allocations.allocator:id,name',
        ])->findOrFail($requestId);

        $stock = Stock::where('asset_id', $request->asset_id)->first();

        return [
            'request' => $request,
            'stock_available' => $stock?->qty_current ?? 0,
        ];
    }
}
