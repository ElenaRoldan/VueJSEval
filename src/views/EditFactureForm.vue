<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="card-header">
            <h4>Éditer la facture</h4>
          </div>
          <div class="card-body">
            <form>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="date" class="form-label">Date</label>
                  <input v-model="date" class="form-control" id="date">
                </div>
                <div class="col-md-6 mb-3">
                  <label for="numero" class="form-label">Numéro</label>
                  <input v-model="num" type="text" class="form-control" id="numero">
                </div>
              </div>
              
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
              </div>
              
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="emit" class="form-label">Émis le</label>
                  <input v-model="emit" class="form-control" id="emit">
                </div>
               <div class="col-md-6 mb-3">
                    <label for="client" class="form-label">Client</label>
                    <select v-model="client" class="form-select" id="client">
                        <option value="">Sélectionner un client</option>
                        <option value="Jean">Jean</option>
                        <option value="Marc">Marc</option>
                        <option value="Paul">Paul</option>
                    </select>
                    <!-- Pas d input !!!! -->
                  <!-- <label for="client" class="form-label">Client</label>
                  <input v-model="client" type="text" class="form-control" id="client"> -->
                </div>
              </div>

              <!-- SECTION PRESTATION !!!!!! -->

              <div class="mb-4">
                <h5>Les Prestation</h5>
                
                <div class="table-responsive mb-3" v-if="prestations.length > 0">
                  <table class="table table-striped">
                    <thead class="table-dark">
                      <tr>
                        <th>Prestation</th>
                        <th>Quantité</th>
                        <th>Prix unitaire</th>
                        <th>Total</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(prestation, index) in prestations" :key="index">
                        <td>{{ prestation.prestation }}</td>
                        <td>{{ prestation.quantite }}</td>
                        <td>{{ prestation.montant }}€</td>
                        <td><strong>{{ prestation.montantTotal }}€</strong></td>
                        <td>
                          <button 
                            type="button"
                            class="btn btn-outline-danger "
                            @click="supprimerPrestation(index)"
                          >
                            Supprimer
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div class="text-end">
                    <strong>Total générale : {{ total }} € </strong>
                  </div>
                </div>

                <div class="border p-3 rounded">
                  <h6>Ajouter une prestation ! </h6>
                  <div class="row g-2">
                    <div class="col-md-4">
                      <input 
                        v-model="nouvellePrestation.prestation"
                        type="text" 
                        class="form-control" 
                        placeholder="Description de la prestation"
                      >
                    </div>
                    <div class="col-md-2">
                      <input 
                        v-model.number="nouvellePrestation.quantite"
                        type="number" 
                        class="form-control" 
                        min="1"
                      >
                    </div>
                    <div class="col-md-2">
                      <input 
                        v-model.number="nouvellePrestation.montant"
                        type="number" 
                        class="form-control" 
                        step="0.01"
                        min="0"
                      >
                    </div>
                    <div class="col-md-2">
                      <input 
                        :value="nouvellePrestation.quantite * nouvellePrestation.montant"
                        type="text" 
                        class="form-control" 
                        readonly
                      >
                    </div>
                    <div class="col-md-2">
                      <button 
                        type="button"
                        class="btn btn-success w-100"
                        @click="ajouterPrestation"
                      >
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div class="d-flex justify-content-between">
                <button @click="onDelete" type="button" class="btn btn-danger">Supprimer</button>
                <button @click="onSave" type="button" class="btn btn-primary">Enregistrer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFacturesStore } from '../stores/factures.js'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const $router = useRouter()
const $route = useRoute()
const factureStore = useFacturesStore()
const { facture } = storeToRefs(factureStore)
const { getFacture, deleteFacture, patchFacture } = factureStore

const date = ref(null)
const num = ref(null)
const description = ref('')
const emit = ref(null)
const client = ref('')
const prestations = ref([])

const nouvellePrestation = ref({
  prestation: '',
  quantite: 0,
  montant: 0
})
//ID ROUTE RECUEPRERATION
const id = $route.params.id

const total = computed(() => {
  return prestations.value.reduce((sum, p) => sum + p.montantTotal, 0)
})

// Ajouter une prestation
const ajouterPrestation = () => {
  if (nouvellePrestation.value.prestation && nouvellePrestation.value.montant > 0) {
    const total = nouvellePrestation.value.quantite * nouvellePrestation.value.montant
    
    prestations.value.push({
      id: Date.now(),
      prestation: nouvellePrestation.value.prestation,
      quantite: nouvellePrestation.value.quantite,
      montant: nouvellePrestation.value.montant,
      montantTotal: total
    })
  }
}

const supprimerPrestation = (index) => {
  prestations.value.splice(index, 1)
}

const onDelete = async () => {
  console.log('Supprimer la facture')
  await deleteFacture(id)
  $router.push('/')
}

const onSave = async () => {
  const data = {
    date: date.value,
    num: num.value,
    description: description.value,
    emit: emit.value,
    client: client.value,
    prestations: prestations.value
  }
  await patchFacture(id, data)
  $router.push('/')
}

onBeforeMount(async () => {
  await getFacture(id)
  date.value = facture.value.date
  num.value = facture.value.num
  description.value = facture.value.description
  emit.value = facture.value.emit
  client.value = facture.value.client
  prestations.value = facture.value.prestations || []
})
</script>