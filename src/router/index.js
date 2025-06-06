import { createRouter, createWebHistory } from 'vue-router'
import FacturesListe from '@/views/FacturesListe.vue'
import EditFactureForm from '@/views/EditFactureForm.vue'
import CreateFactureForm from '@/views/CreateFactureForm.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'factures',
      component: () => import('../views/FacturesListe.vue'),
    },
    {
      path: '/facture/edit/:id',
      name: 'factureEdit',
      component:() => import('../views/EditFactureForm.vue'),
    }

   
  ],
})

export default router
