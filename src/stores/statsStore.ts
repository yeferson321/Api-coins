import { defineStore } from 'pinia'
import { StatsInterface } from '../interfaces/DataInterface';

export const useStatsStore = defineStore('stats', {
  state: () => ({
    stats: {} as StatsInterface,
  }),
  actions: {
    addState(dataStats: StatsInterface){
        this.$patch({ stats: dataStats });
    }
  }
})