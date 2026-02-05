import type { RequestStatus } from '~/utils/requestStatus'

export interface AdminRequestListItem {
  id: number
  ndk: string
  status: RequestStatus
  status_label?: string | null
  department: string
  created_at: string
  quantity_requested: number
  quantity_filled: number
  requester?: {
    id: number
    name: string
  } | null
  asset?: {
    id: number
    asset_name: string
  } | null
  approver?: {
    id: number
    name: string
  } | null
}

export interface AdminRequestAllocation {
  id: number
  allocated_qty: number
  note?: string | null
  allocated_at: string
  allocator?: {
    id: number
    name: string
  } | null
}

export interface AdminRequestDetail {
  id: number
  ndk: string
  status: RequestStatus
  status_label?: string | null
  requester: {
    id: number
    name: string
  } | null
  department: string
  asset: {
    id: number
    asset_name: string
    brand?: string | null
  } | null
  quantity_requested: number
  quantity_filled: number
  description?: string | null
  created_at: string
  approver?: {
    id: number
    name: string
  } | null
  stock_available: number
  allocations: AdminRequestAllocation[]
}
