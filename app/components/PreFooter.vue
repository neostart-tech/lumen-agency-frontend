<script setup>
/**
 * Animation logic for PreFooter
 */
const preFooterVisible = ref(false);
const preFooterSection = ref(null);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        preFooterVisible.value = true;
      } else {
        preFooterVisible.value = false;
      }
    });
  }, { threshold: 0.2 });
  if (preFooterSection.value) observer.observe(preFooterSection.value);
});
</script>

<template>
  <section ref="preFooterSection" class="relative overflow-hidden bg-light py-16 md:py-20 text-dark border-t border-gray-100">
    <!-- Bright/Soft background gradients -->
    <div class="absolute inset-0 z-0 pointer-events-none">
      <!-- Animated Orbs (Subtle) -->
      <div class="absolute top-1/4 -right-24 w-80 h-80 bg-primary/5 rounded-full blur-[100px] animate-float-slow"></div>
      <div class="absolute bottom-1/4 -left-24 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[120px] animate-float-reverse"></div>
    </div>

    <!-- Architectural Pattern Overlay (Subtle, Light Mode) -->
    <div
      class="absolute inset-0 opacity-[0.015] z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] mix-blend-overlay">
    </div>

    <div class="container mx-auto px-4 md:px-8 relative z-10 text-center">
      <div class="max-w-4xl mx-auto space-y-8 md:space-y-10">

        <!-- Animated Title Header -->
        <div class="space-y-6">
          <div
            class="inline-flex items-center gap-3 py-1.5 px-5 bg-white border border-gray-100 shadow-sm rounded-full text-dark text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] transform transition-transform hover:scale-105">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(242,144,4,0.4)]"></span>
            Prêt à commencer ?
          </div>

          <div class="relative w-full max-w-2xl mx-auto">
            <!-- Motion Line Animation -->
            <div
              class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-gray-200 overflow-hidden pointer-events-none z-0">
              <div v-if="preFooterVisible" class="w-full h-full bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-line-sweep"></div>
            </div>

            <h2
              class="relative z-10 text-3xl md:text-5xl font-light leading-[1.2] tracking-tight flex flex-col items-center">
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0"
                  :class="{ 'animate-title-reveal delay-100': preFooterVisible }">Besoin d'un <span
                    class="font-semibold text-primary">service</span> d'exception ?</span>
              </span>
              <span class="block overflow-hidden py-1 hidden md:block">
                <span class="inline-block opacity-0 text-dark/80 font-light"
                  :class="{ 'animate-title-reveal delay-300': preFooterVisible }">Contactez-nous aujourd'hui</span>
              </span>
            </h2>
          </div>
        </div>

        <p class="text-base md:text-lg text-dark/60 max-w-2xl mx-auto leading-relaxed font-light reveal-on-scroll delay-400"
          :class="{ 'opacity-100 translate-y-0': preFooterVisible }">
          Notre équipe d'experts est dédiée à la création d'expériences sur-mesure, transformant vos visions en réalisations prestigieuses et parfaitement exécutées.
        </p>

        <!-- Animated Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 reveal-on-scroll delay-500">
          <NuxtLink to="/contact?type=devis"
            class="group w-full sm:w-auto relative overflow-hidden bg-primary text-white hover:text-white px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 flex items-center justify-center gap-3 hover:shadow-[0_0_30px_-5px_rgba(242,144,4,0.4)] border border-primary">
            
            <!-- Hover Background Fill -->
            <div class="absolute inset-0 bg-dark translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.8,0,0.2,1)] z-0"></div>
            
            <span class="relative z-10 transition-colors duration-500">Demander un devis</span>
            <div class="relative z-10 w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/10 flex items-center justify-center transition-all duration-500 text-white">
              <svg xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </NuxtLink>

          <NuxtLink to="/services"
            class="w-full sm:w-auto border border-gray-200 bg-white hover:bg-gray-50 text-dark shadow-[0_4px_14px_0_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.05)] px-8 py-4 rounded-full text-sm font-semibold uppercase tracking-[0.1em] transition-all duration-500 text-center">
            Voir nos services
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Large corner logo decoration - More elegant -->
    <div class="absolute -bottom-10 -right-10 opacity-[0.03] pointer-events-none select-none blur-[1px] transition-transform duration-1000 group-hover:scale-105">
      <img src="/images/logo-1-blanc.png" alt=""
        class="w-[300px] md:w-[400px] h-auto invert grayscale" />
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0% {
    transform: translate(0, 0) scale(1);
  }

  33% {
    transform: translate(30px, -50px) scale(1.1);
  }

  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }

  100% {
    transform: translate(0, 0) scale(1);
  }
}

@keyframes float-reverse {
  0% {
    transform: translate(0, 0) rotate(0deg);
  }

  33% {
    transform: translate(-40px, 30px) rotate(10deg);
  }

  66% {
    transform: translate(30px, -20px) rotate(-10deg);
  }

  100% {
    transform: translate(0, 0) rotate(0deg);
  }
}

.animate-float-slow {
  animation: float 15s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 20s ease-in-out infinite;
}
</style>
