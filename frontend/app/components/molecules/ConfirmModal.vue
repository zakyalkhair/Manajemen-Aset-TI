<script setup lang="ts">
const props = defineProps<{
  open: boolean
  title?: string
  message: string
  confirmText?: string
  cancelText?: string
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <div v-if="open" class="modal-overlay" @click.self="emit('cancel')">
    <div class="modal">
      <h3 class="title">{{ title || 'Konfirmasi' }}</h3>
      <p class="msg">{{ message }}</p>

      <div class="actions">
        <button class="btn cancel" @click="emit('cancel')">
          {{ cancelText || 'Batal' }}
        </button>
        <button class="btn confirm" @click="emit('confirm')">
          {{ confirmText || 'Ya' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal {
  width: 320px;
  background: #ffffff;
  border-radius: 14px;
  padding: 18px;
  border: 1px solid #e5e7eb;
}

.title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #111827;
}

.msg {
  margin: 10px 0 0;
  font-size: 13px;
  color: #374151;
  line-height: 1.5;
}

.actions {
  margin-top: 14px;
  display: flex;
  gap: 8px;
}

.btn {
  flex: 1;
  border: none;
  border-radius: 10px;
  padding: 10px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.1s ease, filter 0.2s ease;
}

.btn:active {
  transform: scale(0.98);
}

.cancel {
  background: #f3f4f6;
  color: #111827;
}

.confirm {
  background: #ef4444;
  color: #ffffff;
}
</style>

