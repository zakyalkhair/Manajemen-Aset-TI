<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'user'],
})

import { useUserRequestDetail } from '~/composables/useUserRequestDetail'
import OrderSummary from '~/components/molecules/OrderSummary.vue'
import ReadOnlyField from '~/components/molecules/ReadOnlyField.vue'
import ReadOnlyText from '~/components/atoms/ReadOnlyText.vue'
import UserPageShell from '~/components/organisms/UserPageShell.vue'
import StatusBadge from '~/components/atoms/StatusBadge.vue'
import { formatDateId } from '~/utils/date'

const {
  loading,
  error,
  data,
  loadDetail,
} = useUserRequestDetail()

onMounted(loadDetail)
</script>

<template>
  <UserPageShell :show-back="true" @back="$router.back()">
    <div v-if="!loading">
    <main>
      <div v-if="error" class="state error">
        <p>{{ error }}</p>
        <button class="retry" @click="loadDetail">Coba lagi</button>
      </div>

      <div v-if="data" class="card">
        <strong class="req-code">{{ data.ndk }}</strong>

        <ReadOnlyField label="Status">
          <StatusBadge :status="data.status" :label="data.status_label" />
        </ReadOnlyField>

        <ReadOnlyField label="Tanggal Diajukan">
          <ReadOnlyText :value="formatDateId(data.created_at)" />
        </ReadOnlyField>

        <ReadOnlyField label="Diajukan Oleh">
          <ReadOnlyText :value="data.requester_name" />
        </ReadOnlyField>

        <div class="row">
          <ReadOnlyField label="Nama Aset TI">
            <ReadOnlyText :value="data.asset_name" />
          </ReadOnlyField>

          <ReadOnlyField label="Jumlah">
            <ReadOnlyText :value="data.quantity_requested" />
          </ReadOnlyField>
        </div>

        <ReadOnlyField label="Deskripsi">
          <ReadOnlyText :value="data.description" />
        </ReadOnlyField>

        <OrderSummary
          v-if="['menunggu_barang', 'dipakai'].includes(data.status)"
          title="Detail Order"
          :quantity="data.quantity_requested"
          :asset-name="data.asset_name"
          :brand="data.brand"
        />

        <template v-if="data.status === 'ditolak'">
          <ReadOnlyField label="Ditolak Oleh">
            <ReadOnlyText :value="data.rejected_by_name" />
          </ReadOnlyField>

          <ReadOnlyField label="Alasan">
            <ReadOnlyText :value="data.rejection_reason" />
          </ReadOnlyField>
        </template>
      </div>
    </main>
    </div>
  </UserPageShell>
  
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 14px;
  padding: 16px;
  border: 1px solid #d1d1d6;
}

.state {
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 10px;
  font-size: 13px;
}

.state.error {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.retry {
  margin-top: 8px;
  background: #ef4444;
  color: #ffffff;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}

.req-code {
  display: block;
  font-size: 18px;
  margin-bottom: 14px;
}

.row {
  display: grid;
  grid-template-columns: 1fr 90px;
  gap: 10px;
}

</style>
