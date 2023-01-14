<template>
    <div class="form-auth deep-purple lighten-5">
        <h5>Registration to HOME CRM</h5>
        <form @submit.prevent="submitHandler">
            <div class="input-field">
                <input 
                    id="email" 
                    type="text" 
                    class="validate"
                    v-model="email"
                    :class="{invalid: v$.email.$dirty && v$.email.$invalid}"
                >
                <label for="email">Email </label>

                <span class="invalid-message" v-if="v$.email.$dirty && v$.email.required.$invalid">{{ messageRequired }}</span>
                <span class="invalid-message" v-else-if="v$.email.$dirty && v$.email.$invalid">{{ this.v$.email.email.$message }}</span>
            </div>
            <div class="input-field">
                <input 
                    id="password" 
                    type="password" 
                    class="validate"
                    v-model="password"
                    :class="{invalid: v$.password.$dirty && v$.password.$invalid}"
                >
                <label for="password">Password</label>

                <span class="invalid-message" v-if="v$.password.$dirty && v$.password.required.$invalid">{{ messageRequired }}</span>
                <span class="invalid-message" v-else-if="v$.password.$dirty && v$.password.$invalid">{{ this.v$.password.minLength.$message }}</span>
            </div>
            <div class="input-field">
                <input 
                    id="userName" 
                    type="text" 
                    class="validate"
                    v-model="userName"
                    :class="{invalid: v$.userName.$dirty && v$.userName.$invalid}"
                >
                <label for="confirmPassword">Name</label>

                <span class="invalid-message" v-if="v$.userName.$dirty && v$.userName.required.$invalid">{{ messageRequired }}</span>

            </div>
            <button class="btn deep-purple lighten-1" type="submit">Registration
                <i class="material-icons right">send</i>
            </button>
        </form>

        <p class="reg-paragraph">Have account? &nbsp;<router-link to="/login">LogIn</router-link></p>
    </div>
</template>

<script>
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, } from '@vuelidate/validators'

export default {
    name: "registration",
    setup: () => ({
       v$: useVuelidate()
    }),
    data: () => ({
        email: "",
        password: "",
        userName: "",
        messageRequired: "Поле обов'язкове до заповнення"
    }),
    validations: {
        email: { required, email },
        password: { required, minLength: minLength(6)},
        userName: { required }
    },
    methods: {
        async submitHandler(){
            if(this.v$.$invalid ){
                this.v$.$touch()
                return
            }

            const formData ={ 
                email: this.email,
                password:this.password,
                name: this.userName
            }

            const requestOptions = {
                method: "POST",
                body: JSON.stringify({...formData}),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            await fetch("/api/user/registration", requestOptions)
            .then(response => response.json())
            .then(data => {
                if('error' in data){
                    this.$error(data['error'])
                }else{
                    this.$cookies.set('token', data.token)
                    this.$cookies.set('userId', data.userId)

                    this.$router.push("/")
                }
            })
            .catch(e => console.log(e))
            
        }
    }

}
</script>