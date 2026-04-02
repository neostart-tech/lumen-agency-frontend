<template>
  <div class="min-h-screen relative flex items-center justify-center px-4 bg-[#f8f9fa] py-6 md:py-8 selection:bg-primary selection:text-white">
    <!-- Background subtle pattern -->
    <div class="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
      <div class="w-full h-full" style="background-image: radial-gradient(var(--color-primary) 0.5px, transparent 0.5px); background-size: 24px 24px;"></div>
    </div>

    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-4xl transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
      <div
        class="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[540px] rounded-3xl">
        
        <!-- Côté Gauche: Branding & Image (Desktop only) -->
        <div class="hidden md:flex w-2/5 bg-[#0B0A07] relative overflow-hidden flex-col justify-between p-12 text-white">
          <!-- Background Decoration -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-10 border border-primary/10"></div>
          <div class="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl -ml-24 -mb-24"></div>
          
          <div class="relative z-10 transition-transform hover:scale-105 duration-500">
            <NuxtLink to="/">
              <img src="/images/logo-1-blanc.png" class="h-14 w-auto" alt="Logo Lumen Agency" />
            </NuxtLink>
          </div>

          <div class="relative z-10 space-y-6">
            <h2 class="text-4xl font-extrabold leading-tight tracking-tight uppercase">
              Dashboard <span class="text-primary">Admin</span>
            </h2>
            <p class="text-white/60 text-sm leading-relaxed font-light tracking-wide">
              Gérez votre agence avec élégance et performance depuis votre espace administrateur sécurisé.
            </p>
            <div class="flex gap-2">
              <div class="h-1 w-12 bg-primary rounded-full"></div>
              <div class="h-1 w-4 bg-white/20 rounded-full"></div>
              <div class="h-1 w-4 bg-white/20 rounded-full"></div>
            </div>
          </div>

          <!-- Abstract curved shape at bottom -->
          <svg class="absolute bottom-0 left-0 w-full h-32 text-primary/5 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,100 C30,80 70,80 100,100 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>

        <!-- Côté Droit: Form -->
        <div class="flex-1 p-8 md:p-10 flex flex-col justify-center bg-white">
          <div class="mb-8 text-center md:text-left">
            <div class="md:hidden mb-10 flex justify-center">
              <div class="p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm">
                <img src="/images/logo-fond-blanc.png" class="h-12 w-auto" alt="Logo" />
              </div>
            </div>
            <h1 class="text-4xl font-extrabold text-[#0B0A07] tracking-tight">Connexion</h1>
            <div class="h-1.5 w-12 bg-primary rounded-full mt-4 mx-auto md:mx-0"></div>
            <p class="mt-2 text-gray-400 text-[10px] font-medium uppercase tracking-[0.2em]">Accès réservé • Lumen Agency</p>
          </div>

          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Email Administrateur</label>
              <div class="relative group">
                <input v-model="email" type="email" placeholder="nom@lumen-agency.com"
                  class="w-full bg-gray-50 border-2 border-gray-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:bg-white px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 rounded-2xl"
                  required />
              </div>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between items-center ml-2">
                <label class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">Code d'accès</label>
                <NuxtLink to="/admin/forgot-password" class="text-[10px] font-black text-primary uppercase tracking-widest hover:underline transition-all">Oublié ?</NuxtLink>
              </div>
              <div class="relative group">
                <input v-model="password" :type="showPassword ? 'text' : 'password'" placeholder="••••••••"
                  class="w-full bg-gray-50 border-2 border-gray-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:bg-white px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 rounded-2xl"
                  required />
                <button type="button" @click="showPassword = !showPassword"
                  class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-300 hover:text-primary transition-colors duration-300">
                  <svg v-if="!showPassword" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.96 9.96 0 012.219-3.423m1.43-1.1A9.963 9.963 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.481 2.563M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3 3l18 18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>

            <button :disabled="isLoading"
              class="w-full bg-[#0B0A07] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-black/10 hover:bg-primary hover:-translate-y-1 active:translate-y-0 transition-all duration-500 disabled:opacity-60 flex items-center justify-center gap-3 group">
              <svg v-if="isLoading" class="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <div v-else class="flex items-center gap-3">
                <span>Authentification</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 translate-x-0 group-hover:translate-x-2 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </button>
          </form>

          <div class="mt-10 pt-6 border-t border-gray-100 text-center">
            <NuxtLink to="/" class="text-[10px] font-black text-gray-300 hover:text-primary uppercase tracking-[0.4em] transition-colors">
              Retour au portail public
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "~~/stores/auth";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Swal from 'sweetalert2';

definePageMeta({
  layout: false,
  auth: false,
});

const router = useRouter();
const auth = useAuthStore();
const route = useRoute();
const email = ref("");
const password = ref("");
const showPassword = ref(false);
const isLoading = ref(false);

// Redirige si l'utilisateur est déjà connecté
onMounted(() => {
  auth.init();
  if (auth.isLogged) {
    navigateTo("/admin");
  }
});

const handleLogin = async () => {
  if (!email.value || !password.value) {
    Swal.fire({
      title: 'Attention',
      text: 'Veuillez remplir tous les champs.',
      icon: 'warning',
      confirmButtonColor: '#f29004',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-xl font-bold px-8 py-3'
      }
    });
    return;
  }

  isLoading.value = true;
  try {
    await auth.login(email.value, password.value);

    // Toast premium pour le succès
    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: 'Accès autorisé !',
      text: 'Heureux de vous revoir.',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      customClass: {
        popup: 'rounded-2xl border-l-4 border-green-500 shadow-2xl'
      }
    });

    // Redirection vers admin par défaut ou page demandée
    const redirect = typeof route.query.redirect === "string" ? route.query.redirect : "/admin";
    navigateTo(redirect);

  } catch (e: any) {
    Swal.fire({
      title: 'Erreur d\'accès',
      text: e.message || "Identifiants incorrects ou accès non autorisé.",
      icon: 'error',
      confirmButtonColor: '#0B0A07',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-xl font-black px-8 py-3 uppercase tracking-widest text-sm'
      }
    });
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: 'Accès Administrateur - Lumen Agency'
})
</script>

<style scoped>
/* Use the fonts already defined in nuxt.config */
.animate-in {
  animation-duration: 0.8s;
  animation-fill-mode: both;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-in-from-bottom-8 {
  from { transform: translateY(2rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.fade-in { animation-name: fade-in; }
.slide-in-from-bottom-8 { animation-name: slide-in-from-bottom-8; }
</style>
