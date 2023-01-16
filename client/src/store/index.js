import { createStore } from 'vuex'
import infoUser from './infoUser'
import category from './category'
import records from './records'

export default createStore({
  state: {
    
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    async fetchCurrency(){
      const data = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json`).then(response => response.json())
       return data.filter(elem => elem.cc === 'USD' || elem.cc === 'EUR' || elem.cc === 'PLN')
    },
    
  },
  modules: {
    infoUser, category, records
  }
})
