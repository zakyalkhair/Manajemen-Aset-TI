<script setup lang="ts">
import {
  REQUEST_STATUS_LABEL,
  REQUEST_STATUS_CLASS,
  type RequestStatus,
} from '~/utils/requestStatus'

defineProps<{
  status: RequestStatus
  label?: string | null
}>()
</script>

<template>
  <span class="status status-pill" :class="REQUEST_STATUS_CLASS[status]">
    {{ label || REQUEST_STATUS_LABEL[status] }}
  </span>
</template>
