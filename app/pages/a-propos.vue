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
        <img src="/images/a-propos-bg.jpg" alt="Lumen Agency Excellence"
          class="w-full h-full object-cover brightness-[0.6]" />
        <div class="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/50 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="max-w-4xl w-full space-y-8">
          <div
            class="block w-fit py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm reveal-on-scroll">
            Notre Histoire
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
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': heroVisible }">Lumen
                  Agency :</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0 text-primary font-bold"
                  :class="{ 'animate-title-reveal delay-300': heroVisible }">L'excellence au cœur</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-500': heroVisible }">de vos
                  projets</span>
              </span>
            </h1>
          </div>

          <p class="text-white/60 text-base md:text-xl font-light leading-relaxed max-w-2xl reveal-on-scroll delay-400">
            Une expertise unique dédiée à la réussite de vos voyages et de vos événements, avec une rigueur absolue et
            un souci constant du détail.
          </p>
        </div>
      </div>
    </section>

    <!-- Qu'est-ce que Lumen Agency -->
    <section class="py-24 md:py-40 bg-light relative overflow-hidden">
      <!-- Decorative background text -->
      <div
        class="absolute top-20 -left-20 text-[15rem] font-bold text-dark/[0.02] select-none pointer-events-none hidden lg:block uppercase">
        Lumen</div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="flex flex-col lg:flex-row items-center gap-20 lg:gap-32">
          <!-- Image side with architectural design -->
          <div class="w-full lg:w-1/2 reveal-on-scroll">
            <div class="relative">
              <!-- Main Image -->
              <div class="relative z-10 overflow-hidden rounded-2xl group shadow-2xl">
                <img src="/images/about-vision.png" alt="Lumen Agency Excellence"
                  class="w-full h-[500px] md:h-[600px] object-cover transition-transform duration-700 group-hover:scale-110" />
                <!-- Overlay Gradient -->
                <div
                  class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                </div>
              </div>

              <!-- Floating decorative elements -->
              <div
                class="absolute -bottom-10 -right-10 w-48 h-48 bg-primary rounded-2xl -z-10 hidden md:block animate-pulse opacity-20">
              </div>
              <div
                class="absolute -top-10 -left-10 w-32 h-32 border-2 border-primary/20 rounded-full -z-10 hidden md:block">
              </div>

              <!-- Experience Badge -->
              <div
                class="absolute bottom-10 left-10 z-20 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl hidden md:block reveal-on-scroll delay-500">
                <div class="text-3xl font-bold text-primary">100%</div>
                <div class="text-[10px] font-bold text-dark uppercase tracking-widest">Sur-mesure Garanti</div>
              </div>
            </div>
          </div>

          <!-- Content side -->
          <div class="w-full lg:w-1/2 space-y-10 reveal-on-scroll delay-300">
            <div class="space-y-4">
              <div class="flex items-center gap-4">
                <span class="w-12 h-px bg-primary"></span>
                <span class="text-primary font-bold uppercase tracking-[0.3em] text-[10px]">Qui sommes-nous ?</span>
              </div>
              <h2 class="text-4xl md:text-5xl font-bold text-dark leading-tight">L'excellence au service de votre <span
                  class="text-primary">mobilité</span></h2>
            </div>

            <div class="space-y-6 text-dark/70 text-lg leading-relaxed font-light">
              <p
                class="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left">
                Lumen Agency est née d'une ambition simple : apporter une réponse experte et sur-mesure aux besoins
                croissants des entreprises et des particuliers dans les domaines du voyage, de l'événementiel et de
                l'assistance logistique.
              </p>
              <p>
                Spécialisés dans les services de conciergerie aéroportuaire, l'organisation d'événements prestigieux et
                la gestion globale de mobilité, nous nous positionnons comme un prolongement de vos équipes,
                garantissant une tranquillité d'esprit totale.
              </p>
              <p class="font-medium text-dark/90 italic border-l-2 border-primary pl-6">
                "Notre force réside dans notre capacité d'adaptation et notre approche centrée sur l'humain. Pour nous,
                chaque mission est unique et mérite une exécution irréprochable."
              </p>
            </div>

            <div class="pt-6">
              <NuxtLink to="/services"
                class="group inline-flex items-center gap-6 bg-dark text-white px-8 py-4 rounded-full transition-all duration-300 hover:bg-primary shadow-xl hover:shadow-primary/20">
                <span class="font-bold uppercase tracking-widest text-xs">Découvrir nos services</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 group-hover:translate-x-2 transition-transform"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Vision & Mission with Grid Design -->
    <section class="py-24 md:py-40 bg-white relative">
      <div class="container mx-auto px-4">
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-px bg-dark/5 border border-dark/5 rounded-2xl overflow-hidden shadow-sm">

          <!-- Mission Card -->
          <div
            class="bg-white p-12 md:p-20 space-y-10 group transition-all duration-500 hover:bg-light reveal-on-scroll">
            <div class="relative">
              <span class="absolute -top-10 -left-10 text-8xl font-black text-dark/[0.03] select-none">01</span>
              <div
                class="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-dark uppercase tracking-wide">Notre Mission</h3>
            </div>
            <p class="text-dark/60 text-xl leading-relaxed font-light">
              Simplifier vos projets complexes en prenant en charge chaque aspect logistique et organisationnel. Nous
              nous engageons à offrir une assistance fiable, des conseils avisés et une exécution précise pour que vous
              puissiez vous concentrer sur l'essentiel.
            </p>
            <ul class="space-y-4">
              <li v-for="item in ['Assistance fiable', 'Conseils avisés', 'Exécution précise']" :key="item"
                class="flex items-center gap-3 text-dark font-medium">
                <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Vision Card -->
          <div
            class="bg-white p-12 md:p-20 space-y-10 group transition-all duration-500 hover:bg-light reveal-on-scroll delay-300">
            <div class="relative">
              <span class="absolute -top-10 -left-10 text-8xl font-black text-dark/[0.03] select-none">02</span>
              <div
                class="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
                <svg viewBox="0 0 24 24" class="w-8 h-8" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 class="text-3xl font-bold text-dark uppercase tracking-wide">Notre Vision</h3>
            </div>
            <p class="text-dark/60 text-xl leading-relaxed font-light">
              Devenir la référence absolue de l'accompagnement personnalisé dans les secteurs du voyage et de
              l'événementiel de luxe. Nous bâtissons l'avenir sur des valeurs d'intégrité et d'innovation.
            </p>
            <div class="flex flex-wrap gap-3 pt-4">
              <span v-for="tag in ['Intégrité', 'Innovation', 'Luxe']" :key="tag"
                class="px-4 py-2 bg-dark text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                {{ tag }}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>

    <!-- Nos Valeurs Fondamentales -->
    <section class="relative py-24 md:py-40 bg-dark overflow-hidden">
      <!-- Dramatic Background Elements -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      
      <!-- Fine line pattern from footer -->
      <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
           style="background-image: radial-gradient(circle at 1px 1px, white 1px, transparent 0); background-size: 60px 60px;">
      </div>

      <div class="container mx-auto px-6 md:px-8 relative z-10">
        <div class="text-center mb-16 md:mb-24 reveal-on-scroll">
          <h2 class="text-xs font-medium text-primary uppercase tracking-[0.3em] mb-4">Engagement</h2>
          <h3 class="text-2xl md:text-3xl font-semibold text-white uppercase tracking-wide">Nos Valeurs Fondamentales
          </h3>
          <div class="w-12 h-1 bg-primary mx-auto mt-6"></div>
        </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <!-- Value 1 -->
              <div class="group relative p-10 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.12] hover:border-primary hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 reveal-on-scroll flex flex-col justify-between min-h-[400px]">
                  <div class="absolute top-8 right-8 text-6xl font-black text-white/[0.02] group-hover:text-primary/10 transition-colors duration-500">01</div>
                  
                  <div class="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-12 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                  </div>
                  
                  <div class="space-y-4">
                      <h4 class="text-2xl font-bold text-white tracking-wide group-hover:text-primary transition-colors">Réactivité</h4>
                      <div class="w-8 h-0.5 bg-primary/30 group-hover:w-20 group-hover:bg-primary transition-all duration-500"></div>
                      <p class="text-white/60 text-base leading-relaxed font-light group-hover:text-white/90 transition-colors">
                          Une écoute active et une action immédiate pour répondre efficacement à vos besoins les plus urgents.
                      </p>
                  </div>
              </div>

              <!-- Value 2 -->
              <div class="group relative p-10 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.12] hover:border-primary hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 reveal-on-scroll delay-100 flex flex-col justify-between min-h-[400px]">
                  <div class="absolute top-8 right-8 text-6xl font-black text-white/[0.02] group-hover:text-primary/10 transition-colors duration-500">02</div>
                  
                  <div class="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-12 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                  </div>
                  
                  <div class="space-y-4">
                      <h4 class="text-2xl font-bold text-white tracking-wide group-hover:text-primary transition-colors">Confidentialité</h4>
                      <div class="w-8 h-0.5 bg-primary/30 group-hover:w-20 group-hover:bg-primary transition-all duration-500"></div>
                      <p class="text-white/60 text-base leading-relaxed font-light group-hover:text-white/90 transition-colors">
                          La protection absolue de vos données et de votre vie privée est au cœur de toutes nos opérations.
                      </p>
                  </div>
              </div>

              <!-- Value 3 -->
              <div class="group relative p-10 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.12] hover:border-primary hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 reveal-on-scroll delay-200 flex flex-col justify-between min-h-[400px]">
                  <div class="absolute top-8 right-8 text-6xl font-black text-white/[0.02] group-hover:text-primary/10 transition-colors duration-500">03</div>
                  
                  <div class="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-12 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5 3v4M19 3v4M5 11h14M5 15h14M5 19h14M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z" />
                      </svg>
                  </div>
                  
                  <div class="space-y-4">
                      <h4 class="text-2xl font-bold text-white tracking-wide group-hover:text-primary transition-colors">Sur-mesure</h4>
                      <div class="w-8 h-0.5 bg-primary/30 group-hover:w-20 group-hover:bg-primary transition-all duration-500"></div>
                      <p class="text-white/60 text-base leading-relaxed font-light group-hover:text-white/90 transition-colors">
                          Chaque détail est méticuleusement adapté pour répondre à vos exigences les plus complexes.
                      </p>
                  </div>
              </div>

              <!-- Value 4 -->
              <div class="group relative p-10 bg-white/[0.03] border border-white/10 rounded-2xl hover:bg-white/[0.12] hover:border-primary hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 reveal-on-scroll delay-300 flex flex-col justify-between min-h-[400px]">
                  <div class="absolute top-8 right-8 text-6xl font-black text-white/[0.02] group-hover:text-primary/10 transition-colors duration-500">04</div>
                  
                  <div class="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mb-12 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.006A3.42 3.42 0 0112 2.75l.219.012a3.42 3.42 0 011.946 1.006 3.42 3.42 0 004.805 0 3.42 3.42 0 01.946 1.006l.012.219a3.42 3.42 0 01-1.006 1.946 3.42 3.42 0 000 4.805 3.42 3.42 0 011.006 1.946l-.012.219a3.42 3.42 0 01-.946 1.006 3.42 3.42 0 00-4.805 0 3.42 3.42 0 01-1.946 1.006l-.219.012a3.42 3.42 0 01-1.946-1.006 3.42 3.42 0 00-4.805 0 3.42 3.42 0 01-.946-1.006l-.012-.219a3.42 3.42 0 011.006-1.946 3.42 3.42 0 000-4.805z" />
                      </svg>
                  </div>
                  
                  <div class="space-y-4">
                      <h4 class="text-2xl font-bold text-white tracking-wide group-hover:text-primary transition-colors">Excellence</h4>
                      <div class="w-8 h-0.5 bg-primary/30 group-hover:w-20 group-hover:bg-primary transition-all duration-500"></div>
                      <p class="text-white/60 text-base leading-relaxed font-light group-hover:text-white/90 transition-colors">
                          Une rigueur opérationnelle sans faille pour garantir la perfection à chaque étape de votre projet.
                      </p>
                  </div>
              </div>
          </div>
      </div>
    </section>
  </div>
</template>
