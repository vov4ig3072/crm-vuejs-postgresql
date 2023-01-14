<template>
    <div>
        <h4>Редагувати</h4>
        <form class="container-category__form" @submit.prevent="submitHandler">
            <div class="input-field col s12">
                <select class="view"  v-model="current">
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
</template>

<script>
import { minValue, required} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import { nullLiteral } from '@babel/types';

export default {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        current: null,
        title: "",
        limit: 100
    }),
    computed:{
        categories(){
            return this.$store.getters.categories
        }
    },
    watch:{
        current(catid){
            const {limit, title, id} = this.categories.find(cat => cat.id === catid)
            this.current
            this.title = title
            this.limit = limit
        }
    },
    async mounted(){      
        M.updateTextFields()

        await this.$store.dispatch('getCategories',{
            token: this.$cookies.get('token'),
            userId: this.$cookies.get('userId')
        })

        if(this.categories[0]){
            const {limit, title, id} = this.categories[0]
            this.current = id
            this.title = title
            this.limit = limit
        }
    },    
    validations: {
        limit: { minValue: minValue(100)},
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
                message: this.$message
            })

            this.limit = 100
        }
    }
}   
</script>