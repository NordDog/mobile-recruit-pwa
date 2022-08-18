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
                        Объект
                    </th>
                    <th class="text-left">
                        Обновить
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr
                        v-for="item in vacansy"
                        :key="item.id"
                        
                >
                    <td >
                        <div>
                        <p>{{ item.name }}</p>
                         <p class="text-caption"><span class="text-bold">ПРИЧИНА:</span> {{ item.comment }}</p>  
                         </div> 
                    </td>
                    <td class="boxTD"><p class="cuttedTextTD">{{ item.obj }}</p></td>
                     <td class="center" >
                        <v-icon 
                        color="grey darken-2" @click="edit(id,item.id)"> mdi-pencil</v-icon>
                     </td>
                </tr>
                </tbody>
            </template>
        </v-simple-table>



    </v-sheet>




    </v-container>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    props: ['id'],
    created() {
        this.loadVacansyList()
    },
    data() {
        return {

            vacansy: [],

        }
    },
    methods: {
        loadVacansyList() {


            var bodyFormData = new FormData();

            bodyFormData.append('action', 'getAppRowsReject')
            bodyFormData.append('key', 'brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM')
            bodyFormData.append('objId', this.id)
            //bodyFormData.append('params', JSON.stringify({ filter: { 'objct': this.id } }))




            axios({
                method: 'post',
                url:  this.getUrl,

                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((response) => {

                  
                    const obj = response.data
                    const rows = []

                    obj.forEach(item => {

                        rows.push({

                           name: item.name,
                           obj: item.obj,
                            id: item.id,
                            comment: item.comment


                        })
                    })
                    this.vacansy = rows

                }, (error) => {
                    console.log(error);
                });

        },
        edit(id,appid){
            this.$router.push('/addNewApp/'+id+'/appid/'+appid)
        }
        


    },
    computed: {
        getObjectName() {

            const obj = this.$store.getters.getObjs
            var name = obj.filter(item => item.id == this.id)

            return name[0].text
        },
        ...mapGetters([
             'getUrl'
        ])
    }


}
</script>
<style lang="sass" scoped>
    p
        margin: 0
        padding:  0    
    .box 
        display:block
        width: 200px
    .cuttedText 
        display: block
        width: 200px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
    .boxTD 
        display:block
        width: 100px
    .cuttedTextTD 
        display: block
        width: 100px
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis
                          
  
</style>