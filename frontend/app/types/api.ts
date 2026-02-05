export type ApiResponse<T> = {
  success: boolean
  message?: string | null
  data: T
}

export type Paginated<T> = {
  data: T[]
  current_page: number
  last_page: number
  per_page: number
  total: number
  from: number | null
  to: number | null
}
