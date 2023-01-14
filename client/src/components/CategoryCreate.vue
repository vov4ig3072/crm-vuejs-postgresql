<template>
    <div>
        <h4>Створити</h4>
        <form class="container-category__form" @submit.prevent="submitHandler">
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
                    id="limit_create" 
                    type="text" 
                    class="validate"
                    v-model="limit"
                    :class="{invalid : v$.limit.$dirty && v$.limit.$invalid}"
                >
                <label for="limit_create">Ліміт витрат</label>
                <span 
                    class="invalid-message"
                    v-if="v$.limit.$dirty && v$.limit.$invalid"

                >Мінімальний ліміт {{ v$.limit.minValue.$params.min }}</span>
            </div>

            <div>
                <button class="btn waves-effect waves-light" type="submit">Створити
                    <i class="material-icons right">send</i>
                </button>
            </div>
        </form>
    </div>        
</template>

<script>
import { required, minValue} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'

export default {
    setup() {
        return { v$: useVuelidate() };
    },
    data: () => ({
        title: '',
        limit: 100
    }),
    mounted(){
        M.updateTextFields()
    },
    validations: {
        title: { required },
        limit: { minValue: minValue(100)}
    },
    methods: {
        async submitHandler(){
            if(this.v$.$invalid){
                this.v$.$touch()
                return
            }
            
            await this.$store.dispatch('createCategory', {
                title: this.title,
                limit: this.limit,
                userId: this.$cookies.get('userId'),
                token: this.$cookies.get('token'),
                message: this.$message
            })

            this.title = ''
            this.limit = 100
            this.v$.$reset()

            await this.$store.dispatch('getCategories',{
            token: this.$cookies.get('token'),
            userId: this.$cookies.get('userId')
        })
        }
    }
}
</script>