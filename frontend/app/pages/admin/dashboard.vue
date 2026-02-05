<script setup lang="ts">

import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
} from "chart.js";

Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
);

definePageMeta({
  middleware: ["auth", "admin"],
});

import AdminPageShell from "~/components/organisms/AdminPageShell.vue";
import AdminHeader from "~/components/organisms/AdminHeader.vue";
import { useAdminDashboard } from "~/composables/useAdminDashboard";
import AdminSummaryCard from "~/components/molecules/AdminSummaryCard.vue";

const {
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
} = useAdminDashboard();

const chartRef = ref<HTMLCanvasElement | null>(null);
let chartInstance: Chart | null = null;
const renderChart = () => {
  if (!dashboard.value || !chartRef.value) return;
  const labels = dashboard.value.request_chart.map((i) => i.month);
  const data = dashboard.value.request_chart.map((i) => i.total);
  if (chartInstance) {
    chartInstance.destroy();
  }
  chartInstance = new Chart(chartRef.value, {
    type: "line",
    data: {
      labels,
      datasets: [
        {
          label: "Request Masuk",
          data,
          borderColor: "#fb923c",
          backgroundColor: "#fb923c",
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 1 },
        },
      },
    },
  });
};

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
});

onMounted(() => {
  fetchUser();
  fetchDashboard();
});

watch([startDate, endDate], () => {
  fetchDashboard();
});

watch(
  () => dashboard.value,
  () => {
    renderChart();
  }
);
</script>

<template>
  <AdminPageShell>
      <AdminHeader title="Dashboard">
        <template #actions>
          <div class="date-filter">
            <input type="date" v-model="startDate" />
            <span>-</span>
            <input type="date" v-model="endDate" />
          </div>
        </template>
      </AdminHeader>
      <h2 class="welcome">Welcome, {{ user?.name || "User" }}</h2>
      <p class="subtitle">Ada {{ availableStocks }} aset TI yang tersedia</p>
      <div class="cards">
        <div class="donut-card">
          <div>
            <h3 class="orange">{{ totalRequests }}</h3>
            <p>Total permintaan aset</p>
          </div>
        </div>
        <AdminSummaryCard title="Jumlah aset yang dipakai" :value="usedStocks" />
        <AdminSummaryCard title="Jumlah aset yang tersedia" :value="availableStocks" />
        <AdminSummaryCard title="Jumlah aset yang expired" :value="expiredStocks" tone="danger" />
      </div>
      <div class="chart">
        <div class="chart-header">
          <h3>Request Aset TI</h3>
          <span>Per Bulan</span>
        </div>
        <div class="chart-box">
          <canvas ref="chartRef"></canvas>
        </div>
      </div>
  </AdminPageShell>
</template>

<style scoped>

.welcome {
  margin: 0;
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: 600;
}

.logo {
  height: 40px;
  margin-bottom: 40px;
}

.menu a {
  display: block;
  padding: 10px 14px;
  margin-bottom: 6px;
  border-radius: 10px;
  color: #374151;
  text-decoration: none;
  cursor: pointer;
}

.menu a.active {
  background: #fff3e8;
  color: #f97316;
  font-weight: 600;
}

.date-filter {
  display: flex;
  gap: 8px;
  align-items: center;
}

.date-filter input {
  padding: 6px 10px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
}

.subtitle {
  color: #6b7280;
  margin-bottom: 20px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.green {
  color: #22c55e;
}

.orange {
  color: #f97316;
}

.donut-card {
  background: white;
  padding: 22px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
}

.donut-card h3 {
  font-size: 26px;
  margin: 0;
}

.chart {
  background: white;
  padding: 22px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.chart-box {
  height: 280px;
}
</style>
