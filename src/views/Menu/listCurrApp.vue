<template>
<v-container>

    <v-sheet elevation="1" class="pa-3 mb-3 d-flex ">
        <v-icon
                large
                color="primary"
                @click="$router.back()"
        >
            mdi-chevron-left
        </v-icon>
        <v-spacer></v-spacer>
       <div class="box">
            <p class="text-h6 text-right cuttedText">{{getObjectName}}</p>
            <p class="text-caption text-right">Выбранный объект</p>
        </div>
    </v-sheet >

    <v-sheet elevation="1">
        <v-simple-table>
            <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-left">
                        Название заявки
                    </th>
                    <th class="text-left">
                        в заявке / трудоустроен
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                        v-for="item in vacansy"
                        :key="item.POS_ID"
                        @click= "$router.push('/moreAboutApp/'+item.ID)"
                >
                    <td>{{ item.POS_NAME }}</td>
                    <td>{{ item.REQUIRED+"/"+item.EMPLOYED }}</td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>



    </v-sheet>
    <v-snackbar
      v-model="error"
      :timeout="timeout"
      color="red accent-2"
    >
      {{ textError }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="error = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <v-snackbar
      v-model="success"
      :timeout="timeout"
      color="green accent-2"
    >
      {{ textSuccess }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="success = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</v-container>


</template>
<script>
    import axios from 'axios'
    import { mapGetters } from 'vuex'
export default{
props:['id'],
    created(){
    this.loadVacansyList()
    },
data(){
    return{

        vacansy:[],
        error:false,
        textError:'',
        success: false,
        textSuccess:'',
    }
},
    methods:{
        loadVacansyList(){


            var bodyFormData = new FormData();

            bodyFormData.append('action', 'getAppRows')
            bodyFormData.append('key', 'brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM')
            bodyFormData.append('userid', this.getUserId)
            bodyFormData.append('params', JSON.stringify({filter:{'objct':this.id}}))




            axios({
                method: 'post',
                url: this.getUrl,

                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((response) => {
           
                    if(response.data.apps){
                    var obj =[]
                    obj = response.data.apps
                    const rows = []
           

                    if(obj ){
                        obj.forEach(item => {

                            rows.push({

                                POS_NAME: item.POS_NAME,
                                REQUIRED: item.REQUIRED,
                                EMPLOYED: item.EMPLOYED,
                                ID: item.ID,


                            })
                        })
                    }
                this.vacansy = rows
                    }else{
                    this.error= true
                     this.textError= response.data

                    }


                }, (error) => {
                   console.log(error)
                   
                });

        }



    },
      computed:{
      getObjectName(){
      
        const obj = this.$store.getters.getObjs
        var name = obj.filter(item => item.id == this.id)

        return  name[0].text     
         },
         ...mapGetters([
            'getUrl',
            'getUserId'
         ])
    }

}
</script>
<style lang="sass" scoped>
 p
        padding: 0
        margin:0
 .box 
        display:block
        width: 200px
 .cuttedText 
        display: block
        width: 200px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
               
             



</style>