export const useGenerations = () => {
  const loading = ref<boolean>(false);
  const generations = ref([]);
  // const isEmpty = computed(() => generations.value.length === 0);
  const isEmpty = true;

  return {
    loading,
    generations,
    isEmpty,
  };
};
