<template>
  <div
    class="flex h-[calc(100vh-80px)] w-full flex-col items-center px-5 font-Sans"
  >
    <Card class="mt-10 w-full max-w-3xl">
      <template #title>
        <span v-if="user?.firstName" class="text-2xl font-semibold leading-none"
          >Bem-vindo, {{ user?.firstName }}!</span
        >
      </template>

      <template #content>
        <span
          v-if="user?.firstName"
          class="text-2xl font-semibold leading-none text-slate-500"
          >Os sites que você gerar irão aparecer nesta tela.</span
        >
      </template>
    </Card>

    <div v-if="loading" class="mt-10 flex w-full max-w-3xl flex-col gap-4">
      <Skeleton v-for="n in 5" :key="n" height="70px" />
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
          <span class="text-xl font-semibold leading-none text-slate-500">
            Você pode gerar um novo pelo botão no topo da página.
          </span>
        </template>
      </Card>
    </div>

    <div
      v-if="!isEmpty && !loading"
      class="flex w-full max-w-3xl flex-col py-16"
    >
      <p class="mb-3 text-base text-gray-700">
        <span class="text-lg font-semibold text-gray-800">{{
          generations.length
        }}</span>
        <span v-if="generations.length === 1"> geração encontrada.</span>
        <span v-else> gerações encontradas.</span>
      </p>

      <div v-auto-animate class="flex flex-col gap-5">
        <Generation
          v-for="generation in generations"
          :id="generation.id"
          :key="generation.id"
          :couple-name="generation.coupleName"
          :created-at="generation.createdAt"
          :message="generation.message"
          @show-qr-code="handleQrCode"
          @open-site="handleOpenSite"
          @delete-generation="handleDeleteGeneration"
        />
      </div>

      <QrCodeDialog v-model:dialog="dialog" :qrcode="qrcode.value" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUser } from "vue-clerk";
import { useQRCode } from "@vueuse/integrations/useQRCode";

definePageMeta({
  layout: "dashboard",
  middleware: "clerk:auth",
  auth: {
    navigateUnauthenticatedTo: "/sign-in",
  },
});

const config = useRuntimeConfig();

const { user } = useUser();

const { loading, generations, isEmpty, refetch } = useGenerations();
const { remove } = useGenerationDelete();

const dialog = ref<boolean>(false);

const qrcodeValue = ref("");

const qrcode = computed(() =>
  useQRCode(qrcodeValue.value, {
    errorCorrectionLevel: "M",
    margin: 2,
    scale: 7,
  }),
);

const handleDeleteGeneration = async (id: string) => {
  await remove(id);
  await refetch();
};

const handleQrCode = (id: string) => {
  dialog.value = true;
  qrcodeValue.value = `${config.public.url}/${id}`;
};

const handleOpenSite = (id: string) => {
  window.open(`${config.public.url}/${id}`, "_blank");
};
</script>
