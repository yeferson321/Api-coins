import { defineStore } from 'pinia';

interface PaginationInterface {
  offset: number;
  items: number;
};

// Definition and creation of the store
export const usePaginationCoinStore = defineStore('paginationCoinStore', {
  state: (): PaginationInterface => ({
    offset: 0, // Initial offset value
    items: 50, // Default number of items per page
  }),

  actions: {
    // Method to update the pagination offset
    setOffset(newOffset: number) {
      this.offset = newOffset;
    },
    
    // Method to reset the offset to its initial value
    resetOffset() {
      this.offset = 0;
    }
  }
});