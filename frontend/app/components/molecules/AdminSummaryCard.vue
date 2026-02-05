<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    value: string | number
    tone?: "default" | "danger"
  }>(),
  {
    tone: "default",
  }
)
</script>

<template>
  <div class="card" :class="props.tone">
    <h3>{{ props.value }}</h3>
    <p>{{ props.title }}</p>
  </div>
</template>

<style scoped>
.card {
  background: white;
  padding: 22px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
}

.card h3 {
  font-size: 26px;
  margin: 0;
}

.card.danger h3 {
  color: #ef4444;
}
</style>
