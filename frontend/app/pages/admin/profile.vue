<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "admin"],
});

import AdminPageShell from "~/components/organisms/AdminPageShell.vue";
import AdminHeader from "~/components/organisms/AdminHeader.vue";
import StateBanner from "~/components/atoms/StateBanner.vue";
import ProfileCard from "~/components/molecules/ProfileCard.vue";
import ReadOnlyField from "~/components/molecules/ReadOnlyField.vue";
import ReadOnlyText from "~/components/atoms/ReadOnlyText.vue";
import { useAdminProfile } from "~/composables/useAdminProfile";

const { profile, error, loadProfile, logout } = useAdminProfile();

onMounted(loadProfile);
</script>

<template>
  <AdminPageShell>
      <AdminHeader title="Profile" />
      <StateBanner tone="error" :message="error" />
      <ProfileCard>
        <ReadOnlyField label="ID">
          <ReadOnlyText :value="profile?.id ?? '-'" />
        </ReadOnlyField>

        <ReadOnlyField label="Nama Pengguna">
          <ReadOnlyText :value="profile?.name ?? '-'" />
        </ReadOnlyField>

        <ReadOnlyField label="Email">
          <ReadOnlyText :value="profile?.email || '-'" />
        </ReadOnlyField>

        <ReadOnlyField label="Role">
          <ReadOnlyText :value="profile?.role ?? '-'" />
        </ReadOnlyField>
      </ProfileCard>
      <button class="logout" @click="logout">Logout</button>
  </AdminPageShell>
</template>

<style scoped>

.logout {
  margin-top: 16px;
  width: 100%;
  padding: 10px 12px;

  background: #ffffff;
  border: 1px solid #ef4444;
  border-radius: 10px;

  color: #ef4444;
  font-size: 14px;
  font-weight: 500;

  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.1s ease,
    box-shadow 0.2s ease;
}

.logout:hover {
  background: #ef4444;
  color: #ffffff;
}

.logout:active {
  transform: scale(0.96);
  box-shadow: none;
}
</style>
