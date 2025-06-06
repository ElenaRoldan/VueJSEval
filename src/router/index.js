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
      component: FacturesListe,
    },
    {
      path: '/facture/edit/:id',
      name: 'factureEdit',
      component: EditFactureForm,
    }

   
  ],
})

export default router
