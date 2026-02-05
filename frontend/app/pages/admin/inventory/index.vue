<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
});

import AdminPageShell from "~/components/organisms/AdminPageShell.vue";
import InventoryCard from "~/components/molecules/InventoryCard.vue";
import AdminHeader from "~/components/organisms/AdminHeader.vue";
import StateBanner from "~/components/atoms/StateBanner.vue";
import HeaderSearchBar from "~/components/atoms/HeaderSearchBar.vue";
import HeaderActionButton from "~/components/atoms/HeaderActionButton.vue";
import { useAdminInventoryList } from "~/composables/useAdminInventoryList";

const {
  error,
  searchText,
  loadInventory,
  filteredAssets,
} = useAdminInventoryList();

onMounted(loadInventory);
</script>

<template>
  <AdminPageShell background="#f7f8fa" content-class="inventory-content">
      <AdminHeader title="Inventori Aset TI">
        <template #actions>
          <div class="tools">
            <HeaderSearchBar v-model="searchText" placeholder="Search" />
            <HeaderActionButton
              label="+ Daftarkan Aset Baru"
              @click="$router.push('/admin/inventory/create')"
            />
          </div>
        </template>
      </AdminHeader>

      <StateBanner tone="error" :message="error" />
      <div class="grid">
        <InventoryCard
          v-for="asset in filteredAssets"
          :key="asset.asset_id"
          :asset="asset"
          @deleted="loadInventory" />
      </div>
  </AdminPageShell>
</template>

<style scoped>
.inventory-content {
  overflow-x: hidden;
}


.tools {
  display: flex;
  gap: 12px;
  align-items: center;
}

.grid {
  margin-top: 24px;
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}

</style>
