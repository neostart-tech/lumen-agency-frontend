<template>
  <div class="login-page overflow-hidden selection:bg-primary selection:text-white">
    <!-- Animated Soft Background -->
    <div class="absolute inset-0 z-0 bg-[#f8fafc]">
      <!-- Animated Soft Orbs -->
      <div class="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse"></div>
      <div class="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[150px] animate-pulse delay-700"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-secondary/5 rounded-full blur-[180px] animate-float"></div>
      
      <!-- Subtle Perspective Grid -->
      <div class="grid-overlay"></div>
    </div>

    <div class="login-container">
      <div class="login-card-wrapper">
        <!-- Decoration Elements -->
        <div class="absolute -top-12 -left-12 w-24 h-24 border-t-2 border-l-2 border-primary/20 rounded-tl-3xl"></div>
        <div class="absolute -bottom-12 -right-12 w-24 h-24 border-b-2 border-r-2 border-primary/20 rounded-br-3xl"></div>

        <div class="login-card bg-white border border-gray-100 shadow-[0_40px_100px_rgba(0,0,0,0.08)]">
          <div class="login-card__header text-center">
            <div class="w-20 h-20 rounded-2xl bg-gray-50 p-4 mx-auto mb-6 border border-gray-100 shadow-sm transition-transform hover:scale-105 duration-500">
              <img src="/images/logo-fond-blanc.png" alt="Logo Lumen Agency" class="w-full h-full object-contain" />
            </div>
            <h1 class="text-2xl font-extrabold text-[#0B0A07] uppercase tracking-[0.2em] mb-2">Dashboard</h1>
            <p class="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-medium">Administration • Accès Sécurisé</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
              <label for="email" class="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-bold ml-2">Identifiant</label>
              <div class="input-wrapper group">
                <input type="email" id="email" v-model="credentials.email" 
                  class="bg-gray-50 border-gray-200 text-[#0B0A07] placeholder:text-gray-300 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                  placeholder="nom@lumen-agency.com" required />
                <svg xmlns="http://www.w3.org/2000/svg" class="input-icon group-focus-within:text-primary transition-colors" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
            </div>

            <div class="form-group">
              <label for="password" class="text-[11px] uppercase tracking-[0.15em] text-gray-500 font-bold ml-2">Code d'accès</label>
              <div class="input-wrapper group">
                <input :type="showPassword ? 'text' : 'password'" id="password" v-model="credentials.password"
                  class="bg-gray-50 border-gray-200 text-[#0B0A07] placeholder:text-gray-300 focus:bg-white focus:border-primary/50 focus:ring-4 focus:ring-primary/5 transition-all duration-300"
                  placeholder="••••••••" required />
                <button type="button" class="btn-toggle-pass" @click="showPassword = !showPassword">
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path
                      d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24">
                    </path>
                    <line x1="1" y1="1" x2="23" y2="23"></line>
                  </svg>
                </button>
              </div>
            </div>

            <button type="submit" class="btn-login group overflow-hidden relative" :disabled="isLoading">
              <div class="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              <span class="relative z-10 flex items-center justify-center gap-3 font-bold uppercase tracking-[0.2em] text-xs">
                {{ isLoading ? 'Initialisation...' : 'Authentification' }}
                <svg v-if="!isLoading" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </button>
          </form>

          <Transition name="fade">
            <div v-if="errorMsg" class="mt-8 p-4 bg-red-50 border border-red-100 rounded-xl">
              <p class="text-[10px] text-red-500 font-bold uppercase tracking-widest text-center">{{ errorMsg }}</p>
            </div>
          </Transition>
        </div>
      </div>

      <div class="mt-12 text-center reveal-delay">
        <NuxtLink to="/" class="group inline-flex items-center gap-2 text-[10px] text-gray-400 uppercase tracking-[0.3em] hover:text-primary transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour au portail
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from "~~/stores/auth";

definePageMeta({
  layout: false
})

const auth = useAuthStore()
const credentials = ref({ email: '', password: '' })
const showPassword = ref(false)
const isLoading = ref(false)
const errorMsg = ref('')

onMounted(() => {
  auth.init();
  if (auth.isLogged) {
    navigateTo("/admin");
  }
});

const handleLogin = async () => {
  errorMsg.value = ''

  let valid = true;
  if (!credentials.value.email.trim()) {
    errorMsg.value = "Identifiant manquant.";
    valid = false;
  } else if (!credentials.value.password) {
    errorMsg.value = "Code d'accès requis.";
    valid = false;
  }

  if (!valid) return;

  isLoading.value = true

  try {
    await auth.login(credentials.value.email, credentials.value.password);
    await navigateTo("/admin");
  } catch (e: any) {
    errorMsg.value = e?.message ?? "Accès refusé. Vérifiez vos codes.";
  } finally {
    isLoading.value = false;
  }
}

useHead({
  title: 'Système Administrateur - Lumen Agency'
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: 'Outfit', sans-serif;
  color: #0B0A07;
  background: #f8fafc;
  position: relative;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(242, 144, 4, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(242, 144, 4, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at 50% 50%, black, transparent 80%);
}

.login-container {
  width: 100%;
  max-width: 480px;
  perspective: 1000px;
  z-index: 10;
}

.login-card-wrapper {
  position: relative;
  animation: card-appear 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

.login-card {
  padding: 4rem 3rem;
  border-radius: 40px;
}

.login-form {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.input-wrapper {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(0, 0, 0, 0.2);
}

input {
  width: 100%;
  padding: 1.125rem 1.25rem 1.125rem 3.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  outline: none;
  border: 1px solid;
}

.btn-toggle-pass {
  position: absolute;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.btn-login {
  background: var(--color-primary);
  color: white;
  padding: 1.25rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px -10px rgba(var(--color-primary-rgb), 0.3);
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  border: none;
  cursor: pointer;
}

.btn-login:hover:not(:disabled) {
  box-shadow: 0 25px 50px -12px rgba(var(--color-primary-rgb), 0.5);
  transform: translateY(-3px) scale(1.02);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

@keyframes card-appear {
  0% { opacity: 0; transform: translateY(40px) rotateX(-10deg); }
  100% { opacity: 1; transform: translateY(0) rotateX(0); }
}

@keyframes float {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-45%, -55%) scale(1.1); }
}

.animate-float {
  animation: float 8s ease-in-out infinite;
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

