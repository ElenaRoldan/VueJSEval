<template>
    <HeaderApp />
    <main>
        <RouterView/>
    </main>
    <FooterApp />
</template>
<script setup>
import FooterApp from './components/FooterApp.vue';
import HeaderApp from './components/HeaderApp.vue';


</script>