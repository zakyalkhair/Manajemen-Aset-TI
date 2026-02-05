import type { UserProfile } from "~/types/user"
import type { AdminDashboardData } from "~/types/adminDashboard"

export const useAdminDashboard = () => {
  const { get } = useApiData()

  const user = ref<UserProfile | null>(null)
  const dashboard = ref<AdminDashboardData | null>(null)

  const today = new Date()
  const endDate = ref(today.toISOString().split("T")[0])
  const startDate = ref(
    new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split("T")[0]
  )

  const fetchUser = async () => {
    try {
      user.value = await get<UserProfile>("/admin/profile")
    } catch (e) {
      console.error("Gagal load user", e)
    }
  }

  const fetchDashboard = async () => {
    dashboard.value = await get<AdminDashboardData>("/admin/dashboard", {
      params: {
        start_date: startDate.value,
        end_date: endDate.value,
      },
    })
  }

  const usedStocks = computed(() => dashboard.value?.stocks?.used || 0)
  const availableStocks = computed(() => dashboard.value?.stocks?.available || 0)
  const expiredStocks = computed(() => dashboard.value?.stocks?.expired || 0)
  const totalRequests = computed(() => {
    if (!dashboard.value?.request_chart) return 0
    return dashboard.value.request_chart.reduce((sum, item) => sum + item.total, 0)
  })

  return {
    user,
    dashboard,
    startDate,
    endDate,
    fetchUser,
    fetchDashboard,
    usedStocks,
    availableStocks,
    expiredStocks,
    totalRequests,
  }
}
