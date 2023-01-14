export default {
  state: {
    info: {},
  },
  getters: {
    info: (s) => s.info,
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state){
        state.info = {}
    }
  },
  actions: {
    async getUserInfo({ commit }, { userId, token }) {
        try{
            const response = await fetch(`/api/user/get-user-info/${userId}`,{
                headers:{
                    'Authorization' : `Bearer ${token}`
                }
            })
            
            if(!response.ok){
              const error = await response.json()
              throw new Error(error.message)
            }
            const data = await response.json()

            commit("setInfo", data)

        }catch (e){
            commit('clearInfo')
            console.log(e)
        }
    },
  },
  logout(){
      commit("clearInfo")
  }
};
