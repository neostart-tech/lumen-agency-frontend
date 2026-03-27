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
  <section ref="preFooterSection" class="relative overflow-hidden bg-secondary py-20 md:py-28 text-white">
    <!-- Animated background elements -->
    <div class="absolute inset-0 z-0 pointer-events-none opacity-30">
      <div 
        class="absolute -top-24 -right-24 w-96 h-96 bg-primary/40 rounded-full blur-[120px] animate-float-slow"
      ></div>
      <div 
        class="absolute -bottom-24 -left-24 w-[500px] h-[500px] bg-accent/30 rounded-full blur-[150px] animate-float-reverse"
      ></div>
    </div>

    <!-- Architectural Pattern Overlay (Subtle) -->
    <div class="absolute inset-0 opacity-[0.03] z-0 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

    <div class="container mx-auto px-4 md:px-8 relative z-10 text-center">
      <div class="max-w-4xl mx-auto space-y-10 md:space-y-12">
        
        <!-- Animated Title Header -->
        <div class="space-y-6">
          <div class="block w-fit mx-auto py-1 px-4 bg-white/10 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-md reveal-on-scroll">
            Prêt à commencer ?
          </div>
          
          <div class="relative inline-block">
            <!-- Motion Line Animation -->
            <div class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-primary/30 overflow-hidden pointer-events-none z-0">
              <div v-if="preFooterVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
            </div>

            <h2 class="relative z-10 text-3xl md:text-5xl font-semibold leading-[1.2] uppercase tracking-tight flex flex-col items-center">
              <span class="block overflow-hidden py-1 h-[1.3em]">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': preFooterVisible }">Besoin d'un <span class="text-primary font-bold">service</span> d'exception ?</span>
              </span>
              <span class="block overflow-hidden py-1 h-[1.3em]">
                <span class="inline-block opacity-0 text-white/60" :class="{ 'animate-title-reveal delay-300': preFooterVisible }">Contactez-nous dès maintenant</span>
              </span>
            </h2>
          </div>
        </div>
        
        <p 
          class="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light reveal-on-scroll delay-400"
          :class="{'opacity-100 translate-y-0': preFooterVisible}"
        >
          Notre équipe d'experts est prête à transformer vos besoins en solutions fluides, prestigieuses et parfaitement exécutées.
        </p>

        <!-- Animated Buttons -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4 reveal-on-scroll delay-500">
          <NuxtLink 
            to="/contact" 
            class="group w-full sm:w-auto bg-primary hover:bg-white text-white hover:text-secondary px-10 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] transition-all duration-500 transform hover:scale-105 shadow-xl shadow-primary/20 flex items-center justify-center gap-4"
          >
            Demander un devis
            <div class="w-8 h-8 rounded-full bg-white/10 group-hover:bg-secondary/10 flex items-center justify-center transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </NuxtLink>
          
          <NuxtLink 
            to="/services" 
            class="w-full sm:w-auto border border-white/20 hover:border-white/40 hover:bg-white/5 text-white px-10 py-5 rounded-full text-sm font-semibold uppercase tracking-[0.2em] backdrop-blur-sm transition-all duration-500 text-center"
          >
            Voir nos services
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <!-- Large corner logo decoration -->
    <div class="absolute -bottom-20 -right-20 opacity-10 pointer-events-none select-none">
       <img src="/images/logo-1-blanc.png" alt="" class="w-96 h-auto grayscale transition-transform duration-1000 group-hover:scale-110" />
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes float-reverse {
  0% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-40px, 30px) rotate(10deg); }
  66% { transform: translate(30px, -20px) rotate(-10deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

.animate-float-slow {
  animation: float 15s ease-in-out infinite;
}

.animate-float-reverse {
  animation: float-reverse 20s ease-in-out infinite;
}
</style>
