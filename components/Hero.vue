<template>
  <div
    class="flex h-[calc(100vh-200px)] w-full flex-col px-5 items-center justify-center"
  >
    <div
      class="max-w-4xl text-center font-Sans font-bold leading-tight text-white drop-shadow-xl"
      :class="[isMobile ? 'text-4xl' : 'text-5xl']"
    >
      Surpreenda quem você ama com um site totalmente personalizado!
    </div>

    <div
      class="mt-12 max-w-3xl text-center font-Sans font-bold leading-tight text-white drop-shadow-xl"
      :class="[isMobile ? 'text-xl' : 'text-2xl']"
    >
      Criado de forma <span class="bg-red-500 px-1">rápida e prática</span>, em
      apenas <span class="bg-red-500 px-1">alguns cliques</span>, para celebrar
      momentos especiais de um jeito único!
    </div>

    <SignedOut>
      <Button
        class="mt-12"
        label="Começar agora"
        icon="pi pi-heart"
        raised
        @click="emit('register')"
      />
    </SignedOut>

    <SignedIn>
      <Button
        class="mt-12"
        label="Ver minhas gerações"
        severity="secondary"
        icon="pi pi-desktop"
        raised
        @click="$emit('my-generations')"
      />
    </SignedIn>
  </div>
</template>

<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
const isMobile = smallerOrEqual("md");

const emit = defineEmits<{
  (e: "register"): void;
  (e: "my-generations"): void;
}>();
</script>
