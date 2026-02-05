<script setup lang="ts">
const props = withDefaults(
  defineProps<{ title?: string }>(),
  { title: "Profile" },
)
</script>

<template>
  <div class="card">
    <strong class="title">{{ props.title }}</strong>
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 14px;
  padding: 16px;
  border: 1px solid #d1d1d6;
}

.title {
  display: block;
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 14px;
}
</style>
