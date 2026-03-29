<template>
  <div
    class="flex flex-col min-h-screen bg-light font-sans selection:bg-primary selection:text-white antialiased overflow-x-hidden">
    <!-- Global Scroll Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 z-[150] pointer-events-none">
      <div class="h-full bg-primary transition-all duration-150 ease-out shadow-[0_0_10px_rgba(242,144,4,0.5)]"
        :style="{ width: `${scrollProgress}%` }"></div>
    </div>

    <!-- Header component (Fixed) -->
    <Header />

    <!-- Main Content Area -->
    <!-- We add pt-20 (80px) to compensate for the fixed header height -->
    <main class="flex-grow pt-20">
      <!-- Page content slot -->
      <slot />
    </main>

    <!-- PreFooter component (CTA) -->
    <PreFooter v-if="route.path !== '/contact'" />

    <!-- Footer component -->
    <Footer />

    <!-- Back to Top Button -->
    <Transition enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-10 scale-50" enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-300 ease-in" leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-10 scale-50">
      <button v-if="isScrolled" @click="scrollToTop"
        class="fixed bottom-8 right-8 z-[100] w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition-all duration-300 shadow-[0_10px_30px_rgba(242,144,4,0.4)] hover:shadow-primary/50 group active:scale-95 border border-white/10"
        :class="{ 'animate-shake-launch': isLaunching }"
        aria-label="Back to Top">
        <!-- Main Caret -->
        <svg xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6 transition-all duration-300" 
          :class="[isLaunching ? 'opacity-0 -translate-y-12' : 'animate-bounce-slow opacity-100 translate-y-0']" 
          fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
        </svg>

        <!-- Launch Trail -->
        <div v-if="isLaunching" class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <div v-for="i in 5" :key="i" 
               class="absolute text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-launch-trail"
               :style="{ animationDelay: `${(i - 1) * 0.12}s` }">
               <svg xmlns="http://www.w3.org/2000/svg"
                  class="w-4 h-4" fill="none" viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M5 15l7-7 7 7" />
                </svg>
          </div>
        </div>
      </button>
    </Transition>
  </div>
</template>

<script setup>
/**
 * Layout par défaut de Lumen Agency
 */
const isScrolled = ref(false);
const scrollProgress = ref(0);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 400;

  // Calculate global scroll progress
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (height > 0) {
    scrollProgress.value = (winScroll / height) * 100;
  }
};

const scrollToTop = () => {
  isLaunching.value = true;
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Reset after scroll usually finishes
  setTimeout(() => {
    isLaunching.value = false;
  }, 800);
};

const route = useRoute();
const isLaunching = ref(false);
let revealObserver = null;

const initRevealObserver = () => {
  if (revealObserver) revealObserver.disconnect();

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
  elementsToReveal.forEach((el) => revealObserver.observe(el));
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  initRevealObserver();
});

// Watch for route changes to re-initialize observation on new page content
watch(() => route.path, () => {
  // Wait for DOM update
  nextTick(() => {
    initRevealObserver();
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
  if (revealObserver) revealObserver.disconnect();
});
</script>

<style>
/* Global Layout styles */
html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  padding: 0;
  cursor: default;
}

/* Global Reveal Animations */
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.9s cubic-bezier(0.25, 1, 0.5, 1);
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered Delay Helpers */
.delay-100 {
  transition-delay: 0.1s;
}

.delay-200 {
  transition-delay: 0.2s;
}

.delay-300 {
  transition-delay: 0.3s;
}

.delay-400 {
  transition-delay: 0.4s;
}

.delay-500 {
  transition-delay: 0.5s;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease-in-out, transform 0.4s ease-in-out;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@keyframes bounce-custom {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes launch-trail {
  0% { transform: translateY(0) scale(0.5); opacity: 0; }
  20% { opacity: 1; transform: translateY(-20px) scale(1.2); }
  100% { transform: translateY(-180px) scale(0.8); opacity: 0; }
}

@keyframes shake-launch {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1) rotate(-3deg); }
  75% { transform: scale(1.1) rotate(3deg); }
}

.animate-launch-trail {
  animation: launch-trail 1s cubic-bezier(0.2, 0, 0.2, 1) infinite;
}

.animate-shake-launch {
  animation: shake-launch 0.15s ease-in-out infinite;
}

.animate-bounce-slow {
  animation: bounce-custom 0.5s infinite ease-in-out;
}
</style>
