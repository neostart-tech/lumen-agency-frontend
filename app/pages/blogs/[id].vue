<script setup>
const route = useRoute();
const id = route.params.id;

const heroVisible = ref(false);
const heroSection = ref(null);

onMounted(() => {

    // Hero reveal observer
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            heroVisible.value = entry.isIntersecting;
        });
    }, { threshold: 0.1 });
    if (heroSection.value) heroObserver.observe(heroSection.value);

    // Reveal observer
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

// Mock Data (Same as index but for single view)
const blogs = [
    {
        id: 1,
        title: "L'art de l'accueil événementiel d'exception",
        category: "Événementiel",
        image: "/images/blog/event-1.jpg",
        date: "24 Mars 2024",
        author: "Sophie Laurent",
        authorRole: "Directrice Événementiel",
        readTime: "5 min",
        content: `
      <p class="text-xl font-light leading-relaxed mb-8">Dans le monde de l'événementiel de luxe, l'accueil n'est pas qu'une simple formalité. C'est le premier contact, l'instant T où l'expérience commence réellement.</p>
      
      <h2 class="text-3xl font-bold text-dark mt-12 mb-6 uppercase tracking-tight">Le premier regard : l'importance de l'esthétique</h2>
      <p class="mb-6">Une hôtesse ou un hôte d'accueil est l'ambassadeur direct de votre marque. Leur posture, leur sourire et leur présentation doivent refléter les valeurs d'excellence que vous souhaitez transmettre. Chez Lumen Agency, nous formons nos équipes non seulement au protocole, mais aussi à l'intelligence situationnelle.</p>
      
      <blockquote class="border-l-4 border-primary pl-8 my-12 italic text-2xl text-dark/80 font-serif">
        "L'élégance n'est pas de se faire remarquer, mais de se faire retenir."
      </blockquote>

      <h2 class="text-3xl font-bold text-dark mt-12 mb-6 uppercase tracking-tight">La personnalisation : clé de voûte du VIP</h2>
      <p class="mb-6">Reconnaître un invité de marque par son nom, anticiper ses besoins avant même qu'il ne les exprime... c'est là que réside la véritable différence. La technologie nous aide aujourd'hui à mieux gérer ces flux, mais rien ne remplacera jamais l'empathie et la chaleur d'un accueil humain parfaitement exécuté.</p>
      
      <div class="my-12 rounded-[2.5rem] overflow-hidden bg-dark aspect-video relative group">
        <img src="/images/blog/event-inner.jpg" alt="Accueil VIP" class="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" />
        <div class="absolute inset-0 flex items-center justify-center">
             <div class="px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/20">Excellence & Protocole</div>
        </div>
      </div>

      <h2 class="text-3xl font-bold text-dark mt-12 mb-6 uppercase tracking-tight">Conclusion</h2>
      <p class="mb-6">Investir dans un accueil de qualité, c'est garantir la réussite de votre événement dès les premières secondes. C'est poser les fondations d'un souvenir impérissable.</p>
    `
    },
    {
        id: 2,
        title: "Optimiser votre logistique VIP : Guide complet",
        category: "Logistique",
        image: "/images/blog/logistics-1.jpg",
        date: "18 Mars 2024",
        author: "Jean Dupont",
        authorRole: "Expert Logistique",
        readTime: "4 min",
        content: "<p>Contenu de l'article sur la logistique...</p>"
    },
    {
        id: 3,
        title: "Les destinations de luxe méconnues en 2024",
        category: "Tourisme",
        image: "/images/blog/tourism-1.jpg",
        date: "12 Mars 2024",
        author: "Marc Lefebvre",
        authorRole: "Consultant Voyage",
        readTime: "7 min",
        content: "<p>Contenu de l'article sur le tourisme...</p>"
    },
    {
        id: 4,
        title: "Comment l'assistance aéroportuaire révolutionne le voyage",
        category: "Événementiel",
        image: "/images/blog/event-2.jpg",
        date: "05 Mars 2024",
        author: "Julie Moreau",
        authorRole: "Chef de Projets",
        readTime: "3 min",
        content: "<p>Contenu de l'article sur l'assistance...</p>"
    }
];

const blog = computed(() => blogs.find(b => b.id == id) || blogs[0]);

// Page info for SEO
useHead({
    title: `${blog.value.title} | Blog Lumen Agency`,
    meta: [
        { name: 'description', content: blog.value.excerpt }
    ]
})
</script>

