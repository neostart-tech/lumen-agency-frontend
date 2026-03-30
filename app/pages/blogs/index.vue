<script setup>
import { useBlogStore } from '~~/stores/blog';
import { useServiceStore } from '~~/stores/service';
import { ref, computed, watch, onMounted } from 'vue';

const heroVisible = ref(false);
const heroSection = ref(null);
const categoryContainer = ref(null);
const blogStore = useBlogStore();
const serviceStore = useServiceStore();
const config = useRuntimeConfig();

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

  // General reveal-on-scroll observer
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  const initObservers = () => {
    if (heroSection.value) heroObserver.observe(heroSection.value);
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      revealObserver.observe(el);
    });
  }

  blogStore.fetch().then(async () => {
    await nextTick();
    initObservers();
  });
  serviceStore.fetch();

  // Also watch pagination/category changes to re-observe cards
  watch([paginatedBlogs, activeCategory], async () => {
    await nextTick();
    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      revealObserver.observe(el);
    });
  });
});

// Page info for SEO
useHead({
  title: 'Blog | Actualités & Insights | Lumen Agency',
  meta: [
    { name: 'description', content: 'Découvrez les dernières actualités et insights de Lumen Agency sur le tourisme, la logistique et l\'événementiel.' }
  ]
})

const categories = computed(() => {
  const list = (serviceStore.services || []).map(s => s.titre.toUpperCase());
  return ["Tous", ...list, "AUTRE"];
});

const activeCategory = ref("Tous");
const currentPage = ref(1);
const itemsPerPage = 6;

const filteredBlogs = computed(() => {
  if (activeCategory.value === "Tous") return blogStore.blogs || [];
  return (blogStore.blogs || []).filter(blog => blog.categorie === activeCategory.value);
});

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredBlogs.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / itemsPerPage));

const getCoverImage = (blog) => {
  if (!blog || !blog.images) return '/images/placeholder-blog.jpg';
  const cover = blog.images.find(img => img.is_couverture);
  const path = cover ? cover.path : (blog.images.length > 0 ? blog.images[0].path : null);
  
  if (!path) return '/images/placeholder-blog.jpg';
  if (path.startsWith('http')) return path;
  return `${config.public.storageBase}/${path}`;
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
};

const getExcerpt = (content) => {
  if (!content) return '';
  const plainText = content.replace(/<[^>]*>/g, '');
  return plainText.length > 120 ? plainText.substring(0, 120) + '...' : plainText;
};

const calculateReadingTime = (content) => {
  if (!content) return 1;
  const wordsPerMinute = 120;
  const plainText = content.replace(/<[^>]*>/g, '');
  const noOfWords = plainText.trim().split(/\s+/).length;
  const minutes = Math.ceil(noOfWords / wordsPerMinute);
  return minutes || 1;
};

// Defensive texts for empty state to avoid long lines in template
const emptyTitle = computed(() => {
  return (blogStore.blogs && blogStore.blogs.length === 0)
    ? "Aucun blog publié"
    : "Aucun résultat ne correspond à vos recherches";
});

const emptySubtext = computed(() => {
  return (blogStore.blogs && blogStore.blogs.length === 0)
    ? "Découvrez nos prochains articles sous peu"
    : "Essayez une autre catégorie pour explorer nos perspectives";
});

// Reset page when category changes
watch(activeCategory, () => {
  currentPage.value = 1;
});
</script>

