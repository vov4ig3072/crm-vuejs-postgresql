<template>
    <div class="home-content__score cyan lighten-2">
        <h4>Pахунок в валюті</h4>
        <span>{{ $filters.currency(salary) }}</span>
        <hr>
        <p v-for="key in this.rate" :key="key.r030">
            <span>{{ $filters.currency(Math.floor(salary / key.rate), key.cc)}}</span>
        </p>
    </div>
</template>

<script>
export default {
    name: 'home-salary',
    props: ['rate'],
    computed:{
        salary(){
            return this.$store.getters.info.salary
        }
    }
}
</script>