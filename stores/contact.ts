import { defineStore } from "pinia";

export interface Contact {
  id: string;
  telephone1?: string;
  telephone2?: string;
  email?: string;
  adresse?: string;
  created_at: string;
  updated_at: string;
}

export const useContactStore = defineStore("contact", {
  state: () => ({
    contact: null as Contact | null,
    loading: false,
  }),

  actions: {
    async fetch() {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/contacts");
        this.contact = res;
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async update(data: {
      telephone1?: string;
      telephone2?: string;
      email?: string;
      adresse?: string;
    }) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api(`/contacts`, {
          method: "PUT",
          body: data,
        });

        this.contact = res;
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
