import { defineStore } from 'pinia';
import { StatsInterface } from '../interfaces/DataInterface';

// Define una tienda para gestionar las estadísticas
export const useStatsStore = defineStore('stats', {
  state: () => ({
    stats: {} as StatsInterface,
  }),

  actions: {
    addStats(newStats: StatsInterface) {
      this.$patch({ stats: newStats });
    }
  }
});
