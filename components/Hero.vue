<template>
  <div
    class="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center"
  >
    <div
      class="max-w-4xl text-center font-Sans text-5xl font-bold leading-tight text-white"
    >
      Surpreenda quem você ama com um site totalmente personalizado!
    </div>

    <div
      class="mt-12 max-w-3xl text-center font-Sans text-2xl font-bold leading-tight text-white"
    >
      Criado de forma <span class="bg-red-500 px-1">rápida e prática</span>, em
      apenas <span class="bg-red-500 px-1">alguns cliques</span>, para celebrar
      momentos especiais de um jeito único!
    </div>

    <Button
      class="mt-12"
      label="Começar agora"
      icon="pi pi-heart"
      raised
      @click="emit('register')"
    />
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: "register"): void;
}>();
</script>
