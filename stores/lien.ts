import { defineStore } from "pinia";

export interface Lien {
  id: string;
  instagram?: string;
  facebook?: string;
  x?: string;
  tiktok?: string;
  created_at: string;
  updated_at: string;
}

export const useLienStore = defineStore("lien", {
  state: () => ({
    lien: null as Lien | null,
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/liens");
        this.lien = res;
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async update(id: string, data: { instagram?: string; facebook?: string; x?: string; tiktok?: string }) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api(`/liens/${id}`, {
          method: "PUT",
          body: data,
        });

        this.lien = res.data;
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
