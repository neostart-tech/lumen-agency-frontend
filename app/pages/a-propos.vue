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

// Page info
useHead({
  title: 'À propos | Lumen Agency',
  meta: [
    { name: 'description', content: 'Découvrez Lumen Agency, votre partenaire d’exception pour vos projets de voyage, d’événementiel et d’assistance aéroportuaire.' }
  ]
})
</script>

<template>
  <div>
    <!-- Hero Section with Background -->
    <section ref="heroSection" class="relative py-20 md:py-32 bg-dark overflow-hidden flex items-center min-h-[400px]">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0 text-white">
        <img src="/images/a-propos-bg.jpg" alt="Lumen Agency Excellence" class="w-full h-full object-cover brightness-[0.6]" />
        <div class="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
      </div>
      
      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="max-w-4xl w-full space-y-8">
          <div class="block w-fit py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm reveal-on-scroll">
            Notre Histoire
          </div>

          <div class="relative inline-block">
            <!-- Motion Line Animation -->
            <div class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-primary/30 overflow-hidden pointer-events-none z-0">
              <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
            </div>

            <h1 class="relative z-10 text-2xl sm:text-3xl md:text-5xl font-semibold text-white uppercase tracking-normal leading-[1.2] flex flex-col">
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': heroVisible }">Lumen Agency :</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0 text-primary font-bold" :class="{ 'animate-title-reveal delay-300': heroVisible }">L'excellence au cœur</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-500': heroVisible }">de vos projets</span>
              </span>
            </h1>
          </div>
          
          <p class="text-white/60 text-base md:text-xl font-light leading-relaxed max-w-2xl reveal-on-scroll delay-400">
            Une expertise unique dédiée à la réussite de vos voyages et de vos événements, avec une rigueur absolue et un souci constant du détail.
          </p>
        </div>
      </div>
    </section>

    <!-- Qu'est-ce que Lumen Agency -->
    <section class="py-20 md:py-32 bg-light">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div class="w-full lg:w-1/2 reveal-on-scroll">
            <div class="relative group">
              <div class="absolute -inset-4 bg-primary/5 rounded-[2.5rem] transform rotate-2 group-hover:rotate-0 transition-transform duration-500"></div>
              <img src="/images/about-vision.png" alt="Vision Lumen Agency" class="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-[2rem] shadow-2xl" />
            </div>
          </div>
          
          <div class="w-full lg:w-1/2 space-y-8 reveal-on-scroll delay-300">
            <h2 class="text-2xl md:text-3xl font-semibold text-dark uppercase tracking-wide">Qui sommes-nous ?</h2>
            <div class="space-y-6 text-dark/70 text-base md:text-lg leading-relaxed font-light">
              <p>
                Lumen Agency est née d'une ambition simple : apporter une réponse experte et sur-mesure aux besoins croissants des entreprises et des particuliers dans les domaines du voyage, de l'événementiel et de l'assistance logistique.
              </p>
              <p>
                Spécialisés dans les services de conciergerie aéroportuaire, l'organisation d'événements prestigieux et la gestion globale de mobilité, nous nous positionnons comme un prolongement de vos équipes, garantissant une tranquillité d'esprit totale.
              </p>
              <p>
                Notre force réside dans notre capacité d'adaptation et notre approche centrée sur l'humain. Pour nous, chaque mission est unique et mérite une exécution irréprochable.
              </p>
            </div>
            
            <div class="pt-4">
              <NuxtLink to="/services" class="inline-flex items-center gap-4 text-primary font-semibold uppercase tracking-widest text-sm hover:translate-x-2 transition-transform duration-300">
                Découvrir nos services
                <span class="w-12 h-px bg-primary/30 group-hover:bg-primary transition-all"></span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision & Mission -->
    <section class="py-20 md:py-32 bg-white relative overflow-hidden">

      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <!-- Mission -->
          <div class="space-y-8 reveal-on-scroll">
            <div class="w-16 h-1 bg-primary"></div>
            <h3 class="text-2xl md:text-3xl font-semibold text-dark uppercase tracking-wide">Notre Mission</h3>
            <p class="text-dark/70 text-lg leading-relaxed font-light">
              Simplifier vos projets complexes en prenant en charge chaque aspect logistique et organisationnel. Nous nous engageons à offrir une assistance fiable, des conseils avisés et une exécution précise pour que vous puissiez vous concentrer sur l'essentiel : vos objectifs de réussite.
            </p>
          </div>

          <!-- Vision -->
          <div class="space-y-8 reveal-on-scroll delay-300">
            <div class="w-16 h-1 bg-secondary"></div>
            <h3 class="text-2xl md:text-3xl font-semibold text-dark uppercase tracking-wide">Notre Vision</h3>
            <p class="text-dark/70 text-lg leading-relaxed font-light">
              Devenir la référence absolue de l'accompagnement personnalisé dans les secteurs du voyage et de l'événementiel de luxe. Nous bâtissons l'avenir sur des valeurs d'intégrité, d'innovation dans le service et d'une quête perpétuelle de satisfaction client.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-20 md:py-32 bg-dark overflow-hidden">
        <!-- Abstract background glow -->
        <div class="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

        <div class="container mx-auto px-6 md:px-8 relative z-10">
            <div class="text-center mb-16 md:mb-24 reveal-on-scroll">
                <h2 class="text-xs font-medium text-primary uppercase tracking-[0.3em] mb-4">Engagement</h2>
                <h3 class="text-2xl md:text-3xl font-semibold text-white uppercase tracking-wide">Nos Valeurs Fondamentales</h3>
                <div class="w-12 h-1 bg-primary mx-auto mt-6"></div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
                <!-- Value 1 -->
                <div class="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all duration-500 reveal-on-scroll group">
                    <div class="text-primary mb-8 transition-transform duration-500 group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h4 class="text-base font-semibold text-white uppercase tracking-wider mb-3">Réactivité</h4>
                    <p class="text-sm text-white/70 leading-relaxed font-light">
                        Une écoute active et une action immédiate pour répondre efficacement à vos besoins urgents.
                    </p>
                </div>

                <!-- Value 2 -->
                <div class="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all duration-500 reveal-on-scroll delay-100 group">
                    <div class="text-primary mb-8 transition-transform duration-500 group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                    </div>
                    <h4 class="text-base font-semibold text-white uppercase tracking-wider mb-3">Confidentialité</h4>
                    <p class="text-sm text-white/70 leading-relaxed font-light">
                        La protection absolue de vos données et de votre vie privée est au cœur de toutes nos opérations.
                    </p>
                </div>

                <!-- Value 3 -->
                <div class="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all duration-500 reveal-on-scroll delay-200 group">
                    <div class="text-primary mb-8 transition-transform duration-500 group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M19 3v4M5 11h14M5 15h14M5 19h14M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z" />
                        </svg>
                    </div>
                    <h4 class="text-base font-semibold text-white uppercase tracking-wider mb-3">Sur-mesure</h4>
                    <p class="text-sm text-white/70 leading-relaxed font-light">
                        Chaque détail est méticuleusement adapté pour répondre à vos exigences les plus précises.
                    </p>
                </div>

                <!-- Value 4 -->
                <div class="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-all duration-500 reveal-on-scroll delay-300 group">
                    <div class="text-primary mb-8 transition-transform duration-500 group-hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.006A3.42 3.42 0 0112 2.75l.219.012a3.42 3.42 0 011.946 1.006 3.42 3.42 0 004.805 0 3.42 3.42 0 01.946 1.006l.012.219a3.42 3.42 0 01-1.006 1.946 3.42 3.42 0 000 4.805 3.42 3.42 0 011.006 1.946l-.012.219a3.42 3.42 0 01-.946 1.006 3.42 3.42 0 00-4.805 0 3.42 3.42 0 01-1.946 1.006l-.219.012a3.42 3.42 0 01-1.946-1.006 3.42 3.42 0 00-4.805 0 3.42 3.42 0 01-.946-1.006l-.012-.219a3.42 3.42 0 011.006-1.946 3.42 3.42 0 000-4.805z" />
                        </svg>
                    </div>
                    <h4 class="text-base font-semibold text-white uppercase tracking-wider mb-3">Professionnalisme</h4>
                    <p class="text-sm text-white/70 leading-relaxed font-light">
                        Une rigueur opérationnelle sans faille pour garantir l'excellence à chaque étape de votre projet.
                    </p>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>
