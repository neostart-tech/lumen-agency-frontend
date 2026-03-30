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
const isLightboxOpen = ref(false);
const activeImageUrl = ref('');

const openLightbox = (url) => {
    activeImageUrl.value = url;
    isLightboxOpen.value = true;
    document.body.style.overflow = 'hidden';
};

const closeLightbox = () => {
    isLightboxOpen.value = false;
    document.body.style.overflow = 'auto';
};

onMounted(async () => {
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            heroVisible.value = entry.isIntersecting;
        });
    }, { threshold: 0.1 });

    try {
        blog.value = await blogStore.show(id);

        // Fetch others for sidebar (limit to same category if possible)
        if (blogStore.blogs.length === 0) {
            await blogStore.fetch();
        }
        recentBlogs.value = blogStore.blogs
            .filter(b => b.id !== id)
            .slice(0, 3);

        isLoading.value = false;
        await nextTick();
        if (heroSection.value) heroObserver.observe(heroSection.value);

    } catch (e) {
        console.error('Erreur chargement blog:', e);
        isLoading.value = false;
    }
});

const getCoverImage = (b) => {
    if (!b || !b.images) return '/images/placeholder-blog.jpg';
    const cover = b.images.find(img => img.is_couverture);
    const path = cover ? cover.path : (b.images.length > 0 ? b.images[0].path : null);

    if (!path) return '/images/placeholder-blog.jpg';
    if (path.startsWith('http')) return path;
    return `${config.public.storageBase}/${path}`;
};

const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    return `${config.public.storageBase}/${path}`;
};

const galleryImages = computed(() => {
    if (!blog.value || !blog.value.images) return [];
    const cover = blog.value.images.find(img => img.is_couverture);
    return blog.value.images.filter(img => img.id !== cover?.id);
});

const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
};

const calculateReadingTime = (content) => {
    if (!content) return 1;
    const wordsPerMinute = 120;
    const plainText = content.replace(/<[^>]*>/g, '');
    const noOfWords = plainText.trim().split(/\s+/).length;
    const minutes = Math.ceil(noOfWords / wordsPerMinute);
    return minutes || 1;
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
                <div class="absolute inset-0 z-0 opacity-60 cursor-zoom-in" @click="openLightbox(getCoverImage(blog))">
                    <img :src="getCoverImage(blog)" :alt="blog.titre" class="w-full h-full object-cover" />
                    <div class="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/40"></div>
                    <div class="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/20 to-transparent"></div>
                </div>

                <div class="container mx-auto px-4 md:px-8 relative z-10">
                    <div class="max-w-4xl space-y-8">
                        <div
                            class="flex items-center gap-4 text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
                            <span>{{ blog.categorie }}</span>
                            <span class="w-8 h-px bg-primary/30"></span>
                            <span>{{ formatDate(blog.created_at) }}</span>
                            <span class="w-1 h-1 rounded-full bg-primary/40"></span>
                            <span>{{ calculateReadingTime(blog.contenu) }} min de lecture</span>
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
                                    <span class="inline-block opacity-0"
                                        :class="{ 'animate-title-reveal delay-100': heroVisible }">
                                        {{ blog.titre }}
                                    </span>
                                </span>
                            </h1>
                        </div>

                        <!-- Author Placeholder (since backend currently has no author) -->
                        <div class="flex items-center gap-6 pt-4">
                            <div class="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-1">
                                <div
                                    class="w-full h-full rounded-xl bg-primary/20 flex items-center justify-center overflow-hidden">
                                    <img src="/images/logo-2-mixte.png" class="w-8 h-8 object-contain" />
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
                    <article class="w-full lg:w-3/4">
                        <div class="prose prose-lg max-w-none text-dark/70 font-light article-content"
                            v-html="blog.contenu"></div>

                        <!-- Gallery Section -->
                        <div v-if="galleryImages.length > 0" class="mt-20 space-y-8">
                            <div class="flex items-center gap-4">
                                <h3 class="text-xl font-bold text-dark uppercase tracking-[0.3em]">Galerie Photos</h3>
                                <div class="flex-1 h-px bg-dark/10"></div>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div v-for="img in galleryImages" :key="img.id"
                                    @click="openLightbox(getImageUrl(img.path))"
                                    class="group relative aspect-[4/3] overflow-hidden rounded-[2.5rem] bg-dark/5 shadow-lg cursor-zoom-in">
                                    <img :src="getImageUrl(img.path)"
                                        class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                    <div
                                        class="absolute inset-0 bg-dark/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                                        <div
                                            class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none"
                                                viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

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
        <!-- Lightbox Modal -->
        <Teleport to="body">
            <Transition name="fade">
                <div v-if="isLightboxOpen"
                    class="fixed inset-0 z-[100] flex items-center justify-center bg-dark/95 backdrop-blur-xl p-4 md:p-12"
                    @click="closeLightbox">
                    <!-- Close Button -->
                    <button
                        class="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all z-[110]">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="relative max-w-5xl max-h-full flex items-center justify-center" @click.stop>
                        <img :src="activeImageUrl" class="w-auto h-auto max-w-full max-h-full rounded-2xl shadow-2xl" />
                    </div>
                </div>
            </Transition>
        </Teleport>
    </div>
</template>

<style scoped>

.article-content :deep(h2) {
    font-size: 2.25rem;
    font-weight: 800;
    color: var(--color-dark);
    margin-top: 4rem;
    margin-bottom: 2rem;
    text-transform: uppercase;
    letter-spacing: -0.01em;
    position: relative;
    display: block;
    line-height: 1.2;
}

.article-content :deep(h3) {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-dark);
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.article-content :deep(p) {
    margin-bottom: 2rem;
    line-height: 1.9;
    font-size: 1.125rem;
    color: rgba(var(--color-dark-rgb), 0.75);
}

.article-content :deep(ul), .article-content :deep(ol) {
    margin-bottom: 2.5rem;
    padding-left: 1.5rem;
}

.article-content :deep(li) {
    margin-bottom: 0.75rem;
    line-height: 1.8;
}

.article-content :deep(ul) {
    list-style-type: none;
}

.article-content :deep(ul li) {
    position: relative;
    padding-left: 1.5rem;
}

.article-content :deep(ul li::before) {
    content: '';
    position: absolute;
    left: 0;
    top: 0.75rem;
    width: 6px;
    height: 6px;
    background-color: var(--color-primary);
    border-radius: 50%;
}

.article-content :deep(blockquote) {
    border-left: 4px solid var(--color-primary);
    padding: 1.5rem 2.5rem;
    margin: 4rem 0;
    font-style: italic;
    font-size: 1.75rem;
    line-height: 1.5;
    background: rgba(var(--color-primary-rgb), 0.03);
    border-radius: 0 2rem 2rem 0;
    color: var(--color-dark);
}

.article-content :deep(img) {
    border-radius: 2.5rem;
    margin: 4rem auto;
    box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.15);
    display: block;
    max-width: 100%;
}

/* Quill alignment support */
.article-content :deep(.ql-align-center) {
    text-align: center;
}
.article-content :deep(.ql-align-right) {
    text-align: right;
}
.article-content :deep(.ql-align-justify) {
    text-align: justify;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
