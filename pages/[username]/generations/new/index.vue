<template>
  <div class="flex h-full w-full flex-col items-center px-5 font-Sans">
    <Toast />

    <Card class="mt-10 w-full max-w-4xl">
      <template #title>
        <span class="text-2xl font-semibold leading-none"
          >Vamos gerar um novo site? 🤩</span
        >
      </template>

      <template #footer>
        <span class="text-xl font-semibold leading-none text-slate-500"
          >Preencha os campos abaixo e depois clique em "Gerar", o resto é com a
          gente! 😉</span
        >
      </template>
    </Card>

    <Form
      v-slot="$form"
      :resolver
      :initialValues
      @submit="onFormSubmit"
      class="mt-12 flex w-full max-w-4xl flex-col gap-10"
    >
      <div
        class="grid gap-4"
        :class="[isMobile ? 'grid-cols-1' : 'grid-cols-3']"
      >
        <FormField
          v-slot="$field"
          name="coupleName"
          initialValue=""
          class="flex flex-col gap-1"
        >
          <label
            class="pl-1 text-sm font-normal text-slate-800"
            for="coupleName"
            >Nome do casal</label
          >
          <InputText
            name="coupleName"
            id="coupleName"
            v-model="coupleName"
            type="text"
            placeholder="Ex: João e Maria"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>

        <FormField
          v-slot="$field"
          name="date"
          initialValue=""
          class="flex flex-col gap-1"
        >
          <label class="pl-1 text-sm font-normal text-slate-800" for="date"
            >Início do relacionamento</label
          >
          <DatePicker
            name="date"
            id="date"
            v-model="date"
            showIcon
            fluid
            iconDisplay="input"
            inputId="icondisplay"
            dateFormat="dd/mm/yy"
            placeholder="dd/mm/aa"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>

        <FormField
          v-slot="$field"
          name="endDate"
          initialValue=""
          class="flex flex-col gap-1"
        >
          <label class="pl-1 text-sm font-normal text-slate-800" for="endDate"
            >Sem data de término, lógico</label
          >
          <DatePicker
            name="endDate"
            id="endDate"
            showIcon
            fluid
            disabled
            iconDisplay="input"
            inputId="icondisplay"
            dateFormat="dd/mm/yy"
            placeholder="dd/mm/aa"
          />
          <Message
            v-if="$field?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $field.error?.message }}</Message
          >
        </FormField>
      </div>

      <FormField
        v-slot="$field"
        name="message"
        initialValue=""
        class="flex flex-col gap-1"
      >
        <Textarea
          id="message"
          type="text"
          v-model="message"
          name="message"
          rows="7"
          class="resize-none"
          placeholder="Escreva sua mensagem aqui!"
        />
        <Message
          v-if="$field?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $field.error?.message }}</Message
        >
      </FormField>

      <div class="my-12 flex items-center justify-end gap-2">
        <span
          class="text-slate-700"
          :class="[isMobile ? 'text-sm' : 'text-base']"
          >Clique aqui quando estiver pronto
          <Icon
            name="material-symbols:arrow-right-alt-rounded"
            :size="isMobile ? 18 : 24"
            class="align-bottom text-slate-800"
          />
        </span>
        <Button type="submit" :disabled="!enableButton" label="Gerar" raised />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

const { smallerOrEqual } = useBreakpoints(breakpointsTailwind);
const isMobile = smallerOrEqual("md");

definePageMeta({
  layout: "dashboard",
});

const toast = useToast();

interface FormData {
  coupleName: string;
  date: Date | null;
  message: string;
}

const coupleName = ref("");
const date = ref<Date | null>(null);
const message = ref("");

const initialValues = reactive({
  coupleName: "",
  date: "",
  message: "",
});

const resolver = zodResolver(
  z.object({
    coupleName: z.string().min(1, { message: "Nome do casal é obrigatório." }),
    date: z.preprocess(
      (val) => {
        if (!val || val === "" || val === null) {
          return null;
        }

        if (val instanceof Date && !isNaN(val.getTime())) {
          return val;
        }

        const date = new Date(val as string | number);
        return !isNaN(date.getTime()) ? date : null;
      },
      z.union([
        z.date(),
        z.null().refine((val) => val !== null, {
          message: "Data é obrigatória.",
        }),
      ]),
    ),
    message: z.string().min(1, { message: "Mensagem é obrigatória." }),
  }),
);

const onFormSubmit = ({ valid }: FormSubmitEvent) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Formulário enviado com sucesso!",
      life: 3000,
    });

    return {
      coupleName,
      date: new Date(),
      message,
    };
  }
};

const enableButton = computed(() => {
  return coupleName.value && date.value && message.value;
});
</script>
