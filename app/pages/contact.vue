<script setup>
import { onMounted, ref, computed, reactive } from 'vue';
import { useContactStore } from '~~/stores/contact';
import { useServiceStore } from '~~/stores/service';
import { useMessageStore } from '~~/stores/message';
import Swal from 'sweetalert2';

const contactStore = useContactStore();
const serviceStore = useServiceStore();
const messageStore = useMessageStore();

const heroVisible = ref(false);
const heroSection = ref(null);

const route = useRoute();

onMounted(() => {
  contactStore.fetch();
  serviceStore.fetch();

  // Set initial form type from query param
  if (route.query.type === 'devis') {
    form.type = "Demande de devis";
  }

  // Hero reveal observer
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      heroVisible.value = entry.isIntersecting;
    });
  }, { threshold: 0.1 });
  if (heroSection.value) heroObserver.observe(heroSection.value);

  // General reveal-on-scroll observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    revealObserver.observe(el);
  });
});

// Page info for SEO
useHead({
  title: 'Contactez-nous | Lumen Agency',
  meta: [
    { name: 'description', content: 'Prenez contact avec Lumen Agency pour vos demandes de devis ou d\'informations. Notre équipe d\'experts est à votre écoute pour concrétiser vos projets.' }
  ]
})

const servicesList = computed(() => {
  const titles = serviceStore.services.map(s => s.titre.toUpperCase());
  return [...titles, "AUTRE"];
});

const requestTypes = [
  "Demande d’information",
  "Demande de devis"
];

const form = reactive({
  name: '',
  email: '',
  phone: '',
  type: 'Demande d’information',
  service: '',
  message: '',
  date: '',
  budget: ''
});

const isLoading = ref(false);

const isDevis = computed(() => form.type === "Demande de devis");

