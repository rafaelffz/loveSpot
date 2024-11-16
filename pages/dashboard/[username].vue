<template>
  <div class="flex w-full flex-col items-center px-5 font-Sans">
    <Card class="mt-10 w-full max-w-4xl">
      <template #title>
        <span class="text-3xl font-semibold leading-none" v-if="user?.firstName"
          >Bem-vindo, {{ user?.firstName }}!</span
        >
      </template>

      <template #subtitle>
        <span class="text-2xl font-semibold leading-none" v-if="user?.firstName"
          >Os sites que você gerar irão aparecer nesta tela.</span
        >
      </template>

      <template #footer>
        <span>Você pode gerar um novo pelo botão no topo da página.</span>
      </template>
    </Card>

    <div v-if="loading" class="mt-10 flex w-full max-w-4xl flex-col gap-4">
      <Skeleton v-for="n in 4" :key="n" height="80px" />
    </div>

    <div
      v-if="isEmpty && !loading"
      class="mt-14 flex w-full flex-col items-center gap-4"
    >
      <Card class="max-w-3xl">
        <template #title>
          <span class="text-2xl font-semibold leading-none">
            Não há sites gerados ainda!
          </span>
        </template>

        <template #footer>
          <span class="text-xl font-semibold leading-none">
            Você pode gerar um novo pelo botão no topo da página.
          </span>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "vue-clerk";
const { user } = useUser();

const { loading, generations, isEmpty } = useGenerations();

definePageMeta({
  layout: "dashboard",
  middleware: ["auth"],
});
</script>
