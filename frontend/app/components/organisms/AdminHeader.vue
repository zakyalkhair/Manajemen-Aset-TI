<script setup lang="ts">
import BackButton from "~/components/atoms/BackButton.vue";

const props = withDefaults(
  defineProps<{
    title: string;
    showBack?: boolean;
  }>(),
  {
    showBack: false,
  },
);

defineEmits<{
  (e: "back"): void;
}>();
</script>

<template>
  <header class="header">
    <div class="left">
      <BackButton v-if="props.showBack" class="back" @click="$emit('back')" />
      <div class="title-block">
        <h1 class="title">{{ props.title }}</h1>
        <slot name="subtitle" />
      </div>
    </div>
    <div class="actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.back {
  border: none;
  background: none;
  cursor: pointer;
  transition: transform 0.15s;
}

.back:active {
  transform: translateX(-4px);
}

.title-block {
  min-width: 0;
}

.title {
  margin: 0;
  font-weight: 600;
}

.actions {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
