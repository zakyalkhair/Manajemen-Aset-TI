<script setup lang="ts">
import RequestCard from '~/components/molecules/RequestCard.vue'
import type { UserRequestSummary } from '~/types/userRequest'

defineProps<{
  requests: UserRequestSummary[]
}>()
</script>

<template>
  <div class="req-list">
    <RequestCard
      v-for="(req, i) in requests"
      :key="req.id"
      :request="req"
      class="card-anim"
      :style="{ animationDelay: `${i * 5}ms` }"
    />
  </div>
</template>

<style scoped>
.req-list {
   max-width: 402px;
    margin: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;

}

.card-anim {
  opacity: 0;
  animation: slideUp 0.25s ease forwards;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
