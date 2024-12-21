<template>
  <Dialog
    v-model:visible="dialog"
    modal
    dismissable-mask
    header="QR Code"
    :draggable="false"
    class="w-[80vw] md:w-[30vw]"
  >
    <span class="block text-surface-600"
      >Abra seu site gerado apontando a câmera do seu celular para o QR Code
      abaixo!</span
    >

    <div class="my-8 flex items-center justify-center gap-4">
      <img
        :src="props.qrcode"
        alt="qrcode"
        class="rounded-lg border border-gray-600"
      />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
const dialog = defineModel<boolean>("dialog");

const props = defineProps<{
  qrcode: string;
}>();
</script>
