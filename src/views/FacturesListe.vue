<template>
    <CardFactures :donnees-factures="facturesListe" title="Liste des Factures" />
</template>

<script setup>
import { ref, provide } from 'vue'
import { onBeforeMount } from 'vue'
import { useFacturesStore } from '../stores/factures.js'
import { storeToRefs } from 'pinia'
import CardFactures from '@/components/CardFactures.vue'
// import { onMounted } from 'vue'
const factureStore = useFacturesStore()
const { facturesListe  } = storeToRefs(factureStore)
const { getFactures } = factureStore
// const { getGames } = gameStore


onBeforeMount(async () => {
  // on appelle la liste des jeux depuis l'API
  await getFactures()
  // on appelle l'utilisateur depuis l'API
})
</script>

<style scoped>
.grid-game {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
</style>