<template>
  <div class="bg-light min-h-screen font-outfit overflow-x-hidden">
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
          <div
            class="block w-fit py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm reveal-on-scroll">
            Notre Magazine
          </div>

          <div class="relative inline-block">
            <!-- Signature Motion Line -->
            <div
              class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-primary/30 overflow-hidden pointer-events-none z-0">
              <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
            </div>

            <h1
              class="relative z-10 text-2xl sm:text-3xl md:text-5xl font-semibold text-white uppercase tracking-normal leading-[1.2] flex flex-col">
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': heroVisible }">L'OEil
                  de l'agence</span>
              </span>
              <span class="block overflow-hidden py-1 text-primary font-bold">
                <span class="inline-block opacity-0"
                  :class="{ 'animate-title-reveal delay-300': heroVisible }">Actualités &</span>
              </span>
              <span class="block overflow-hidden py-1">
                <span class="inline-block opacity-0"
                  :class="{ 'animate-title-reveal delay-500': heroVisible }">Perspectives</span>
              </span>
            </h1>
          </div>

          <p class="text-white/60 text-lg md:text-xl font-light leading-relaxed max-w-2xl reveal-on-scroll delay-400">
            Plongez au cœur de l'expertise Lumen Agency. Partages d'expériences, tendances du marché et conseils
            exclusifs.
          </p>
        </div>
      </div>

      <!-- Decorative Scroll Down -->
      <div
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 reveal-on-scroll delay-700">
        <span
          class="text-[10px] text-white/40 uppercase tracking-[0.4em] rotate-90 origin-left translate-x-1.5 translate-y-8">Découvrez</span>
        <div class="w-px h-24 bg-gradient-to-b from-primary/60 to-transparent"></div>
      </div>
    </section>

    <!-- Categories Filter & Grid Section -->
    <section class="py-20 md:py-32">
      <div class="container mx-auto px-4 md:px-8">
        <!-- Categories Filter -->
        <div class="relative mb-20 reveal-on-scroll">
          <!-- Arrows -->
          <div class="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 flex items-center h-full">
            <button @click="scrollCategories('left')"
              class="w-10 h-10 rounded-full bg-white border border-dark/5 shadow-lg flex items-center justify-center text-dark/40 hover:text-primary transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>

          <div class="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-20 flex items-center h-full">
            <button @click="scrollCategories('right')"
              class="w-10 h-10 rounded-full bg-white border border-dark/5 shadow-lg flex items-center justify-center text-dark/40 hover:text-primary transition-all active:scale-95">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Container -->
          <div ref="categoryContainer" class="flex overflow-x-auto gap-4 px-4 py-4 no-scrollbar scroll-smooth snap-x">
            <button v-for="cat in categories" :key="cat" @click="activeCategory = cat"
              class="px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 border backdrop-blur-sm whitespace-nowrap snap-center"
              :class="activeCategory === cat
                ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-105'
                : 'bg-white border-dark/5 text-dark/40 hover:border-primary/30 hover:text-primary'">
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- Loading State: Circle around Logo -->
        <div v-if="blogStore.loading && blogStore.blogs && blogStore.blogs.length === 0" class="py-20 md:py-40">
          <AdminLoader :visible="true" :inline="true" />
          <p class="text-center text-[10px] font-bold text-dark/30 uppercase tracking-[0.4em] animate-pulse -mt-8">
            Analyse des tendances en cours...</p>
        </div>

        <!-- Blog Grid -->
        <div v-else-if="filteredBlogs.length > 0">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 min-h-[600px]">
            <TransitionGroup enter-active-class="transition duration-700 ease-out"
              enter-from-class="opacity-0 translate-y-12 scale-95" enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition duration-300 ease-in absolute" leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95">
              <NuxtLink v-for="(blog, index) in paginatedBlogs" :key="blog.id" :to="`/blogs/${blog.id}`"
                class="group relative block reveal-on-scroll h-full" :style="{ transitionDelay: (index * 100) + 'ms' }">
                <!-- Card Container -->
                <div
                  class="relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl shadow-dark/5 border border-dark/5 h-full transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2">
                  <!-- Image Container -->
                  <div class="relative h-64 overflow-hidden">
                    <img :src="getCoverImage(blog)" :alt="blog.titre"
                      class="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>

                    <!-- Floating Tag -->
                    <div
                      class="absolute top-6 left-6 px-4 py-1.5 bg-white/90 backdrop-blur-sm border border-dark/5 rounded-full text-[10px] font-bold text-primary uppercase tracking-widest shadow-sm">
                      {{ blog.categorie }}
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="p-8 space-y-5 flex flex-col h-[calc(100%-16rem)]">
                    <div class="flex items-center gap-3 text-[10px] font-bold text-dark/40 uppercase tracking-widest">
                      <span>{{ formatDate(blog.created_at) }}</span>
                      <span class="w-1 h-1 rounded-full bg-primary/40"></span>
                      <span>{{ calculateReadingTime(blog.contenu) }} min de lecture</span>
                    </div>

                    <h3
                      class="text-xl md:text-2xl font-semibold text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {{ blog.titre }}
                    </h3>

                    <p class="text-dark/60 font-light leading-relaxed line-clamp-3">
                      {{ getExcerpt(blog.contenu) }}
                    </p>

                    <!-- Link Arrow -->
                    <div
                      class="mt-auto pt-4 flex items-center gap-3 text-primary text-xs font-bold uppercase tracking-widest group-hover:gap-5 transition-all">
                      <span>Lire l'article</span>
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </NuxtLink>
            </TransitionGroup>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages > 1" class="mt-20 flex justify-center items-center gap-4 reveal-on-scroll">
            <button @click="currentPage--" :disabled="currentPage === 1"
              class="w-12 h-12 rounded-full border border-dark/5 flex items-center justify-center text-dark/40 hover:text-primary hover:border-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div class="flex gap-2">
              <button v-for="p in totalPages" :key="p" @click="currentPage = p"
                class="w-12 h-12 rounded-full text-xs font-bold transition-all"
                :class="currentPage === p ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-dark/40 hover:text-primary hover:bg-primary/5'">
                {{ p }}
              </button>
            </div>
            <button @click="currentPage++" :disabled="currentPage === totalPages"
              class="w-12 h-12 rounded-full border border-dark/5 flex items-center justify-center text-dark/40 hover:text-primary hover:border-primary disabled:opacity-20 disabled:cursor-not-allowed transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else
          class="text-center py-24 bg-white rounded-[3rem] border border-dark/5 shadow-sm reveal-on-scroll active">
          <div class="w-24 h-24 bg-light rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-dark/20" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
          </div>
          <p class="text-xl md:text-2xl font-medium text-dark/40 uppercase tracking-widest animate-pulse px-4">
            {{ emptyTitle }}
          </p>
          <p class="text-dark/20 mt-3 text-sm font-light uppercase tracking-[0.4em]">
            {{ emptySubtext }}
          </p>
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

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
