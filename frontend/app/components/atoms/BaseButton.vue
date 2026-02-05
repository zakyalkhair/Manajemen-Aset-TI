<script setup lang="ts">
defineProps<{
  label: string
  loading?: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
  <button
    class="btn"
    :disabled="loading"
    @click="emit('click')"
  >
    {{ loading ? 'Loading...' : label }}
  </button>
</template>

<style scoped>
.btn {
  box-sizing: border-box;
  width: 100%;
  background: #ff8a1f;
  color: white;
  border: 1px solid transparent; /* ⬅️ penting */
  padding: 12px;
  border-radius: 30px;
  font-weight: bold;
  cursor: pointer;

  transition:
    background 0.2s,
    transform 0.1s,
    box-shadow 0.2s;
}

.btn:hover {
  background: #ea760f;
}

.btn:active {
  transform: scale(0.96);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
