import { defineStore } from 'pinia'

export const useOffsetStore = defineStore('offset', {
  state: () => ({
    offset: 0 as number,
  }),
  actions: {
    updateOffset(dataoffset: number){ 
        this.$patch({ offset: dataoffset });    
    }
  }
})