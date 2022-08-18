import vuetify from './plugins/vuetify'

import './registerServiceWorker'
import router from './router'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import Vue from 'vue'

Vue.config.productionTip = false

BX.ready(()=>{
  BX.rest.callMethod('profile',{},async user=>{
    const app = new Vue({
      data(){
        return{
          userid: user.answer.result.ID,
          serverURL: '192.168.200.27'//'btrx.site'
        }
      },
      router,
      store,
      vuetify,
      axios,
      render: h => h(App)
    });
    store.$app = app;
    app.$mount('#app');
  })
})
