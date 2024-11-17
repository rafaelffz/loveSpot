<template>
  <div class="flex">
    <SignUp sign-in-url="/sign-in" :appearance="{ baseTheme: neobrutalism }" />
  </div>
</template>

<script setup lang="ts">
import { neobrutalism } from "@clerk/themes";

definePageMeta({
  layout: "auth",
});
</script>
