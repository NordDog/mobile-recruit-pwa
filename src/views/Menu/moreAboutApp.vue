<template>
  <v-container>
<!--    <div class="titles">-->
<!--      <h2 class="titleText" style="margin-left:0 !important;">{{data.POS_NAME}}</h2>-->
<!--      <img class="label" src="../../public/horizont.png" />-->
<!--    </div>-->

    <v-sheet elevation="1" class="pa-3 d-flex ">
      <v-icon
              large
              color="primary"
              @click="$router.back()"
      >
        mdi-chevron-left
      </v-icon>
      <v-spacer></v-spacer>
      <span class="text-h6 text-right">
          {{data.POS_NAME}}
     </span>
    </v-sheet>

    <v-sheet elevation="1" class="pa-2">
    <div class="fakeForm">
      <v-expansion-panels>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h3>Описание Вакансии</h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content style="text-align: left;" class="pa-2" >
            <h5>Условия</h5>
            <p>{{data.POS_TERMS}}</p>
            <h5>Обязанности</h5>
            <p>{{data.POS_RESP}}</p>
            <h5>Требования</h5>
            <p>{{data.POS_REQ}}</p>
            <h5>Гражданство</h5>
            <p>{{data.POS_CITYZENSHIP}}</p>
            <h5>Образование</h5>
            <p>{{data.POS_EDUCATION}}</p>
            <h5>Пол</h5>
            <p>{{data.POS_MALE}}</p>
            <h5>График работы</h5>
            <p>{{data.SCHEDULE}}</p>
            <h5>Опыт работы</h5>
            <p>{{data.POS_WORK_EXP}}</p>
            <h5>Зарплата за месяц</h5>
            <p>{{data.POS_MONTH_SALARY}}</p>
            <h5>Место работы</h5>
            <p>{{data.POS_DESC}}</p>
            <h5>Адрес</h5>
            <p>{{data.OBJ_ADDR}}</p>
            <h5>Особенности провезда</h5>
            <p>{{data.POS_FEATURES}}</p>

            <div class="d-flex justify-center pa-5">
              <v-btn color="primary" v-if="is_su > 0"  @click="gotoPos()">Изменить требования</v-btn>

            </div>


          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h3>На рассмотрении</h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <div class="d-flex pa-2">
              <v-text-field
                      class="pr-1"
                label="Поиск по ФИО"
                dense
                outlined
                v-model="searchAsp"
              ></v-text-field>
              <v-btn icon @click="filterDial = true">

                <v-icon
                        large
                        color="grey darken-1"
                >
                  mdi-filter 
                </v-icon>


<!--                <img class="filterimg" src="../../public/filter.png" alt="">-->
              </v-btn>
            </div>
            <v-simple-table>
              <tbody>
                <tr
                  v-for="asp in filteredAsps"
                  :key="asp.ID"
                >
                  <td>{{asp.NAME}}</td>
                  <td>
                    <a :href="'tel:'+asp.PHONE">


                      <v-icon
                              large
                              color="grey darken-2"
                      >
                        mdi-phone
                      </v-icon>
                      <!--                      <img class="phoneimg" :class="{unactivephone: !asp.PHONE}" src="../../public/phone.png" alt="">-->
                    </a></td>
                  <td style="width: 50%">
                    <v-select
                      @change="checkStatus(asp.ID, $event)"
                      :items="statuses"
                      item-text="VALUE"
                      item-value="ID"
                      v-model="asp.CURR_STATUS"
                      solo
                      style="margin-bottom: -30px;width: 200px;"
                    ></v-select>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <!--<p class="fakeLink">Добавить сотрудника</p>-->
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            <h3>Принятые</h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content class="pa-2">
            <v-text-field
              label="Поиск по ФИО"
              dense
              outlined
              v-model="searchEmpl"
            ></v-text-field>
            <v-simple-table class="mt-2 mb-2">
              <tbody>
                <tr
                  v-for="empl in filteredEmpls"
                  :key="empl.ID"
                >
                  <td>{{empl.NAME}}</td>
                  <td><a :href="'tel:'+empl.PHONE">
                    <v-icon
                            large
                            color="grey darken-2"
                    >
                      mdi-phone
                    </v-icon>

