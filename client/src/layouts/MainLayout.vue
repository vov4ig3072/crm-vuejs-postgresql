<template>
    <div>
        <NavBar />

        <SideBar />
        
        <main class="app-content">
            <div class="app-page">
                <router-view /> 
            </div>
        </main>

        <div class="fixed-action-btn" v-tooltip="'Створити новий запис'">
            <router-link class="btn-floating btn-large blue" to="/new">
            <i class="large material-icons">add</i>
            </router-link>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/app/NavBar'
import SideBar from '@/components/app/SideBar'

export default {
    name: "main-layout",
    async mounted(){
        if( this.$cookies.keys().indexOf('userId') !== -1){
            this.$store.commit('clearInfo')
            const userAuth = {
                userId: this.$cookies.get('userId'),
                token: this.$cookies.get('token')
            }

            if(!Object.keys(this.$store.getters.info).length){
                const user = await this.$store.dispatch('getUserInfo', userAuth)
            }
        }else{
            this.$router.push("/login")
        }
    },  
    components: {
        NavBar, SideBar
    }
}
</script>

