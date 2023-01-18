<template>
    <div>
        <Loader v-if="loading" />
        <p v-else-if="!categories.length" class="center">Додайте першу категорію</p>
        <div v-else>
            <h4>Редагувати</h4>
            <form class="container-category__form" @submit.prevent="submitHandler">
                <div class="input-field col s12">
                    <select ref="select"  v-model="current">
                    <option disabled value="first" v-if="!categories[0]">Create first category</option>
                        <option   
                            v-for="(category) in categories"
                            :key="category.id" 
                            :value="category.id" 
                        >
                            {{ category.title }}
                        </option>
                    </select>
                </div>

                <div class="input-field col s6">
                    <input 
                        id="name-create" 
                        type="text" 
                        class="validate"
                        v-model="title"
                        :class="{invalid : v$.title.$dirty && v$.title.$invalid}"
                    >
                    <label for="name-create">Назва</label>
                    <span 
                        class="invalid-message"
                        v-if="v$.title.$dirty && v$.title.$invalid"
                    >Введіть назву категорії</span>
                </div>

                <div class="input-field col s6">
                    <input 
                        id="limit-edit" 
                        type="text" 
                        class="validate"
                        v-model="limit"
                        :class="{invalid: v$.limit.$dirty && v$.limit.$invalid}"
                    >
                    <label for="limit-edit">Ліміт витрат</label>
                    <span 
                        class="invalid-message"
                        v-if="v$.limit.$dirty && v$.limit.$invalid"
                    >Введіть ліміт</span>
                </div>
                <div>
                    <button class="btn waves-effect waves-light" type="submit">Редагувати
                        <i class="material-icons right">send</i>
                    </button>
                </div>
                
            </form>
        </div>
    </div>
</template>

<script>
import { minValue, required} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import Loader from './app/Loader.vue';

export default {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        loading: true,
        categories: [],
        current: null,
        title: 'No Category',
        limit: 100,
        select: null
    }),
    watch:{
        current(catid){
            const {limit, title} = this.categories.find(cat => cat.id === catid)
            this.title = title
            this.limit = limit
        }
    },
    async mounted(){      
        await this.getCatAddToSellect()
        this.select = M.FormSelect.init(this.$refs.select)

        M.updateTextFields()
    },    
    validations: {
        limit: { required, minValue: minValue(100)},
        title: { required }
    },
    methods: {
        async submitHandler(){
            if(this.v$.$invalid){
                this.v$.$touch()
                return
            }
            
            await this.$store.dispatch('editCategory', {
                title: this.title,
                limit: this.limit,
                userId: this.$cookies.get('userId'),
                token: this.$cookies.get('token'),
                message: this.$message,
                categoryId: this.current
            })

            this.getCatAddToSellect(this.current)
        },
        async getCatAddToSellect(id){
            try{
                this.categories = await this.$store.dispatch('getCategories',{
                    token: this.$cookies.get('token'),
                    userId: this.$cookies.get('userId')
                })

                const cuurentCat = id ? this.categories.find(c => c.id === id)[0] : this.categories[0]

                if(cuurentCat){
                    const {limit, title, id} = cuurentCat
                    this.current = id
                    this.title = title
                    this.limit = limit
                }

                this.loading = false
            }catch (e) {}
            
        }
    },
    components: { Loader },
    destroyed(){
        if(this.select && this.select.destroy){
            this.select.destroy()
        }
    }
}   
</script>