<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <button class="action-button">
    {{ props.label }}
  </button>
</template>

<style scoped>
.action-button {
  background: #f97316;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
  transition:
    background 0.2s,
    transform 0.1s;
}

.action-button:hover {
  background: #ea580c;
}

.action-button:active {
  transform: scale(0.96);
}
</style>
