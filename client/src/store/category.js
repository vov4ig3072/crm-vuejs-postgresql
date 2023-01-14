export default {
    state: {
        categories: [],
      },
      getters: {
        categories: (s) => s.categories,
      },
      mutations: {
        setCategories(state, info) {
          state.categories = info;
        }
      },
      actions: {
        async createCategory({},{ userId, token, title, limit, message}){
            try{
                const requestOptions = {
                    method: "POST",
                    body: JSON.stringify({ title, limit, userId }),
                    headers: {
                      "Content-Type": "application/json",
                      'Authorization' : `Bearer ${token}`
                    },
                };

                const response = await fetch('/api/category/create', requestOptions)
                const messageFrom = await response.json()
              
                message(messageFrom.message)

            }catch (e) {
                console.log(e);
            }
        },
        async editCategory({},{ userId, token, title, limit, message}){
          try{
              const requestOptions = {
                  method: "POST",
                  body: JSON.stringify({ title, limit, userId }),
                  headers: {
                    "Content-Type": "application/json",
                    'Authorization' : `Bearer ${token}`
                  },
              };

              const response = await fetch('/api/category/edit', requestOptions)
              const messageFrom = await response.json()
            
              message(messageFrom.message)

          }catch (e) {
              console.log(e);
          }
      },
      async getCategories({commit},{token, userId}){
        try{
          const requestOptions = {
              headers: {
                'Authorization' : `Bearer ${token}`
              },
          };

          const response = await fetch(`/api/category/categories/${userId}`, requestOptions)
          const data = await response.json()

          commit('setCategories', data)
          return data
        }catch (e) {
            console.log(e);
        }
      }
    }
}