<!--                    <img class="phoneimg" :class="{unactivephone: !empl.PHONE}" src="../../public/phone.png" alt="">-->
                  </a></td>
                  <td>
                    <v-select
                      @change="checkStatus(empl.ID, $event)"
                      :items="statuses"
                      item-text="VALUE"
                      item-value="ID"
                      v-model="empl.CURR_STATUS"
                      solo
                      style="margin-bottom: -30px;"
                    ></v-select>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <div v-if="is_su > 0" class="d-flex column justify-center pa-5 newAppButtonsDiv"  >
      <v-btn @click="archiver()" color="primary" class="mybtn newPosBtn">Убрать в архив</v-btn>
    </div>
    <v-dialog
      v-model="rejectDial"
      width="300"
    >
      <dialog-content
      v-if="rejectDial"
        :id = emplToDial
        :status = statusToDial
        v-on:close-dialog="rejectDial = false"
      />
    </v-dialog>
    <v-dialog
      v-model="filterDial"
      width="340"
    >
    <v-card>
      <v-card-title>
        <p style="margin-right:auto;" class="text-subtitle2 text-sm-subtitle2">Дополнительный фильтр</p>
        <div class="closebtn" @click="()=>{filterStatus = '';date = '';filterDial = false}">X</div>
      </v-card-title>
      <v-card-text>
        <v-select
          label="Статус"
          :items="statuses"
          item-text="VALUE"
          item-value="ID"
          dense
          outlined
          v-model="filterStatus"
        ></v-select>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="date | dateToLocal"
              label="Дата собеседования"
              readonly
              v-bind="attrs"
              v-on="on"
              dense
              outlined
              append-icon="mdi-close-circle"
              @click:append="()=>{date = ''}"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="ru-RU"
            first-day-of-week="1"
            v-model="date"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date)">
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>
      </v-card-text>
      <v-card-actions style="justify-content: flex-end;">
        <v-btn @click="filterDial = false" color="primary">Искать</v-btn>
      </v-card-actions>
    </v-card>
    </v-dialog>
    </v-sheet>
  </v-container>
</template>

