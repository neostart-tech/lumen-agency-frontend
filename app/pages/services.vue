<script setup>
import { ref, onMounted, computed } from 'vue';
import { useServiceStore } from '~~/stores/service';

const heroVisible = ref(false);
const heroSection = ref(null);
const serviceStore = useServiceStore();
const config = useRuntimeConfig();

const sortedServices = computed(() => {
  return [...serviceStore.services].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });
});

onMounted(() => {
  serviceStore.fetch();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      heroVisible.value = entry.isIntersecting;
    });
  }, { threshold: 0.1 });
  if (heroSection.value) observer.observe(heroSection.value);

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

const getImageUrl = (path) => {
  if (!path) return '/images/placeholder-service.jpg';
  if (path.startsWith('http')) return path;
  return `${config.public.storageBase}/${path}`;
};

// Page info for SEO
useHead({
  title: 'Nos Services d\'Excellence | Lumen Agency',
  meta: [
    { name: 'description', content: 'Découvrez la gamme complète de services de Lumen Agency : conciergerie aéroportuaire, événementiel, logistique, import-export et voyages sur-mesure.' }
  ]
})
</script>

<template>
  <div class="bg-light min-h-screen font-outfit">
    <!-- Hero Section with Background Image -->
    <section ref="heroSection" class="relative py-20 md:py-32 bg-dark overflow-hidden flex items-center min-h-[400px]">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="/images/services-bg.jpg" alt="Services Lumen Agency"
          class="w-full h-full object-cover brightness-[0.6]" />
        <div class="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="max-w-4xl w-full space-y-8">
          <div
            class="block w-fit py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm reveal-on-scroll">
            Expertise & Services
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
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': heroVisible }">Des
                  solutions</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0 text-primary font-bold"
                  :class="{ 'animate-title-reveal delay-300': heroVisible }">sur-mesure</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-500': heroVisible }">pour
                  chaque ambition</span>
              </span>
            </h1>
          </div>

          <p class="text-xl md:text-2xl text-white max-w-3xl font-light leading-relaxed">
            Lumen Agency déploie un écosystème de services haut de gamme conçus pour simplifier votre quotidien et
            sublimer vos projets les plus audacieux.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20 md:py-32">
      <div class="container mx-auto px-4 md:px-8">

        <!-- Loading State: Circle around Logo -->
        <div v-if="serviceStore.loading && serviceStore.services.length === 0" class="py-20 md:py-40">
          <AdminLoader :visible="true" :inline="true" />
          <p class="text-center text-[10px] font-bold text-dark/30 uppercase tracking-[0.4em] animate-pulse -mt-8">
            Découverte de nos expertises...</p>
        </div>

        <div v-else-if="sortedServices.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          <div v-for="(service, index) in sortedServices" :key="service.id"
            class="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-dark/5 flex flex-col h-full reveal-on-scroll"
            :class="`delay-${(index % 4) * 100}`">
            <!-- Image Container -->
            <div class="relative h-64 overflow-hidden border-b border-dark/5">
              <img :src="getImageUrl(service.image)" :alt="service.titre"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div
                class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              </div>
            </div>

            <!-- Content -->
            <div class="p-8 flex flex-col flex-grow">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-8 h-[2px] bg-primary transition-all duration-500 group-hover:w-12"></div>
                <div class="w-2 h-2 rounded-full bg-primary/20 transition-all duration-500 group-hover:bg-primary">
                </div>
              </div>
              <h3
                class="text-lg font-bold text-dark uppercase tracking-wider mb-4 group-hover:text-primary transition-colors duration-300 min-h-[56px] flex items-center">
                {{ service.titre }}
              </h3>
              <p class="text-dark/60 text-sm leading-relaxed font-light mb-2">
                {{ service.description }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-20 bg-white rounded-[3rem] border border-dark/5 shadow-sm reveal-on-scroll">
          <div class="w-20 h-20 bg-light rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-10 h-10 text-dark/20" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p class="text-xl font-medium text-dark/40 uppercase tracking-widest animate-pulse">Aucun service
            répertorié</p>
          <p class="text-dark/20 mt-2 text-sm font-light uppercase tracking-[0.3em]">Revenez bientôt</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 2;
}

/* Global design animations used from main.css */
/* Reveal animations base state */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-on-scroll.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
