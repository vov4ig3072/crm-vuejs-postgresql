export default {
    state: {
        info: {},
    },
    getters: {
        info: (s) => s.info,
    },
    mutations: {
        setInfo(state, info) {
            state.info = info
        },
        clearInfo(state) {
            state.info = {}
        },
    },
    actions: {
        async getUserInfo({ commit }, { userId, token }) {
            try {
                const response = await fetch(`/api/user/user-info/${userId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    const error = await response.json()
                    throw new Error(error.message)
                }
                const data = await response.json()

                commit('setInfo', data)
            } catch (e) {
                commit('clearInfo')
                console.log(e)
            }
        },
        async updateUserInfo({ dispatch, commit }, { userId, token, name, salary, locale }) {
          try{

            const requestOptions = {
                method: "PUT",
                body: JSON.stringify({ name, salary, locale }),
                headers: {
                  "Content-Type": "application/json",
                  'Authorization' : `Bearer ${token}`
                },
            };
              const response = await fetch(`/api/user/user-info/${userId}`,requestOptions)
              
              if(!response.ok){
                const error = await response.json()
                throw new Error(error.message)
              }
              const data = await response.json()
              
              await dispatch("getUserInfo", {userId, token})
              return data
  
          }catch (e){
              commit('clearInfo')
              console.log(e)
          }
      },
    },
    logout() {
        commit('clearInfo')
    },
}
