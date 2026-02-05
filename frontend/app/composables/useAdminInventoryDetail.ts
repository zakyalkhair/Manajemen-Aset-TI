import type { InventoryStockDetail, StockMovement } from "~/types/inventory"
import { normalizeHttpError } from "~/utils/httpError"

export const useAdminInventoryDetail = () => {
  const route = useRoute()
  const { get, post } = useApiData()

  const asset = ref<InventoryStockDetail["asset"] | null>(null)
  const stock = ref<InventoryStockDetail["stock"] | null>(null)
  const movements = ref<StockMovement[]>([])
  const error = ref<string | null>(null)
  const notice = ref<string | null>(null)
  const showModal = ref(false)
  const qty = ref(1)
  const note = ref("")
  const loading = ref(false)

  const totalUsed = computed(() => {
    return movements.value.reduce((sum, m) => {
      return m.type === "out" ? sum + m.quantity : sum
    }, 0)
  })
  const totalAvailable = computed(() => stock.value?.qty_current ?? 0)
  const totalAsset = computed(() => totalAvailable.value + totalUsed.value)

  const loadDetail = async () => {
    error.value = null
    try {
      const detail = await get<InventoryStockDetail>(
        `/admin/inventory/${route.params.id}/stock`
      )
      asset.value = detail.asset
      stock.value = detail.stock
      movements.value = detail.movements
    } catch (e) {
      error.value = normalizeHttpError(e).message || "Gagal memuat detail inventory"
    }
  }

  const openModal = () => {
    qty.value = 1
    note.value = ""
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  const submitStock = async () => {
    notice.value = null
    if (qty.value < 1) {
      notice.value = "Jumlah minimal 1"
      return
    }
    loading.value = true
    try {
      await post(`/admin/inventory/${route.params.id}/add-stock`, {
        quantity: qty.value,
        note: note.value,
      })
      notice.value = `Stok berhasil ditambahkan (+${qty.value})`
      showModal.value = false
      await loadDetail()
    } catch (e) {
      notice.value = normalizeHttpError(e).message || "Gagal menambahkan stok"
    } finally {
      loading.value = false
    }
  }

  return {
    asset,
    stock,
    movements,
    error,
    notice,
    showModal,
    qty,
    note,
    loading,
    totalUsed,
    totalAvailable,
    totalAsset,
    loadDetail,
    openModal,
    closeModal,
    submitStock,
  }
}
