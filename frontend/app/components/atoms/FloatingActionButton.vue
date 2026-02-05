<script setup lang="ts">
defineProps<{
  label?: string
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="fab"
    @click="emit('click')"
    :aria-label="label || 'Action'"
  >
    <slot>+</slot>
  </button>
</template>

<style scoped>
.fab {
  position: fixed;
  right: 20px;
  bottom: 24px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #ff8a2b;
  color: #ffffff;
  font-size: 28px;
  font-weight: 500;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 24px rgba(255, 138, 43, 0.35);
  cursor: pointer;
  z-index: 20;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease;
}

.fab:hover {
  transform: scale(1.05);
  box-shadow: 0 14px 32px rgba(255, 138, 43, 0.45);
}

.fab:active {
  transform: scale(0.92);
}
</style>
