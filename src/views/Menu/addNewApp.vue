<template>
<v-container>
    
<v-sheet elevation="1" class="pa-3 d-flex ">
   <v-icon
      large
      color="primary"
      @click="$router.back()"
    >
      mdi-chevron-left
    </v-icon> 
    <v-spacer></v-spacer>
     <span 
     class="text-h6 text-right">
    {{titleText}}
     </span>
</v-sheet >

    <v-sheet elevation="1">

    <form @submit="checkForm">
      <div class="fakeForm">
        <v-autocomplete 
          :items="positionsList"
          v-model="position"
          item-text="NAME"
          item-value="ID"
          label="Выбор вакансии"
          :class="{ errorField: emptyFields.includes('position') }"
          ref="position"
        ></v-autocomplete>
        <v-select 
          :items="employmentTypes"
          v-model="employmentType"
          item-text="VALUE"
          item-value="ID"
          label="Тип подбора"
          :class="{ errorField: emptyFields.includes('employmentType') }"
          ref="employmentType"
        ></v-select>
        <!--
        <v-text-field 
          label="Количество требуемого персонала" 
          v-model="required"
          type="Number"
        ></v-text-field>
        -->
        <div class="pl-5 pr-5">
           
          <v-text-field
            label="Mobistaff"
            dense
            v-model="mobiNum"
           
           
            :rules="mobyRuls"
            required
            :class="{ errorField: emptyFields.includes('mobiNum') }"
            ref="mobiNum"
          ></v-text-field>

     


          <v-text-field
            label="Фриланс"
            dense
            v-model="freeNum"
            @change="setNum('freeNum')"
           
          ></v-text-field>
          <v-text-field
            label="Фриланс ТМ"
            dense
            v-model="freeTmNum"
            @change="setNum('freeTmNum')"
          
          ></v-text-field>
          <v-text-field
            label="Приведи друга"
            dense
            v-model="friendNum"
            @change="setNum('friendNum')"
          
          ></v-text-field>
          <v-text-field
            label="Прочее"
            dense
            v-model="elseNum"
            @change="setNum('elseNum')"
           
          ></v-text-field>
        </div>
        <v-dialog
          ref="dialog"
          v-model="modal"
          :return-value.sync="date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="date|dateToLocal"
              label="Срок закрытия"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            locale="ru-RU"
            first-day-of-week="1"
            v-model="date"
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="modal = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dialog.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-dialog>

        <div class="d-flex flex-row justify-center" >

          <label for="urgent" style="font-size: larger; margin-right: 15px;">Срочная заявка</label>
          <input type="checkbox" id="urgent" class="newAppInp" v-model="urgent">

        </div>






      </div>

      <div class="d-flex flex-column justify-center pa-5">

        <p style="color: red;font-size: smaller;">{{errorText}}</p>

        <v-btn  color="primary" type="submit" class="mb-3">{{btnName}}</v-btn>

        <v-btn  color="primary"  @click="gotoNewPos()" class="mybtn newPosBtn">Добавить вакансию</v-btn>
    
      </div>
    </form>


     

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
  <!-- </div> -->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'addNewApplication',
  props:["id","appid"],
  data(){
    return{
      positionsList:[],
      position:'',
      scheduleList:[],
      schedule:'',
      employmentTypes:[],
      employmentType:'',
      required:'',
      urgent:'',
      snack: false,
      snackText: '',
      titleText: 'Размещение заявки',
      date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal:false,
      mobiNum: '',
      freeNum: '',
      freeTmNum: '',
      friendNum: '',
      elseNum: '',
      errorText: '',
      emptyFields:[],
      btnName:'Разместить заявку',
      error:false,
      textError:'',
      success: false,
      textSuccess:'',
       timeout: 8000,
       userid:'',
      mobyRuls:[v => (v.toString().length > 0 || 'Это поле обязательно для заполнения')]

    }
  },
  methods:{

    getData(id){
      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            let data = JSON.parse(objXMLHttpRequest.response);
            this.positionsList = data.positions;
            this.employmentTypes = data.type;
          } else {
            console.log("Error Code: " + objXMLHttpRequest.status);
            console.log("Error Message: " + objXMLHttpRequest.statusText);
          }
        }
      };
      let body = new FormData();
      body.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      body.append("action", 'getCreateAppData')
      body.append('id', id)
      objXMLHttpRequest.open(
        "POST",
        this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    },
  
    create(){
      let 
     id = this.id,
      fields = {
        'OBEKT':id,
        'DOLZHNOST':this.position,
        'TREBUETSYA':this.mobiNum,
        'TIP_PODBORA':this.employmentType,
        'SROCHNAYA':this.urgent?699:700,
        'SROK_ZAKRYTIYA':this.date.split("-").reverse().join("."),
        'ISTOCHNIK_PODBORA':[],
        'MOBISTAFF':'',
        'FRILANS':'',
        'FRILANS_TM':'',   	
        'PROCHEE':'',
        'PRIVEDI_DRUGA':'',
      }

      if(Number(this.mobiNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Mobistaff = '+this.mobiNum);
         fields.MOBISTAFF= this.mobiNum;
      }
      if(Number(this.freeNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Фриланс = '+this.freeNum);
         fields.FRILANS= this.freeNum;
      }
      if(Number(this.freeTmNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Фриланс ТМ = '+this.freeTmNum);
         fields.FRILANS_TM= this.freeTmNum;
      }
      if(Number(this.friendNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Приведи друга = '+this.friendNum);
         fields.PRIVEDI_DRUGA= this.friendNum;
      }
      if(Number(this.elseNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Прочее = '+this.elseNum);
         fields.PROCHEE= this.elseNum;

      }

      

    let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            console.log(objXMLHttpRequest.response);
                this.success = true,
                this.textSuccess ='Новая заявка создана и отпралена на согласование'
                setTimeout(()=> this.$router.back(), 2000)
          } else {
            console.log("Error Code: " + objXMLHttpRequest.status);
            console.log("Error Message: " + objXMLHttpRequest.statusText);
          }
        }
      };

      
      let body = new FormData();
      body.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      body.append("action", 'createApp')
      body.append("fields", JSON.stringify(fields));
      objXMLHttpRequest.open(
        "POST",
        this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    },

    gotoNewPos(){   
      this.$router.push({ path: `/addNewPos/${this.id}` })
    },
    getAppData(appid){
      
      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            let data = JSON.parse(objXMLHttpRequest.response);
            if(!data.error){
              this.position = data.pos;
              this.employmentType = data.type;
              this.required = data.req;
              this.urgent = data.urgent;
            } else {
              
              this.textError = data.error;
              this.error = true
            }
          } else {
                    
            console.log("Error Code: " + objXMLHttpRequest.status);
            console.log("Error Message: " + objXMLHttpRequest.statusText);
          }
        }
      };
      let body = new FormData();
      body.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      body.append("action", 'getUpdateAppData');
      body.append('id', appid);
      objXMLHttpRequest.open(
        "POST",
        this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    },
    update(){

      let 
      id = this.getParam('appid'),

      fields = {
        'DOLZHNOST':this.position,
        'TREBUETSYA':this.mobiNum,
        'TIP_PODBORA':this.employmentType,
        'SROCHNAYA':this.urgent?699:700,
        'SROK_ZAKRYTIYA':this.date.split("-").reverse().join("."),
        'ISTOCHNIK_PODBORA':[]
      }

      if(Number(this.mobiNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Mobistaff = '+this.mobiNum);
      }
      if(Number(this.freeNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Фриланс = '+this.freeNum);
      }
      if(Number(this.freeTmNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Фриланс ТМ = '+this.freeTmNum);
      }
      if(Number(this.friendNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Приведи друга = '+this.friendNum);
      }
      if(Number(this.elseNum) > 0){
        fields.ISTOCHNIK_PODBORA.push('Прочее = '+this.elseNum);
      }

  

      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            console.log(objXMLHttpRequest.response);
            this.success = true,
                this.textSuccess ='Заявка изменена'
            setTimeout(()=> this.$router.back(), 1000)
          } else {
    
            console.log("Error Code: " + objXMLHttpRequest.status);
            console.log("Error Message: " + objXMLHttpRequest.statusText);
          }
        }
      };
      let body = new FormData();
      body.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      body.append("action", 'updateApp')
      body.append("appid", id);
      body.append("fields", JSON.stringify(fields));
      objXMLHttpRequest.open(
        "POST",
        this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    },
    setErrorText(str){
      this.errorText = str;
    },
    setNum(field){
      this[field] = Number(this[field])|'';
    },
    goBack(){
      try{
        this.$router.back();
      }
      catch(e){
          this.textError = e;
              this.error = true;
      }
      
    },
    checkForm(e){
      this.emptyFields = [];
      if(!this.position){
        this.emptyFields.push('position');
      }
      if(!this.employmentType){
        this.emptyFields.push('employmentType');
      }
      if(!this.mobiNum){
        this.emptyFields.push('mobiNum');
      }
      
      if(this.emptyFields[0]) this.goto(this.emptyFields[0]);

      if(this.emptyFields.length == 0 && !this.isUpdate)  this.create();
      else if(this.emptyFields.length == 0 && this.isUpdate) this.update();
      
      e.preventDefault();
    },
    setBtnName(string){
      this.btnName = string;
    },
    goto(refName){
     // alert('Не все данные заполнены');
              this.textError = 'Не все данные заполнены';
              this.error = true;
      let element = this.$refs[refName];
      let top = element.$el.offsetTop;
      window.scrollTo(0, top);
    }
  },
  computed:{
    ...mapGetters([
        'getUrl',
        'getObjs',
        'getUserId'
      ]),
    disabled(){
      this.setErrorText('');

      if(!this.position && !this.mobiNum && !this.employmentType) {
        this.setErrorText('Заполните все обязательные поля');
        return true;
      }
      
      let sum = +this.mobiNum + +this.freeNum + +this.freeTmNum + +this.friendNum + +this.elseNum;
      if(sum <= 0){
        this.setErrorText('Сумма затребованных кандидатов по источникам подбора не может быть равна или меньше ноля');
        return true;
      }
      /*
      if(sum != this.required){
        this.setErrorText('Сумма требуемых кандидатов по источникам подбора должна быть равна количеству требуемого персонала');
        return true;
      }
      */
      else return false;
    },
    isUpdate(){
     
      if(this.appid){
        return true;
      }
      return false;
    }
  },
  filters: {
    dateToLocal(date) {
      if (date)
        return date
          .split("-")
          .reverse()
          .join(".");
    },
  },
  mounted(){
    this.userid = this.getUserId
   // let id = this.getParamByName('id');


    this.getData(this.id);

    //let appid = this.getParam('appid');

    if(this.appid){
      this.titleText = 'Обновление заявки';
      this.btnName = 'Обновить заявку';
      this.getAppData(this.appid);
    }
  }

}
</script>
<style lang="sass" scoped>
  .fakeForm
    margin: 10px
    pading: 10px

  
  </style>