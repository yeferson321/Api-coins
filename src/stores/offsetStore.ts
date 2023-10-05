import { defineStore } from 'pinia';

export const useOffsetStore = defineStore('offset', {
  state: () => ({
    offset: 0 as number,
  }),

  actions: {
    updateOffset(newOffset: number) {
      this.offset = Object.is(this.offset, newOffset) ? -newOffset : newOffset;
    }
  }
});

