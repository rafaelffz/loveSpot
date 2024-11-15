<template>
  <div
    class="h-screen w-full overflow-hidden bg-gradient-to-tl from-red-900 via-slate-600 to-slate-900"
  >
    <Header @login="router.push('/sign-in')" @register="router.push('/sign-up')" />
    <slot />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
