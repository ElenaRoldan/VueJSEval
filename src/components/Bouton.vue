<template>
  <div>
    <button v-bind="$attrs" class="btn text-nowrap" :class="`btn-${variant} btn-${size}`">
      <i v-if="iconLeft" :class="iconLeftClass"></i>
      <slot>Bouton</slot>
      <i v-if="iconRight" :class="iconRightClass"></i>
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'

// on dit à vuejs de ne plus transférer les attributs html par défaut à la balise principale du composant enfant
defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  iconLeft: {
    type: String,
    default: '',
  },
  iconRight: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => {
      return ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'dark'].includes(
        value,
      )
    },
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => {
      return ['sm', 'md', 'lg'].includes(value)
    },
  },
})

const iconRightClass = computed(() => {
  return props.iconRight !== '' ? `fa-solid fa-${props.iconRight} ms-2` : ''
})

const iconLeftClass = computed(() => {
  return props.iconLeft !== '' ? `fa-solid fa-${props.iconLeft} me-2` : ''
})
</script>