const submitForm = async () => {
  // Simple validation for devis
  if (isDevis.value && (!form.date || !form.budget)) {
    return; // HTML5 required field should handle it, but extra safety
  }

  isLoading.value = true;

  try {
    const payload = {
      expediteur: form.name,
      email: form.email,
      telephone: form.phone || "Non renseigné",
      type: form.type === "Demande de devis" ? "devis" : "information",
      objet: form.service,
      contenu: form.message,
      date_prevue: form.date || undefined,
      budget: form.budget || undefined
    };

    await messageStore.store(payload);

    // Succès avec SweetAlert
    Swal.fire({
      title: 'Message Envoyé !',
      text: 'Merci pour votre confiance. Nos experts reviendront vers vous très prochainement.',
      icon: 'success',
      confirmButtonText: 'Fermer',
      confirmButtonColor: '#f29004',
      customClass: {
        popup: 'rounded-[1.5rem] font-outfit shadow-2xl',
        confirmButton: 'rounded-full px-8 py-3 text-sm font-bold uppercase tracking-widest'
      }
    });

    // Reset formulaire immédiat
    Object.keys(form).forEach(key => {
      if (key === 'type') form[key] = 'Demande d’information';
      else form[key] = '';
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    Swal.fire({
      title: 'Erreur',
      text: 'Une erreur est survenue lors de l\'envoi. Veuillez réessayer.',
      icon: 'error',
      confirmButtonColor: '#f29004'
    });
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="bg-light min-h-screen font-outfit">
    <!-- Hero Section with Background -->
    <section ref="heroSection" class="relative py-20 md:py-32 bg-dark overflow-hidden flex items-center min-h-[400px]">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="/images/contact-bg.jpg" alt="Contact Lumen Agency"
          class="w-full h-full object-cover brightness-[0.5]" />
        <div class="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="max-w-4xl w-full space-y-8">
          <div
            class="block w-fit py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm reveal-on-scroll">
            Nous contacter
          </div>

          <div class="relative inline-block">
            <!-- Motion Line Animation -->
            <div
              class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-primary/30 overflow-hidden pointer-events-none z-0">
              <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
            </div>

            <h1
              class="relative z-10 text-2xl sm:text-3xl md:text-5xl font-semibold text-white uppercase tracking-normal leading-[1.2] flex flex-col">
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': heroVisible }">Donnons
                  vie à</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0 text-primary font-bold"
                  :class="{ 'animate-title-reveal delay-300': heroVisible }">vos projets</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0"
                  :class="{ 'animate-title-reveal delay-500': heroVisible }">d'exception</span>
              </span>
            </h1>
          </div>

          <p class="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl reveal-on-scroll delay-400">
            Une question, une demande de devis ou un besoin d'assistance ? Notre équipe est à votre entière disposition.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact & Form Section -->
    <section class="py-20 md:py-32">
      <div class="container mx-auto px-4 md:px-8">
        <div class="flex flex-col lg:flex-row gap-16 lg:gap-24">

          <!-- Contact Information -->
          <div class="w-full lg:w-1/3 space-y-12 reveal-on-scroll">
            <div>
              <h2 class="text-xs font-bold text-primary uppercase tracking-[0.3em] mb-8">Informations</h2>
              <h3 class="text-2xl md:text-3xl font-semibold text-dark uppercase mb-6 leading-tight">Nos coordonnées</h3>
              <p class="text-dark/60 font-light leading-relaxed mb-8">
                N'hésitez pas à nous joindre directement via nos différents canaux de communication.
              </p>
            </div>

            <div class="space-y-8">
              <div v-if="contactStore.contact?.telephone1" class="group flex items-start gap-6">
                <div
                  class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-dark/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-dark/40 uppercase tracking-widest mb-1">Téléphone Principal</p>
                  <a :href="'tel:' + contactStore.contact.telephone1"
                    class="text-dark font-medium hover:text-primary transition-colors">{{
                      contactStore.contact.telephone1 }}</a>
                </div>
              </div>

              <div v-if="contactStore.contact?.telephone2" class="group flex items-start gap-6">
                <div
                  class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-dark/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-dark/40 uppercase tracking-widest mb-1">Téléphone Secondaire</p>
                  <a :href="'tel:' + contactStore.contact.telephone2"
                    class="text-dark font-medium hover:text-primary transition-colors">{{
                      contactStore.contact.telephone2 }}</a>
                </div>
              </div>

              <div v-if="contactStore.contact?.email" class="group flex items-start gap-6">
                <div
                  class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-dark/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-dark/40 uppercase tracking-widest mb-1">Email</p>
                  <a :href="'mailto:' + contactStore.contact.email"
                    class="text-dark font-medium hover:text-primary transition-colors">{{ contactStore.contact.email
                    }}</a>
                </div>
              </div>

              <div v-if="contactStore.contact?.adresse" class="group flex items-start gap-6">
                <div
                  class="w-12 h-12 bg-white rounded-2xl shadow-sm border border-dark/5 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p class="text-[10px] font-bold text-dark/40 uppercase tracking-widest mb-1">Siège Social</p>
                  <p class="text-dark font-medium">{{ contactStore.contact.adresse }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Form Block -->
          <div
            class="w-full lg:w-2/3 bg-white rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-dark/5 border border-dark/5 reveal-on-scroll delay-300">
            <form @submit.prevent="submitForm" class="space-y-6">
              <!-- Group 1: Name & Email -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Name Field -->
                <div class="relative group reveal-on-scroll delay-100">
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500">
                  </div>
                  <div class="relative">
                    <input v-model="form.name" id="name" type="text" required placeholder=" "
                      class="peer w-full px-6 pt-7 pb-3 bg-light/50 border border-dark/5 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white transition-all outline-none" />
                    <label for="name"
                      class="absolute left-6 top-5 text-dark/40 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                      Nom Complet
                    </label>
                  </div>
                </div>

                <!-- Email Field -->
                <div class="relative group reveal-on-scroll delay-200">
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500">
                  </div>
                  <div class="relative">
                    <input v-model="form.email" id="email" type="email" required placeholder=" "
                      class="peer w-full px-6 pt-7 pb-3 bg-light/50 border border-dark/5 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white transition-all outline-none" />
                    <label for="email"
                      class="absolute left-6 top-5 text-dark/40 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                      Adresse Email
                    </label>
                  </div>
                </div>
              </div>

              <!-- Group 2: Phone & Request Type -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <!-- Phone Field -->
                <div class="relative group reveal-on-scroll delay-300">
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500">
                  </div>
                  <div class="relative">
                    <input v-model="form.phone" id="phone" type="tel" placeholder=" "
                      class="peer w-full px-6 pt-7 pb-3 bg-light/50 border border-dark/5 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white transition-all outline-none" />
                    <label for="phone"
                      class="absolute left-6 top-5 text-dark/40 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                      Téléphone (Optionnel)
                    </label>
                  </div>
                </div>

                <!-- Request Type Select -->
                <div class="relative group reveal-on-scroll delay-400">
                  <div
                    class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500">
                  </div>
                  <div class="relative">
                    <select v-model="form.type" id="type"
                      class="peer w-full px-6 pt-7 pb-3 bg-light/50 border border-dark/5 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white transition-all outline-none appearance-none cursor-pointer">
                      <option v-for="t in requestTypes" :key="t" :value="t">{{ t }}</option>
                    </select>
                    <label for="type"
                      class="absolute left-6 top-2 text-[10px] text-primary font-bold uppercase tracking-widest pointer-events-none">
                      Type de demande
                    </label>
                  </div>
                </div>
              </div>

              <!-- Service Select -->
              <div class="relative group reveal-on-scroll delay-500">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500">
                </div>
                <div class="relative">
                  <select v-model="form.service" id="service" required
                    class="peer w-full px-6 pt-7 pb-3 bg-light/50 border border-dark/5 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white transition-all outline-none appearance-none cursor-pointer">
                    <option value="" disabled selected>Choisir un service...</option>
                    <option v-for="s in servicesList" :key="s" :value="s">{{ s }}</option>
                  </select>
                  <label for="service" class="absolute left-6 transition-all duration-300 pointer-events-none"
                    :class="form.service ? 'top-2 text-[10px] text-primary font-bold uppercase tracking-widest' : 'top-5 text-dark/40 text-xs font-bold uppercase tracking-widest'">
                    Service concerné
                  </label>
                </div>
              </div>

              <!-- Devis Specific Fields -->
              <Transition enter-active-class="transition duration-500 ease-out"
                enter-from-class="opacity-0 -translate-y-4 scale-95"
                enter-to-class="opacity-100 translate-y-0 scale-100"
                leave-active-class="transition duration-300 ease-in"
                leave-from-class="opacity-100 translate-y-0 scale-100"
                leave-to-class="opacity-0 -translate-y-4 scale-95">
                <div v-if="isDevis" class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div class="relative group">
                    <div
                      class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition duration-500">
                    </div>
                    <div class="relative">
                      <input v-model="form.date" id="date" type="date" :required="isDevis"
                        class="peer w-full px-6 pt-7 pb-3 bg-light/50 border border-dark/5 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white transition-all outline-none" />
                      <label for="date"
                        class="absolute left-6 top-2 text-[10px] text-primary font-bold uppercase tracking-widest">Date
                        prévue</label>
                    </div>
                  </div>
                  <div class="relative group">
                    <div
                      class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-focus-within:opacity-10 transition duration-500">
                    </div>
                    <div class="relative">
                      <input v-model="form.budget" id="budget" type="text" :required="isDevis" placeholder=" "
                        class="peer w-full px-6 pt-7 pb-3 bg-light/50 border border-dark/5 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white transition-all outline-none" />
                      <label for="budget"
                        class="absolute left-6 top-5 text-dark/40 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                        Budget estimé (Préciser la devise)
                      </label>
                    </div>
                  </div>
                </div>
              </Transition>

              <!-- Message Field -->
              <div class="relative group reveal-on-scroll delay-700">
                <div
                  class="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-0 group-focus-within:opacity-20 transition duration-500">
                </div>
                <div class="relative">
                  <textarea v-model="form.message" id="message" rows="4" required placeholder=" "
                    class="peer w-full px-6 pt-7 pb-3 bg-light/50 border border-dark/5 rounded-2xl focus:outline-none focus:border-primary/50 focus:bg-white transition-all outline-none resize-none"></textarea>
                  <label for="message"
                    class="absolute left-6 top-5 text-dark/40 text-xs font-bold uppercase tracking-widest transition-all duration-300 pointer-events-none peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Votre Message
                  </label>
                </div>
              </div>

              <!-- Submit Button -->
              <div class="pt-6 flex justify-center">
                <button type="submit" :disabled="isLoading"
                  class="group relative w-full md:w-auto h-[64px] px-12 rounded-full font-bold uppercase tracking-[0.2em] text-sm overflow-hidden transition-all duration-500 active:scale-95 disabled:opacity-70 disabled:scale-100 button-shimmer">
                  <!-- Button Background & Border -->
                  <div class="absolute inset-0 bg-primary group-hover:bg-accent transition-colors duration-500"></div>
                  <div
                    class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse">
                  </div>

                  <!-- Content -->
                  <div class="relative flex items-center justify-center gap-3 text-white">
                    <span v-if="!isLoading" class="flex items-center gap-2">
                      Envoyer le message
                      <svg xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    <span v-else class="flex items-center gap-3">
                      <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                        </circle>
                        <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                        </path>
                      </svg>
                      Traitement en cours...
                    </span>
                  </div>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Floating Labels & Input Focus Animations */
.group:focus-within label,
.peer:not(:placeholder-shown)~label {
  transform: translateY(-0.75rem) scale(0.8);
  color: var(--color-primary);
}

/* Custom Select Arrow with Primary Color */
select {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23f29004' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1.5rem center;
  background-size: 1.25rem;
}

/* Success Message Animation */
@keyframes success-pop {
  0% {
    transform: scale(0.8);
    opacity: 0;
  }

  50% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-success-pop {
  animation: success-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

/* Reveal on scroll base state if not handled elsewhere */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-on-scroll.active {
  opacity: 1;
  transform: translateY(0);
}

/* Button Shimmer Effect */
@keyframes shimmer {
  0% {
    left: -100%;
  }

  100% {
    left: 100%;
  }
}

.button-shimmer::after {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 50%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
  animation: shimmer 3s infinite;
}
</style>
