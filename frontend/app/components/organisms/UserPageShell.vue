<script setup lang="ts">
import BackButton from "~/components/atoms/BackButton.vue"
import Logo from "~/components/atoms/Logo.vue"

const props = withDefaults(
  defineProps<{
    showBack?: boolean
    logoHeight?: number
    maxWidth?: number | string
    pagePadding?: string
    headerPadding?: string
    headerMarginBottom?: string
    background?: string
  }>(),
  {
    showBack: false,
    logoHeight: 36,
    maxWidth: 402,
    pagePadding: "20px 20px 120px",
    headerPadding: "0",
    headerMarginBottom: "24px",
    background: "#f1f3f5",
  }
)

defineEmits<{
  (e: "back"): void
}>()
</script>

<template>
  <div class="mobile" :style="{ background: props.background }">
    <div
      class="page"
      :style="{
        maxWidth: typeof props.maxWidth === 'number' ? `${props.maxWidth}px` : props.maxWidth,
        padding: props.pagePadding,
      }"
    >
      <header
        class="header"
        :style="{ padding: props.headerPadding, marginBottom: props.headerMarginBottom }"
      >
        <BackButton v-if="props.showBack" class="back" @click="$emit('back')" />
        <Logo class="logo" :height="props.logoHeight" />
        <slot name="header-right" />
      </header>

      <slot />
    </div>
  </div>
</template>

<style scoped>
.mobile {
  min-height: 100vh;
}

.page {
  margin: auto;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  align-items: center;
}

.back {
  background: none;
  border: none;
  width: 36px;
  height: 36px;
  padding: 0;
}

.back img {
  width: 36px;
  height: 36px;
}

.logo {
  margin-left: auto;
}
</style>
