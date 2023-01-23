<template>
    <div>
        <h4>Історія</h4>
        <hr/>

        <div>
            <div >
                <DoughnutChart 
                    :chartData="chartData" 
                    :options="chartOptions"
                    :height="284"
                    v-if="chartData"
                />
            </div>
            
            <Loader v-if="loading" />

            <p v-else-if="!historyList.length" class="center">Історія відсутня.<router-link to="/new">Додайте запис</router-link></p>

            <section  v-else>
                <HistoryTable :list="items" :count="{page, pageSize}"/>
                <div class="input-field col s12 m6 pagination-list">
                    <Paginate 
                        v-if="allItems.length > 1"
                        v-model="page"
                        :page-count="pageCount"
                        :click-handler="changeHandler"
                        :prev-text="'Попередній'"
                        :next-text="'Наступний'"
                        :container-class="'pagination'"
                        :page-class="'waves-effect'"
                        :active-class="'light-blue accent-2'"
                    />
                    <p>Показувати на сторінці:&nbsp;</p>
                    <select ref="select" name="pageCount" id="pageCount" v-model="pageSize">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                
            </section>
        </div>
    </div>
</template>

<script>
import Loader from '@/components/app/Loader.vue'
import HistoryTable from '../components/HistoryTable.vue'
import mixinPagination from '@/mixins/pagination.mixin'
import { DoughnutChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";
import randomcolor from 'randomcolor'

Chart.register(...registerables);

export default {

    name: 'history',
    mixins: [mixinPagination],
    data: () => ({
        loading: true,
        historyList: [],
        select: null,
        chartData: null,
        chartOptions: null
    }),
    watch:{
        pageSize(){ 
            this.setUpPaginations(this.historyList)
            this.page = 1
        }
    },
    async mounted(){
        
        const income = await this.$store.dispatch('getIncome',{ token: this.$cookies.get('token'), userId: this.$cookies.get('userId') })
        const outcome = await this.$store.dispatch('getOutcome',{ token: this.$cookies.get('token'), userId: this.$cookies.get('userId') })
        const categories = await this.$store.dispatch('getCategories',{ token: this.$cookies.get('token'), userId: this.$cookies.get('userId') })
        const chartData = categories.map(c => ({title: c.title, sum: outcome.filter(out => out.categoryId === c.id).reduce((total, next) => total + next.sum , 0)}) )
        
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
        
        this.setUpPaginations(this.historyList)
        this.chartSetup(chartData)
        this.loading = false

        setTimeout(() => this.select = M.FormSelect.init(this.$refs.select),0)
       
    },
    methods: {
        chartSetup(chartData){
            this.chartData = {
                labels: chartData.map(c => c.title),
                datasets: [
                    {
                        data: chartData.map(c => c.sum),
                        backgroundColor: randomcolor({ count: chartData.length, hue: 'blue' }),
                    },
                ],
            }

            this.chartOptions = {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Розхід по категоріям',
                    },
                },
            }
        }
    },
    destroyed(){
        if(this.select && this.select.destroy){
            this.select.destroy()
        }
    },
    components: { HistoryTable, Loader, DoughnutChart }
}
</script>