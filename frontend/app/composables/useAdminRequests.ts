import type { AdminRequestDetail, AdminRequestListItem } from "~/types/adminRequest";
import type { Paginated } from "~/types/api";

export const useAdminRequests = () => {
  const { get, patch, post } = useApiData()

  const fetchAll = async () => {
    const page = await get<Paginated<AdminRequestListItem>>('/admin/request')
    return page.data
  }

  const fetchDetail = async (id: number) => {
    return await get<AdminRequestDetail>(`/admin/request/${id}`)
  }

  const approve = async (id: number) => {
    await patch<null>(`/admin/request/${id}/approve`)
  }

  const reject = async (id: number, reason: string) => {
    await patch<null>(`/admin/request/${id}/reject`, { reason })
  }

  const allocate = async (
    id: number,
    qty: number,
    note?: string,
  ) => {
    await post<null>(`/admin/request/${id}/allocate`, {
      qty_to_allocate: qty,
      note,
    })
  }

  return {
    fetchAll,
    fetchDetail,
    approve,
    reject,
    allocate,
  }
}