<script>
// import dialogContent from '../components/rejectDialogContent'
import axios from "axios";
import { mapGetters } from 'vuex'
export default {
  name: 'ApplicationInfo',
  props:['id'],
  components:{
    // dialogContent
   },
  data(){
    return{
      rejectDial: false,
      data:{},
      employers:[],
      aspirants:[],
      statuses:[],
      searchAsp:'',
      searchEmpl:'',
      emplToDial:'',
      statusToDial:'',
      filterDial: false,
      modal: false,
      date:'',
      filterStatus:'',
      is_su: false
    }
  },
  methods:{
    /**
     * нада:
     * переход в контакт
     */
   

    getData(){

     let id = this.id
      // let objXMLHttpRequest = new XMLHttpRequest();
      // objXMLHttpRequest.onreadystatechange = () => {
      //   if (objXMLHttpRequest.readyState === 4) {
      //     if (objXMLHttpRequest.status === 200) {
      //       let data = JSON.parse(objXMLHttpRequest.response);
      //       this.data = data.data;
      //       if(this.data.OBJ_MAN.includes(364)) this.is_su = 1;//передавать пользака
      //       this.statuses = data.statuses;
      //       if(data.empls.length>0){
      //         for(let empl of data.empls){
      //           if(Array('422', '2000').includes(empl.CURR_STATUS)) this.employers.push(empl);
      //           else if(!Array('429', '499', '2001').includes(empl.CURR_STATUS)) this.aspirants.push(empl);
      //         }
      //       }
      //     } else {
      //       console.log("Error Code: " + objXMLHttpRequest.status);
      //       console.log("Error Message: " + objXMLHttpRequest.statusText);
      //     }
      //   }
      // };
      //
      // let body = new FormData();
      // body.append("key", "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM");
      // body.append("action", "getAppData");
      // body.append("appid", id);
      // objXMLHttpRequest.open(
      //   "POST",
      //   "https://btrx.site/recruitApp/2.0/php/api/ajax.php",
      //   true
      // );
      // objXMLHttpRequest.send(body);



      let body = new FormData();
      body.append("key", "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM");
      body.append("action", "getAppData");
      body.append("appid", this.id);

      axios({
        method: 'post',
        url: this.getUrl,

        data: body,
        headers: { "Content-Type": "multipart/form-data" },
      })
              .then((response) => {
                const obj = response.data
                //this.statuses = obj.statuses;
                  console.log(obj.data)
                this.data = obj.data;

                      if(this.data.OBJ_MAN.includes(this.getUserId)) this.is_su = 1;//передавать пользака
                      this.statuses = obj.statuses;
                      if(obj.empls.length>0){
                        for(let empl of obj.empls){
                          if(Array('422', '2000').includes(empl.CURR_STATUS)) this.employers.push(empl);
                          else if(!Array('429', '499', '2001').includes(empl.CURR_STATUS)) this.aspirants.push(empl);
                        }
                      }

                // for( var key in obj){
                //   this.items.push({
                //     id:key,
                //     text: obj[key],
                //     icon: 'mdi-domain',
                //     iconRight:'mdi-chevron-right'
                //
                //   })
                //
                // }
              }, (error) => {
                console.log(error);
              });






    },

    archiver(){
      
      let id = this.id;

      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            alert('Заявка помечена как неактивная');        
            //BXMobileApp.UI.Page.close();
          } else {
            console.log("Error Code: " + objXMLHttpRequest.status);
            console.log("Error Message: " + objXMLHttpRequest.statusText);
          }
        }
      };
      let body = new FormData();
      body.append("key", "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM");
      body.append("action", "updateApp");
      body.append("appid", id);
      body.append("fields", JSON.stringify({'AKTUALNA':418}));
      body.append('userid', this.getUserId);
      objXMLHttpRequest.open(
        "POST",
         this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    },

    checkStatus(id, status){
      if('499' == status){
        this.emplToDial = Number(id);
        this.statusToDial = Number(status);
        this.rejectDial = true;
        return;
      } else {
      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            console.log();
          } else {
            console.log("Error Code: " + objXMLHttpRequest.status);
            console.log("Error Message: " + objXMLHttpRequest.statusText);
          }
        }
      };
      let body = new FormData();
      body.append("key", "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM");
      body.append("action", "updateAsp");
      body.append("id", id);
      let fields = {
        STATUS: {ID:status},
      };
      body.append("fields", JSON.stringify(fields));
      objXMLHttpRequest.open(
        "POST",
         this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);
      }
    },

    gotoPos(){

      // let id = this.getParamByName('id'),
      // title = this.getParamByName('title');
      //console.log('/addNewPos/'+this.id+'/vac/'+this.data.POS_ID)
       this.$router.push('/addNewPos/'+this.id+'/vac/'+this.data.POS_ID);

      // BXMobileApp.PageManager.loadPageBlank({
      //   url: "/recruitApp/applications/newPos.php?id=" + id + "&title=" + title + "&posid=" + this.data.POS_ID,
      //   cache: false
      // });

    },
    // gotoCont(contid){
    //   let id = this.getParamByName('id'),
    //   title = this.getParamByName('title');
    //   BXMobileApp.PageManager.loadPageBlank({
    //     url: "/recruitApp/applications/newPos.php?id=" + id + "&title=" + title,
    //   });
    // }
  },
  filters: {
    dateToLocal(date) {
      if (date) return date.split("-").reverse().join(".");
    },
  },
  computed:{
    filteredAsps(){
      let res = this.aspirants;
      if(this.searchAsp.length > 1){
        res = res.filter(asp=>asp.NAME.toLowerCase().includes(this.searchAsp.toLowerCase()));
      }
      if(this.filterStatus){
        res = res.filter(asp=>asp.CURR_STATUS == this.filterStatus);
      }
      if(this.date){
        res = res.filter(asp=>asp.INT_DATE.split(' ')[0] == this.date.split('-').reverse().join('.'));
      }
      return res
    },
    filteredEmpls(){
      let res = this.employers;
      if(this.searchEmpl.length > 1){
        res = res.filter(empl=>empl.NAME.toLowerCase().includes(this.searchEmpl.toLowerCase()));
      }
      return res;
    },
    ...mapGetters([
      'getUrl',
      'getUserId'
    ])
  },
  mounted(){

      


      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            this.is_su = JSON.parse(objXMLHttpRequest.response);
          } else {
            console.log("Error Code: " + objXMLHttpRequest.status);
            console.log("Error Message: " + objXMLHttpRequest.statusText);
          }
        }
      };
      let body = new FormData();
      body.append("key", "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM");
      body.append("action", "is_su");
      body.append('userid', this.getUserId );//      body.append('userid', );
    objXMLHttpRequest.open(
        "POST",
         this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    this.getData();
  }
}
</script>
<style scoped>
.fakeLink{
  text-decoration: underline;
  color: blue;
}
p{
  margin-bottom: 0px;
 
}
a{
  text-decoration: none;
}
.phoneimg{
  width: 20px;
  height: 20px;
}
.filterimg{
  width: 30px;
  height: 30px;
}
.unactivephone{
  opacity: 0.2;
}
.v-expansion-panel-content::v-deep > .v-expansion-panel-content__wrap{
  padding: 0 0 16px;
  flex: 1 1 auto;
  max-width: 100%;
  overflow-x: hidden;
}
.closebtn{
  cursor: pointer;
  margin-top: -30px;
  margin-right: -10px;
}
</style>