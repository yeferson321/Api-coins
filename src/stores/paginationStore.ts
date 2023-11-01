import { defineStore } from 'pinia';
import { PaginationInterface } from '../interfaces/indexInterface';

export const usePaginationStore = defineStore('paginationStore', {
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