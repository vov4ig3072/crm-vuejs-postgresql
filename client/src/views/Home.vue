<template>
    <div>
        <div class="home-title">
            <h4>Рахунок</h4>
            <a class="btn-floating" @click="refresh">
                <i class="material-icons">update</i>
            </a>
        </div>
        <hr />

        <Loader v-if="loading" />
        <div class="home-content" v-else>
            <home-salary :rate="currency" />

            <home-currency :rate="currency" />
        </div>
    </div>
</template>

<script>
import HomeSalary from '../components/HomeSalary.vue'
import HomeCurrency from '../components/HomeCurrency.vue'

export default {
    name: 'home',
    data: () => ({
        loading: true,
        currency: null,
    }),
    async mounted() {
        this.currency = await this.$store.dispatch('fetchCurrency')
        this.loading = false
    },
    methods: {
        async refresh() {
            this.loading = true
            this.currency = await this.$store.dispatch('fetchCurrency')
            this.loading = false
        },
    },
    components: { HomeSalary, HomeCurrency },
}
</script>
