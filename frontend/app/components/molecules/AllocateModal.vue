<script setup lang="ts">
const props = defineProps<{
  open: boolean
  max: number
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit', payload: { qty: number; note: string }): void
}>()

const qty = ref(1)
const note = ref('')

watch(
  () => props.open,
  (v) => {
    if (v) {
      qty.value = 1
      note.value = ''
    }
  }
)

const submit = () => {
  if (qty.value < 1 || qty.value > props.max) return
  emit('submit', { qty: qty.value, note: note.value })
}
</script>

<template>
  <div v-if="open" class="modal-overlay">
    <div class="modal">
      <button class="modal-close" @click="$emit('close')">✕</button>

      <h3>Alokasi Barang</h3>

      <div class="qty-control">
        <button @click="qty > 1 && qty--">−</button>
        <span>{{ qty }}</span>
        <button @click="qty < max && qty++">+</button>
      </div>

      <p class="current">(Sisa kebutuhan: {{ max }})</p>

      <textarea
        v-model="note"
        placeholder="Catatan (opsional)"
      />

      <button class="confirm" @click="submit">
        Alokasikan
      </button>
    </div>
  </div>
</template>

<style scoped>
/* STYLE AMBIL PERSIS DARI MODAL LAMA – TIDAK DIUBAH */
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
  text-align: center;
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
.qty-control {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
}
.qty-control button {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #f97316;
  color: white;
  border: none;
}
.confirm {
  width: 100%;
  margin-top: 12px;
  background: #f97316;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 8px;
}
</style>
