import type { AdminRequestListItem } from "~/types/adminRequest"
import { normalizeHttpError } from "~/utils/httpError"
import { useAdminRequests } from "~/composables/useAdminRequests"

export const useAdminRequestList = () => {
  const { fetchAll, approve: approveApi, reject: rejectApi, allocate: allocateApi } =
    useAdminRequests()

  const requests = ref<AdminRequestListItem[]>([])
  const loading = ref(true)
  const searchText = ref("")
  const error = ref<string | null>(null)
  const notice = ref<string | null>(null)

  const rejectOpen = ref(false)
  const rejectTargetId = ref<number | null>(null)

  const allocateOpen = ref(false)
  const allocateTarget = ref<AdminRequestListItem | null>(null)

  const fetchRequests = async () => {
    loading.value = true
    error.value = null
    try {
      requests.value = await fetchAll()
    } catch (e) {
      error.value = normalizeHttpError(e).message || "Gagal memuat data permintaan"
    } finally {
      loading.value = false
    }
  }

  const filteredRequests = computed(() => {
    if (!searchText.value) return requests.value

    const q = searchText.value.toLowerCase()

    return requests.value.filter((r) =>
      r.ndk?.toLowerCase().includes(q) ||
      r.requester?.name?.toLowerCase().includes(q) ||
      r.department?.toLowerCase().includes(q) ||
      r.asset?.asset_name?.toLowerCase().includes(q) ||
      r.status?.toLowerCase().includes(q)
    )
  })

  const remainingQty = (r: AdminRequestListItem) =>
    r.quantity_requested - (r.quantity_filled ?? 0)

  const approve = async (id: number) => {
    notice.value = null
    try {
      await approveApi(id)
      await fetchRequests()
    } catch (e) {
      notice.value = normalizeHttpError(e).message || "Approve gagal"
    }
  }

  const openReject = (id: number) => {
    rejectTargetId.value = id
    rejectOpen.value = true
  }

  const submitReject = async (payload: { reason: string }) => {
    if (!rejectTargetId.value) return
    notice.value = null
    try {
      await rejectApi(rejectTargetId.value, payload.reason)
      rejectOpen.value = false
      rejectTargetId.value = null
      await fetchRequests()
    } catch (e) {
      notice.value = normalizeHttpError(e).message || "Reject gagal"
    }
  }

  const openAllocate = (r: AdminRequestListItem) => {
    allocateTarget.value = r
    allocateOpen.value = true
  }

  const submitAllocate = async (payload: { qty: number; note: string }) => {
    if (!allocateTarget.value) return

    notice.value = null
    try {
      await allocateApi(allocateTarget.value.id, payload.qty, payload.note || undefined)
      allocateOpen.value = false
      allocateTarget.value = null
      await fetchRequests()
    } catch (e) {
      notice.value = normalizeHttpError(e).message || "Alokasi gagal"
    }
  }

  return {
    requests,
    loading,
    searchText,
    error,
    notice,
    rejectOpen,
    rejectTargetId,
    allocateOpen,
    allocateTarget,
    fetchRequests,
    filteredRequests,
    remainingQty,
    approve,
    openReject,
    submitReject,
    openAllocate,
    submitAllocate,
  }
}
