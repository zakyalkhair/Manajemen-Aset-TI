<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
  placeholder?: string
  type?: string
  disabled?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const onInput = (event: Event) => {
  const raw = (event.target as HTMLInputElement).value
  if (props.type === 'number') {
    emit('update:modelValue', raw === '' ? '' : Number(raw))
    return
  }
  emit('update:modelValue', raw)
}
</script>

<template>
  <input
    :type="type || 'text'"
    :placeholder="placeholder"
    :value="modelValue ?? ''"
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
  border: 1px solid #ddd;
  margin-bottom: 16px;
  font-size: 14px;

  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

input:hover {
  border-color: #c7c7c7;
}

input:focus {
  outline: none;
  border-color: #ff8a1f;
  box-shadow: 0 0 0 3px rgba(255, 138, 31, 0.18);
}

input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
