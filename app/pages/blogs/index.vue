<script setup>
const heroVisible = ref(false);
const heroSection = ref(null);
const categoryContainer = ref(null);

const scrollCategories = (direction) => {
  if (!categoryContainer.value) return;
  const scrollAmount = 200;
  categoryContainer.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  });
};

onMounted(() => {
  // Hero reveal observer
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      heroVisible.value = entry.isIntersecting;
    });
  }, { threshold: 0.1 });
  if (heroSection.value) heroObserver.observe(heroSection.value);

  // General reveal-on-scroll observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    revealObserver.observe(el);
  });
});

// Page info for SEO
useHead({
  title: 'Blog | Actualités & Insights | Lumen Agency',
  meta: [
    { name: 'description', content: 'Découvrez les dernières actualités et insights de Lumen Agency sur le tourisme, la logistique et l\'événementiel.' }
  ]
})

const categories = ["Tous", "Événementiel", "Logistique", "Tourisme", "Conseils"];
const activeCategory = ref("Tous");

const blogs = [
  {
    id: 1,
    title: "L'art de l'accueil événementiel d'exception",
    excerpt: "Comment transformer une simple réception en une expérience mémorable pour vos invités de marque.",
    category: "Événementiel",
    image: "/images/blog/event-1.jpg",
    date: "24 Mars 2024",
    readTime: "5 min"
  },
  {
    id: 2,
    title: "Optimiser votre logistique internationale en 2024",
    excerpt: "Les nouvelles tendances de l'import-export et comment Lumen Agency vous accompagne dans cette transition.",
    category: "Logistique",
    image: "/images/blog/logistics-1.jpg",
    date: "20 Mars 2024",
    readTime: "8 min"
  },
  {
    id: 3,
    title: "Les destinations phares pour le tourisme d'affaires",
    excerpt: "Découvrez notre sélection exclusive pour vos prochains séminaires et voyages d'entreprise.",
    category: "Tourisme",
    image: "/images/blog/tourism-1.jpg",
    date: "15 Mars 2024",
    readTime: "6 min"
  },
  {
    id: 4,
    title: "L'importance de l'assistance aéroportuaire personnalisée",
    excerpt: "Pourquoi le service Meet & Greet est devenu indispensable pour les voyageurs d'affaires modernes.",
    category: "Conseils",
    image: "/images/blog/airport-1.jpg",
    date: "10 Mars 2024",
    readTime: "4 min"
  },
  {
    id: 5,
    title: "Gérer l'imprévu lors d'un grand événement",
    excerpt: "Les secrets des meilleurs régisseurs pour maintenir une fluidité parfaite quoi qu'il arrive.",
    category: "Événementiel",
    image: "/images/blog/event-2.jpg",
    date: "05 Mars 2024",
    readTime: "7 min"
  },
  {
    id: 6,
    title: "Le futur du transport de luxe : Confort et technologie",
    excerpt: "Comment la technologie redéfinit les standards du transport de VIP et de marchandises précieuses.",
    category: "Logistique",
    image: "/images/blog/transport-1.jpg",
    date: "01 Mars 2024",
    readTime: "10 min"
  }
];

const filteredBlogs = computed(() => {
  if (activeCategory.value === "Tous") return blogs;
  return blogs.filter(blog => blog.category === activeCategory.value);
});
</script>

