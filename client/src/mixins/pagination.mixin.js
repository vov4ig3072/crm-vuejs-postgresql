import _ from 'lodash'

export default {
    data: function(){
        return {
            page: +this.$route.query.page || 1,
            pageSize: 5,
            pageCount: 0,
            allItems: [],
            items: [],
        }
    },
    methods: {
        setUpPaginations(allItems){
            this.allItems = _.chunk(allItems, this.pageSize)
            this.items = this.allItems[this.page - 1] || this.allItems[0]
            this.pageCount = this.allItems.length
        },
        changeHandler(page){    
            this.$router.push(`${this.$route.path}?page=${page}`)
            this.items = this.allItems[page - 1] || this.allItems[0]
        }
    }

}