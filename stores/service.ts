import { defineStore } from "pinia";

export interface Service {
  id: string;
  titre: string;
  description?: string;
  image?: string;
  created_at: string;
  updated_at: string;
}

export const useServiceStore = defineStore("service", {
  state: () => ({
    services: [] as Service[],
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/services");
        this.services = res;
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async show(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api(`/services/${id}`);
        return res as Service;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async store(formData: FormData) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/services", {
          method: "POST",
          body: formData,
        });

        // Mise à jour locale
        this.services.unshift(res.data);
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async update(id: string, formData: FormData) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        // Laravel PUT with files needs `_method: 'PUT'` via a POST request
        if (!formData.has('_method')) formData.append('_method', 'POST');

        const res: any = await $api(`/services/${id}`, {
          method: "POST",
          body: formData,
        });

        // Mise à jour locale
        const index = this.services.findIndex(s => s.id === id);
        if (index !== -1) {
          this.services[index] = res.data;
        }

        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async destroy(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        await $api(`/services/${id}`, {
          method: "DELETE",
        });

        // Mise à jour locale
        this.services = this.services.filter(s => s.id !== id);
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
