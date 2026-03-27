<script setup>
const heroVisible = ref(false);
const heroSection = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        heroVisible.value = true;
      } else {
        heroVisible.value = false;
      }
    });
  }, { threshold: 0.1 });
  if (heroSection.value) observer.observe(heroSection.value);
});

// Page info for SEO
useHead({
  title: 'Nos Services d\'Excellence | Lumen Agency',
  meta: [
    { name: 'description', content: 'Découvrez la gamme complète de services de Lumen Agency : conciergerie aéroportuaire, événementiel, logistique, import-export et voyages sur-mesure.' }
  ]
})

const services = [
  {
    title: "Hôtesses d’accueil",
    image: "/images/hotesse.jpg",
    description: "Un accueil d'exception pour vos événements et entreprises, alliant élégance, discrétion et professionnalisme absolu."
  },
  {
    title: "Événementiel",
    image: "/images/evenementiel.jpg",
    description: "De la conception à la réalisation, nous transformons vos idées en moments inoubliables, prestigieux et parfaitement orchestrés."
  },
  {
    title: "Assistante aéroportuaire",
    image: "/images/assistante-aeroportuaire.jpg",
    description: "Un accompagnement VIP personnalisé pour simplifier vos passages en aéroport et garantir un voyage serein et fluide."
  },
  {
    title: "Transport & Logistique",
    image: "/images/transport-logistique.jpg",
    description: "Une gestion rigoureuse de vos flux et mobilités pour une efficacité opérationnelle maximale à chaque étape de votre trajet."
  },
  {
    title: "Import - Export",
    image: "/images/import-export.jpg",
    description: "Votre partenaire stratégique pour sécuriser et optimiser vos échanges commerciaux à l'international avec une expertise douanière."
  },
  {
    title: "Agence de voyage",
    image: "/images/agence-voyage.jpg",
    description: "Des voyages sur-mesure conçus pour répondre à vos envies d'évasion les plus exigeantes, de la planification à l'arrivée."
  },
  {
    title: "Billetterie d’avion",
    image: "/images/billetterie.jpg",
    description: "Des solutions de réservation rapides, flexibles et optimisées pour tous vos déplacements professionnels ou personnels."
  },
  {
    title: "Tourisme",
    image: "/images/tourisme.jpg",
    description: "Découvrez des destinations uniques à travers des circuits authentiques, des guides experts et des expériences culturelles riches."
  }
];
</script>

<template>
  <div class="bg-light min-h-screen">
    <!-- Hero Section with Background Image -->
    <section ref="heroSection" class="relative py-20 md:py-32 bg-dark overflow-hidden flex items-center min-h-[400px]">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img src="/images/services-bg.jpg" alt="Services Lumen Agency" class="w-full h-full object-cover brightness-[0.6]" />
        <div class="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="max-w-4xl w-full space-y-8">
          <div class="block w-fit py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm reveal-on-scroll">
            Expertise & Services
          </div>

          <div class="relative inline-block">
            <!-- Motion Line Animation -->
            <div class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-primary/30 overflow-hidden pointer-events-none z-0">
              <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
            </div>

            <h1 class="relative z-10 text-2xl sm:text-3xl md:text-5xl font-semibold text-white uppercase tracking-normal leading-[1.2] flex flex-col">
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': heroVisible }">Des solutions</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0 text-primary font-bold" :class="{ 'animate-title-reveal delay-300': heroVisible }">sur-mesure</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-500': heroVisible }">pour chaque ambition</span>
              </span>
            </h1>
          </div>
          
          <p class="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl reveal-on-scroll delay-400">
            Lumen Agency déploie un écosystème de services haut de gamme conçus pour simplifier votre quotidien et sublimer vos projets les plus audacieux.
          </p>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-20 md:py-32">
      <div class="container mx-auto px-4 md:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          <div 
            v-for="(service, index) in services" 
            :key="index"
            class="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 border border-dark/5 flex flex-col h-full reveal-on-scroll"
            :class="`delay-${(index % 4) * 100}`"
          >
            <!-- Image Container -->
            <div class="relative h-64 overflow-hidden border-b border-dark/5">
              <img 
                :src="service.image" 
                :alt="service.title" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <!-- Content -->
            <div class="p-8 flex flex-col flex-grow">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-8 h-[2px] bg-primary transition-all duration-500 group-hover:w-12"></div>
                <div class="w-2 h-2 rounded-full bg-primary/20 transition-all duration-500 group-hover:bg-primary"></div>
              </div>
              <h3 class="text-lg font-bold text-dark uppercase tracking-wider mb-4 group-hover:text-primary transition-colors duration-300 min-h-[56px] flex items-center">
                {{ service.title }}
              </h3>
              <p class="text-dark/60 text-sm leading-relaxed font-light mb-2">
                {{ service.description }}
              </p>
            </div>
          </div>
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
</style>
