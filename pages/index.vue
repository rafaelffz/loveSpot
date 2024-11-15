<template>
  <div class="h-full w-full">
    <Hero @register="router.push('/sign-up')" />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
