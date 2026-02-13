<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
});

import AdminPageShell from "~/components/organisms/AdminPageShell.vue";
import AdminHeader from "~/components/organisms/AdminHeader.vue";
import StateBanner from "~/components/atoms/StateBanner.vue";
import { useAdminInventoryDetail } from "~/composables/useAdminInventoryDetail";
import AdminSummaryCard from "~/components/molecules/AdminSummaryCard.vue";
import FormField from "~/components/molecules/FormField.vue";
import BaseInput from "~/components/atoms/BaseInput.vue";
import SmallActionButton from "~/components/atoms/SmallActionButton.vue";
import { formatDateId } from "~/utils/date";

const {
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
} = useAdminInventoryDetail();

onMounted(loadDetail);

const registeredDate = computed(() => {
  return formatDateId(asset.value?.created_at ?? null);
});
</script>

<template>
  <AdminPageShell background="#f7f8fa">
      <AdminHeader :title="asset?.asset_name || 'Detail Aset'" show-back @back="$router.back()">
        <template #subtitle>
          <p class="code">#{{ asset?.asset_code }}</p>
        </template>
        <template #actions>
          <div class="tools">
            <button class="edit" @click="openEditModal">Edit Aset</button>
            <button class="add" @click="openModal">Tambahkan Produk</button>
          </div>
        </template>
      </AdminHeader>
      <StateBanner tone="error" :message="error" />
      <StateBanner tone="notice" :message="notice" />
      <div class="info">
        <div>
          <label>Nama Aset</label>
          <input :value="asset?.asset_name" disabled />
        </div>
        <div>
          <label>Merk</label>
          <input :value="asset?.brand" disabled />
        </div>
        <div>
          <label>Tanggal Didaftarkan</label>
          <input :value="registeredDate" disabled />
        </div>
      </div>
      <div class="summary">
        <AdminSummaryCard title="Total aset" :value="totalAsset" />
        <AdminSummaryCard title="Jumlah aset tersedia" :value="totalAvailable" />
        <AdminSummaryCard title="Jumlah aset yang dipakai" :value="totalUsed" />
        <AdminSummaryCard title="Jumlah aset yang expired" :value="0" tone="danger" />
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Jenis</th>
            <th>Nama Aset TI</th>
            <th>Jumlah</th>
            <th>Deskripsi</th>
            <th>Tanggal Diajukan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in movements" :key="m.created_at">
            <td>{{ m.type === "in" ? "IN001" : "REQ001" }}</td>
            <td>{{ m.type === "in" ? "Penambahan Stok" : "Permintaan" }}</td>
            <td>{{ asset?.asset_name }}</td>
            <td :class="m.type === 'in' ? 'plus' : 'minus'">
              {{ m.type === "in" ? "+" : "-" }}{{ m.quantity }}
            </td>
            <td>{{ m.note ?? "-" }}</td>
            <td>{{ formatDateId(m.created_at) }}</td>
          </tr>
        </tbody>
      </table>
    
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <button class="modal-close" @click="closeModal" aria-label="Tutup">
          x
        </button>
        <h3>Tambahkan Stok</h3>
        <div class="qty-control">
          <button @click="qty > 1 && qty--">-</button>
          <span>{{ qty }}</span>
          <button @click="qty++">+</button>
        </div>
        <p class="current">(Stok: {{ stock?.qty_current ?? 0 }})</p>
        <textarea
          class="note"
          v-model="note"
          placeholder="Catatan (opsional)"
        />
        <button class="confirm" :disabled="loading" @click="submitStock">
          Tambahkan Stok
        </button>
      </div>
    </div>

    <div v-if="showEditModal" class="modal-overlay">
      <div class="modal edit-modal">
        <button class="modal-close" @click="closeEditModal" aria-label="Tutup">
          x
        </button>
        <h3>Edit Aset</h3>
        <StateBanner tone="error" :message="editError" />
        <div class="edit-form">
          <FormField label="Kode Aset" required>
            <BaseInput v-model="editForm.asset_code" placeholder="Kode aset" />
          </FormField>
          <FormField label="Nama Aset" required>
            <BaseInput v-model="editForm.asset_name" placeholder="Nama aset" />
          </FormField>
          <FormField label="Merk">
            <BaseInput v-model="editForm.brand" placeholder="Merk" />
          </FormField>
        </div>
        <div class="modal-actions">
          <SmallActionButton class="btn-cancel" label="Batal" @click="closeEditModal" />
          <SmallActionButton
            class="btn-submit"
            :label="editLoading ? 'Menyimpan...' : 'Simpan'"
            @click="submitEdit"
          />
        </div>
      </div>
    </div>
  </AdminPageShell>
