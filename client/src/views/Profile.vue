<template>
    <div>
        <h4> {{ $filters.localize("Content_Profile") }}</h4>
        <hr />

        <form class="col" @submit.prevent="submitHandler" :key="info">
            <div class="row">
                <div class="input-field col s6">
                    <input 
                        id="user_name" 
                        type="text" 
                        class="validate" 
                        v-model="name"
                        :class="{ invalid: v$.name.$dirty && v$.name.$invalid }"
                    />
                    <label for="last_name">Ім`я користувача</label>
                    <span
                        class="invalid-message"
                        v-if="v$.name.$dirty && v$.name.$invalid"
                        >Поле не повинне бути порожнім</span
                    >
                </div>
            </div>

            <div class="row">
                <div class="input-field col s6">
                    <input 
                        id="user_salary" 
                        type="text" 
                        class="validate" 
                        v-model="salary"
                        :class="{ invalid: v$.salary.$dirty && v$.salary.$invalid }"
                    />
                    <label for="last_name">Поточний рахунок </label>
                    <span
                        class="invalid-message"
                        v-if="v$.salary.$dirty && v$.salary.$invalid"
                        >Значення має бути більшим {{ v$.salary.minValue.$params.min }}</span
                    >
                </div>
            </div>

            <div class="switch">
                <label>
                    English
                    <input type="checkbox" v-model="isUaLocale"/>
                    <span class="lever"></span>
                    Українська
                </label>
            </div>

            <button
                class="btn waves-effect waves-light"
                type="submit"
                name="action"
            >
                Змінити
                <i class="material-icons right">send</i>
            </button>
        </form>
    </div>
</template>

<style scoped>
    .switch {
        margin-bottom: 2rem;
    }
</style>

<script>
import { useVuelidate } from '@vuelidate/core'
import { required, minValue } from '@vuelidate/validators'

export default {
    name: 'profile',
    setup(){
        return {v$: useVuelidate()}
    },
    data: () => ({
        name: '',
        salary: 0,
        isUaLocale: true,
        locale: ''
    }),
    computed: {
        info(){
            return this.$store.getters.info
        }
    },watch:{
        isUaLocale(value){
            value ? this.locale = 'ua-UA' : this.locale = 'en-US'
        },
        info(){
            this.renderData()
        }
    },
    mounted() {
        if(this.info.name){
            this.renderData()
        }
        
    },
    validations: {
        name: { required },
        salary: { required, minValue: minValue(100) },
    },
    methods: {
        async submitHandler(){
            if(this.v$.$invalid){
                this.v$.$touch()
                return
            }
            
            const message = await this.$store.dispatch('updateUserInfo', {
                token: this.$cookies.get('token'),
                userId: this.$cookies.get('userId'),
                name: this.name,
                salary: this.salary,
                locale: this.locale
            })
            this.$message(message.message)
            M.updateTextFields()
        },
        renderData(){
            this.name = this.info.name
            this.salary = this.info.salary
            this.locale = this.info.locale || 'ua-UA'
            this.isUaLocale = this.locale === 'ua-UA'

            setTimeout(() => {
                M.updateTextFields()
            },0)
        }
    }
}
</script>
