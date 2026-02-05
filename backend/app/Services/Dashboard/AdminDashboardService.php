<?php

namespace App\Services\Dashboard;

use App\Models\Request as AssetRequest;
use App\Models\Stock;
use App\Models\StockMovement;
use Carbon\Carbon;

class AdminDashboardService
{
    public function build(Carbon $startDate, Carbon $endDate): array
    {
        $start = $startDate->copy()->startOfMonth();
        $end   = $endDate->copy()->endOfMonth();
        $totalStockToday = (int) Stock::sum('qty_current');
        $usedInRange = (int) $this->totalOutInRange($start, $end);
        $expiredStocks = 0;

        return [
            'stocks' => [
                'total' => $totalStockToday,
                'used' => $usedInRange,
                'available' => $totalStockToday,
                'expired' => $expiredStocks,
            ],
            'request_chart' => $this->requestCountPerMonth($start, $end),
        ];
    }

    private function totalOutInRange(Carbon $start, Carbon $end): int
    {
        return (int) StockMovement::where('type', 'out')
            ->whereBetween('created_at', [$start, $end])
            ->sum('quantity');
    }
    
    private function requestCountPerMonth(Carbon $start, Carbon $end): array
    {
        $rows = AssetRequest::whereBetween('created_at', [$start, $end])
            ->selectRaw("
                to_char(created_at, 'YYYY-MM') AS ym,
                COUNT(*) AS total
            ")
            ->groupBy('ym')
            ->orderBy('ym')
            ->get();

        $countByMonth = $rows->pluck('total', 'ym')->toArray();
        $cursor = $start->copy()->startOfMonth();
        $result = [];

        while ($cursor <= $end) {
            $ym = $cursor->format('Y-m');

            $result[] = [
                'month' => $cursor->format('M'),
                'total' => (int) ($countByMonth[$ym] ?? 0),
            ];

            $cursor->addMonth();
        }

        return $result;
    }
}
