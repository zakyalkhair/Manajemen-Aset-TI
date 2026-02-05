<script setup lang="ts">
defineProps<{
  modelValue: string | number
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onChange = (e: Event) => {
  const value = (e.target as HTMLSelectElement).value
  emit(
    'update:modelValue',
    value === '' ? '' : Number(value)
  )
}
</script>

<template>
  <select
    :value="modelValue"
    :disabled="disabled"
    @change="onChange"
  >
    <slot />
  </select>
</template>

<style scoped>
select {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  font-size: 14px;
  background: #ffffff;
  color: #111827;

  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.08s;
}

select:hover {
  border-color: #d1d5db;
}

select:focus {
  outline: none;
  border-color: #ff8a1f;
  box-shadow: 0 0 0 3px rgba(255, 138, 31, 0.18);
}

select:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>
