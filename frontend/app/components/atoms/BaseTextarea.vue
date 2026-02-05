<script setup lang="ts">
defineProps<{
  modelValue?: string
  placeholder?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <textarea
    :placeholder="placeholder"
    :value="modelValue ?? ''"
    :disabled="disabled"
    @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
  />
</template>

<style scoped>
textarea {
  display: block;
  box-sizing: border-box;
  width: 100%;
  padding: 14px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  margin-bottom: 16px;
  font-size: 14px;
  font-family: inherit;
  background: #ffffff;
  color: #111827;
  resize: none;

  transition:
    border-color 0.2s,
    box-shadow 0.2s,
    transform 0.08s;
}

textarea:hover {
  border-color: #d1d5db;
}

textarea:focus {
  outline: none;
  border-color: #ff8a1f;
  box-shadow: 0 0 0 3px rgba(255, 138, 31, 0.18);
}

textarea:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}

textarea::placeholder {
  color: #9ca3af;
  font-size: 14px;
  font-family: inherit;
}
</style>
