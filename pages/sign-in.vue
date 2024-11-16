<template>
  <div class="flex">
    <SignIn
      path="/sign-in"
      sign-up-url="/sign-up"
      fallback-redirect-url="/"
      :appearance="{ baseTheme: neobrutalism }"
    />
  </div>
</template>

<script setup lang="ts">
import { neobrutalism } from "@clerk/themes";
import { useUser } from "vue-clerk";

definePageMeta({
  layout: "auth",
});
</script>
