<script setup lang="ts">
import UserRequestList from "~/components/organisms/UserRequestList.vue";
import FloatingActionButton from "~/components/atoms/FloatingActionButton.vue";
import UserPageShell from "~/components/organisms/UserPageShell.vue";
import { useUserDashboard } from "~/composables/useUserDashboard";

definePageMeta({
  middleware: ["auth", "user"],
});

const router = useRouter();
const { requests, error, loadDashboard } = useUserDashboard()

onMounted(loadDashboard);
</script>

<template>
  <UserPageShell>
    <div class="top-title">
      <h2>Manajemen Aset TI</h2>
      <img class="profile" @click="router.push('/user/profile')" src="/profil.png" alt="profil">
    </div>

    
    <div v-if="error" class="state error">
      <p>{{ error }}</p>
      <button class="retry" @click="loadDashboard">Coba lagi</button>
    </div>

    <UserRequestList
      v-else
      :requests="requests"
    />

    <FloatingActionButton
      label="Tambah Permintaan"
      @click="router.push('/user/request')" />
  </UserPageShell>
</template>

<style scoped>
.top-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px;
  margin-bottom: 18px;
}

.top-title h2 {
  margin:0px;
  margin-left:12px;

  font-size: 18px;
  font-weight: 600;
  color: #111827;
}

.profile {
  height: 24px;
    margin:0px;
  margin-right:12px;

  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 500;
  color: #111827; 
  cursor: pointer;
  border-radius: 8px;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    transform 0.1s ease;
}

@media (hover: hover) {
  .profile:hover {
    background: rgba(17, 24, 39, 0.08);
    color: #111827;
  }
}

.profile:active {
  transform: scale(0.96);
  background: rgba(17, 24, 39, 0.12);
}
</style>
