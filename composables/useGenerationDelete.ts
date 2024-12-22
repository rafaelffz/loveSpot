export const useGenerationDelete = () => {
  const loading = ref<boolean>(false);

  const remove = async (id: string) => {
    loading.value = true;

    try {
      await $fetch(`/api/generations/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };
  
  return {
    loading,
    remove,
  };
};
