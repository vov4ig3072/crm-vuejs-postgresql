export default {
    state: {
      
    },
    getters: {
    },
    mutations: {

    },
    actions: {
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
        },
        async getOutcome({},{userId, token}){
            try{
                const requestOptions = {
                    headers: {
                    'Authorization' : `Bearer ${token}`
                    },
                };
        
                const response = await fetch(`/api/new-entery/get-outcome/${userId}`, requestOptions)
                return await response.json()
            }catch (e){
                return e.message
            }
        }
    }
  }
