<template>
  <div class="h-screen w-full overflow-hidden bg-slate-100">
    <Header
      @home="router.push('/')"
      @login="router.push('/sign-in')"
      @register="router.push('/sign-up')"
      @new="router.push('/generations/new')"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
