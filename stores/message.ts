import { defineStore } from "pinia";

export interface Message {
  id: string;
  expediteur: string;
  email: string;
  telephone: string;
  type: "information" | "devis" | string;
  objet: string;
  date_prevue?: string;
  budget?: string;
  contenu: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export interface MessagePayload {
  expediteur: string;
  email: string;
  telephone: string;
  type: "information" | "devis" | string;
  objet: string;
  date_prevue?: string;
  budget?: string;
  contenu: string;
}

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: [] as Message[],
    loading: false,
    pollingInterval: null as ReturnType<typeof setInterval> | null,
  }),

  getters: {
    unreadCount(state) {
      return state.messages.filter((m) => !m.is_read).length;
    },
  },

  actions: {
    async fetch(silent = false) {
      const { $api } = useNuxtApp();
      if (!silent) this.loading = true;

      try {
        const res: any = await $api("/messages");
        this.messages = res || [];
        return res;
      } catch (error: any) {
        throw error;
      } finally {
        if (!silent) this.loading = false;
      }
    },

    startPolling() {
      if (!this.pollingInterval) {
        this.fetch();
        this.pollingInterval = setInterval(() => {
          this.fetch(true);
        }, 15000); // Poll every 15 seconds
      }
    },

    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
      }
    },

    async show(id: string) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api(`/messages/${id}`);

        // Mise à jour locale du statut de lecture
        const index = this.messages.findIndex((m) => m.id === id);
        if (index !== -1) {
          this.messages[index] = { ...this.messages[index], ...res };
        }

        return res as Message;
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async store(data: MessagePayload) {
      const { $api } = useNuxtApp();
      this.loading = true;

      try {
        const res: any = await $api("/messages", {
          method: "POST",
          body: data,
        });

        // Mise à jour locale
        this.messages.unshift(res);
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
        await $api(`/messages/${id}`, {
          method: "DELETE",
        });

        // Mise à jour locale
        this.messages = this.messages.filter((m) => m.id !== id);
      } catch (error: any) {
        throw error;
      } finally {
        this.loading = false;
      }
    },
  },
});
