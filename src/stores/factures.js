import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useFacturesStore = defineStore('facture', () => {
  const facturesListe = ref([])
  const facture = ref(null)

  const facturesCount = computed(() => {
    return facturesListe.value?.length || 0
  })

  const getFactures = async () => {
      console.log('VITE_API_URL:', import.meta.env.VITE_API_URL)

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures`)
      facturesListe.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const getFacture = async (id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/factures/${id}`)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const patchFacture = async (id, data) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL}/factures/${id}`, data)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

  const createFacture = async (data) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/factures`, data)
      facture.value = response.data
    } catch (error) {
      console.log(error)
    }
  }

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