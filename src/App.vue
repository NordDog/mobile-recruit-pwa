<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <span class="text-h5">{{ this.$route.name }}</span>
        <!-- <span class="text-h5">Описание вакансии</span> -->
      </div>
      

      <v-spacer></v-spacer>

      <v-img src='./assets/logo.png' aspect-ratio="5" class="img_logo" />
    </v-app-bar>

    <v-main>
      <router-view />
      <!-- <pre>
     {{this.$route}}
     </pre> -->
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'App',
 created(){
  this.loadUserID()
},

  data: () => ({
  
  }),
  methods:{
    ...mapActions([
      'loadUserID'
    ])

  },
  computed:{
    ...mapGetters([
      'getUserId'
    ])
  }
 
};
</script>
<style lang="sass" scoped>
    .img_logo
        width: 120px
        max-width: 100px
        
</style>  