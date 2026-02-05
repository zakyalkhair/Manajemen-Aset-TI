import type { Asset } from '~/types/asset'

export const useUserRequestCreate = () => {
  const { get, post } = useApiData()

  const assets = ref<Asset[]>([])
  const selectedAsset = ref<Asset | null>(null)

  const form = reactive({
    asset_id: '' as number | '',
    quantity: 1,
    department: '',
    description: '',
  })

  const errors = reactive({
    asset_id: '',
    quantity: '',
    department: '',
  })

  const loading = ref(false)

  const loadAssets = async () => {
    assets.value = await get<Asset[]>('/user/assets')
  }

  const applyItem = () => {
    selectedAsset.value =
      assets.value.find(a => a.id === Number(form.asset_id)) || null
  }

  const validate = () => {
    errors.department = ''
    errors.asset_id = ''
    errors.quantity = ''

    if (!form.department) {
      errors.department = 'Departemen wajib diisi'
    }

    if (!form.asset_id) {
      errors.asset_id = 'Aset wajib dipilih'
    }

    if (form.quantity < 1) {
      errors.quantity = 'Jumlah minimal 1'
    }

    return !Object.values(errors).some(Boolean)
  }

  const submit = async () => {
    if (!validate()) {
      throw new Error('Validasi Gagal')
    }

    loading.value = true
    try {
      const assetId = Number(form.asset_id)
      if (!assetId) {
        throw new Error('Aset wajib dipilih')
      }

      const asset = selectedAsset.value || assets.value.find(a => a.id === assetId)
      if (!asset) {
        throw new Error('Aset tidak ditemukan')
      }

      const created = await post<{ id: number }>('/user/request', {
        asset_id: assetId,
        quantity_requested: form.quantity,
        department: form.department,
        description: form.description,
      })
      return created
    } finally {
      loading.value = false
    }
  }

  return {
    assets,
    selectedAsset,
    form,
    errors,
    loading,
    loadAssets,
    applyItem,
    submit,
  }
}
