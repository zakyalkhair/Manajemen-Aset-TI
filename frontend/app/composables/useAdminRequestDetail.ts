import type { AdminRequestDetail } from "~/types/adminRequest"
import { normalizeHttpError } from "~/utils/httpError"

export const useAdminRequestDetail = () => {
  const { get, patch, post } = useApiData()
  const route = useRoute()

  const loading = ref(true)
  const request = ref<AdminRequestDetail | null>(null)
  const error = ref<string | null>(null)
  const notice = ref<string | null>(null)

  const rejectOpen = ref(false)
  const allocateQty = ref(0)
  const allocateNote = ref("")

  const fetchDetail = async () => {
    loading.value = true
    error.value = null
    try {
      request.value = await get<AdminRequestDetail>(`/admin/request/${route.params.id}`)
    } catch (e) {
      error.value = normalizeHttpError(e).message || "Gagal memuat detail permintaan"
    } finally {
      loading.value = false
    }
  }

  const remainingQty = computed(() => {
    if (!request.value) return 0
    return request.value.quantity_requested - request.value.quantity_filled
  })

  const stockAvailable = computed(() => {
    return request.value?.stock_available ?? 0
  })

  const canAllocate = computed(() => {
    return (
      allocateQty.value > 0 &&
      allocateQty.value <= remainingQty.value &&
      stockAvailable.value >= allocateQty.value
    )
  })

  const approve = async () => {
    if (!request.value) return
    notice.value = null
    try {
      await patch<null>(`/admin/request/${request.value.id}/approve`)
      await fetchDetail()
    } catch (e) {
      notice.value = normalizeHttpError(e).message || "Approve gagal"
      await fetchDetail()
    }
  }

  const reject = () => {
    rejectOpen.value = true
  }

  const submitReject = async (payload: { reason: string }) => {
    if (!request.value) return
    notice.value = null
    try {
      await patch<null>(`/admin/request/${request.value.id}/reject`, { reason: payload.reason })
      rejectOpen.value = false
      await fetchDetail()
    } catch (e) {
      notice.value = normalizeHttpError(e).message || "Reject gagal"
      rejectOpen.value = false
      await fetchDetail()
    }
  }

  const allocate = async () => {
    if (!canAllocate.value) return
    if (!request.value) return

    try {
      await post<null>(`/admin/request/${request.value.id}/allocate`, {
        qty_to_allocate: allocateQty.value,
        note: allocateNote.value,
      })
    } catch (e) {
      notice.value = normalizeHttpError(e).message || "Alokasi gagal"
    }

    allocateQty.value = 0
    allocateNote.value = ""
    fetchDetail()
  }

  return {
    loading,
    request,
    error,
    notice,
    rejectOpen,
    allocateQty,
    allocateNote,
    fetchDetail,
    remainingQty,
    stockAvailable,
    canAllocate,
    approve,
    reject,
    submitReject,
    allocate,
  }
}
