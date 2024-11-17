<template>
  <div class="flex w-full flex-col items-center px-5 font-Sans">
    <Toast />

    <Card class="mt-10 w-full max-w-4xl">
      <template #title>
        <span class="text-2xl font-semibold leading-none"
          >Vamos gerar um novo site? 🤩</span
        >
      </template>

      <template #footer>
        <span class="text-xl font-semibold leading-none text-slate-500"
          >Preencha os campos abaixo e depois clique em "Gerar site", o resto é
          com a gente! 😉</span
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
      <div class="grid grid-cols-3 gap-4">
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

      <div class="mt-12 flex items-center justify-end gap-2">
        <span class="text-slate-700"
          >Clique aqui quando estiver tudo certo
          <Icon
            name="material-symbols:arrow-right-alt-rounded"
            size="24"
            class="align-bottom text-slate-800"
          />
        </span>
        <Button type="submit" label="Gerar site" raised />
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "@primevue/forms";
import { FormField } from "@primevue/forms";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { z } from "zod";

definePageMeta({
  layout: "dashboard",
});

const toast = useToast();

interface FormData {
  coupleName: string;
  date: Date | null;
  message: string;
}

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

const onFormSubmit = ({ valid, values }: FormSubmitEvent) => {
  if (valid) {
    toast.add({
      severity: "success",
      summary: "Formulário enviado com sucesso!",
      life: 3000,
    });

    const { coupleName, date, message } = values as FormData;

    const dateFormatted = date?.toISOString();

    return {
      coupleName,
      date: dateFormatted,
      message,
    };
  }
};
</script>
