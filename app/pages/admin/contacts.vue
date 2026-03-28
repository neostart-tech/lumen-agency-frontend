<template>
    <div class="contacts-page min-h-screen bg-[#f8fafc] p-6 space-y-6">
        <!-- Breadcrumb -->
        <AdminBreadcrumb :items="[{ label: 'Dashboard', link: '/admin' }, { label: 'Nos Contacts' }]"
            class="animate-reveal" />

        <div class="page-header animate-reveal reveal-delay-1">
            <div class="header-text">
                <h1>Nos Contacts</h1>
                <p>Gérez les coordonnées de contact de Lumen Agency.</p>
            </div>
        </div>

        <!-- Conteneur Formulaire -->
        <div class="content-card max-w-3xl animate-reveal reveal-delay-2">
            <form @submit.prevent="updateContacts" class="admin-form">
                <div class="form-grid">

                    <!-- Téléphone 1 -->
                    <div class="form-group">
                        <label class="flex items-center gap-2">
                            <component :is="IconPhone" class="icon-brand phone" />
                            Téléphone Principal
                        </label>
                        <input type="text" v-model="form.telephone1" placeholder="Entrez le numéro de téléphone principal" />
                    </div>

                    <!-- Téléphone 2 -->
                    <div class="form-group mt-2">
                        <label class="flex items-center gap-2">
                            <component :is="IconPhone" class="icon-brand phone" />
                            Téléphone Secondaire (Optionnel)
                        </label>
                        <input type="text" v-model="form.telephone2" placeholder="Entrez le numéro de téléphone secondaire" />
                    </div>

                    <!-- Email -->
                    <div class="form-group mt-2">
                        <label class="flex items-center gap-2">
                            <component :is="IconMail" class="icon-brand email" />
                            Email de Contact
                        </label>
                        <input type="email" v-model="form.email" placeholder="Entrez l'adresse email" />
                    </div>

                    <!-- Adresse -->
                    <div class="form-group mt-2">
                        <label class="flex items-center gap-2">
                            <component :is="IconMapPin" class="icon-brand address" />
                            Adresse Physique
                        </label>
                        <textarea v-model="form.adresse" placeholder="Entrez l'adresse physique"
                            rows="3"></textarea>
                    </div>

                </div>

                <div class="form-actions border-top">
                    <button type="submit" class="btn-save" :disabled="contactStore.loading">
                        <component :is="IconSave" class="icon-sm" />
                        {{ contactStore.loading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useContactStore } from '~~/stores/contact'
import Swal from 'sweetalert2'

definePageMeta({ layout: 'admin' })

const contactStore = useContactStore()

// Icons
const IconSave = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' }), h('polyline', { points: '17 21 17 13 7 13 7 21' }), h('polyline', { points: '7 3 7 8 15 8' })])

const IconPhone = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' })])

const IconMail = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('rect', { x: '2', y: '4', width: '20', height: '16', rx: '2' }), h('path', { d: 'm22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' })])

const IconMapPin = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z' }), h('circle', { cx: '12', cy: '10', r: '3' })])

const form = ref({
    telephone1: '',
    telephone2: '',
    email: '',
    adresse: ''
})

onMounted(async () => {
    try {
        const data = await contactStore.fetch()
        if (data) {
            form.value = {
                telephone1: data.telephone1 || '',
                telephone2: data.telephone2 || '',
                email: data.email || '',
                adresse: data.adresse || ''
            }
        }
    } catch (error) {
        console.error('Erreur lors du chargement des contacts:', error)
    }
})

const updateContacts = async () => {
    try {
        await contactStore.update(form.value)

        Swal.fire({
            title: 'Succès !',
            text: 'Les coordonnées de contact ont été mises à jour.',
            icon: 'success',
            confirmButtonColor: 'var(--color-primary)',
            timer: 2000,
            timerProgressBar: true,
            customClass: {
                popup: 'swal2-custom-popup',
                title: 'swal2-custom-title',
                confirmButton: 'swal2-custom-confirm'
            }
        })
    } catch (error: any) {
        Swal.fire({
            title: 'Erreur',
            text: error.message || 'Une erreur est survenue lors de la mise à jour.',
            icon: 'error',
            confirmButtonColor: 'var(--color-primary)'
        })
    }
}
</script>

<style scoped>
.contacts-page {
    display: flex;
    flex-direction: column;
}

.page-header {
    margin-top: 1rem;
    margin-bottom: 2.5rem;
}

.header-text h1 {
    font-size: 1.75rem;
    color: #000000;
    margin: 0;
}

.header-text p {
    color: #64748b;
    font-size: 0.95rem;
    margin-top: 0.25rem;
}

.content-card {
    background: #ffffff;
    border-radius: 20px;
    border: 1px solid #eef2f6;
    padding: 2.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

.form-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.form-group label {
    font-size: 0.85rem;

    color: #334155;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.icon-brand {
    width: 18px;
    height: 18px;
}

.icon-brand.phone {
    color: #10b981;
}

.icon-brand.email {
    color: #3b82f6;
}

.icon-brand.address {
    color: #f43f5e;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group textarea {
    width: 100%;
    padding: 1rem 1.25rem;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    font-size: 0.95rem;
    color: #0f172a;
    outline: none;
    transition: all 0.2s ease;
    background: #f8fafc;

}

.form-group input:focus,
.form-group textarea:focus {
    background: #ffffff;
    border-color: var(--color-primary);
    box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.1);
}

/* Utilities */
.border-top {
    margin-top: 2.5rem;
    padding-top: 2rem;
    border-top: 1px solid #f1f5f9;
    display: flex;
    justify-content: flex-end;
}

.btn-save {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: var(--color-primary);
    color: #ffffff;
    border: none;
    padding: 0.8rem 1.8rem;
    border-radius: 10px;
    font-size: 0.95rem;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-save:hover {
    filter: brightness(1.1);
    box-shadow: 0 4px 12px rgba(var(--color-primary-rgb), 0.2);
    transform: translateY(-1px);
}

.icon-sm {
    width: 18px;
    height: 18px;
}
</style>
