<template>
  <div
    class="flex h-screen w-full flex-col items-center justify-center gap-5 bg-gradient-to-tl from-red-900 via-slate-600 to-slate-900"
  >
    <div>
      <Button
        label="Voltar"
        icon="pi pi-arrow-left"
        raised
        @click="router.push('/')"
      />
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
const router = useRouter();
</script>
