import type { Generation } from "~/entities/Generation";

export const useGenerationCreate = () => {
  const loading = ref<boolean>(false);
  const generation = ref<Generation>();

  const coupleName = ref("");
  const date = ref<Date | null>(null);
  const message = ref("");

  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const create = async () => {
    if (!coupleName.value || !date.value || !message.value) {
      throw createError({
        statusCode: 400,
        statusMessage: "Bad Request",
        message: "Todos os campos são obrigatórios!",
      });
    }

    loading.value = true;

    try {
      const response = await $fetch<Generation>("/api/generations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          coupleName: coupleName.value,
          date: formatDate(date.value),
          message: message.value,
        },
      });

      generation.value = response;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    generation,
    coupleName,
    date,
    message,
    create,
  };
};
