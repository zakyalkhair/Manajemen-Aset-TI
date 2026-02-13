import type { InventoryStockDetail, StockMovement } from "~/types/inventory"
import { normalizeHttpError } from "~/utils/httpError"

export const useAdminInventoryDetail = () => {
  const route = useRoute()
  const { get, post, put } = useApiData()

  const asset = ref<InventoryStockDetail["asset"] | null>(null)
  const stock = ref<InventoryStockDetail["stock"] | null>(null)
  const movements = ref<StockMovement[]>([])
  const error = ref<string | null>(null)
  const notice = ref<string | null>(null)
  const showModal = ref(false)
  const qty = ref(1)
  const note = ref("")
  const loading = ref(false)
  const showEditModal = ref(false)
  const editLoading = ref(false)
  const editError = ref<string | null>(null)
  const editForm = reactive({
    asset_code: "",
    asset_name: "",
    brand: "",
  })

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
      editForm.asset_code = detail.asset.asset_code ?? ""
      editForm.asset_name = detail.asset.asset_name ?? ""
      editForm.brand = detail.asset.brand ?? ""
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

  const openEditModal = () => {
    editError.value = null
    editForm.asset_code = asset.value?.asset_code ?? ""
    editForm.asset_name = asset.value?.asset_name ?? ""
    editForm.brand = asset.value?.brand ?? ""
    showEditModal.value = true
  }

  const closeEditModal = () => {
    if (editLoading.value) return
    showEditModal.value = false
  }

  const submitEdit = async () => {
    editError.value = null
    if (!editForm.asset_code || !editForm.asset_name) {
      editError.value = "Kode aset dan nama aset wajib diisi"
      return
    }
    editLoading.value = true
    try {
      const updated = await put<InventoryStockDetail["asset"]>(
        `/admin/inventory/${route.params.id}/stock/edit`,
        {
          asset_code: editForm.asset_code,
          asset_name: editForm.asset_name,
          brand: editForm.brand || null,
        }
      )
      asset.value = {
        ...(asset.value ?? { id: Number(route.params.id) }),
        ...updated,
      }
      showEditModal.value = false
      notice.value = "Data aset berhasil diperbarui"
    } catch (e) {
      editError.value = normalizeHttpError(e).message || "Gagal memperbarui aset"
    } finally {
      editLoading.value = false
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
    showEditModal,
    editLoading,
    editError,
    editForm,
    totalUsed,
    totalAvailable,
    totalAsset,
    loadDetail,
    openModal,
    closeModal,
    submitStock,
    openEditModal,
    closeEditModal,
    submitEdit,
  }
}
