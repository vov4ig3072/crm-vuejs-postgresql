<template>
   
    <div class="container-new-category">
        <div class="container-category__radio-btns">
            <p>
                <label >
                    <input name="type" type="radio" id="consumption" value="consumption" v-model="chacked"/>
                    <span>Витрати</span>
                </label>
            </p>
            <p>
                <label>
                    <input name="type" type="radio" id="income" value="income" v-model="chacked"/>
                    <span>Надходження</span>
                </label>
            </p>
        </div>
        <div class="input-field col s12">
            <select ref="select" v-model="categoryId">
                <option 
                    v-for="category in categories" 
                    :key="category.id" 
                    :value="category.id"
                    :selected="{selected: true}"
                >
                    {{ category.title }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props:['categories'],
    data: () => ({
        chacked: 'consumption',
        categoryId: '1',
        select: null,
        categories: [],
    }),
    mounted(){                

        this.select = M.FormSelect.init(this.$refs.select)
        if(this.categories[0]){
            this.categoryId = this.categories[0].id
        }
    },
    methods:{
        checkCategory(){
            this.$emit('checkCategory',{chacked: this.chacked, idCat: this.categoryId})
        }
    },
    destroyed(){
        if(this.select && this.select.destroy){
            this.select.destroy()
        }
    }
}
</script>