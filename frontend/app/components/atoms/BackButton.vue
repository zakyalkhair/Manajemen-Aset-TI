<script setup lang="ts">
defineProps<{
  alt?: string
  size?: number
}>()
</script>

<template>
  <button type="button">
    <img
      src="/back.png"
      :alt="alt || 'Kembali'"
      :style="size ? { width: `${size}px`, height: `${size}px` } : undefined"
    />
  </button>
</template>
