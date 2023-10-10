import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';

export const useOffsetStore = defineStore('offsetStore', () => {
  const offset: Ref<number> = ref(0);

  function updateOffset(newOffset: number) {
    offset.value = Object.is(offset.value, newOffset) ? -newOffset : newOffset;
  };

  return { offset, updateOffset };
});