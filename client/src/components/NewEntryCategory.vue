<template>
    <div class="container-new-category">
        <div class="container-category__radio-btns">
            <p>
                <label >
                    <input name="type" type="radio" id="outcome" value="outcome" v-model="chacked"/>
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
        <div class="input-field col s12" >
            <select ref="select" v-model="current" >
                <option 
                    v-for="(category) of categories" 
                    :key="category.id" 
                    :value="category.id"
                >
                    {{ category.title }}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        categories:{
            type: Array,
            default(){
                return []
            }
        }
    },
    data: () => ({
        chacked: 'outcome',
        current: null,
        select: null,
    }),
    watch:{
        current(){
            this.$emit('checkCategory',{chacked: this.chacked, catId: this.current}) 
        },
        chacked(value){
            this.$emit('checkCategory',{chacked: this.chacked, catId: this.current})   
            if(value === "outcome"){
                this.$refs.select.disabled = false
                this.select = M.FormSelect.init(this.$refs.select)
            }else{
                this.$refs.select.disabled = true
                this.select = M.FormSelect.init(this.$refs.select)
            }
        }
    },
    created(){
        if(this.categories[0]){
            this.current = this.categories[0].id
        }
    },
    mounted(){

        this.select = M.FormSelect.init(this.$refs.select)
        this.$emit('checkCategory',{chacked: this.chacked, catId: this.current})   
    },
    destroyed(){
        if(this.select && this.select.destroy){
            this.select.destroy()
        }
    }
}
</script>