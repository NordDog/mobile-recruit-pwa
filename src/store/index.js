import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userid:'',
    url: 'https://btrx.site/recruitApp/2.0/php/api/ajax.php',
    objs:[],
    object:'',
  },
  getters: {
    getObjs(state){
      return state.objs
    },
    getUrl(state){
      return state.url
    },
    getUserId(state){
      return state.userid
    },
    getObjectId(state){
      return state.object
    }
  },
  mutations: {
    setObjs(state, data){
      state.objs = data
    },
    setUserID(state, data){
      state.userid = data
    },
    setObjectID(state,data){
      state.object = data
    }
  },
  actions: {
  async  loadUserID({commit}){
      var bodyFormData = new FormData();

      bodyFormData.append('action', 'getUserId')
      bodyFormData.append('key', 'brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM')

     await axios({
        method: 'post',
        url: 'https://btrx.site/recruitApp/2.0/php/api/ajax.php',

        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
    })
        .then((response) => {
              
            commit('setUserID',response.data)

           
        }, (error) => {
            console.log(error);
        });



    }
  },
  modules: {
  }
})
