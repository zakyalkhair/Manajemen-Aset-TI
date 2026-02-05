<script setup lang="ts">
const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: { reason: string }): void
}>()

const reason = ref('')

watch(
  () => props.open,
  (v) => {
    if (v) reason.value = ''
  }
)

const submit = () => {
  if (!reason.value.trim()) return
  emit('submit', { reason: reason.value.trim() })
}
</script>

<template>
  <div v-if="open" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">x</button>

      <h3>Tolak Permintaan</h3>

      <textarea
        v-model="reason"
        placeholder="Alasan penolakan"
      />

      <button class="confirm" @click="submit">
        Tolak
      </button>
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
  background: white;
  width: 320px;
  padding: 24px;
  border-radius: 14px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 18px;
}

textarea {
  width: 100%;
  min-height: 90px;
  margin-top: 12px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  font-family: inherit;
  font-size: 13px;
  resize: none;
  box-sizing: border-box;
}

.confirm {
  width: 100%;
  margin-top: 12px;
  background: #ef4444;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
}
</style>
