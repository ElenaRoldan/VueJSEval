import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useFacturesStore = defineStore('facture', () => {
  // déclarer un tableau vide (qui sera rempli par les données de l'API)
  const facturesListe = ref([])
  const facture = ref(null)

  const facturesCount = computed(() => {
    return facturesListe.value?.length || 0
  })

  

  // faire une nouvelle fonction poru récupérer la liste des jeux
  const getFactures = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures`)
      facturesListe.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // modifier cette fonction pour faire appel à l'api afin de récupérer un jeu
  const getFacture = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // modifier cette fonction pour faire appel à l'api afin de récupérer un jeu
  const patchFacture = async (id, data) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/factures/${id}`, data)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // modifier cette fonction pour faire appel à l'api afin de récupérer un jeu
  const createFacture = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/factures`, data)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  // modifier cette fonction pour faire appel à l'api afin de récupérer un jeu
  const deleteFacture = async (id) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  return {
    facturesListe,
    facture,   
    facturesCount,
    getFacture,
    getFactures,
    patchFacture,
    deleteFacture,
    createFacture,
  }
})