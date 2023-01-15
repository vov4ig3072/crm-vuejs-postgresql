import { createStore } from 'vuex'
import infoUser from './infoUser'
import category from './category'

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
    async newEntery({dispatch},{userId, categoryId, chacked, sum, comment, token}){
      try{
        const requestOptions = {
          method: "POST",
          body: JSON.stringify({categoryId, sum, comment, userId }),
          headers: {
            "Content-Type": "application/json",
            'Authorization' : `Bearer ${token}`
          },
      };

      const response = await fetch(`/api/new-entery/${chacked}`, requestOptions)
      dispatch('getUserInfo',{token, userId})
      return await response.json()
      }catch (e){
        return e.message
      }
    }
  },
  modules: {
    infoUser, category
  }
})
