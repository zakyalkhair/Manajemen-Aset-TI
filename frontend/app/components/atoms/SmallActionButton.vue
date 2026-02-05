<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    label: string
    disabled?: boolean
    type?: "button" | "submit" | "reset"
  }>(),
  {
    disabled: false,
    type: "button",
  }
)
</script>

<template>
  <button
    class="small-action-button"
    :type="props.type"
    :disabled="props.disabled"
  >
    {{ props.label }}
  </button>
</template>

<style scoped>
.small-action-button {
  min-width: 72px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, transform 0.1s;
}

.small-action-button:active {
  transform: scale(0.96);
}
</style>
