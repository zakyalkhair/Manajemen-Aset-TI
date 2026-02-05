<script setup lang="ts">
import Sidebar from "~/components/organisms/Sidebar.vue";

const props = withDefaults(
  defineProps<{
    background?: string;
    contentPadding?: string;
    contentClass?: string;
  }>(),
  {
    background: "#f6f7fb",
    contentPadding: "24px",
    contentClass: "",
  },
);
</script>

<template>
  <div class="layout" :style="{ background: props.background }">
    <Sidebar />
    <main class="content" :class="props.contentClass" :style="{ padding: props.contentPadding }">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
