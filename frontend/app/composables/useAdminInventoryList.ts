import type { InventoryAssetSummary } from "~/types/inventory"

export const useAdminInventoryList = () => {
  const { get } = useApiData()

  const assets = ref<InventoryAssetSummary[]>([])
  const error = ref<string | null>(null)
  const searchText = ref("")

  const loadInventory = async () => {
    error.value = null
    try {
      assets.value = await get<InventoryAssetSummary[]>("/admin/inventory")
    } catch {
      error.value = "Gagal memuat inventory"
    }
  }

  const filteredAssets = computed(() => {
    if (!searchText.value) return assets.value
    const q = searchText.value.toLowerCase()
    return assets.value.filter(
      (a) =>
        a.asset_code?.toLowerCase().includes(q) ||
        a.asset_name?.toLowerCase().includes(q) ||
        a.brand?.toLowerCase().includes(q)
    )
  })

  return {
    assets,
    error,
    searchText,
    loadInventory,
    filteredAssets,
  }
}
