import { normalizeHttpError } from "~/utils/httpError"

export const useAdminInventoryCreate = () => {
  const { post } = useApiData()
  const router = useRouter()

  const loading = ref(false)
  const error = ref<string | null>(null)
  const form = reactive({
    asset_code: "",
    asset_name: "",
    brand: "",
  })

  const submit = async () => {
    error.value = null
    if (!form.asset_name || !form.brand) {
      error.value = "Nama aset dan merk wajib diisi"
      return
    }
    loading.value = true
    try {
      await post("/admin/inventory/register-assets", {
        asset_code: form.asset_code || null,
        asset_name: form.asset_name,
        brand: form.brand,
      })
      router.push("/admin/inventory")
    } catch (e) {
      error.value = normalizeHttpError(e).message || "Gagal mendaftarkan aset"
    } finally {
      loading.value = false
    }
  }

  const cancel = () => {
    router.back()
  }

  return {
    loading,
    error,
    form,
    submit,
    cancel,
  }
}
