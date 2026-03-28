<script setup>
const route = useRoute();
const isMenuOpen = ref(false);

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/a-propos' },
  { name: 'Services', path: '/services' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];
</script>

<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-light/90 backdrop-blur-md border-b border-dark/5">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <img src="/images/logo-fond-blanc.png" alt="Lumen Agency Logo"
            class="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-10">
          <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" active-class="text-primary"
            exact-active-class="text-primary"
            class="text-sm font-semibold uppercase tracking-widest text-dark hover:text-primary transition-colors duration-300 relative group">
            {{ link.name }}
            <span class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
              :class="[route.path === link.path ? 'w-full' : 'w-0 group-hover:w-full']"></span>
          </NuxtLink>
        </nav>

        <!-- Desktop CTA -->
        <div class="hidden md:block">
          <NuxtLink to="/contact?type=devis"
            class="bg-primary hover:bg-accent text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95">
            Demander un devis
          </NuxtLink>
        </div>

        <!-- Mobile Toggle -->
        <button @click="isMenuOpen = !isMenuOpen"
          class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
          <span class="w-6 h-0.5 bg-dark transition-all duration-300"
            :class="{ 'rotate-45 translate-y-2': isMenuOpen }"></span>
          <span class="w-6 h-0.5 bg-dark transition-opacity duration-300" :class="{ 'opacity-0': isMenuOpen }"></span>
          <span class="w-6 h-0.5 bg-dark transition-all duration-300"
            :class="{ '-rotate-45 -translate-y-2': isMenuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition enter-active-class="transition duration-300 ease-out" enter-from-class="opacity-0 -translate-y-10"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-10">
      <div v-if="isMenuOpen"
        class="md:hidden absolute top-20 left-0 w-full bg-white border-b border-dark/5 shadow-xl py-8 px-4">
        <nav class="flex flex-col items-center gap-6">
          <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" @click="isMenuOpen = false"
            active-class="text-primary" exact-active-class="text-primary underline decoration-2 underline-offset-8"
            class="text-lg font-bold uppercase tracking-widest text-dark hover:text-primary transition-colors">
            {{ link.name }}
          </NuxtLink>
          <NuxtLink to="/contact?type=devis" @click="isMenuOpen = false"
            class="w-full text-center bg-primary text-white py-4 rounded-full font-bold uppercase tracking-widest">
            Demander un devis
          </NuxtLink>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.l-logo {
  text-shadow: 2px 2px 0px rgba(0, 0, 0, 0.1);
}
</style>
