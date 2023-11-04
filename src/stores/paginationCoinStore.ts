import { defineStore } from 'pinia';

interface PaginationInterface {
  offset: number;
  items: number;
}

export const usePaginationCoinStore = defineStore('paginationCoinStore', {
  state: (): PaginationInterface => ({
    offset: 0,
    items: 50
  }),

  actions: {
    updateOffset(newOffset: number) {
        this.offset = newOffset;
    }
  }
});