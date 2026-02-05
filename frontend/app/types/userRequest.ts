import type { RequestStatus } from '~/utils/requestStatus'

export interface UserRequestSummary {
  id: number
  ndk: string
  asset_name: string
  quantity: number
  description: string
  status: RequestStatus
}
