import { defineStore } from 'pinia';
import { PaginationStoreInterface } from '../interfaces/indexInterface';

export const usePaginationCoinStore = defineStore('paginationCoinStore', {
  state: (): PaginationStoreInterface => ({
    offset: 0,
    items: 50,
    halfItem: 25,
    pagesToShow: [],
    MIN_PAGES: 3,
    MAX_PAGES: 4,
    CENTER_PAGES: 1
  }),
  
  getters: {
    currentPage: (state) => {
      return (state.offset / state.items) + 1;
    }
  },

  actions: {
    setOffset(newOffset: number) {
      this.offset = newOffset;
    },

    setIncOffset() {
      this.offset += this.items;
    },

    setDecOffset() {
      this.offset -= this.items;
    },
    
    resetOffset() {
      this.offset = 0;
    },
  }
});