<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
    minWidth?: string
  }>(),
  {
    placeholder: "Search",
    minWidth: "360px",
  }
)

defineEmits<{
  (e: "update:modelValue", value: string): void
}>()
</script>

<template>
  <input
    class="search"
    :placeholder="props.placeholder"
    :value="props.modelValue"
    :style="{ minWidth: props.minWidth }"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>

<style scoped>
.search {
  flex: 1;
  padding: 9px 12px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  font-size: 12px;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}

.search:hover {
  border-color: #d1d5db;
}

.search:focus {
  outline: none;
  border-color: #ff8a2b;
  box-shadow: 0 0 0 2px rgba(255, 138, 43, 0.15);
}
</style>
