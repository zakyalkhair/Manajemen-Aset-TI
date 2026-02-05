<script setup lang="ts">
import ConfirmModal from "~/components/molecules/ConfirmModal.vue";

const emit = defineEmits(["deleted"]);

const props = defineProps<{
  asset: {
    asset_id: number;
    asset_code: string;
    asset_name: string;
    brand?: string | null;
    qty_available: number;
    qty_used: number;
    created_at?: string | null;
  };
}>();

const { del } = useApiData();

const goDetail = () => {
  navigateTo(`/admin/inventory/${props.asset.asset_id}`);
};

const confirmOpen = ref(false);
const deleteError = ref<string | null>(null);
const deleting = ref(false);
const availableQty = computed(() => props.asset.qty_available ?? 0);
const usedQty = computed(() => props.asset.qty_used ?? 0);
const totalQty = computed(() => availableQty.value + usedQty.value);
const confirmMessage = computed(() => `Hapus aset "${props.asset.asset_name}"?`);
const ageLabel = computed(() => {
  const createdAt = props.asset.created_at;
  if (!createdAt) return "-";
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return "-";
  const now = new Date();
  const months =
    (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth());
  if (months < 0) return "-";
  if (months < 1) return "< 1 Bulan";
  if (months < 12) return `${months} Bulan`;
  return `${Math.floor(months / 12)} Tahun`;
});

const requestDelete = (e: Event) => {
  e.stopPropagation();
  deleteError.value = null;
  confirmOpen.value = true;
};

const cancelDelete = () => {
  if (deleting.value) return;
  confirmOpen.value = false;
};

const confirmDelete = async () => {
  deleting.value = true;
  deleteError.value = null;
  try {
    await del<null>(`/admin/inventory/${props.asset.asset_id}`);
    confirmOpen.value = false;
    emit("deleted");
  } catch {
    deleteError.value = "Gagal menghapus aset";
  } finally {
    deleting.value = false;
  }
};
</script>

<template>
  <div class="card" @click="goDetail">
    <div class="top">
      <span class="code">#{{ asset.asset_code }}</span>
      <span class="age">{{ ageLabel }}</span>
    </div>

    <h3>{{ asset.asset_name }}</h3>
    <p class="brand">{{ asset.brand || "-" }}</p>

    <p class="stock">
      <span class="available">{{ availableQty }}</span>
      /
      {{ totalQty }} Unit
    </p>

    <div class="actions">
      <button class="primary">Lihat Stock</button>
      <img class="icon" src="/delete.png" alt="Hapus" @click="requestDelete" />
    </div>

    <p v-if="deleteError" class="error">{{ deleteError }}</p>
  </div>

  <ConfirmModal
    :open="confirmOpen"
    title="Hapus Aset"
    :message="confirmMessage"
    confirm-text="Hapus"
    cancel-text="Batal"
    @cancel="cancelDelete"
    @confirm="confirmDelete"
  />
</template>

<style scoped>
.card {
  background: #fff;
  padding: 22px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  width: 381px;
  cursor: pointer;
  transition:
    box-shadow 0.2s,
    transform 0.12s;
}

.card:hover {
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.08);
}

.card:active {
  transform: scale(0.98);
}

.top {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #6b7280;
}

h3 {
  margin: 6px 0 2px;
  font-size: 18px;
}

.brand {
  font-size: 13px;
  color: #6b7280;
}

.stock {
  margin-top: 8px;
  font-size: 14px;
}

.available {
  color: #16a34a;
  font-weight: 600;
}

.actions {
  margin-top: 14px;
  display: flex;
  gap: 8px;
}

.primary {
  flex: 1;
  background: #ff8a2b;
  color: #fff;
  border: none;
  padding: 8px;
  border-radius: 8px;
  font-size: 13px;
  transition:
    background 0.2s,
    transform 0.1s;
}

.primary:hover {
  background: #ea580c;
}

.primary:active {
  transform: scale(0.96);
}

.icon {
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;
}

.icon:hover {
  background: #e5e7eb;
}

.icon:active {
  transform: scale(0.92);
}

.error {
  margin: 10px 0 0;
  font-size: 12px;
  color: #b91c1c;
}
</style>
