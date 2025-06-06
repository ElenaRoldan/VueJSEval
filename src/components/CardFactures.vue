<template>
<div class="container mt-4">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2>{{props.title}}</h2>
    <button class="btn btn-primary">
      <i class="fas fa-plus me-2"></i>Ajouter une facture
    </button>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <tbody>
        <tr v-for="item in props.donneesFactures" :key="item.id">
          <td>{{ item.date }}</td>
          <td><span class="badge bg-secondary">{{ item.num }}</span></td>
          <td>{{ item.description }}</td>
          <td>{{ item.emit }}</td>
          <td><strong>{{ item.client }}</strong></td>
          <td class="text-center">
            <div class="btn-group" role="group">
              <button @click="$router.push(`/facture/edit/${item.id}`)" class="btn btn-outline-primary btn-sm me-1">
                <i class="fas fa-edit"></i> Éditer
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>
<script setup>

const props = defineProps({
  donneesFactures : Array, 
  title: String
})

</script>