</template>

<style scoped>

.code {
  margin: 2px 0;
  font-size: 13px;
  color: #6b7280;
}

.tools {
  display: flex;
  gap: 12px;
  align-items: center;
}

.edit {
  background: #0f2a44;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  transition:
    background 0.2s,
    transform 0.1s;
}

.edit:hover {
  background: #0b2136;
}

.edit:active {
  transform: scale(0.96);
}

.add {
  background: #f97316;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
}

.info {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}

.info > div {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info label {
  font-size: 12px;
  font-weight: 500;
}

.info input {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  background: #ffffff;
}

.summary {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.table {
  margin-top: 24px;
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background: #ff8a2b;
  color: white;
}

.table th,
.table td {
  padding: 12px;
  font-size: 13px;

  text-align: left;
  vertical-align: top;
}

.plus {
  color: #16a34a;
  font-weight: 600;
}

.minus {
  color: #dc2626;
  font-weight: 600;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  background: white;
  width: 320px;
  padding: 24px;
  border-radius: 14px;
  text-align: center;
  position: relative;
}

.edit-modal {
  width: 420px;
  text-align: left;
}

.edit-modal h3 {
  text-align: center;
  margin: 0 0 12px;
}

.edit-form {
  margin-top: 8px;
}

.modal-actions {
  margin-top: 12px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-cancel {
  background: #0f2a44;
  color: white;
}

.btn-submit {
  background: #ff8a2b;
  color: white;
}

.btn-cancel {
  transition:
    background 0.2s,
    transform 0.1s;
}

.btn-cancel:hover {
  background: #0b2136;
}

.btn-cancel:active {
  transform: scale(0.96);
}

.btn-submit {
  transition:
    background 0.2s,
    transform 0.1s;
}

.btn-submit:hover {
  background: #ea6f13;
}

.btn-submit:active {
  transform: scale(0.96);
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;

  width: 32px;
  height: 32px;
  border-radius: 8px;

  background: transparent;
  border: none;
  font-size: 18px;
  color: #6b7280;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  transition: background 0.2s, color 0.2s, transform 0.1s;
}

.modal-close:hover {
  background: #fee2e2;
  color: #ef4444;
}

.modal-close:active {
  transform: scale(0.9);
}

.qty-control span {
  min-width: 24px;
  text-align: center;
  font-size: 16px;
  line-height: 36px;
  display: inline-block;
}

.modal textarea {
  font-family: inherit;
  font-size: 13px;
  line-height: 1.5;
}

.note {
  font-size: 13px;
}

.qty-control {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
}

.qty-control button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: #f97316;
  color: white;
}

.current {
  font-size: 12px;
  color: #6b7280;
}

.confirm {
  width: 100%;
  margin-top: 12px;
  background: #f97316;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
}
.add:hover {
  background: #ea580c;
}

.add:active {
  transform: scale(0.96);
}

.qty-control button {
  transition:
    background 0.15s,
    transform 0.1s;
}

.qty-control button:hover {
  background: #ea580c;
}

.qty-control button:active {
  transform: scale(0.9);
}

.confirm {
  background: #f97316;
  transition:
    background 0.2s,
    transform 0.1s;
}

.confirm:hover {
  background: #ea580c;
}

.confirm:active {
  transform: scale(0.96);
}
</style>
