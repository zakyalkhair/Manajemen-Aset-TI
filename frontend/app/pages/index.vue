<script setup lang="ts">
import AuthForm from '~/components/organisms/AuthForm.vue'
import Logo from '~/components/atoms/Logo.vue'
import { useAuthLogin } from '~/composables/useAuthLogin'

const {
  email,
  password,
  loading,
  error,
  login,
} = useAuthLogin()

const errors = computed(() => ({
  email: !email.value && error.value ? error.value : '',
  password: !password.value && error.value ? error.value : '',
}))
</script>

<template>
  <div class="page">
    <Logo class="logo" />

    <AuthForm
      v-model:email="email"
      v-model:password="password"
      button-text="Masuk"
      :loading="loading"
      :errors="errors"
      @submit="login"
    />

    <p class="error" v-if="error">{{ error }}</p>

    <p class="link">
      Belum punya akun?
      <NuxtLink to="/register">Daftar</NuxtLink>
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
