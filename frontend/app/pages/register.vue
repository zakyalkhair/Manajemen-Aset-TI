<script setup lang="ts">
import RegisterForm from '~/components/organisms/RegisterForm.vue'
import Logo from '~/components/atoms/Logo.vue'
import { useAuthRegister } from '~/composables/useAuthRegister'

const {
  name,
  email,
  password,
  passwordConfirm,
  loading,
  error,
  errors,
  register,
} = useAuthRegister()
</script>

<template>
  <div class="page">
    <Logo class="logo" />

    <RegisterForm
      v-model:name="name"
      v-model:email="email"
      v-model:password="password"
      v-model:passwordConfirm="passwordConfirm"
      button-text="Daftar"
      :loading="loading"
      :errors="errors"
      @submit="register"
    />

    <p class="error" v-if="error">{{ error }}</p>

    <p class="link">
      Sudah punya akun?
      <NuxtLink to="/">Masuk</NuxtLink>
    </p>
  </div>
</template>


<style scoped>
.page {
  padding: 24px;
  max-width: 402px;
  margin: auto;
}

.logo {
  width: 220px;
  margin: 40px auto;
  display: block;
}

.btn-wrap {
  margin-top: 18px;
}

.link {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
}

.link a {
  color: #ff8a1f;
  font-weight: 600;
}

.error {
  color: #dc2626;
  margin-top: 12px;
  text-align: center;
  font-size: 13px;
}
</style>
