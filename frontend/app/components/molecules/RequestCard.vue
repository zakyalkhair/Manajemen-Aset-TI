<script setup lang="ts">
import RequestStatusBadge from '~/components/atoms/StatusBadge.vue'
import type { UserRequestSummary } from '~/types/userRequest'

const router = useRouter()

const props = defineProps<{
  request: UserRequestSummary
}>()

const goDetail = () => {
  router.push(`/user/request/${props.request.id}`)
}
</script>

<template>
  <div class="card" @click="goDetail">
    <small>{{ request.ndk }}</small>

    <h3>{{ request.asset_name }}</h3>

    <p>
      {{ request.quantity }} pcs – {{ request.description }}
    </p>

    <RequestStatusBadge :status="request.status" />
  </div>
</template>

<style scoped>
.card {
  background: #ffffff;
  border-radius: 14px;
  padding: 16px;
  border: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

@media (hover: hover) {
  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
  }
}

small {
  font-size: 11px;
  color: #9ca3af;
}

h3 {
  margin: 2px 0;
  font-size: 15px;
  font-weight: 600;
  color: #111827;
}

p {
  margin: 4px 0 8px;
  font-size: 13px;
  color: #374151;
  line-height: 1.4;
}
</style>
