export interface InventoryAssetSummary {
  asset_id: number
  asset_code: string
  asset_name: string
  brand?: string | null
  created_at?: string | null
  qty_total: number
  qty_available: number
  qty_used: number
  qty_requested: number
}

export type StockMovementType = 'in' | 'out'

export interface StockMovement {
  type: StockMovementType
  quantity: number
  note?: string | null
  created_at: string
  creator_name?: string | null
}

export interface InventoryStockDetail {
  asset: {
    id: number
    asset_code: string
    asset_name: string
    brand?: string | null
    created_at?: string | null
  }
  stock: {
    qty_current: number
    updated_at?: string | null
  }
  movements: StockMovement[]
}
