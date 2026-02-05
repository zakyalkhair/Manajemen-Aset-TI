<script setup lang="ts">
import BaseInput from '~/components/atoms/BaseInput.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
import FormField from '~/components/molecules/FormField.vue'

defineProps<{
  email: string
  password: string
  loading?: boolean
  buttonText: string
  errors?: {
    email?: string
    password?: string
  }
}>()

const emit = defineEmits([
  'update:email',
  'update:password',
  'submit',
])
</script>

<template>
  <div>
    <FormField
      label="Email"
      required
      :error="errors?.email"
    >
      <BaseInput
        type="email"
        placeholder="Email"
        :model-value="email"
        @update:modelValue="emit('update:email', $event)"
      />
    </FormField>

    <FormField
      label="Password"
      required
      :error="errors?.password"
    >
      <BaseInput
        type="password"
        placeholder="Password"
        :model-value="password"
        @update:modelValue="emit('update:password', $event)"
      />
    </FormField>

    <BaseButton
      :label="buttonText"
      :loading="loading"
      @click="emit('submit')"
    />
  </div>
</template>
