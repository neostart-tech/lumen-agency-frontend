<script setup>
import { onMounted, computed } from 'vue'
import { useLienStore } from '~~/stores/lien'
import { useContactStore } from '~~/stores/contact'

const currentYear = new Date().getFullYear();
const lienStore = useLienStore()
const contactStore = useContactStore()

onMounted(() => {
  lienStore.fetch()
  contactStore.fetch()
})

const footerLinks = [
  { name: 'ACCUEIL', path: '/' },
  { name: 'À PROPOS', path: '/a-propos' },
  { name: 'SERVICES', path: '/services' },
  { name: 'BLOGS', path: '/blogs' },
  { name: 'CONTACT', path: '/contact' },
];

const socials = computed(() => {
  const l = lienStore.lien
  return [
    {
      name: 'Instagram',
      path: l?.instagram || '#',
      viewBox: '0 0 24 24',
      icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
    },
    {
      name: 'Facebook',
      path: l?.facebook || '#',
      viewBox: '0 0 24 24',
      icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'
    },
    {
      name: 'X',
      path: l?.x || '#',
      viewBox: '0 0 24 24',
      icon: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z'
    },
    {
      name: 'TikTok',
      path: l?.tiktok || '#',
      viewBox: '0 0 50 50',
      icon: 'M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z'
    }
  ]
})
</script>

<template>
  <footer class="bg-light text-dark pt-24 pb-12 px-4 md:px-8 overflow-hidden relative border-t border-dark/5">
    <!-- Premium Architectural Background Elements -->
    <div
      class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none">
    </div>
    <div
      class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none">
    </div>

    <!-- Fine lines pattern -->
    <div class="absolute inset-0 opacity-[0.03] pointer-events-none"
      style="background-image: radial-gradient(circle at 1px 1px, #1A1A1A 1px, transparent 0); background-size: 40px 40px;">
    </div>

    <div class="container mx-auto relative z-10 px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 md:gap-12 mb-10">

        <!-- Brand Section -->
        <div class="lg:col-span-3 space-y-8">
          <NuxtLink to="/" class="flex items-center gap-2 group w-fit">
            <img src="/images/logo-fond-blanc.png" alt="Lumen Agency Logo"
              class="h-14 w-auto object-contain transition-transform duration-500 group-hover:scale-105" />
          </NuxtLink>
          <p class="text-dark max-w-sm text-justify">
            L'expert du voyage, de l'événementiel et de l'assistance aéroportuaire. Une excellence au service de votre
            mobilité et de vos projets d'exception.
          </p>

          <div class="space-y-4">
            <h4 class="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Nous suivre</h4>
            <div class="flex items-center gap-3">
              <a v-for="social in socials" :key="social.name" :href="social.path" target="_blank"
                class="w-11 h-11 bg-dark/5 border border-dark/10 rounded-2xl flex items-center justify-center hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-1 transition-all duration-300 group"
                :aria-label="social.name">
                <svg xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5 fill-dark group-hover:fill-white transition-colors duration-300"
                  :viewBox="social.viewBox">
                  <path :d="social.icon"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- Links 1 -->
        <div class="lg:col-span-2 space-y-8">
          <h3 class="text-dark font-bold uppercase tracking-[0.2em] text-xs pb-4 border-b border-dark/10 w-fit pr-8">
            Liens Rapides</h3>
          <nav class="flex flex-col gap-4">
            <NuxtLink v-for="link in footerLinks" :key="link.path" :to="link.path"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              {{ link.name }}
            </NuxtLink>
          </nav>
        </div>

        <!-- Links 2 (Nos Expertises) -->
        <div class="lg:col-span-4 space-y-8 lg:ml-20">
          <h3 class="text-dark font-bold uppercase tracking-[0.2em] text-xs pb-4 border-b border-dark/10 w-fit pr-12">
            Nos Expertises</h3>
          <nav class="flex flex-col gap-3">
            <NuxtLink to="/services"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              HÔTESSES D'ACCUEIL
            </NuxtLink>
            <NuxtLink to="/services"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              ÉVÉNEMENTIEL
            </NuxtLink>
            <NuxtLink to="/services"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              ASSISTANTE AÉROPORTUAIRE
            </NuxtLink>
            <NuxtLink to="/services"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              TRANSPORT & LOGISTIQUE
            </NuxtLink>
            <NuxtLink to="/services"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              IMPORT - EXPORT
            </NuxtLink>
            <NuxtLink to="/services"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              AGENCE DE VOYAGE
            </NuxtLink>
            <NuxtLink to="/services"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              BILLETTERIE D'AVION
            </NuxtLink>
            <NuxtLink to="/services"
              class="text-dark/90 hover:text-primary transition-all text-sm font-medium w-fit flex items-center group">
              <span
                class="w-0 group-hover:w-4 h-px bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
              TOURISME
            </NuxtLink>
          </nav>
        </div>

        <!-- Contact Section -->
        <div class="lg:col-span-3 space-y-8">
          <h3 class="text-dark font-bold uppercase tracking-[0.2em] text-xs pb-4 border-b border-dark/10 w-fit pr-8">
            Contacts</h3>
          <ul class="space-y-6">
            <li v-if="contactStore.contact?.telephone1" class="flex items-center gap-4 group">
              <div
                class="w-10 h-10 bg-dark/5 rounded-full flex items-center justify-center shrink-0 border border-dark/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a :href="'tel:' + contactStore.contact.telephone1"
                class="text-sm font-medium text-dark/90 hover:text-primary transition-colors">{{
                  contactStore.contact.telephone1 }}</a>
            </li>

            <li v-if="contactStore.contact?.telephone2" class="flex items-center gap-4 group">
              <div
                class="w-10 h-10 bg-dark/5 rounded-full flex items-center justify-center shrink-0 border border-dark/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <a :href="'tel:' + contactStore.contact.telephone2"
                class="text-sm font-medium text-dark/90 hover:text-primary transition-colors">{{
                  contactStore.contact.telephone2 }}</a>
            </li>

            <li v-if="contactStore.contact?.email" class="flex items-center gap-4 group">
              <div
                class="w-10 h-10 bg-dark/5 rounded-full flex items-center justify-center shrink-0 border border-dark/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <a :href="'mailto:' + contactStore.contact.email"
                class="text-sm font-medium text-dark/90 hover:text-primary transition-colors">{{
                  contactStore.contact.email }}</a>
            </li>

            <li v-if="contactStore.contact?.adresse" class="flex items-start gap-4 group">
              <div
                class="w-10 h-10 bg-dark/5 rounded-full flex items-center justify-center shrink-0 border border-dark/10 group-hover:border-primary/50 group-hover:bg-primary/5 transition-all duration-500 mt-1">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p class="text-sm font-medium text-dark/90 leading-relaxed pt-2">{{ contactStore.contact.adresse }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright Section -->
      <div class="border-t border-dark/5 text-center px-4">
        <p class="text-sm text-dark/90 font-normal tracking-wide">
          &copy; {{ currentYear }} <span class="text-dark/80">Lumen Agency</span>. Tous droits réservés. |
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
/* Gradient border on top */
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
