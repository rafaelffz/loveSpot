<template>
  <div class="flex">
    <SignIn
      sign-up-url="/sign-up"
      fallback-redirect-url="/"
      :appearance="{ baseTheme: neobrutalism }"
    />
  </div>
</template>

<script setup lang="ts">
import { neobrutalism } from "@clerk/themes";

definePageMeta({
  layout: "auth",
});
</script>
