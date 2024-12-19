<template>
  <Card>
    <template #title>
      <div class="flex items-center justify-between leading-none">
        {{ props.coupleName }}

        <span
          v-tooltip.top="'Data de criação'"
          class="rounded-full bg-gray-100 px-2 py-1 text-sm"
          >{{ date }}</span
        >
      </div>
    </template>

    <template #footer>
      <div class="mt-1 flex gap-4">
        <Button
          label="Visitar site"
          icon="pi pi-external-link"
          icon-pos="right"
          severity="secondary"
          outlined
          class="w-full"
        />
        <Button
          label="Exibir QR Code"
          icon="pi pi-qrcode"
          icon-pos="right"
          class="w-full"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const props = defineProps<{
  coupleName: string;
  createdAt: string;
  message: string;
}>();

const date = computed(() => dayjs(props.createdAt).format("DD/MM/YYYY"));
</script>
