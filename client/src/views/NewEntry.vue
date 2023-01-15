<template>
    <div>

        <div >
            <h4>Новий запис</h4>
            <hr/>
            <Loader v-if="loading"/>
            <p v-else-if="!categories.length" class="center">Відсутні категорії &nbsp;<router-link to="/category">Додати</router-link></p>
            <form v-else @submit.prevent="newEnteryHandler">
                <NewEntryCategory v-if="categories.length" :categories="categories" @checkCategory="emitCheckCategory"/>

                <div class="container-create">
                    <div class="input-field col s6">
                        <input 
                            id="sum-edit" 
                            type="text" 
                            class="validate"
                            v-model.number="sum"
                            :class="{invalid: v$.sum.$dirty && v$.sum.$invalid}"
                        >
                        <label for="sum-edit">Сумма {{ chacked === "income" ? 'надходжень': 'витрат' }}</label>
                        <span 
                            class="invalid-message"
                            v-if="v$.sum.$dirty && v$.sum.$invalid"
                        >Введіть сумму</span>
                    </div>

                    <div class="input-field col s6">
                        <input 
                            id="name-create" 
                            type="text" 
                            class="validate"
                            v-model="comment"
                            :class="{invalid : v$.comment.$dirty && v$.comment.$invalid}"
                        >
                        <label for="name-create">Комментарій</label>
                        <span 
                            class="invalid-message"
                            v-if="v$.comment.$dirty && v$.comment.$invalid"
                        >Введіть комментарій витрат</span>
                    </div>

                    <button class="btn waves-effect waves-light" type="submit" name="action">Створити
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </form>
        </div>
    </div>

</template>

<style >

</style>

<script>
import Loader from '@/components/app/Loader.vue';
import { minValue, required} from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import NewEntryCategory from '@/components/NewEntryCategory.vue';

export default {
    setup:() => ({
        v$: useVuelidate()
    }),
    data:() => ({
        loading: true,
        categories: [],
        catId: null,
        chacked: null,
        sum: 10,
        comment: ''
    }),
    async mounted(){                

        this.categories = await this.$store.dispatch('getCategories',{
            token: this.$cookies.get('token'),
            userId: this.$cookies.get('userId')
        })

        this.loading = false

        setTimeout(() => {M.updateTextFields()},0)
    },
    validations: {
        sum: { minValue: minValue(10)},
        comment: { required }
    },
    methods:{
        async newEnteryHandler(){
            if(this.v$.$invalid){
                this.v$.$touch()
                return
            }

            const message = await this.$store.dispatch('newEntery', {
                categoryId: this.chacked === 'income' ? null : this.catId,
                chacked: this.chacked,
                sum: this.sum,
                comment: this.comment,
                token: this.$cookies.get('token'),
                userId: this.$cookies.get('userId'),
            })

            this.sum = 10
            this.comment = ''

            this.$message(message.message)
        },
        emitCheckCategory(data){
            const {catId, chacked} = data
            this.catId = catId
            this.chacked = chacked
        }
    },
    components: {
        NewEntryCategory,
        Loader
    }
}
</script>