<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "user"],
});

import UserPageShell from "~/components/organisms/UserPageShell.vue";
import ProfileCard from "~/components/molecules/ProfileCard.vue";
import ReadOnlyField from "~/components/molecules/ReadOnlyField.vue";
import ReadOnlyText from "~/components/atoms/ReadOnlyText.vue";
import { useUserProfile } from "~/composables/useUserProfile";

const { loading, error, user, loadProfile, logout } = useUserProfile();

onMounted(loadProfile);
</script>

<template>
  <UserPageShell :show-back="true" @back="$router.back()">
    <main class="content">
      <div v-if="error" class="state error">
        <p>{{ error }}</p>
        <button class="retry" @click="loadProfile">Coba lagi</button>
      </div>

      <ProfileCard v-if="!loading && user" title="Profile">

        <ReadOnlyField label="ID">
          <ReadOnlyText :value="user.id" />
        </ReadOnlyField>

        <ReadOnlyField label="Nama Pengguna">
          <ReadOnlyText :value="user.name" />
        </ReadOnlyField>

        <ReadOnlyField label="Email">
          <ReadOnlyText :value="user.email || '-'" />
        </ReadOnlyField>

        <ReadOnlyField label="Role">
          <ReadOnlyText :value="user.role === 'user' ? 'user' : user.role" />
        </ReadOnlyField>
      </ProfileCard>

      <button v-if="!loading && user" class="logout" @click="logout">Logout</button>
    </main>
  </UserPageShell>
</template>

<style scoped>
.content {
  padding: 16px;
}


.state {
  margin-bottom: 12px;
  padding: 12px;
  border-radius: 10px;
  font-size: 13px;
}

.state.error {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.retry {
  margin-top: 8px;
  background: #ef4444;
  color: #ffffff;
  border: none;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;
}

.logout {
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  background: #ffffff;
  border: 1px solid #ef4444;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 600;
  color: #ef4444;
  cursor: pointer;
  transition:
    background 0.2s,
    color 0.2s,
    transform 0.1s,
    box-shadow 0.2s;
}

.logout:hover {
  background: #ef4444;
  color: #ffffff;
}

.logout:active {
  transform: scale(0.96);
}
</style>
