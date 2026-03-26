<script setup>
const services = [
    { title: "Hôtesses d’accueil", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { title: "Événementiel", icon: "M5 3v4M19 3v4M5 11h14M5 15h14M5 19h14M8 3h8a2 2 0 012 2v14a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z" },
    { title: "Assistante aéroportuaire", icon: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8" },
    { title: "Transport & Logistique", icon: "M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1M18 16h1M18 16v-5h-4v5" },
    { title: "Import - Export", icon: "M8 7h12m0 0l-4-4m4 4l-4 4M16 17H4m0 0l4 4m-4-4l4-4" },
    { title: "Agence de voyage", icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
    { title: "Billetterie d’avion", icon: "M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" },
    { title: "Tourisme", icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M12 13a3 3 0 100-6 3 3 0 000 6z" },
];

const reasons = [
    { title: "Équipe professionnelle", desc: "Des experts qualifiés à votre service.", icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-1.006A3.42 3.42 0 0112 2.75l.219.012a3.42 3.42 0 011.946 1.006 3.42 3.42 0 004.805 0 3.42 3.42 0 01.946 1.006l.012.219a3.42 3.42 0 01-1.006 1.946 3.42 3.42 0 000 4.805 3.42 3.42 0 011.006 1.946l-.012.219a3.42 3.42 0 01-.946 1.006 3.42 3.42 0 00-4.805 0 3.42 3.42 0 01-1.946 1.006l-.219.012a3.42 3.42 0 01-1.946-1.006 3.42 3.42 0 00-4.805 0 3.42 3.42 0 01-.946-1.006l-.012-.219a3.42 3.42 0 011.006-1.946 3.42 3.42 0 000-4.805 3.42 3.42 0 01-1.006-1.946l.012-.219a3.42 3.42 0 01.946-1.006 3.42 3.42 0 000-4.805z" },
    { title: "Service rapide", desc: "Une réactivité immédiate pour vos urgences.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
    { title: "Accompagnement personnalisé", desc: "Chaque client est unique, nos solutions aussi.", icon: "M14 10h.01M10 14h.01M12 10.01H12M12 14.01H12M12 11.01H12M12 13.01H12 M12 22a9 9 0 110-18 9 9 0 010 18z" },
    { title: "Disponibilité", desc: "À votre écoute 7j/7 pour tous vos besoins.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
];

const heroVisible = ref(false);
const heroSection = ref(null);

onMounted(() => {
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
        <section ref="heroSection" class="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img src="/images/hero-main.png" alt="Voyage et Événementiel Luxury"
                    class="w-full h-full object-cover brightness-[0.7] transform scale-105 transition-transform duration-10000 ease-linear" />
                <div class="absolute inset-0 bg-gradient-to-r from-dark/80 via-dark/40 to-transparent"></div>
            </div>

            <div class="container mx-auto px-4 md:px-8 relative z-10">
                <div class="max-w-3xl space-y-8 animate-fade-in">
                    <div
                        class="inline-block py-1 px-4 bg-primary/20 border-l-4 border-primary text-primary text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
                        Expertise & Excellence
                    </div>

                    <div class="relative inline-block">
                        <!-- Motion Line Animation -->
                        <div class="absolute -left-10 top-1/2 -translate-y-1/2 w-[calc(100%+80px)] h-0.5 bg-primary/30 overflow-hidden pointer-events-none z-0">
                            <div v-if="heroVisible" class="w-full h-full bg-primary animate-line-sweep"></div>
                        </div>

                        <h1 class="relative z-10 text-3xl md:text-5xl font-semibold text-white uppercase leading-[1.2] tracking-normal flex flex-col">
                            <span class="block overflow-hidden py-1">
                                <span class="inline-block opacity-0" :class="{ 'animate-title-reveal delay-100': heroVisible }">Votre partenaire en</span>
                            </span>
                            <span class="block overflow-hidden py-1">
                                <span class="inline-block opacity-0 flex flex-wrap gap-x-3" :class="{ 'animate-title-reveal delay-500': heroVisible }">
                                    <span class="relative">
                                        <span class="text-primary font-bold">voyage</span>
                                        <!-- Mini Burst Animation -->
                                        <span v-if="heroVisible" class="absolute -top-2 -right-2 w-4 h-4 text-primary animate-burst opacity-0 pointer-events-none">
                                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z"/></svg>
                                        </span>
                                    </span>
                                    et
                                    <span class="relative">
                                        <span class="text-primary font-bold">événementiel</span>
                                        <span v-if="heroVisible" class="absolute -top-2 -right-2 w-4 h-4 text-primary animate-burst delay-700 opacity-0 pointer-events-none">
                                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z"/></svg>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </h1>
                    </div>

                    <p class="text-lg md:text-xl text-white max-w-2xl font-light leading-relaxed">
                        Nous accompagnons particuliers et entreprises dans leurs projets de mobilité et d'organisation
                        globale pour un succès garanti et sans stress.
                    </p>

                    <div class="flex flex-col sm:flex-row items-center gap-5 pt-4">
                        <NuxtLink to="/devis"
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
        <section class="py-20 md:py-32 bg-light">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16 md:mb-20 reveal-on-scroll">
                    <h2 class="text-xs font-medium text-primary uppercase tracking-[0.2em] mb-4">Nos Solutions</h2>
                    <h3 class="text-2xl md:text-3xl font-semibold text-dark uppercase tracking-wide">Services sur Mesure
                    </h3>
                    <div class="w-12 h-0.5 bg-primary/30 mx-auto mt-6"></div>
                </div>

                <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                    <div v-for="(service, index) in services" :key="service.title"
                        class="group p-8 bg-white border border-dark/5 hover:border-primary/20 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 rounded-3xl flex flex-col items-center text-center reveal-on-scroll"
                        :class="`delay-${(index % 4) * 100 + 100}`">
                        <div
                            class="w-16 h-16 bg-light text-primary rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
                                    :d="service.icon" />
                            </svg>
                        </div>
                        <h4 class="text-sm font-normal text-dark uppercase tracking-wide leading-snug">
                            {{ service.title }}
                        </h4>
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
                    <p class="text-white/70 text-base leading-relaxed max-w-xl font-light">
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
                        class="p-8 bg-white/5 border border-white/5 rounded-3xl hover:bg-white/10 transition-colors duration-300 group reveal-on-scroll"
                        :class="`delay-${(index % 2) * 100 + 200}`">
                        <div
                            class="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    :d="reason.icon" />
                            </svg>
                        </div>
                        <h4 class="text-sm md:text-base font-medium text-white uppercase tracking-wide mb-3">
                            {{ reason.title }}
                        </h4>
                        <p class="text-white/60 text-sm leading-relaxed font-light">
                            {{ reason.desc }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
@keyframes line-sweep {
    0% { transform: translateX(-100%); opacity: 0; }
    20% { opacity: 1; }
    80% { opacity: 1; }
    100% { transform: translateX(100%); opacity: 0; }
}

@keyframes title-reveal {
    0% { transform: translateY(100%); opacity: 0; }
    100% { transform: translateY(0); opacity: 1; }
}

@keyframes burst {
    0% { transform: scale(0) rotate(0deg); opacity: 0; }
    50% { transform: scale(1.5) rotate(180deg); opacity: 1; }
    100% { transform: scale(0) rotate(360deg); opacity: 0; }
}

.animate-line-sweep {
    animation: line-sweep 1s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

.animate-title-reveal {
    animation: title-reveal 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
}

.animate-burst {
    animation: burst 0.8s ease-out forwards;
}

.delay-100 { animation-delay: 0.1s; }
.delay-300 { animation-delay: 0.3s; }
.delay-500 { animation-delay: 0.5s; }
.delay-700 { animation-delay: 0.7s; }

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

.animate-fade-in {
    animation: fade-in 1s ease-out forwards;
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