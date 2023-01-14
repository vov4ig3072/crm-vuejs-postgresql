<template>
    <div>
        <Loader v-if="loading"/>

        <div v-else>
            <h4>Новий запис</h4>
            <hr/>
            <form @submit.prevent="onCheckCategory">
                <NewEntryCategory :categories="categories" @checkCategory="onCheckCategory"/>

                <div class="container-create">
                    <div class="input-field col s6">
                        <input id="first_name" type="text" class="validate">
                        <label for="first_name">Сумма</label>
                    </div>

                    <div class="input-field col s6">
                        <input id="first_name" type="text" class="validate">
                        <label for="first_name">Опис</label>
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
import NewEntryCategory from '@/components/NewEntryCategory.vue';

export default {
    data:() => ({
        loading: true,
        categories: []
    }),
    async mounted(){                
        this.categories = await this.$store.dispatch('getCategories',{
            token: this.$cookies.get('token'),
            userId: this.$cookies.get('userId')
        })

        this.loading = false
    },
    methods:{
        newEnteryHandler(){
            console.log();
        },
        onCheckCategory(data){
            console.log(data); 
        }
    },
    components: {
        NewEntryCategory,
        Loader
    }
}
</script>