<template>
    <div class="bg-light min-h-screen pb-32 overflow-x-hidden">
        <!-- Back Button -->
        <NuxtLink to="/blogs"
            class="fixed top-28 left-4 md:left-8 z-50 group flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all bg-primary px-6 py-3 rounded-full border border-primary shadow-lg hover:bg-accent hover:border-accent">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-white group-hover:-translate-x-1 transition-all"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour aux articles
        </NuxtLink>

        <!-- Hero Section (Unified Design) -->
        <section ref="heroSection"
            class="relative py-20 md:py-32 bg-dark overflow-hidden flex items-center min-h-[400px] mb-20">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0 opacity-60">
                <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/40"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/20 to-transparent"></div>
            </div>

            <div class="container mx-auto px-4 md:px-8 relative z-10">
                <div class="max-w-4xl space-y-8">
                    <div
                        class="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-[0.3em] reveal-on-scroll">
                        <span>{{ blog.category }}</span>
                        <span class="w-8 h-px bg-primary/30"></span>
                        <span>{{ blog.date }}</span>
                    </div>

                    <div class="relative inline-block">
                        <!-- Signature Motion Line -->
                        <div
                            class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-primary/30 overflow-hidden pointer-events-none z-0">
                            <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
                        </div>

                        <h1
                            class="relative z-10 text-3xl sm:text-4xl md:text-7xl font-semibold text-white uppercase tracking-tight leading-[1.1] flex flex-col">
                            <span class="block overflow-hidden py-1">
                                <span class="inline-block opacity-0"
                                    :class="{ 'animate-title-reveal delay-100': heroVisible }">{{ blog.title.split(' : ')[0] || blog.title }}</span>
                            </span>
                            <span v-if="blog.title.includes(' : ')"
                                class="block overflow-hidden py-1 text-primary font-bold">
                                <span class="inline-block opacity-0"
                                    :class="{ 'animate-title-reveal delay-300': heroVisible }">{{ blog.title.split(' : ')[1] }}</span>
                            </span>
                        </h1>
                    </div>

                    <!-- Author Info -->
                    <div class="flex items-center gap-6 pt-4 reveal-on-scroll delay-400">
                        <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1">
                            <div
                                class="w-full h-full rounded-xl bg-primary/20 flex items-center justify-center overflow-hidden">
                                <span class="text-lg font-bold text-primary">{{ blog.author.charAt(0) }}</span>
                            </div>
                        </div>
                        <div class="text-left">
                            <p class="text-sm font-bold text-white uppercase tracking-widest">{{ blog.author }}</p>
                            <p class="text-[10px] text-white/40 uppercase tracking-widest">{{ blog.authorRole }}</p>
                        </div>
                    </div>
                </div>
            </div>

        </section>

        <!-- Main Content Grid -->
        <div class="container mx-auto px-4 md:px-8">
            <div class="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16">

                <!-- Content Column -->
                <article class="w-full lg:w-3/4 reveal-on-scroll">
                    <div class="prose prose-lg max-w-none text-dark/70 font-light" v-html="blog.content"></div>

                    <!-- Tags & Share -->
                    <div class="mt-20 pt-10 border-t border-dark/5 flex flex-wrap items-center justify-between gap-8">
                        <div class="flex items-center gap-4">
                            <span class="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Partager :</span>
                            <div class="flex gap-2">
                                <!-- LinkedIn -->
                                <button
                                    class="w-10 h-10 rounded-xl bg-white border border-dark/5 flex items-center justify-center text-dark/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </button>
                                <!-- Twitter -->
                                <button
                                    class="w-10 h-10 rounded-xl bg-white border border-dark/5 flex items-center justify-center text-dark/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </button>
                                <!-- Facebook -->
                                <button
                                    class="w-10 h-10 rounded-xl bg-white border border-dark/5 flex items-center justify-center text-dark/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-2">
                            <span v-for="tag in ['Luxe', 'Accueil', 'Expertise']" :key="tag"
                                class="px-4 py-1.5 bg-dark/5 rounded-full text-[10px] font-bold text-dark/60 uppercase tracking-widest border border-dark/5">#{{
                                tag }}</span>
                        </div>
                    </div>
                </article>

                <!-- Sidebar / Recent Articles -->
                <aside class="w-full lg:w-1/4 space-y-12">
                    <div class="sticky top-32 space-y-8">
                        <div class="flex items-center justify-between mb-4 px-2">
                             <h4 class="text-xs font-bold text-primary uppercase tracking-[0.3em]">Vous aimerez aussi</h4>
                             <div class="w-12 h-px bg-primary/20"></div>
                        </div>

                        <div class="space-y-6">
                            <NuxtLink v-for="recent in blogs.filter(b => b.id != id && b.category == blog.category).slice(0, 3)" :key="recent.id" :to="`/blogs/${recent.id}`" class="group flex flex-col gap-3 p-4 rounded-[1.5rem] bg-white border border-dark/5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                                <div class="relative h-32 w-full overflow-hidden rounded-xl">
                                    <img :src="recent.image" :alt="recent.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div class="absolute inset-0 bg-dark/20 group-hover:bg-dark/0 transition-colors"></div>
                                </div>
                                <div>
                                    <p class="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">{{ recent.category }}</p>
                                    <h5 class="text-sm font-bold text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                        {{ recent.title }}
                                    </h5>
                                </div>
                            </NuxtLink>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
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

:deep(h2) {
    position: relative;
    display: inline-block;
}

:deep(h2::after) {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 40px;
    height: 2px;
    background-color: var(--color-primary);
}
</style>
