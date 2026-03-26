<script setup>
const currentYear = new Date().getFullYear();

const footerLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/a-propos' },
  { name: 'Services', path: '/services' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const socials = [
  { name: 'Instagram', path: '#', icon: 'M16.7 3H7.3C4.925 3 3 4.925 3 7.3v9.4C3 19.075 4.925 21 7.3 21h9.4c2.375 0 4.3-1.925 4.3-4.3V7.3C21 4.925 19.075 3 16.7 3z M12 7c2.761 0 5 2.239 5 5s-2.239 5-5 5s-5-2.239-5-5S9.239 7 12 7z M12 15c1.657 0 3-1.343 3-3s-1.343-3-3-3s-3 1.343-3 3S10.343 15 12 15z M18.1 6.8c-0.442 0-0.8-0.358-0.8-0.8s0.358-0.8 0.8-0.8s0.8 0.358 0.8 0.8S18.542 6.8 18.1 6.8z' },
  { name: 'LinkedIn', path: '#', icon: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zm-2.3 8.7a3.5 3.5 0 1 0-4.7 3.3V18h3v-6.3zm-6.7 0H7V18h3v-6.3zM8.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z' },
  { name: 'Facebook', path: '#', icon: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
];
</script>

<template>
  <footer class="bg-dark text-white pt-20 pb-10 px-4 md:px-8 overflow-hidden relative">
    <!-- Subtle architectural glow -->
    <div class="absolute bottom-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/2"></div>

    <div class="container mx-auto relative z-10 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
        <!-- Brand & Description -->
        <div class="space-y-6">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <img src="/images/logo-2-mixte.png" alt="Lumen Agency Logo" class="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
          </NuxtLink>
          <p class="text-white/70 text-sm leading-relaxed max-w-xs">
            L'expert du voyage, de l'événementiel et de l'assistance aéroportuaire. Une excellence au service de votre mobilité et de vos projets d'exception.
          </p>
          <!-- Socials -->
          <div class="flex items-center gap-4">
            <a 
              v-for="social in socials" 
              :key="social.name" 
              :href="social.path" 
              class="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary hover:scale-110 transition-all duration-300 group"
              :aria-label="social.name"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-white group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                <path :d="social.icon"></path>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-6">
          <h3 class="text-primary font-semibold uppercase tracking-wider text-sm">Liens Rapides</h3>
          <nav class="flex flex-col gap-4">
            <NuxtLink 
              v-for="link in footerLinks.slice(0, 5)" 
              :key="link.path" 
              :to="link.path"
              class="text-white/70 hover:text-white transition-colors text-sm font-normal w-fit"
            >
              {{ link.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Contacts -->
        <div class="space-y-6 md:px-4">
          <h3 class="text-primary font-semibold uppercase tracking-wider text-sm">Contacts</h3>
          <ul class="space-y-4">
            <li class="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
              <span class="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </span>
              <a href="tel:+33123456789" class="text-sm">+33 (0)1 23 45 67 89</a>
            </li>
            <li class="flex items-center gap-3 text-white/70 hover:text-white transition-colors">
              <span class="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
              <a href="mailto:hello@lumen-agency.com" class="text-sm">hello@lumen-agency.com</a>
            </li>
            <li class="flex items-start gap-3 text-white/70">
              <span class="w-8 h-8 bg-white/5 rounded-full flex items-center justify-center mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </span>
              <span class="text-sm pt-1 leading-relaxed">123 Avenue des Champs-Élysées, Paris, France</span>
            </li>
          </ul>
        </div>

       
      </div>

      <!-- Copyright Section -->
      <div class="pt-8 border-t border-white/5 text-center px-4">
        <p class="text-sm text-white/40 font-normal">
          &copy; {{ currentYear }} <span class="text-white/60">Lumen Agency</span>. Tous droits réservés. | 
          Développé par 
          <a href="https://neostart.tech" target="_blank" class="text-primary hover:underline ml-1">
            Neo Start Technology
          </a>
        </p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
/* Gradient border on top if needed */
footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-primary), transparent);
  opacity: 0.2;
}
</style>
