<script setup lang="ts">
defineProps<{
  alt?: string
  height?: number | string
}>()
</script>

<template>
  <img
    src="/logo.png"
    :alt="alt || 'Logo'"
    :style="height ? { height: typeof height === 'number' ? `${height}px` : height } : undefined"
  />
</template>
