<template>
  <section class="relative overflow-hidden bg-secondary py-10 md:py-14 px-4 md:px-8 text-white">
    <!-- Decorative background elements -->
    <div class="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>

    <div class="container mx-auto px-4 relative z-10 text-center reveal-on-scroll">
      <div class="max-w-4xl mx-auto space-y-4 md:space-y-6">
        <h2 class="text-xl md:text-3xl font-medium leading-tight uppercase tracking-wide">
          Besoin d'un <span class="text-primary font-semibold">service</span> ? <br>
          <span class="opacity-70">Contactez-nous dès maintenant</span>
        </h2>
        
        <p class="text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed">
          Notre équipe d'experts est prête à donner vie à vos projets les plus ambitieux. Donnez à votre marque l'éclat qu'elle mérite.
        </p>

        <div class="flex flex-col md:flex-row items-center justify-center gap-6 pt-4">
          <NuxtLink 
            to="/devis" 
            class="group w-full md:w-auto bg-primary hover:bg-white text-white hover:text-secondary px-8 py-4 rounded-full text-base font-semibold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-primary/30 flex items-center justify-center gap-3"
          >
            Demander un devis
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </NuxtLink>
          <NuxtLink 
            to="/contact" 
            class="w-full md:w-auto border border-white/20 hover:bg-white/10 text-white px-8 py-4 rounded-full text-base font-medium uppercase tracking-wider backdrop-blur-sm transition-all duration-300 text-center"
          >
            Nous contacter
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Glassmorphism subtle effect if needed */
</style>
