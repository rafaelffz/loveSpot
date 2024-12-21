<template>
  <div class="h-screen w-full overflow-auto bg-slate-100">
    <Header
      @home="router.push('/')"
      @login="router.push('/sign-in')"
      @register="router.push('/sign-up')"
      @my-generations="router.push('/dashboard')"
      @new="router.push('/generations/new')"
    />

    <slot />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
