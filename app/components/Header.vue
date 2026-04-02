<script setup>
const route = useRoute();
const isMenuOpen = ref(false);
const isScrolled = ref(false);

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'À propos', path: '/a-propos' },
  { name: 'Services', path: '/services' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Contact', path: '/contact' },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <header 
    class="fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out"
    :class="[
      isScrolled || isMenuOpen
        ? 'bg-white border-b border-dark/5 py-4 shadow-lg' 
        : 'bg-transparent border-b border-transparent py-6'
    ]">
    <div class="container mx-auto px-4 md:px-8">
      <div class="flex items-center justify-between h-12">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <img 
            :src="isScrolled || isMenuOpen ? '/images/logo-fond-blanc.png' : '/images/logo-2-mixte.png'" 
            alt="Lumen Agency Logo"
            class="h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105" />
        </NuxtLink>

        <!-- Desktop Menu -->
        <nav class="hidden md:flex items-center gap-8 ml-auto mr-24">
          <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" active-class="text-primary"
            exact-active-class="text-primary"
            class="text-sm font-semibold uppercase tracking-widest transition-colors duration-300 relative group"
            :class="isScrolled || isMenuOpen ? 'text-dark hover:text-primary' : 'text-white hover:text-primary'">
            {{ link.name }}
            <span class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
              :class="[route.path === link.path ? 'w-full' : 'w-0 group-hover:w-full']"></span>
          </NuxtLink>
        </nav>

        <!-- Desktop CTA -->
        <div class="hidden md:block">
          <NuxtLink to="/contact?type=devis"
            class="bg-primary hover:bg-accent text-white px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95">
            Demander un devis
          </NuxtLink>
        </div>

        <!-- Mobile Toggle -->
        <button @click="isMenuOpen = !isMenuOpen"
          class="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
          <span class="w-6 h-0.5 transition-all duration-300"
            :class="[
              isScrolled || isMenuOpen ? 'bg-dark' : 'bg-white',
              { 'rotate-45 translate-y-2': isMenuOpen }
            ]"></span>
          <span class="w-6 h-0.5 transition-opacity duration-300" 
            :class="[
              isScrolled || isMenuOpen ? 'bg-dark' : 'bg-white',
              { 'opacity-0': isMenuOpen }
            ]"></span>
          <span class="w-6 h-0.5 transition-all duration-300"
            :class="[
              isScrolled || isMenuOpen ? 'bg-dark' : 'bg-white',
              { '-rotate-45 -translate-y-2': isMenuOpen }
            ]"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition 
      enter-active-class="transition duration-400 ease-out" 
      enter-from-class="opacity-0 -translate-y-full"
      enter-to-class="opacity-100 translate-y-0" 
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0" 
      leave-to-class="opacity-0 -translate-y-full">
      <div v-if="isMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white border-b border-dark/5 shadow-2xl py-12 px-6 overflow-y-auto max-h-[calc(100vh-80px)]">
        <nav class="flex flex-col items-center gap-8">
          <NuxtLink v-for="link in navLinks" :key="link.path" :to="link.path" @click="isMenuOpen = false"
            active-class="text-primary font-bold" exact-active-class="text-primary font-bold underline decoration-2 underline-offset-8"
            class="text-xl font-bold uppercase tracking-widest text-dark hover:text-primary transition-all">
            {{ link.name }}
          </NuxtLink>
          <NuxtLink to="/contact?type=devis" @click="isMenuOpen = false"
            class="w-full text-center bg-primary text-white py-5 rounded-full font-bold uppercase tracking-widest shadow-xl shadow-primary/30">
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
