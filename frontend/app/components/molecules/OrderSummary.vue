<script setup lang="ts">
defineProps<{
  title?: string
  quantity: number
  assetName: string
  brand?: string
}>()
</script>

<template>
  <div class="order">
    <div class="order-head">
      <span>{{ title || 'Order Details' }}</span>
      <span class="badge">Jumlah: {{ quantity }}</span>
    </div>
    <div class="order-item">
      <div>
        <div>{{ assetName }}</div>
        <small v-if="brand">{{ brand }}</small>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order {
  margin-top: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.order-head {
  background: #f9fafb;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 500;
}

.order-item {
  padding: 12px;
}

.badge {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
}
</style>
