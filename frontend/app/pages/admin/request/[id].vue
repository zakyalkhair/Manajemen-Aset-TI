<script setup lang="ts">
definePageMeta({
  middleware: ['auth', 'admin'],
})

import AdminPageShell from '~/components/organisms/AdminPageShell.vue'
import RejectModal from '~/components/molecules/RejectModal.vue'
import AdminHeader from '~/components/organisms/AdminHeader.vue'
import StateBanner from '~/components/atoms/StateBanner.vue'
import SmallActionButton from '~/components/atoms/SmallActionButton.vue'
import ReadOnlyField from '~/components/molecules/ReadOnlyField.vue'
import ReadOnlyText from '~/components/atoms/ReadOnlyText.vue'
import BaseInput from '~/components/atoms/BaseInput.vue'
import BaseTextarea from '~/components/atoms/BaseTextarea.vue'
import StatusBadge from '~/components/atoms/StatusBadge.vue'
import { useAdminRequestDetail } from '~/composables/useAdminRequestDetail'
import { formatDateId } from '~/utils/date'

const router = useRouter()

const {
  loading,
  request,
  error,
  notice,
  rejectOpen,
  allocateQty,
  allocateNote,
  fetchDetail,
  remainingQty,
  stockAvailable,
  canAllocate,
  approve,
  reject,
  submitReject,
  allocate,
} = useAdminRequestDetail()

onMounted(fetchDetail)
</script>

<template>
  <AdminPageShell>
    <main v-if="!loading">
      <AdminHeader
        title="Detail Peminjaman"
        show-back
        @back="router.push('/admin/request')"
      />

      <StateBanner tone="error" :message="error" />
      <StateBanner tone="notice" :message="notice" />

      <div v-if="request" class="grid">
        <div class="card">
          <ReadOnlyField label="Status">
            <StatusBadge :status="request.status" :label="request.status_label" />
          </ReadOnlyField>

          <ReadOnlyField label="Nama Pengguna">
            <ReadOnlyText :value="request.requester?.name || '-'" />
          </ReadOnlyField>

          <ReadOnlyField label="NDK">
            <ReadOnlyText :value="request.ndk || '-'" />
          </ReadOnlyField>

          <ReadOnlyField label="Departemen">
            <ReadOnlyText :value="request.department" />
          </ReadOnlyField>

          <ReadOnlyField label="Nama Aset TI">
            <ReadOnlyText :value="request.asset?.asset_name || '-'" />
          </ReadOnlyField>

          <ReadOnlyField label="Jumlah">
            <ReadOnlyText :value="request.quantity_requested" />
          </ReadOnlyField>

          <ReadOnlyField label="Deskripsi">
            <ReadOnlyText :value="request.description || '-'" />
          </ReadOnlyField>

          <ReadOnlyField label="Tanggal Diajukan">
            <ReadOnlyText :value="formatDateId(request.created_at)" />
          </ReadOnlyField>

          <ReadOnlyField v-if="request.approver" label="Disetujui Oleh">
            <ReadOnlyText :value="request.approver.name" />
          </ReadOnlyField>
        </div>

        <div class="sidecard">
            <div class="card" v-if="request.status === 'menunggu_persetujuan'">
          <textarea placeholder="Catatan (opsional)" />
          <div class="actions">
            <SmallActionButton class="approve" label="Setujui" @click="approve" />
            <SmallActionButton class="reject" label="Tolak" @click="reject" />
          </div>
        </div>

        <div class="card allocation-card" v-if="request.status === 'menunggu_barang'">
          <h3>Alokasi Barang</h3>

          <p>
            Permintaan: {{ request.quantity_requested }} |
            Terpenuhi: {{ request.quantity_filled }} |
            Sisa: {{ remainingQty }}
          </p>

          <p>Stok tersedia: <b>{{ stockAvailable }}</b></p>

          <BaseInput
            type="number"
            v-model="allocateQty"
            :max="remainingQty"
            placeholder="Jumlah alokasi"
          />

          <BaseTextarea
            v-model="allocateNote"
            placeholder="Catatan (opsional)"
          />

          <p v-if="stockAvailable < remainingQty" class="warn">
            Stok tidak mencukupi
          </p>

          <SmallActionButton
            class="allocate"
            label="Alokasikan Barang"
            :disabled="!canAllocate"
            @click="allocate"
          />
        </div>

        <div class="card full">
          <h3>Riwayat Alokasi</h3>

          <table>
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Jumlah</th>
                <th>Catatan</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="a in request.allocations" :key="a.id">
                <td>{{ formatDateId(a.allocated_at) }}</td>
                <td>{{ a.allocated_qty }}</td>
                <td>{{ a.note || '-' }}</td>
                <td>{{ a.allocator?.name || '-' }}</td>
              </tr>

              <tr v-if="request.allocations.length === 0">
                <td colspan="4" class="empty">Belum ada alokasi</td>
              </tr>
            </tbody>
          </table>
        </div>
        </div>
        
      </div>
    </main>
  </AdminPageShell>

  <RejectModal
    :open="rejectOpen"
    @close="rejectOpen = false"
    @submit="submitReject"
  />
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed; 
  font-size: 13px;
}

th {
  text-align: left;
  font-weight: 600;
  color: #374151;
}

th, td {
  padding: 10px 8px;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}
.sidecard {
  display: flex;
  flex-direction: column;
  gap: 16px;
}


.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 20px;
  padding-top: 0px;
}

.card.full {
  grid-column: span 2;
}

.actions {
  display: flex;
  gap: 8px;
}

.approve { background: #22c55e; color: white; }
.reject { background: #ef4444; color: white; }
.allocate { background: #f97316; color: white; }

.allocate:disabled {
  background: #d1d5db;
  cursor: not-allowed;
}

.warn {
  color: #ef4444;
  font-size: 12px;
}

.allocation-card input,
.allocation-card textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-sizing: border-box;
  font-family: inherit;
  font-size: 14px;
  color: #111827;
}

.allocation-card textarea {
  resize: vertical;
  min-height: 80px;
}

.allocation-card input:hover,
.allocation-card textarea:hover {
  border-color: #d1d5db;
}

.allocation-card input:focus,
.allocation-card textarea:focus {
  outline: none;
  border-color: #ff8a2b;
  box-shadow: 0 0 0 2px rgba(255, 138, 43, 0.15);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th, td {
  padding: 8px;
  border-bottom: 1px solid #e5e7eb;
}

.empty {
  text-align: center;
  color: #9ca3af;
}

.approve:hover {
  background: #16a34a;
}

.reject:hover {
  background: #dc2626;
}

.allocate:hover {
  background: #ea580c;
}

.allocate:disabled {
  transform: none;
}
</style>
