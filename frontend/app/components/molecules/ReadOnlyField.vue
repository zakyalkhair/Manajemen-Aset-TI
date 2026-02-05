<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <div class="field">
    <label>{{ label }}</label>
    <div class="value">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.field {
  margin-top: 14px;
}

label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 6px;
}

.value {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  background: #f3f4f6;
  color: #111827;
}
</style>
