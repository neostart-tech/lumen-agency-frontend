<script setup>
import { useServiceStore } from '~~/stores/service';

const serviceStore = useServiceStore();
const config = useRuntimeConfig();

const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    const base = config.public.storageBase || 'http://localhost:8000/storage';
    return `${base}/${path}`.replace(/([^:]\/)\/+/g, "$1");
};

const reasons = [
    { title: "Équipe professionnelle", desc: "Des experts qualifiés à votre service.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.006A3.42 3.42 0 0112 2.75l.219.012a3.42 3.42 0 011.946 1.006 3.42 3.42 0 004.805 0 3.42 3.42 0 01.946 1.006l.012.219a3.42 3.42 0 01-1.006 1.946 3.42 3.42 0 000 4.805 3.42 3.42 0 011.006 1.946l-.012.219a3.42 3.42 0 01-.946 1.006 3.42 3.42 0 00-4.805 0 3.42 3.42 0 01-1.946 1.006l-.219.012a3.42 3.42 0 01-1.946-1.006 3.42 3.42 0 00-4.805 0 3.42 3.42 0 01-.946-1.006l-.012-.219a3.42 3.42 0 011.006-1.946 3.42 3.42 0 000-4.805 3.42 3.42 0 01-1.006-1.946l.012-.219a3.42 3.42 0 01.946-1.006 3.42 3.42 0 000-4.805z" },
    { title: "Service rapide", desc: "Une réactivité immédiate pour vos urgences.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { title: "Accompagnement personnalisé", desc: "Chaque client est unique, nos solutions aussi.", icon: "M14 10h.01M10 14h.01M12 10.01H12M12 14.01H12M12 11.01H12M12 13.01H12 M12 22a9 9 0 110-18 9 9 0 010 18z" },
    { title: "Disponibilité", desc: "À votre écoute 7j/7 pour tous vos besoins.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const heroVisible = ref(false);
const heroSection = ref(null);

onMounted(() => {
    serviceStore.fetch();
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                heroVisible.value = true;
            } else {
                heroVisible.value = false;
            }
        });
    }, { threshold: 0.2 });

    if (heroSection.value) observer.observe(heroSection.value);
});
</script>


