<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    tone?: "error" | "notice" | "info"
    message?: string | null
  }>(),
  {
    tone: "info",
    message: "",
  }
)
</script>

<template>
  <p v-if="props.message" class="banner" :class="props.tone">
    {{ props.message }}
  </p>
</template>

<style scoped>
.banner {
  margin: 0 0 12px;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 13px;
}

.error {
  border: 1px solid #fecaca;
  background: #fee2e2;
  color: #991b1b;
}

.notice {
  border: 1px solid #e5e7eb;
  background: #ffffff;
  color: #111827;
}

.info {
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  color: #111827;
}
</style>
