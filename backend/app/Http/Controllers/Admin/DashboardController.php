<?php

namespace App\Http\Controllers\Admin;

use App\Services\Dashboard\AdminDashboardService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController
{
    public function __construct(
        private AdminDashboardService $service
    ) {}

    public function dashboard(Request $request): JsonResponse
    {
        $startDate = Carbon::parse(
            $request->query('start_date', now()->startOfYear())
        )->startOfMonth();

        $endDate = Carbon::parse(
            $request->query('end_date', now()->endOfYear())
        )->endOfMonth();

        $data = $this->service->build($startDate, $endDate);

        return response()->json([
            'success' => true,
            'data' => $data,
        ]);
    }
}
