<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
})

import AllocateModal from "~/components/molecules/AllocateModal.vue"
import RejectModal from "~/components/molecules/RejectModal.vue"
import AdminPageShell from "~/components/organisms/AdminPageShell.vue"
import AdminHeader from "~/components/organisms/AdminHeader.vue"
import StateBanner from "~/components/atoms/StateBanner.vue"
import SmallActionButton from "~/components/atoms/SmallActionButton.vue"
import HeaderSearchBar from "~/components/atoms/HeaderSearchBar.vue"
import StatusBadge from "~/components/atoms/StatusBadge.vue"
import { useAdminRequestList } from "~/composables/useAdminRequestList"
import { formatDateId } from "~/utils/date"

const router = useRouter()

const {
  requests,
  loading,
  searchText,
  error,
  notice,
  rejectOpen,
  allocateOpen,
  allocateTarget,
  fetchRequests,
  filteredRequests,
  remainingQty,
  approve,
  openReject,
  submitReject,
  openAllocate,
  submitAllocate,
} = useAdminRequestList()

onMounted(fetchRequests)

const goToDetail = (id: number) => {
  router.push(`/admin/request/${id}`)
}
</script>

<template>
  <AdminPageShell>
      <AdminHeader title="Peminjaman Aset">
        <template #actions>
          <div class="tools">
            <HeaderSearchBar
              v-model="searchText"
              placeholder="Cari NDK, user, aset, departemen..."
            />
          </div>
        </template>
      </AdminHeader>

      <StateBanner tone="error" :message="error" />
      <StateBanner tone="notice" :message="notice" />

      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>NDK</th>
              <th>Status</th>
              <th>Nama Pengguna</th>
              <th>Departemen</th>
              <th>Nama Aset</th>
              <th>Quantity</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody v-if="!loading">
            <tr v-for="r in filteredRequests" :key="r.id">
              <td class="link" @click="goToDetail(r.id)">
                {{ r.ndk }}
              </td>

              <td>
                <StatusBadge :status="r.status" :label="r.status_label" />
              </td>

              <td>{{ r.requester?.name }}</td>
              <td>{{ r.department }}</td>
              <td>{{ r.asset?.asset_name }}</td>

              <td>{{ remainingQty(r) }} / {{ r.quantity_requested }}</td>

              <td>
                {{ formatDateId(r.created_at) }}
              </td>

              <td class="actions">
                <template v-if="r.status === 'menunggu_persetujuan'">
                  <SmallActionButton class="approve" label="Approve" @click="approve(r.id)" />
                  <SmallActionButton class="reject" label="Reject" @click="openReject(r.id)" />
                </template>

                <template v-else-if="r.status === 'menunggu_barang'">
                  <SmallActionButton class="allocate" label="Allocate" @click="openAllocate(r)" />
                </template>

                <span v-else>-</span>
              </td>
            </tr>

            <tr v-if="filteredRequests.length === 0">
              <td colspan="8" class="empty">Data tidak ditemukan</td>
            </tr>
          </tbody>

          <tbody v-else>
            <tr>
              <td colspan="8" class="empty">Loading...</td>
            </tr>
          </tbody>
        </table>
      </div>
  </AdminPageShell>

  <RejectModal
    :open="rejectOpen"
    @close="rejectOpen = false"
    @submit="submitReject"
  />

  <AllocateModal
    :open="allocateOpen"
    :max="allocateTarget ? remainingQty(allocateTarget) : 1"
    @close="allocateOpen = false"
    @submit="submitAllocate"
  />
</template>

<style scoped>
.tools {
  display: flex;
  gap: 8px;
  align-items: center;
}

.table-wrapper {
  background: white;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

th,
td {
  padding: 12px 14px;
  border-bottom: 1px solid #e5e7eb;
  text-align: left;
}

.link {
  cursor: pointer;
  color: #2563eb;
  font-weight: 500;
  transition: color 0.15s;
}

.link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}


.actions {
  display: flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
}

.approve {
  background: #22c55e;
  color: #ffffff;
}

.approve:hover {
  background: #16a34a;
}

.reject {
  background: #ef4444;
  color: #ffffff;
}

.reject:hover {
  background: #dc2626;
}

.allocate {
  background: #f97316;
  color: #ffffff;
}

.allocate:hover {
  background: #ea580c;
}

.empty {
  text-align: center;
  padding: 20px;
  color: #9ca3af;
}
</style>