<template>
  <div class="bg-light min-h-screen overflow-x-hidden">
    <!-- Hero Section -->
    <section ref="heroSection" class="relative py-20 md:py-32 bg-dark overflow-hidden flex items-center min-h-[400px]">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0 opacity-40">
        <img src="/images/blogs-bg.jpg" alt="Lumen Agency Blog" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/40"></div>
        <div class="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/20 to-transparent"></div>
      </div>

      <div class="container mx-auto px-4 md:px-8 relative z-10">
        <div class="max-w-4xl space-y-8">
          <div class="block w-fit py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm reveal-on-scroll">
            Notre Magazine
          </div>

          <div class="relative inline-block">
            <!-- Signature Motion Line -->
            <div class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-primary/30 overflow-hidden pointer-events-none z-0">
              <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
            </div>

            <h1 class="relative z-10 text-2xl sm:text-3xl md:text-5xl font-semibold text-white uppercase tracking-normal leading-[1.2] flex flex-col">
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': heroVisible }">L'OEil de l'agence</span>
              </span>
              <span class="block overflow-hidden py-1 text-primary font-bold">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-300': heroVisible }">Actualités &</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-500': heroVisible }">Perspectives</span>
              </span>
            </h1>
          </div>
          
          <p class="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl reveal-on-scroll delay-400">
            Plongez au cœur de l'expertise Lumen Agency. Partages d'expériences, tendances du marché et conseils exclusifs.
          </p>
        </div>
      </div>

      <!-- Decorative Scroll Down -->
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 reveal-on-scroll delay-700">
        <span class="text-[10px] text-white/40 uppercase tracking-[0.4em] rotate-90 origin-left translate-x-1.5 translate-y-8">Découvrez</span>
        <div class="w-px h-24 bg-gradient-to-b from-primary/60 to-transparent"></div>
      </div>
    </section>

    <!-- Categories Filter & Grid Section -->
    <section class="py-20 md:py-32">
      <div class="container mx-auto px-4 md:px-8">
        <!-- Categories Filter -->
        <div class="relative mb-20 reveal-on-scroll">
          <!-- Arrows (Mobile only or everywhere for UX) -->
          <div class="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 flex items-center h-full">
            <button @click="scrollCategories('left')" class="w-10 h-10 rounded-full bg-white border border-dark/5 shadow-lg flex items-center justify-center text-dark/40 hover:text-primary transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div class="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 flex items-center h-full">
            <button @click="scrollCategories('right')" class="w-10 h-10 rounded-full bg-white border border-dark/5 shadow-lg flex items-center justify-center text-dark/40 hover:text-primary transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Container -->
          <div ref="categoryContainer" class="flex overflow-x-auto gap-4 px-4 py-4 no-scrollbar scroll-smooth snap-x">
            <button 
              v-for="cat in categories" 
              :key="cat"
              @click="activeCategory = cat"
              class="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border backdrop-blur-sm whitespace-nowrap snap-center"
              :class="activeCategory === cat 
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105' 
                : 'bg-white border-dark/5 text-dark/40 hover:border-primary/30 hover:text-primary'"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Blog Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <TransitionGroup 
            enter-active-class="transition duration-700 ease-out"
            enter-from-class="opacity-0 translate-y-12 scale-95"
            enter-to-class="opacity-100 translate-y-0 scale-100"
            leave-active-class="transition duration-300 ease-in absolute"
            leave-from-class="opacity-100 scale-100"
            leave-to-class="opacity-0 scale-95"
          >
            <NuxtLink 
              v-for="(blog, index) in filteredBlogs" 
              :key="blog.id"
              :to="`/blogs/${blog.id}`"
              class="group relative block reveal-on-scroll"
              :style="{ transitionDelay: `${index * 100}ms` }"
            >
              <!-- Card Container -->
              <div class="relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-dark/5 border border-dark/5 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                <!-- Image Container -->
                <div class="relative h-64 overflow-hidden">
                  <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                  <div class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <!-- Floating Tag -->
                  <div class="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-sm border border-dark/5 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                    {{ blog.category }}
                  </div>
                </div>

                <!-- Content -->
                <div class="p-8 space-y-5">
                  <div class="flex items-center gap-4 text-[10px] font-bold text-dark/40 uppercase tracking-widest">
                    <span>{{ blog.date }}</span>
                    <span class="w-1 h-1 bg-primary rounded-full"></span>
                    <span>{{ blog.readTime }} de lecture</span>
                  </div>

                  <h3 class="text-xl md:text-2xl font-semibold text-dark leading-tight group-hover:text-primary transition-colors">
                    {{ blog.title }}
                  </h3>
                  
                  <p class="text-dark/60 font-light leading-relaxed line-clamp-2">
                    {{ blog.excerpt }}
                  </p>

                  <!-- Link Arrow -->
                  <div class="pt-2 flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-widest group-hover:gap-5 transition-all">
                    <span>Lire l'article</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </NuxtLink>
          </TransitionGroup>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.reveal-on-scroll.active {
  opacity: 1;
  transform: translateY(0);
}
</style>
