<template>
    <div>
        <h4>Історія</h4>
        <hr/>

        <div>
            <div style="height: 300px">

            </div>
            
            <Loader v-if="loading" />

            <p v-else-if="!historyList.length" class="center">Історія відсутня.<router-link to="/new">Додайте запис</router-link></p>

            <section  v-else>
                <HistoryTable :list="historyList"/>
            </section>
            
        </div>
    </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
import HistoryTable from '../components/HistoryTable.vue'

export default {
    name: 'history',
    data: () => ({
        loading: true,
        historyList: [],
    }),
    async mounted(){
        const income = await this.$store.dispatch('getIncome',{ token: this.$cookies.get('token'), userId: this.$cookies.get('userId') })
        const outcome = await this.$store.dispatch('getOutcome',{ token: this.$cookies.get('token'), userId: this.$cookies.get('userId') })
        const categories = await this.$store.dispatch('getCategories',{ token: this.$cookies.get('token'), userId: this.$cookies.get('userId') })
        
        this.historyList = outcome
            .concat(income)
            .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map(history => {
                const date = new Date(history.createdAt)
                const category = history.categoryId ? categories.find(c => c.id === history.categoryId ).title : ''
                const type = history.categoryId ? 'Витрати' : 'Дохід'
                const className = history.categoryId ? 'red darken-4 white-text' : 'green accent-4'
                return {
                    ...history,
                    date,
                    category,
                    type,
                    className
                }
            })
        
            this.loading = false
    },
    methods:{},
    components: { HistoryTable, Loader }
}
// new Date(a.createdAt).toLocaleDateString()
</script>