<template>
    <div>
        <!-- Hero Section -->
        <section ref="heroSection" class="relative h-[100vh] min-h-[600px] flex items-center overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img src="/images/hero-main.png" alt="Voyage et Événementiel Luxury"
                    class="w-full h-full object-cover brightness-[0.7] transform scale-105 transition-transform duration-10000 ease-linear" />
                <div class="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent"></div>
            </div>

            <div class="container mx-auto px-4 md:px-8 relative z-10 pt-20">
                <div class="max-w-5xl space-y-8 animate-fade-in">
                    <div
                        class="block w-fit py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-sm reveal-on-scroll">
                        Expertise & Excellence
                    </div>

                    <div class="relative inline-block">
                        <!-- Motion Line Animation -->
                        <div
                            class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-0.5 bg-primary/30 overflow-hidden pointer-events-none z-0">
                            <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
                        </div>

                        <h1
                            class="relative z-10 text-2xl sm:text-3xl md:text-5xl font-semibold text-white uppercase tracking-normal leading-[1.2] flex flex-col">
                            <span class="block overflow-hidden py-1">
                                <span class="inline-block opacity-0"
                                    :class="{ 'animate-title-reveal delay-100': heroVisible }">Votre partenaire
                                    en</span>
                            </span>
                            <span class="block overflow-hidden py-1">
                                <span class="inline-block opacity-0 flex flex-wrap gap-x-3"
                                    :class="{ 'animate-title-reveal delay-500': heroVisible }">
                                    <span class="relative">
                                        <span class="text-primary font-bold">voyage</span>
                                        <!-- Mini Burst Animation -->
                                        <span v-if="heroVisible"
                                            class="absolute -top-2 -right-2 w-4 h-4 text-primary animate-burst opacity-0 pointer-events-none">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" />
                                            </svg>
                                        </span>
                                    </span>
                                    et
                                    <span class="relative">
                                        <span class="text-primary font-bold">événementiel</span>
                                        <span v-if="heroVisible"
                                            class="absolute -top-2 -right-2 w-4 h-4 text-primary animate-burst delay-700 opacity-0 pointer-events-none">
                                            <svg viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 0l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z" />
                                            </svg>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </h1>
                    </div>

                    <p class="text-xl md:text-2xl text-white max-w-3xl font-light leading-relaxed">
                        Nous accompagnons particuliers et entreprises dans leurs projets de mobilité et d'organisation
                        globale pour un succès garanti et sans stress.
                    </p>

                    <div class="flex flex-col sm:flex-row items-center gap-5 pt-4">
                        <NuxtLink to="/contact?type=devis"
                            class="w-full sm:w-auto bg-primary hover:bg-accent text-white px-8 py-3.5 rounded-full font-medium uppercase tracking-wider transition-all duration-300 shadow-xl shadow-primary/30 text-center text-sm">
                            Demander un devis
                        </NuxtLink>
                        <NuxtLink to="/contact"
                            class="w-full sm:w-auto border border-white/20 hover:bg-white/10 text-white px-8 py-3.5 rounded-full font-medium uppercase tracking-wider backdrop-blur-sm transition-all duration-300 text-center text-sm">
                            Nous contacter
                        </NuxtLink>
                    </div>
                </div>
            </div>

            <!-- Scroll Indicator -->
            <div class="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block">
                <div class="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div class="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>

        <!-- Services Section -->
        <section class="relative py-20 md:py-32 bg-light overflow-hidden">
            <!-- Animated Flying Planes Background Swarm -->
            <div class="absolute inset-0 pointer-events-none opacity-30 z-0">
                <div v-for="n in 12" :key="n" :class="[`animate-plane-${(n % 3) + 1}`]" :style="{
                    top: (n - 1) * 8 + '%',
                    animationDelay: (n - 1) * 1.5 + 's',
                    left: n % 2 === 0 ? '-10%' : '110%'
                }" class="absolute opacity-0">
                    <svg :class="n % 2 === 0 ? 'w-6 h-6 md:w-8 md:h-8' : 'w-4 h-4 md:w-6 md:h-6'"
                        class="text-primary/50" fill="currentColor" viewBox="0 0 24 24">
                        <path
                            d="M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z" />
                    </svg>
                </div>
            </div>

            <div class="container mx-auto relative z-10 px-0"> <!-- Removed generic px-4 to allow edge-to-edge marquee on mobile, we will add px back where needed -->
                <div class="flex flex-col items-center text-center mb-16 md:mb-20 px-4 reveal-on-scroll">
                    <div
                        class="block w-fit py-1 px-4 bg-primary/10 border-l-4 border-primary text-primary text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-6 backdrop-blur-sm">
                        Nos Solutions
                    </div>
                    <h3 class="text-2xl md:text-3xl font-semibold text-dark uppercase tracking-wide">
                        Services sur Mesure d'Excellence
                    </h3>
                    <div class="w-16 h-0.5 bg-primary/30 mt-8"></div>
                </div>

                <!-- Skeleton Loader -->
                <div v-if="serviceStore.loading && serviceStore.services.length === 0" class="flex overflow-hidden gap-6 px-4 md:px-8">
                    <div v-for="i in 4" :key="i" class="w-[240px] md:w-[280px] h-[320px] md:h-[380px] bg-dark/5 animate-pulse shrink-0 border border-dark/10"></div>
                </div>

                <!-- Scrolling Marquee of Service Cards -->
                <div v-else-if="serviceStore.services.length > 0" class="flex relative w-full overflow-hidden group pb-8 pt-4">
                    <!-- First Block -->
                    <div class="flex shrink-0 gap-6 md:gap-8 px-3 md:px-4 animate-marquee group-hover:[animation-play-state:paused]">
                        <NuxtLink v-for="service in serviceStore.services" :key="`orig-${service.id}`" to="/services"
                            class="group/card relative w-[240px] md:w-[280px] h-[320px] md:h-[380px] shrink-0 cursor-pointer border-t border-r border-dark/10 hover:border-primary/50 transition-all duration-700 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-3">
                            <!-- Image Background -->
                            <img v-if="service.image" :src="getImageUrl(service.image)" :alt="service.titre" class="absolute inset-0 w-full h-[65%] object-cover transition-transform duration-[2s] group-hover/card:scale-110" />
                            <div v-else class="absolute inset-0 w-full h-[65%] bg-dark/5 flex items-center justify-center">
                                <span class="text-dark/20 text-xs tracking-widest uppercase">Aperçu</span>
                            </div>
                            
                            <!-- Content Bottom -->
                            <div class="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-6 md:p-8 flex items-center z-10 transition-colors duration-500 group-hover/card:bg-primary">
                                <!-- Top Accent Line -->
                                <div class="absolute top-0 left-0 h-[2px] bg-primary w-0 group-hover/card:w-full transition-all duration-700 ease-out group-hover/card:bg-white/30"></div>
                                
                                <h4 class="text-xs md:text-sm font-medium text-dark uppercase tracking-[0.15em] leading-relaxed group-hover/card:text-white transition-colors duration-500 w-[85%]">
                                    {{ service.titre }}
                                </h4>
                                <!-- Arrow right -->
                                <div class="absolute right-6 opacity-0 -translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-500 delay-100">
                                    <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>

                    <!-- Duplicated Block for Infinite Scroll -->
                    <div class="flex shrink-0 gap-6 md:gap-8 px-3 md:px-4 animate-marquee group-hover:[animation-play-state:paused]">
                        <NuxtLink v-for="service in serviceStore.services" :key="`dup-${service.id}`" to="/services"
                            class="group/card relative w-[240px] md:w-[280px] h-[320px] md:h-[380px] shrink-0 cursor-pointer border-t border-r border-dark/10 hover:border-primary/50 transition-all duration-700 bg-white overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-3">
                            <!-- Image Background -->
                            <img v-if="service.image" :src="getImageUrl(service.image)" :alt="service.titre" class="absolute inset-0 w-full h-[65%] object-cover transition-transform duration-[2s] group-hover/card:scale-110" />
                            <div v-else class="absolute inset-0 w-full h-[65%] bg-dark/5 flex items-center justify-center">
                                <span class="text-dark/20 text-xs tracking-widest uppercase">Aperçu</span>
                            </div>
                            
                            <!-- Content Bottom -->
                            <div class="absolute bottom-0 left-0 right-0 h-[35%] bg-white p-6 md:p-8 flex items-center z-10 transition-colors duration-500 group-hover/card:bg-primary">
                                <!-- Top Accent Line -->
                                <div class="absolute top-0 left-0 h-[2px] bg-primary w-0 group-hover/card:w-full transition-all duration-700 ease-out group-hover/card:bg-white/30"></div>
                                
                                <h4 class="text-xs md:text-sm font-medium text-dark uppercase tracking-[0.15em] leading-relaxed group-hover/card:text-white transition-colors duration-500 w-[85%]">
                                    {{ service.titre }}
                                </h4>
                                <!-- Arrow right -->
                                <div class="absolute right-6 opacity-0 -translate-x-4 group-hover/card:opacity-100 group-hover/card:translate-x-0 transition-all duration-500 delay-100">
                                    <svg class="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </section> 
        <!-- Why Choose Us Section -->
        <section class="py-20 md:py-32 bg-dark">
            <div class="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16 md:gap-24">
                <div class="w-full lg:w-1/2 space-y-6 reveal-on-scroll">
                    <h2 class="text-xs font-medium text-primary uppercase tracking-[0.2em]">Excellence</h2>
                    <h3 class="text-2xl md:text-3xl font-semibold text-white uppercase tracking-wide">Pourquoi nous
                        choisir ?</h3>
                    <p class="text-white/90 text-base leading-relaxed max-w-xl font-light">
                        Chez Lumen Agency, nous ne nous contentons pas de remplir une mission. Nous créons des relations
                        durables basées sur la confiance, l'efficacité et la perfection opérationnelle.
                    </p>
                    <div class="pt-6">
                        <NuxtLink to="/a-propos"
                            class="group flex items-center gap-4 text-white hover:text-primary transition-all font-semibold uppercase tracking-widest text-sm">
                            En savoir plus sur nous
                            <span class="w-12 h-px bg-white/20 group-hover:bg-primary transition-all"></span>
                        </NuxtLink>
                    </div>
                </div>

                <div class="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                    <div v-for="(reason, index) in reasons" :key="reason.title"
                        class="p-8 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-primary hover:-translate-y-4 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 group reveal-on-scroll"
                        :class="`delay-${(index % 2) * 100 + 200}`">
                        <div
                            class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    :d="reason.icon" />
                            </svg>
                        </div>
                        <h4 class="text-sm md:text-base font-medium text-white uppercase tracking-wide mb-3 group-hover:text-primary transition-colors">
                            {{ reason.title }}
                        </h4>
                        <p class="text-white/90 text-sm leading-relaxed font-light group-hover:text-white transition-colors">
                            {{ reason.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
@keyframes marquee {
    0% {
        transform: translateX(0%);
    }
    100% {
        transform: translateX(-100%);
    }
}

.animate-marquee {
    animation: marquee 35s linear infinite;
}

@keyframes plane-1 {
    0% {
        transform: translate(-100px, -100px) rotate(45deg);
        opacity: 0;
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        transform: translate(120vw, 80vh) rotate(45deg);
        opacity: 0;
    }
}

@keyframes plane-2 {
    0% {
        transform: translate(120vw, 20vh) rotate(-135deg);
        opacity: 0;
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        transform: translate(-100px, 40vh) rotate(-135deg);
        opacity: 0;
    }
}

@keyframes plane-3 {
    0% {
        transform: translate(-100px, 100vh) rotate(30deg);
        opacity: 0;
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        transform: translate(120vw, -20vh) rotate(30deg);
        opacity: 0;
    }
}

.animate-plane-1 {
    animation: plane-1 8s linear infinite;
}

.animate-plane-2 {
    animation: plane-2 10s linear infinite;
}

.animate-plane-3 {
    animation: plane-3 12s linear infinite;
}

/* Global animations are now in main.css */

.animate-fade-in {
    animation: fade-in 1s ease-out forwards;
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Background image ken burns effect */
section:first-of-type img {
    animation: ken-burns 20s infinite alternate;
}

@keyframes ken-burns {
    from {
        transform: scale(1.05) translate(0, 0);
    }

    to {
        transform: scale(1.15) translate(-2%, -2%);
    }
}
</style>