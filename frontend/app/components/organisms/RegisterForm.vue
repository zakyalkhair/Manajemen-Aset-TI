<script setup lang="ts">
import BaseInput from '~/components/atoms/BaseInput.vue'
import BaseButton from '~/components/atoms/BaseButton.vue'
import FormField from '~/components/molecules/FormField.vue'

defineProps<{
  name: string
  email: string
  password: string
  passwordConfirm: string
  loading?: boolean
  buttonText: string
  errors?: {
    name?: string
    email?: string
    password?: string
    passwordConfirm?: string
  }
}>()

const emit = defineEmits([
  'update:name',
  'update:email',
  'update:password',
  'update:passwordConfirm',
  'submit',
])
</script>

<template>
  <div>
    <FormField
      label="Nama Lengkap"
      required
      :error="errors?.name"
    >
      <BaseInput
        type="text"
        placeholder="Nama Lengkap"
        :model-value="name"
        @update:modelValue="emit('update:name', $event)"
      />
    </FormField>

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

    <FormField
      label="Konfirmasi Password"
      required
      :error="errors?.passwordConfirm"
    >
      <BaseInput
        type="password"
        placeholder="Konfirmasi Password"
        :model-value="passwordConfirm"
        @update:modelValue="emit('update:passwordConfirm', $event)"
      />
    </FormField>

    <BaseButton
      :label="buttonText"
      :loading="loading"
      @click="emit('submit')"
    />
  </div>
</template>
