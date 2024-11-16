<template>
  <div class="h-full w-full">
    <Hero
      @register="router.push('/sign-up')"
      @my-generations="router.push(`/dashboard/${user?.username}`)"
    />
  </div>
</template>

<script setup lang="ts">
import { useUser } from "vue-clerk";

const { user } = useUser();

const router = useRouter();
</script>
