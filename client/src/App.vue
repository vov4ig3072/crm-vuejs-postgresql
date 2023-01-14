<template>
    <div id="app">
        <component :is="layout">
            <router-view/>
        </component>
    </div>
 
</template>

<script>
import AuthLayout from './layouts/AuthLayout.vue';
import MainLayout from './layouts/MainLayout.vue';

export default{
    computed: {
        layout(){
            return this.$route.meta.layout + '-layout'
        }
    },
    components: {
        AuthLayout, MainLayout
    }
}
</script>

<style>
@import '~materialize-css/dist/css/materialize.min.css';
@import './assets/index.css';
</style>
