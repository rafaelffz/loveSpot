<template>
  <Card>
    <template #title>
      <div class="flex items-center justify-between leading-none">
        {{ props.coupleName }}

        <div class="flex items-center gap-2">
          <span
            v-tooltip.top="'Data de criação'"
            class="rounded-full bg-gray-100 px-2 py-1 text-sm"
            >{{ date }}</span
          >

          <Button
            icon="pi pi-ellipsis-h"
            variant="text"
            rounded
            class="!text-surface-600"
            @click="toggle"
          />
          <Menu ref="menu" :model="items" popup>
            <template #item="{ item }">
              <div
                class="flex cursor-pointer items-center gap-3 px-2 py-1.5"
                @click="item.action"
              >
                <i :class="[item.icon, item.color]"></i>
                <span :class="item.color">{{ item.label }}</span>
              </div>
            </template>
          </Menu>
        </div>
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
          @click="emit('show-qr-code')"
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

const confirm = useConfirm();
const toast = useToast();

const props = defineProps<{
  id: string;
  coupleName: string;
  createdAt: string;
  message: string;
}>();

const emit = defineEmits<{
  (e: "show-qr-code"): void;
  (e: "delete-generation", id: string): void;
}>();

const date = computed(() => dayjs(props.createdAt).format("DD/MM/YYYY"));

const toggleConfirmDelete = (item: any) => {
  console.log(item)

  confirm.require({
    message: "Você tem certeza que deseja deletar essa geração?",
    header: "Atenção!",
    icon: "pi pi-exclamation-triangle",
    rejectLabel: "Cancelar",
    rejectProps: {
      label: "Cancelar",
      severity: "secondary",
      outlined: true,
    },
    acceptProps: {
      label: "Deletar",
      severity: "danger",
    },
    accept: () => {
      emit('delete-generation', props.id)
      toast.add({
        severity: "success",
        summary: "Deletada",
        detail: "Sua geração foi deletada com sucesso!",
        life: 3000,
      });
    },
  });
};

const menu = ref();
const items = ref([
  {
    label: "Deletar",
    icon: "pi pi-trash",
    color: "text-red-500",
    action: toggleConfirmDelete,
  },
]);

const toggle = (event: Event) => {
  menu.value.toggle(event);
};
</script>
