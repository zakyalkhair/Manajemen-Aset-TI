export interface AdminDashboardStockChartPoint {
  month: string
  total: number
}

export interface AdminDashboardData {
  stocks: {
    total: number
    used: number
    available: number
    expired: number
  }
  request_chart: AdminDashboardStockChartPoint[]
}
