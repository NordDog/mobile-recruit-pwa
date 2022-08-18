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
     <span 
     class="text-h6 text-right">
    {{titleText}} вакансии
     </span>
</v-sheet >

    <v-sheet elevation="1" class="pa-3">
    <form @submit="checkForm">
      <div class="fakeForm">
        <v-autocomplete
          label="Название вакансии"
          v-model="name"
          :items="posNames"
          @change='checkIfAdd()'
          :class="{ errorField: emptyFields.includes('name') }"
          ref="name"
        ></v-autocomplete>
        <v-text-field
          label="Описание места работы"
          v-model="workPlaceDescription"
          :class="{ errorField: emptyFields.includes('workPlaceDescription') }"
          ref="workPlaceDescription"
        ></v-text-field>
        <v-text-field
          label="Возраст"
          v-model="age"
          :class="{ errorField: emptyFields.includes('age') }"
          ref="age"
        ></v-text-field>
        <v-autocomplete
          label="Гражданство"
          append-icon=""
          multiple
          :items="citizenshipList"
          item-text="TEXT"
          item-value="VALUE"
          v-model="citizenship"
          :class="{ errorField: emptyFields.includes('citizenship') }"
          ref="citizenship"
        ></v-autocomplete>
        <v-select
          label="Пол"
          append-icon=""
          :items="maleList"
          item-text="TEXT"
          item-value="VALUE"
          v-model="male"
          :class="{ errorField: emptyFields.includes('male') }"
          ref="male"
        ></v-select>
        <v-autocomplete
          label="Образование"
          append-icon=""
          :items="educationList"
          item-text="TEXT"
          item-value="VALUE"
          v-model="education"
          :class="{ errorField: emptyFields.includes('education') }"
          ref="education"
        ></v-autocomplete>
        <v-text-field
          label="Должностные обязанности"
          v-model="responsibility"
          :class="{ errorField: emptyFields.includes('responsibility') }"
          ref="responsibility"
        ></v-text-field>
        <v-text-field
          label="Опыт работы"
          v-model="workExp"
          :class="{ errorField: emptyFields.includes('workExp') }"
          ref="workExp"
        ></v-text-field>
        <v-text-field
          label="График работы"
          v-model="schedule"
          :class="{ errorField: emptyFields.includes('schedule') }"
          ref="schedule"
        ></v-text-field>
        <v-text-field
          label="Зарплата за месяц"
          v-model="monthSalary"
          :class="{ errorField: emptyFields.includes('monthSalary') }"
          ref="monthSalary"
        ></v-text-field>
        <v-text-field
          label="Зарплата за смену"
          v-model="daySalary"
          :class="{ errorField: emptyFields.includes('daySalary') }"
          ref="daySalary"
        ></v-text-field>
        <v-select
          label="Тип подбора"
          append-icon=""
          :items="selectionTypes"
          item-text="TEXT"
          item-value="VALUE"
          v-model="selectionType"
          :class="{ errorField: emptyFields.includes('selectionType') }"
          ref="selectionType"
        ></v-select>
        <v-text-field
          label="Особенности проезда"
          v-model="wayFeatures"
          :class="{ errorField: emptyFields.includes('wayFeatures') }"
          ref="wayFeatures"
        ></v-text-field>
        <v-text-field
          label="Стажировка"
          v-model="probation"
          :class="{ errorField: emptyFields.includes('probation') }"
          ref="probation"
        ></v-text-field>
  <!--
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
        -->
        <v-select
          label="Тип трудоустройства"
          v-model="employmentType"
          multiple
          :items="employmentTypes"
          item-text="TEXT"
          item-value="VALUE"
          append-icon=""
          :class="{ errorField: emptyFields.includes('employmentType') }"
          ref="employmentType"
        ></v-select>
        <v-text-field
          label="Условия"
          v-model="conditions"
          :class="{ errorField: emptyFields.includes('conditions') }"
          ref="conditions"
        ></v-text-field>
        <v-text-field
          label="Требования"
          v-model="requirements"
          :class="{ errorField: emptyFields.includes('requirements') }"
          ref="requirements"
        ></v-text-field>
      </div>
      <div class="d-flex row justify-center ma-5">
        <v-btn v-if="!this.vacid" @click="create()" color="primary">{{btnName}}</v-btn>
        <v-btn v-if="this.vacid" @click="update()" color="primary">{{btnName}}</v-btn>
        <!--
        <button 
          v-if="!isUpdate"
          :disabled="disabled" 
          class="mybtn" 
          :class="{ disabledBtn: disabled }"
          @click="create()"
        >
          Создать
        </button>
        <button
          v-else
          :disabled="disabled"
          class="mybtn"
          :class="{ disabledBtn: disabled }"
          @click="update()"
        >
          Обновить
        </button>
        -->
      </div>
    </form>
    </v-sheet>
    <v-dialog
      v-model="showAddPosName"
    >
      <v-card>
        <v-card-text>
          <v-text-field
            label="Название"
            v-model="newName"
          ></v-text-field>
          <v-card-action style="justify-content: flex-end;">
            <v-btn color="primary" @click="addNewPosName()">Сохранить</v-btn>
          </v-card-action>
        </v-card-text>
      </v-card>
    </v-dialog>

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
import { mapGetters } from 'vuex';
import axios from 'axios';
export default {
  name: 'addNewPosition',
    props:['id','vacid'],
  data(){
    return{
      posNames:[],
      name:'',
      workPlaceDescription:'',
      age:'',
      citizenshipList:[],
      citizenship:[],
      maleList:[],
      male:'',
      educationList:[],
      education:'',
      responsibility:'',
      workExp:'',
      schedule:'',
      monthSalary:'',
      daySalary:'',
      selectionTypes:[],
      selectionType:'',
      wayFeatures:'',
      probation:'',
      date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      modal:false,
      employmentTypes:[],
      employmentType:'',
      conditions:'',
      isUpdate: false,
      titleText: 'Создание',
      btnName: 'Создать',
      requirements: '',
      showAddPosName: false,
      newName:'',
      emptyFields:[],
      error:false,
      textError:'',
      success: false,
      textSuccess:'',
       timeout: 3000,
    }
  },
  methods:{

    getData(){

   

      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            let data = JSON.parse(objXMLHttpRequest.response);
            this.citizenshipList = data.citizenship;
            this.educationList = data.education;
            this.maleList = data.male;
            this.selectionTypes = data.selectType;
            this.employmentTypes = data.employmentType;
            this.posNames = data.posNames;
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
      body.append("action", 'getCreatePosData')
      objXMLHttpRequest.open(
        "POST",
        this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    },
    create(){

      let 
      fields = {
        NAME:this.name,
        OBEKT:this.id,
        DETAIL_TEXT:this.workPlaceDescription,
        VOZRAST:this.age,
        GRAZHDANSTVO:this.citizenship,
        POL:this.male,
        OBRAZOVANIE:this.education,
        OBYAZANNOSTI:this.responsibility,
        OPYT_RABOTY:this.workExp,
        GRAFIK_RABOTY:this.schedule,
        ZARPLATA_ZA_MESYATS:this.monthSalary,
        ZARPLATA_ZA_DEN:this.daySalary,
        TIP_TRUDOUSTROYSTA:this.selectionType,
        OSOBENNOSTI_PROEZDA:this.wayFeatures,
        STAZHIROVKA:this.probation,
        TIP_TRUDOUSTROYSTVA:this.employmentType,
        USLOVIYA:this.conditions,
        TREBOVANIYA: this.requirements
      }

    

      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            //alert('Вакансия успешно создана!');
              this.textSuccess ='Вакансия успешно создана!';
              this.success = true;
            this.name = '';
            this.workPlaceDescription = '';
            this.age = '';
            this.citizenship = '';
            this.male = '';
            this.education = '';
            this.responsibility = '';
            this.workExp = '';
            this.schedule = '';
            this.monthSalary = '';
            this.daySalary = '';
            this.selectionType = '';
            this.wayFeatures = '';
            this.probation = '';
            this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
            this.employmentType = '';
            this.conditions = '';
            this.$router.back();
          } else {
            console.log("Error Code: " + objXMLHttpRequest.status);

             this.textError="Error Message: " + objXMLHttpRequest.statusText ;
              this.error= true;
          }
        }
      };
      let body = new FormData();
      body.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      body.append("action", 'createPosition')
      body.append("fields", JSON.stringify(fields));
      body.append("userid",  this.getUserId )
      objXMLHttpRequest.open(
        "POST",
        this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    },
    
    getPosData(posid){

     

      let objXMLHttpRequest = new XMLHttpRequest();
      objXMLHttpRequest.onreadystatechange = () => {
        if (objXMLHttpRequest.readyState === 4) {
          if (objXMLHttpRequest.status === 200) {
            let data = JSON.parse(objXMLHttpRequest.response);
            this.name = data.data.NAME,
            this.workPlaceDescription = data.data.DETAIL_TEXT,
            this.age = data.data.AGE,
            this.citizenship = data.data.CITYZENSHIP,
            this.male = data.data.MALE,
            this.education = data.data.EDUCATION,
            this.responsibility = data.data.RESPONSIBILITY,
            this.workExp = data.data.WORK_EXP,
            this.schedule = data.data.SCHEDULE,
            this.monthSalary = data.data.MONTH_SALARY,
            this.daySalary = data.data.DAY_SALARY,
            this.selectionType = data.data.SEL_TYPE,
            this.wayFeatures = data.data.WAY_FEAT,
            this.probation = data.data.PROBATION,
            this.date = data.data.CLOSE_DATE,
            this.employmentType = data.data.EMPL_TYPE,
            this.conditions = data.data.COND,
            this.requirements = data.data.REQUIREMENTS
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
      body.append("action", 'getUpdPosData')
      body.append("id", posid);
      objXMLHttpRequest.open(
        "POST",
        this.getUrl,
        true
      );
      objXMLHttpRequest.send(body);

    },
    update(){
       //let posid = this.getParamByName('posid');
       if(this.vacid){
        let fields = {
          NAME: this.name,
          DETAIL_TEXT: this.workPlaceDescription,
          VOZRAST: this.age,
          GRAZHDANSTVO: this.citizenship,
          POL: this.male,
          OBRAZOVANIE: this.education,
          OBYAZANNOSTI: this.responsibility,
          OPYT_RABOTY: this.workExp,
          GRAFIK_RABOTY: this.schedule,
          ZARPLATA_ZA_MESYATS: this.monthSalary,
          ZARPLATA_ZA_DEN: this.daySalary,
          TIP_TRUDOUSTROYSTA: this.selectionType,
          OSOBENNOSTI_PROEZDA: this.wayFeatures,
          STAZHIROVKA: this.probation,
          //SROK_ZAKRYTIYA: this.date.split('-').reverse.join('.'),
          TIP_TRUDOUSTROYSTVA: this.employmentType,
          USLOVIYA: this.conditions,
          TREBOVANIYA: this.requirements
        };

      //   BX.ajax({
      //     url: '../2.0/php/api/ajax.php',
      //     data: {
      //       key:'brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM',
      //       action:'updatePosition',
      //       id: posid,
      //       fields: JSON.stringify(fields),
      //       userid: BX.message('USER_ID')
      //     },
      //     method: 'POST',
      //     dataType: 'json',
      //     timeout: 30,
      //     async: true,
      //     processData: true,
      //     scriptsRunFirst: true,
      //     emulateOnload: true,
      //     start: true,
      //     cache: false,
      //     onsuccess: ()=>{
      //       //alert('Вакансия успешно обновлена!');
      //         this.textSuccess ='Вакансия успешно обновлена!';
      //         this.success = true;
      //       this.name = '';
      //       this.workPlaceDescription = '';
      //       this.age = '';
      //       this.citizenship = '';
      //       this.male = '';
      //       this.education = '';
      //       this.responsibility = '';
      //       this.workExp = '';
      //       this.schedule = '';
      //       this.monthSalary = '';
      //       this.daySalary = '';
      //       this.selectionType = '';
      //       this.wayFeatures = '';
      //       this.probation = '';
      //       this.date = (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10);
      //       this.employmentType = '';
      //       this.conditions = '';
      //       BXMobileApp.UI.Page.close();
      //     },
      //     onfailure: function(){
      //      // alert('Что-то пошло не так, обратитесь к разработчику приложения!');
      //            this.textError='Что-то пошло не так, обратитесь к разработчику приложения!';
      //         this.error= true;
      //     }
      //   });
      // }


       var bodyFormData = new FormData();

            bodyFormData.append('action', 'updatePosition')
            bodyFormData.append('key', 'brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM')
            bodyFormData.append('id', this.vacid)
            bodyFormData.append('fields', JSON.stringify(fields))
            bodyFormData.append('userid', this.getUserId )
         
            axios({
                method: 'post',
                url: this.getUrl,

                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((response) => {
                 console.log(response)


                   
                }, (error) => {
                    console.log(error);
                });

       }




    },
    checkIfAdd(){
      if(this.name == 'Добавить название вакансии'){
        this.showAddPosName = true;
      }
    },
    addNewPosName(){
      if(this.newName){
        let objXMLHttpRequest = new XMLHttpRequest();
        objXMLHttpRequest.onreadystatechange = () => {
          if (objXMLHttpRequest.readyState === 4) {
            if (objXMLHttpRequest.status === 200) {
              this.newName = '';
              this.showAddPosName = false;
              this.getData();
              this.name = '';
            } else {
              console.log("Error Code: " + objXMLHttpRequest.status);
              console.log("Error Message: " + objXMLHttpRequest.statusText);
            }
          }
        };
        let body = new FormData();
        body.append("key", "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM");
        body.append("action", 'createNewPosName');
        body.append("name", this.newName);
        objXMLHttpRequest.open("POST", this.getUrl, true);
        objXMLHttpRequest.send(body);
      }
    },
    checkForm(e){
      this.emptyFields = [];

      if(!this.name){
        this.emptyFields.push('name');
      }
      if(!this.workPlaceDescription){
        this.emptyFields.push('workPlaceDescription');
      }
      if(!this.age){
        this.emptyFields.push('age');
      }
      if(!this.citizenship || this.citizenship.length == 0){
        this.emptyFields.push('citizenship');
      }
      if(!this.male){
        this.emptyFields.push('male');
      }
      if(!this.education){
        this.emptyFields.push('education');
      }
      if(!this.responsibility){
        this.emptyFields.push('responsibility');
      }
      if(!this.workExp){
        this.emptyFields.push('workExp');
      }
      if(!this.schedule){
        this.emptyFields.push('schedule');
      }
      if(!this.monthSalary){
        this.emptyFields.push('monthSalary');
      }
      if(!this.daySalary){
        this.emptyFields.push('daySalary');
      }
      if(!this.selectionType){
        this.emptyFields.push('selectionType');
      }
      if(!this.wayFeatures){
        this.emptyFields.push('wayFeatures');
      }
      if(!this.probation){
        this.emptyFields.push('probation');
      }
      if(!this.employmentType){
        this.emptyFields.push('employmentType');
      }
      if(!this.conditions){
        this.emptyFields.push('conditions');
      }
      if(!this.requirements){
        this.emptyFields.push('requirements');
      }

      if(this.emptyFields[0]) this.goto(this.emptyFields[0]);

      if(this.emptyFields.length == 0 && !this.isUpdate)  this.create();
      else if(this.emptyFields.length == 0 && this.isUpdate) this.update();

      e.preventDefault();
    },
    goto(refName){
      //alert('Не все данные заполнены');
           this.textError='Не все данные заполнены';
              this.error= true;
      let element = this.$refs[refName];
      let top = element.$el.offsetTop;
      window.scrollTo(0, top);
    }
  },
  computed:{
    ...mapGetters([
       'getUserId',
       'getUrl' 
    ]),
    disabled(){
      if(this.name && this.workPlaceDescription && this.age && this.citizenship && 
        this.male && this.education && this.responsibility && this.workExp && this.schedule &&
        this.monthSalary && this.daySalary && this.selectionType && this.wayFeatures && 
        this.probation && this.employmentType && this.conditions && this.requirements
      )return false;
      return true;
    },
  },
  filters: {
    dateToLocal(date) {
      if (date)
        return date.split("-").reverse().join(".");
    },
  },
  mounted(){
    this.getData();
    if(this.vacid) {
      this.getPosData(this.vacid);
      this.isUpdate = true;
      this.titleText = 'Изменение';
      this.btnName = 'Обновить';
    }
  }

}
</script>
