import { defineStore } from 'pinia';
import { db, type Product } from '../db';

export const useSalesStore = defineStore('sales', {
  state: () => ({
    sales: [] as Product[],
    loading: false,
    error: null as string | null,
  }),

  getters: {
    salesByCompany: (state) => {
      const grouped = new Map<string, Product[]>();
      state.sales.forEach(sale => {
        if (!grouped.has(sale.company)) {
          grouped.set(sale.company, []);
        }
        grouped.get(sale.company)?.push(sale);
      });
      return grouped;
    },

    totalSalesByCompany: (state) => {
      const totals = new Map<string, number>();
      state.sales.forEach(sale => {
        totals.set(sale.company, (totals.get(sale.company) || 0) + sale.sales);
      });
      return totals;
    },
  },

  actions: {
    async fetchSales() {
      this.loading = true;
      this.error = null;
      try {
        await db.init();
        this.sales = await db.getAllSales();
      } catch (err) {
        this.error = (err as Error).message;
      } finally {
        this.loading = false;
      }
    },

    async addSale(sale: Omit<Product, 'id'>) {
      try {
        await db.init();
        const id = await db.addSale(sale);
        this.sales.push({ ...sale, id });
      } catch (err) {
        this.error = (err as Error).message;
      }
    },
  },
});