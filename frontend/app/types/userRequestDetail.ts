import type { RequestStatus } from '~/utils/requestStatus'

export interface UserRequestDetail {
  id: number
  ndk: string
  status: RequestStatus
  status_label?: string
  created_at: string

  requester_name: string
  department: string

  asset_name: string
  brand?: string

  quantity_requested: number
  description: string

  rejected_by_name?: string
  rejection_reason?: string
}
