<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "user"],
});

import { useUserRequestCreate } from "~/composables/useUserRequestCreate";
import FormField from "~/components/molecules/FormField.vue";
import BaseInput from "~/components/atoms/BaseInput.vue";
import BaseSelect from "~/components/atoms/BaseSelect.vue";
import BaseTextarea from "~/components/atoms/BaseTextarea.vue";
import BaseButton from "~/components/atoms/BaseButton.vue";
import BaseNumberInput from "~/components/atoms/BaseNumberInput.vue";
import UserPageShell from "~/components/organisms/UserPageShell.vue";

const router = useRouter();
const submitError = ref<string | null>(null);

const {
  assets,
  selectedAsset,
  form,
  errors,
  loading,
  loadAssets,
  applyItem,
  submit,
} = useUserRequestCreate();

const submitRequest = async () => {
  submitError.value = null;
  try {
    const data = await submit();
    router.push(`/user/request/${data.id}`);
  } catch (e: any) {
    submitError.value = e?.message || "Request gagal";
  }
};

onMounted(loadAssets);
</script>

<template>
  <UserPageShell :show-back="true" @back="$router.back()">
      <div class="title">
        <span class="warn">!</span>
        <strong>Permintaan Barang</strong>
      </div>

      <div class="card">
        <p v-if="submitError" class="error">{{ submitError }}</p>

        <FormField label="Departemen" required :error="errors.department">
          <BaseInput v-model="form.department" placeholder="Isi departemen" />
        </FormField>

        <FormField label="Nama Aset TI" required :error="errors.asset_id">
          <BaseSelect v-model="form.asset_id" @change="applyItem">
            <option value="">Select</option>
            <option v-for="a in assets" :key="a.id" :value="a.id">
              {{ a.asset_name }}
            </option>
          </BaseSelect>
        </FormField>

        <FormField label="Jumlah" required :error="errors.quantity">
          <BaseNumberInput v-model="form.quantity" :min="1" />
        </FormField>

        <div v-if="selectedAsset" class="order">
          <div class="order-head">
            <span>Order Details</span>
            <span class="badge">Items: {{ form.quantity }}</span>
          </div>
          <div class="order-item">
            <span>{{ selectedAsset.asset_name }}</span>
            <strong>{{ form.quantity }}</strong>
          </div>
        </div>

        <FormField label="Deskripsi">
          <BaseTextarea
            v-model="form.description"
            placeholder="Isi deskripsi" />
        </FormField>

        <BaseButton
          class="submit"
          :label="loading ? 'Mengirim...' : 'Ajukan'"
          :loading="loading"
          @click="submitRequest" />
      </div>
  </UserPageShell>
</template>

<style scoped>
.title {
  margin: 0;
  padding: 14px 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px 12px 0 0;
  display: flex;
  gap: 10px;
  align-items: center;
}

.warn {
  width: 16px;
  height: 16px;
  border: 2px solid #ff8a2b;
  border-radius: 50%;
  font-size: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ff8a2b;
}

.card {
  margin: 0;
  padding: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 12px 12px;
}

.error {
  margin: 0 0 12px;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #b91c1c;
  font-size: 13px;
}

.order {
  margin-top: 16px;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  overflow: hidden;
}

.order-head {
  background: #f9fafb;
  padding: 10px 12px;
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  font-weight: 500;
}

.order-item {
  padding: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
}

.badge {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 6px;
}

.submit {
  margin-top: 24px;
  width: 100%;
}
</style>
