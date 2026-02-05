<script setup lang="ts">
defineProps<{
  value?: string | number
}>()
</script>

<template>
  <span>{{ value ?? '-' }}</span>
</template>
