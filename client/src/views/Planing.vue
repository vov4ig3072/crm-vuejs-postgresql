<template>
    <div>
        <h4>Планування <span class="right">{{  $filters.currency(this.info.salary)}}</span></h4>
        <hr/>
        <Loader v-if="loading" />
        <p v-else-if="!categories.length" class="center">Відсутні категорії &nbsp;<router-link to="/category">Додати</router-link></p>
        <div v-else>
            <div class="planing-category" v-for="category in categories" :key="category.id">
                <h6 >{{ category.title}} {{ $filters.currency(category.spend) }} of {{  $filters.currency(category.limit)}} </h6>
                <p></p>
                <div class="progress" v-tooltip="category.tooltip" >
                    <div 
                        class="determinate" 
                        :class="category.progressColor" 
                        :style="{width: `${category.persent}%`} "
                    ></div>
                </div>

            </div>
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loader from '@/components/app/Loader.vue';

export default {
    name: "planing",
    data: () => ({
        categories: [],
        loading: true
    }),
    computed:{
        ...mapGetters(['info'])
    },
    async mounted() {
       const categories = await this.$store.dispatch("getCategories", {
            token: this.$cookies.get("token"),
            userId: this.$cookies.get("userId")
        })

        const outcome = await this.$store.dispatch("getOutcome", {
            token: this.$cookies.get("token"),
            userId: this.$cookies.get("userId")
        })

        this.categories = categories.map(cat => {
            const spend = outcome
                .filter(out => out.categoryId === cat.id)
                .reduce((total, out) => total += +out.sum, 0)

            const persent = Math.round(100 * spend / cat.limit)
            const progressColor = persent < 60 ? 'green accent-4' : persent < 90 ? 'yellow darken-2' : 'red accent-4'
            const tooltipValue = cat.limit - spend

            const tooltip = `${tooltipValue < 0 ? 'Перевищення витрат на' : 'Залишилось'} ${this.$filters.currency(Math.abs(tooltipValue))} `
            return{
                ...cat,
                spend,
                persent,
                progressColor,
                tooltip
            }
        })
        this.loading = false
    },
    components: { Loader }
}
</script>