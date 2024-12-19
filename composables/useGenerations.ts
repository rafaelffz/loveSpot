import type { Generation } from "~/entities/Generation";

interface GenerationsResponse {
  generations: Generation[];
}

export const useGenerations = () => {
  const loading = ref<boolean>(true);
  const generations = ref<Generation[]>([]);
  const isEmpty = computed(() => generations.value.length === 0);

  const fetchGenerations = async () => {
    try {
      const response = await $fetch<GenerationsResponse>("/api/generations");
      generations.value = response.generations;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    fetchGenerations();
  });

  return {
    loading,
    generations,
    isEmpty,
    refetch: fetchGenerations,
  };
};
