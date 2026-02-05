<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
});

import AdminPageShell from "~/components/organisms/AdminPageShell.vue";
import AdminHeader from "~/components/organisms/AdminHeader.vue";
import StateBanner from "~/components/atoms/StateBanner.vue";
import { useAdminInventoryCreate } from "~/composables/useAdminInventoryCreate";
import FormField from "~/components/molecules/FormField.vue";
import BaseInput from "~/components/atoms/BaseInput.vue";
import SmallActionButton from "~/components/atoms/SmallActionButton.vue";

const { loading, error, form, submit, cancel } = useAdminInventoryCreate();
</script>

<template>
  <AdminPageShell background="#f7f8fa" content-padding="24px 32px">
      <AdminHeader
        title="Inventori Aset TI"
        show-back
        @back="cancel"
      />
      <div class="card">
        <div class="card-header">
          <div class="left">
            <div>
              <h2>Tambahkan Tinta Baru</h2>
            </div>
          </div>
        </div>
        <div class="form">
          <StateBanner tone="error" :message="error" />
          <FormField label="Kode Aset">
            <BaseInput v-model="form.asset_code" placeholder="Isi Nama Aset Baru" />
          </FormField>
          <FormField label="Nama Aset" required>
            <BaseInput
              v-model="form.asset_name"
              placeholder="Isi Tanggal Barang Dibeli" />
          </FormField>
          <FormField label="Merk" required>
            <BaseInput
              v-model="form.brand"
              placeholder="Isi Tanggal Barang Dibeli" />
          </FormField>
        </div>
        <div class="actions">
          <SmallActionButton class="btn-cancel" label="Batal" @click="cancel" />
          <SmallActionButton
            class="btn-submit"
            :label="loading ? 'Menambah...' : 'Tambah'"
            @click="submit"
          />
        </div>
      </div>
  </AdminPageShell>
</template>

<style scoped>

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  padding: 20px 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.left {
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

.card-header h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  margin-top: 12px;
}

:deep(.banner) {
  grid-column: 1 / -1;
}

.actions {
  margin-top: 24px;
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
</style>
