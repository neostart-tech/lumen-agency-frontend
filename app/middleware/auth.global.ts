// middleware/auth.global.ts
import { navigateTo } from "#imports";
import { useAuthStore } from "~~/stores/auth";

export default defineNuxtRouteMiddleware((to) => {
  // Vérifie que le code s'exécute côté client
  if (!import.meta.client) {
    return;
  }

  const auth = useAuthStore();

  // Permet de désactiver le middleware sur une page via definePageMeta({ auth: false })
  if (to.meta.auth === false) {
    return;
  }

  // Si on est sur une page d'administration
  if (to.path.startsWith('/admin')) {
    // Si l'utilisateur n'est pas connecté
    if (!auth.isLogged) {
      return navigateTo('/admin/login');
    }
  }
});
