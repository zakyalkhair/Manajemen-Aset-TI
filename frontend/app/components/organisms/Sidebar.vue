<script setup lang="ts">
import Logo from "~/components/atoms/Logo.vue";

const menu = [
  { label: 'Dashboard', to: '/admin/dashboard' },
  { label: 'Peminjaman Aset', to: '/admin/request' },
  //{ label: 'Transfer Stok', to: '/admin/transfer' },
  { label: 'Inventori Aset', to: '/admin/inventory' },
  { label: 'Akun', to: '/admin/profile' },
]
</script>

<template>
  <aside class="sidebar">
    <Logo class="logo" :height="56" />

    <nav class="menu">
      <NuxtLink
        v-for="item in menu"
        :key="item.to"
        :to="item.to"
        class="menu-link"
        active-class="active"
      >
        {{ item.label }}
      </NuxtLink>
    </nav>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px; 
  min-width: 280px;
  height: 100vh;

  background: #ffffff;
  padding: 16px;
  border-right: 1px solid #e5e7eb;

  box-sizing: border-box;
}

.logo {
  height: 40px;
  margin-bottom: 40px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.menu-link {
  
  height: 40px;
  display: flex;
  align-items: center;

  padding: 0 14px;
  border-radius: 10px;

  color: #374151;
  text-decoration: none;
  cursor: pointer;

  box-sizing: border-box;
  transition: background 0.15s ease, color 0.15s ease;
}

.menu-link:hover {
  background: #f3f4f6;
}

.menu-link.active {
  background: #fff3e8;
  color: #f97316;
}
</style>
