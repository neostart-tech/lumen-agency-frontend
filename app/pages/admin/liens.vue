<template>
  <div class="liens-page min-h-screen bg-[#f8fafc] p-6 space-y-6">
    <!-- Breadcrumb -->
    <AdminBreadcrumb :items="[{ label: 'Dashboard', link: '/admin' }, { label: 'Nos Liens' }]" class="animate-reveal" />

    <div class="page-header animate-reveal reveal-delay-1">
      <div class="header-text">
        <h1>Réseaux Sociaux</h1>
        <p>Gérez les liens redirigeant vers vos pages Lumen Agency.</p>
      </div>
    </div>

    <!-- Conteneur Formulaire -->
    <div class="content-card max-w-3xl animate-reveal reveal-delay-2">
      <form @submit.prevent="updateLiens" class="admin-form">
        <div class="form-grid">

          <!-- Ligne Instagram -->
          <div class="form-group">
            <label class="flex items-center gap-2">
              <component :is="IconInstagram" class="icon-brand instagram" />
              Instagram
            </label>
            <input type="url" v-model="form.instagram" placeholder="https://instagram.com/lumen-agency" />
          </div>

          <!-- Ligne Facebook -->
          <div class="form-group mt-2">
            <label class="flex items-center gap-2">
              <component :is="IconFacebook" class="icon-brand facebook" />
              Facebook
            </label>
            <input type="url" v-model="form.facebook" placeholder="https://facebook.com/lumen-agency" />
          </div>

          <!-- Ligne X (Twitter) -->
          <div class="form-group mt-2">
            <label class="flex items-center gap-2">
              <component :is="IconX" class="icon-brand x-twitter" />
              X (Anciennement Twitter)
            </label>
            <input type="url" v-model="form.x" placeholder="https://x.com/lumen-agency" />
          </div>

          <!-- Ligne TikTok -->
          <div class="form-group mt-2">
            <label class="flex items-center gap-2">
              <component :is="IconTiktok" class="icon-brand tiktok" />
              TikTok
            </label>
            <input type="url" v-model="form.tiktok" placeholder="https://tiktok.com/@lumen-agency" />
          </div>

        </div>

        <div class="form-actions border-top">
          <button type="submit" class="btn-save" :disabled="lienStore.loading">
            <component :is="IconSave" class="icon-sm" />
            {{ lienStore.loading ? 'Enregistrement...' : 'Enregistrer les modifications' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, h } from 'vue'
import { useLienStore } from '~~/stores/lien'
import Swal from 'sweetalert2'

definePageMeta({ layout: 'admin' })

const lienStore = useLienStore()

// Icons
const IconSave = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2' }, [h('path', { d: 'M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z' }), h('polyline', { points: '17 21 17 13 7 13 7 21' }), h('polyline', { points: '7 3 7 8 15 8' })])

const IconInstagram = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('rect', { x: '2', y: '2', width: '20', height: '20', rx: '5', ry: '5' }), h('path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' }), h('line', { x1: '17.5', y1: '6.5', x2: '17.51', y2: '6.5' })])

const IconFacebook = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' })])

const IconX = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M4 4l11.733 16h4.267l-11.733-16z' }), h('path', { d: 'M4 20l6.768-6.768m2.46-2.46L20 4' })])

const IconTiktok = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '2', 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, [h('path', { d: 'M9 12a4 4 0 1 0 4 4V2a5 5 0 0 0 5 5' })])

const form = ref({
  instagram: '',
  facebook: '',
  x: '',
  tiktok: ''
})

onMounted(async () => {
  try {
    const data = await lienStore.fetch()
    if (data) {
      form.value = {
        instagram: data.instagram || '',
        facebook: data.facebook || '',
        x: data.x || '',
        tiktok: data.tiktok || ''
      }
    }
  } catch (error) {
    console.error('Erreur lors du chargement des liens:', error)
  }
})

const updateLiens = async () => {
  if (!lienStore.lien?.id) return

  try {
    await lienStore.update(lienStore.lien.id, form.value)

    Swal.fire({
      title: 'Succès !',
      text: 'Vos liens ont été mis à jour avec succès.',
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
.liens-page {
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

.icon-brand.instagram {
  color: #E4405F;
}

.icon-brand.facebook {
  color: #1877f2;
}

.icon-brand.x-twitter {
  color: #000000;
}

.icon-brand.tiktok {
  color: #000000;
}

.form-group input[type="url"] {
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

.form-group input[type="url"]:focus {
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
