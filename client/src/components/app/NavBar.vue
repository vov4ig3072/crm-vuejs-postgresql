<template>
    <nav class="deep-purple lighten-1 navigation" >
        <div class="nav-wrapper">
            <router-link to="/" class="brand-logo"><span id="user-name">{{ name }}</span> </router-link>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
                <li> {{ $filters.dateFilters(date) }} </li>
                <li> <a href="#" @click.prevent="logout">Log out</a> </li>
            </ul>
        </div>
    </nav>
</template>

<script>

export default {
    data:() => ({
        date: new Date(),
        interval: null
    }),
    computed: {
        name(){
            return this.$store.getters.info.name
        }
    },
    methods: {
        logout(){
            this.$cookies.keys().forEach(cookie => this.$cookies.remove(cookie))
            this.$store.commit('clearInfo')
            this.$router.push("/login?message=logout")
        }
    },
    mounted(){
        this.interval = setInterval(() => {
            this.date = new Date()
        }, 1000)
    },
    beforeDestroy(){
        clearInterval(this.interval)
    }
}
</script>