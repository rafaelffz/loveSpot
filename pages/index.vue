<template>
  <div class="h-full w-full">
    <Hero
      @register="router.push('/sign-up')"
      @my-generations="router.push('/dashboard')"
    />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
