<template>
  <div class="min-h-screen relative flex items-center justify-center px-4 bg-[#f8f9fa] py-6 md:py-8 selection:bg-primary selection:text-white">
    <!-- Background subtle pattern -->
    <div class="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent"></div>
      <div class="w-full h-full" style="background-image: radial-gradient(var(--color-primary) 0.5px, transparent 0.5px); background-size: 24px 24px;"></div>
    </div>

    <!-- Card -->
    <div class="relative z-10 w-full max-w-4xl transition-all duration-700 animate-in fade-in slide-in-from-bottom-8">
      <div class="bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100 flex flex-col md:flex-row min-h-[500px] rounded-3xl">
        
        <!-- Côté Gauche -->
        <div class="hidden md:flex w-2/5 bg-[#0B0A07] relative overflow-hidden flex-col justify-between p-12 text-white">
          <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-32 -mt-10 border border-primary/10"></div>
          
          <div class="relative z-10">
            <NuxtLink to="/">
              <img src="/images/logo-1-blanc.png" class="h-14 w-auto" alt="Logo Lumen Agency" />
            </NuxtLink>
          </div>

          <div class="relative z-10 space-y-6">
            <h2 class="text-4xl font-extrabold leading-tight tracking-tight uppercase">
              Nouveau <span class="text-primary">Accès</span>
            </h2>
            <p class="text-white/60 text-sm leading-relaxed font-light tracking-wide">
              Définissez votre nouveau code d'accès pour sécuriser votre espace.
            </p>
          </div>

          <svg class="absolute bottom-0 left-0 w-full h-32 text-primary/5 pointer-events-none" preserveAspectRatio="none" viewBox="0 0 100 100">
            <path d="M0,100 C30,80 70,80 100,100 L100,100 L0,100 Z" fill="currentColor" />
          </svg>
        </div>

        <!-- Côté Droit: Form -->
        <div class="flex-1 p-8 md:p-10 flex flex-col justify-center bg-white">
          <div class="mb-8 text-center md:text-left">
            <h1 class="text-4xl font-extrabold text-[#0B0A07] tracking-tight">Réinitialisation</h1>
            <div class="h-1.5 w-12 bg-primary rounded-full mt-4 mx-auto md:mx-0"></div>
          </div>

          <form @submit.prevent="handleReset" class="space-y-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Nouveau Mot de passe</label>
              <input v-model="form.password" type="password" placeholder="••••••••"
                class="w-full bg-gray-50 border-2 border-gray-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:bg-white px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 rounded-2xl"
                required />
            </div>

            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-2">Confirmer le mot de passe</label>
              <input v-model="form.password_confirmation" type="password" placeholder="••••••••"
                class="w-full bg-gray-50 border-2 border-gray-100 focus:border-primary/30 focus:ring-4 focus:ring-primary/5 focus:bg-white px-6 py-4 text-gray-900 font-bold outline-none transition-all placeholder:text-gray-300 rounded-2xl"
                required />
            </div>

            <button :disabled="isLoading"
              class="w-full bg-[#0B0A07] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.25em] shadow-2xl shadow-black/10 hover:bg-primary hover:-translate-y-1 active:translate-y-0 transition-all duration-500 disabled:opacity-60 flex items-center justify-center gap-3">
              <span v-if="isLoading" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              <span v-else>Mettre à jour le mot de passe</span>
            </button>
          </form>

          <div class="mt-10 pt-6 border-t border-gray-100 text-center">
            <NuxtLink to="/admin/login" class="text-[10px] font-black text-gray-400 hover:text-primary uppercase tracking-[0.2em] transition-colors">
              Retour à la connexion
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useAuthStore } from '~~/stores/auth';
import { useRoute, useRouter } from 'vue-router';
import Swal from 'sweetalert2';

definePageMeta({
  layout: false,
  auth: false,
});

const route = useRoute();
const router = useRouter();
const auth = useAuthStore();
const isLoading = ref(false);

const form = reactive({
  token: '',
  email: '',
  password: '',
  password_confirmation: '',
});

onMounted(() => {
  form.token = route.query.token as string;
  form.email = route.query.email as string;

  if (!form.token || !form.email) {
    Swal.fire({
      title: 'Lien invalide',
      text: 'Le lien de réinitialisation semble incomplet ou expiré.',
      icon: 'error',
      confirmButtonColor: '#0B0A07',
      confirmButtonText: 'Retour à la connexion'
    }).then(() => {
      navigateTo('/admin/login');
    });
  }
});

const handleReset = async () => {
  if (form.password !== form.password_confirmation) {
    Swal.fire({
      title: 'Attention',
      text: 'Les mots de passe ne correspondent pas.',
      icon: 'warning',
      confirmButtonColor: '#ff6000'
    });
    return;
  }

  isLoading.value = true;
  try {
    await auth.resetPassword(form);
    await Swal.fire({
      title: 'Succès !',
      text: 'Votre mot de passe a été mis à jour avec succès.',
      icon: 'success',
      confirmButtonColor: '#ff6000',
      customClass: {
        popup: 'rounded-3xl',
        confirmButton: 'rounded-xl font-bold px-8 py-3'
      }
    });
    navigateTo('/admin/login');
  } catch (e: any) {
    Swal.fire({
      title: 'Erreur',
      text: e.message || "Une erreur est survenue lors de la réinitialisation.",
      icon: 'error',
      confirmButtonColor: '#0B0A07'
    });
  } finally {
    isLoading.value = false;
  }
};

useHead({
  title: 'Réinitialisation de mot de passe - Lumen Agency'
});
</script>

<style scoped>
.animate-in { animation-duration: 0.8s; animation-fill-mode: both; }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide-in-from-bottom-8 { from { transform: translateY(2rem); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
.fade-in { animation-name: fade-in; }
.slide-in-from-bottom-8 { animation-name: slide-in-from-bottom-8; }
</style>
