<template>
  <div class="flex">
    <SignIn
      path="/sign-in"
      sign-up-url="/sign-up"
      fallback-redirect-url="/dashboard"
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
