<template>
<div>
    <button :class="`btn btn-${props.variant} btn-${props.size}`">
        <i v-if="props.iconLeft" :class="props.iconLeft"></i>
        <slot ></slot>
        <i v-if="props.iconRight" :class="props.iconRight"></i>
    </button>

</div>
</template>
<script setup>
const props = defineProps({
    iconLeft: String, 
    iconRight: String, 
    variant: {
        type: String, 
        default: 'primary'
    },
    size: {
        type: String, 
        default: 'md'
    }
})

</script>