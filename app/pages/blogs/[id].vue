<script setup>
import { useBlogStore } from '~~/stores/blog';

const route = useRoute();
const id = route.params.id;
const blogStore = useBlogStore();
const config = useRuntimeConfig();

const heroVisible = ref(false);
const heroSection = ref(null);
const blog = ref(null);
const isLoading = ref(true);
const recentBlogs = ref([]);

onMounted(async () => {
    try {
        blog.value = await blogStore.show(id);

        // Fetch others for sidebar (limit to same category if possible)
        if (blogStore.blogs.length === 0) {
            await blogStore.fetch();
        }
        recentBlogs.value = blogStore.blogs
            .filter(b => b.id !== id)
            .slice(0, 3);

    } catch (e) {
        console.error('Erreur chargement blog:', e);
    } finally {
        isLoading.value = false;
    }

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

const getCoverImage = (b) => {
    if (!b) return '';
    const cover = b.images?.find(img => img.is_couverture);
    if (cover) return config.public.storageBase + '/' + cover.path;
    if (b.images && b.images.length > 0) return config.public.storageBase + '/' + b.images[0].path;
    return '/images/placeholder-blog.jpg';
};

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
};

const shareUrl = computed(() => {
    if (process.client) return window.location.href;
    return '';
});

const shareOn = (platform) => {
    const url = encodeURIComponent(shareUrl.value);
    const text = encodeURIComponent(blog.value?.titre || '');
    let shareLink = '';

    switch (platform) {
        case 'whatsapp': shareLink = `https://wa.me/?text=${text}%20${url}`; break;
        case 'facebook': shareLink = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
        case 'linkedin': shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`; break;
        case 'x': shareLink = `https://twitter.com/intent/tweet?text=${text}&url=${url}`; break;
    }

    if (shareLink) window.open(shareLink, '_blank');
};

// Page info for SEO
useHead({
    title: computed(() => blog.value ? `${blog.value.titre} | Blog Lumen Agency` : 'Chargement...'),
    meta: [
        { name: 'description', content: computed(() => blog.value ? blog.value.titre : '') }
    ]
})
</script>

<template>
    <div class="bg-light min-h-screen pb-32 font-outfit overflow-x-hidden">
        <div v-if="isLoading" class="min-h-screen flex items-center justify-center">
            <AdminLoader :visible="true" />
        </div>

        <template v-else-if="blog">
            <!-- Back Button -->
            <NuxtLink to="/blogs"
                class="fixed top-28 left-4 md:left-8 z-50 group flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all bg-primary px-6 py-3 rounded-full border border-primary shadow-lg hover:bg-accent hover:border-accent">
                <svg xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 text-white group-hover:-translate-x-1 transition-all" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                        d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Retour aux articles
            </NuxtLink>

            <!-- Hero Section -->
            <section ref="heroSection"
                class="relative py-20 md:py-32 bg-dark overflow-hidden flex items-center min-h-[400px] mb-20">
                <!-- Background Image -->
                <div class="absolute inset-0 z-0 opacity-60">
                    <img :src="getCoverImage(blog)" :alt="blog.titre" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/40"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/20 to-transparent"></div>
                </div>

                <div class="container mx-auto px-4 md:px-8 relative z-10">
                    <div class="max-w-4xl space-y-8">
                        <div
                            class="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-[0.3em] reveal-on-scroll">
                            <span>{{ blog.categorie }}</span>
                            <span class="w-8 h-px bg-primary/30"></span>
                            <span>{{ formatDate(blog.created_at) }}</span>
                        </div>

                        <div class="relative inline-block">
                            <!-- Signature Motion Line -->
                            <div
                                class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-px bg-primary/30 overflow-hidden pointer-events-none z-0">
                                <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
                            </div>

                            <h1
                                class="relative z-10 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-white uppercase tracking-tight leading-[1.1] flex flex-col">
                                <span class="block py-1">
                                    {{ blog.titre }}
                                </span>
                            </h1>
                        </div>

                        <!-- Author Placeholder (since backend currently has no author) -->
                        <div class="flex items-center gap-6 pt-4 reveal-on-scroll delay-400">
                            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1">
                                <div
                                    class="w-full h-full rounded-xl bg-primary/20 flex items-center justify-center overflow-hidden">
                                    <img src="/images/logo-fond-blanc.png" class="w-8 h-8 object-contain" />
                                </div>
                            </div>
                            <div class="text-left">
                                <p class="text-sm font-bold text-white uppercase tracking-widest">Lumen Agency</p>
                                <p class="text-[10px] text-white/40 uppercase tracking-widest">L'expertise à votre
                                    service</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Main Content Grid -->
            <div class="container mx-auto px-4 md:px-8">
                <div class="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16">

                    <!-- Content Column -->
                    <article class="w-full lg:w-3/4 reveal-on-scroll">
                        <div class="prose prose-lg max-w-none text-dark/70 font-light article-content"
                            v-html="blog.contenu"></div>

                        <!-- Share -->
                        <div
                            class="mt-20 pt-10 border-t border-dark/5 flex flex-wrap items-center justify-between gap-8">
                            <div class="flex items-center gap-4">
                                <span class="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Partager
                                    :</span>
                                <div class="flex gap-2">
                                    <!-- WhatsApp -->
                                    <button @click="shareOn('whatsapp')"
                                        class="w-10 h-10 rounded-xl bg-white border border-dark/5 flex items-center justify-center text-dark/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </button>
                                    <!-- LinkedIn -->
                                    <button @click="shareOn('linkedin')"
                                        class="w-10 h-10 rounded-xl bg-white border border-dark/5 flex items-center justify-center text-dark/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                        </svg>
                                    </button>
                                    <!-- X -->
                                    <button @click="shareOn('x')"
                                        class="w-10 h-10 rounded-xl bg-white border border-dark/5 flex items-center justify-center text-dark/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                                        </svg>
                                    </button>
                                    <!-- Facebook -->
                                    <button @click="shareOn('facebook')"
                                        class="w-10 h-10 rounded-xl bg-white border border-dark/5 flex items-center justify-center text-dark/60 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                            <path
                                                d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="flex flex-wrap gap-2">
                                <span
                                    class="px-4 py-1.5 bg-dark/5 rounded-full text-[10px] font-bold text-dark/60 uppercase tracking-widest border border-dark/5">#Luxe</span>
                                <span
                                    class="px-4 py-1.5 bg-dark/5 rounded-full text-[10px] font-bold text-dark/60 uppercase tracking-widest border border-dark/5">#Expertise</span>
                                <span
                                    class="px-4 py-1.5 bg-dark/5 rounded-full text-[10px] font-bold text-dark/60 uppercase tracking-widest border border-dark/5">#LumenAgency</span>
                            </div>
                        </div>
                    </article>

                    <!-- Sidebar / Recent Articles -->
                    <aside class="w-full lg:w-1/4 space-y-12">
                        <div class="sticky top-32 space-y-8">
                            <div class="flex items-center justify-between mb-4 px-2">
                                <h4 class="text-xs font-bold text-primary uppercase tracking-[0.3em]">À lire aussi</h4>
                                <div class="w-12 h-px bg-primary/20"></div>
                            </div>

                            <div class="space-y-6">
                                <NuxtLink v-for="recent in recentBlogs" :key="recent.id" :to="`/blogs/${recent.id}`"
                                    class="group flex flex-col gap-3 p-4 rounded-[1.5rem] bg-white border border-dark/5 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500">
                                    <div class="relative h-32 w-full overflow-hidden rounded-xl">
                                        <img :src="getCoverImage(recent)" :alt="recent.titre"
                                            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div
                                            class="absolute inset-0 bg-dark/20 group-hover:bg-dark/0 transition-colors">
                                        </div>
                                    </div>
                                    <div>
                                        <p class="text-[9px] font-bold text-primary uppercase tracking-widest mb-1">{{
                                            recent.categorie }}</p>
                                        <h5
                                            class="text-sm font-bold text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                            {{ recent.titre }}
                                        </h5>
                                    </div>
                                </NuxtLink>
                                <div v-if="recentBlogs.length === 0" class="text-center py-8">
                                    <p class="text-[10px] text-dark/30 uppercase tracking-widest italic">Aucun autre
                                        article</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </template>

        <div v-else class="min-h-screen flex items-center justify-center">
            <div class="text-center space-y-6">
                <p class="text-xl font-medium text-dark/40 uppercase tracking-widest">Article introuvable</p>
                <NuxtLink to="/blogs"
                    class="inline-block text-primary font-bold uppercase tracking-widest text-xs hover:underline">Retour
                    au
                    magazine</NuxtLink>
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

.article-content :deep(h2) {
    font-size: 1.875rem;
    font-weight: 700;
    color: var(--color-dark);
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: -0.025em;
    position: relative;
    display: inline-block;
}

.article-content :deep(h2::after) {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background-color: var(--color-primary);
}

.article-content :deep(p) {
    margin-bottom: 1.5rem;
    line-height: 1.8;
}

.article-content :deep(blockquote) {
    border-left: 4px solid var(--color-primary);
    padding-left: 2rem;
    margin: 3rem 0;
    font-style: italic;
    font-size: 1.5rem;
    color: rgba(var(--color-dark-rgb), 0.8);
}

.article-content :deep(img) {
    border-radius: 2rem;
    margin: 3rem 0;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
}
</style>
