<script setup lang="ts">
defineProps<{
  label: string;
  error?: string;
  required?: boolean;
}>();
</script>

<template>
  <div class="field">
    <label>{{ label }}<span v-if="required" class="req">*</span></label>
    <div class="control">
      <slot />
    </div>
    <small v-if="error" class="error"> {{  error  }}</small>
  </div>
</template>

<style scoped>
.field {
  margin-top: 14px;
  
}

label {
  display: block;
  margin-bottom: 6px;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
}

.req {
  color: #dc2626;
  margin-left: 4px;
}

.error {
  display: block;
  margin-top: 6px;
  font-size: 12px;
  color: #dc2626;
}

.control :deep(input),
.control :deep(textarea),
.control :deep(select) {
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

.control :deep(input:hover),
.control :deep(textarea:hover),
.control :deep(select:hover) {
  border-color: #d1d5db;
}

.control :deep(input:focus),
.control :deep(textarea:focus),
.control :deep(select:focus) {
  outline: none;
  border-color: #ff8a1f;
  box-shadow: 0 0 0 3px rgba(255, 138, 31, 0.18);
}

.field.disabled .control :deep(input),
.field.disabled .control :deep(textarea),
.field.disabled .control :deep(select),
.control :deep(input:disabled),
.control :deep(textarea:disabled),
.control :deep(select:disabled) {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
  box-shadow: none;
}
</style>
