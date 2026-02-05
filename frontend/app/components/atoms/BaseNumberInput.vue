<script setup lang="ts">
defineProps<{
  modelValue: number
  min?: number
  max?: number
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const onInput = (e: Event) => {
  const target = e.target as HTMLInputElement
  const value = target.value === '' ? 0 : Number(target.value)
  emit('update:modelValue', value)
}
</script>

<template>
  <input
    type="number"
    :min="min"
    :max="max"
    :placeholder="placeholder"
    :value="modelValue"
    :disabled="disabled"
    @input="onInput"
  />
</template>

<style scoped>
input {
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

input:hover {
  border-color: #d1d5db;
}

input:focus {
  outline: none;
  border-color: #ff8a1f;
  box-shadow: 0 0 0 3px rgba(255, 138, 31, 0.18);
}

input:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}
</style>
