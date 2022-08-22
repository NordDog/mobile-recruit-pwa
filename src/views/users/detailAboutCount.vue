<template>
  <v-container>
    <v-sheet elevation="1" class="pa-3 mb-3 d-flex">
      <v-icon large color="primary" @click="$router.back(id)">
        mdi-chevron-left
      </v-icon>
      <v-spacer></v-spacer>
      <div class="box">
        <p class="text-h6 text-right cuttedText">{{ title }}</p>
        <p class="text-caption text-right">Выбранный контакт</p>
      </div>
    </v-sheet>
    <v-sheet elevation="1" class="pa-2">
      <div class="fakeForm">
        <div class="d-flex justify-space-between mb-2">
          <div>
            <p class="text-caption">Дата Собеседования:</p>
            <p class="text-caption">{{ contdata.UF_RECRUIT_INTERVIEW }}</p>
          </div>
          <div>
            <v-btn
              color="primary"
              elevation="2"
              x-small
              @click="history = !history"
              >История статусов</v-btn
            >
          </div>
        </div>

        <v-text-field
          disabled
          label="Объект"
          outlined
          :value="contdata.OBJ_NAME"
        ></v-text-field>
        <v-text-field
          disabled
          label="Должность"
          outlined
          :value="contdata.VAC_NAME"
        ></v-text-field>
        <v-select
          v-model="contdata.STAGE_ID"
          item-value="STATUS_ID"
          :items="statuses"
          item-text="NAME"
          label="Статус"
          outlined
        ></v-select>

        <v-menu
          ref="dateInterviewMenu"
          v-model="dateInterviewMenu"
          :close-on-content-click="false"
          :return-value.sync="contdata.DIVIDED_INTERVIEW.DATE"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="contdata.UF_RECRUIT_INTERVIEW | dateTimeToLocal"
              label="Дата и время собеседования"
              outlined
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>

          <v-date-picker 
            v-model="contdata.DIVIDED_INTERVIEW.DATE" 
            no-title 
            scrollable
            locale="ru-RU"
            first-day-of-week="1"
          >
            <div class="row">
              <v-row justify="center">
                <div style="width:290px;"  class="time-block d-flex">
                  <v-col cols="5" class="pl-0 pr-1 d-flex align-center">
                    <v-text-field style="text-align-last: center;" type="number" v-model="contdata.DIVIDED_INTERVIEW.HOURS" outlined dense hide-details @input="timeControl($event, true)"></v-text-field>
                  </v-col>
                  <v-col cols="5" class="pr-0 pl-1 d-flex align-center">
                    <v-text-field style="text-align-last: center;" type="number" v-model="contdata.DIVIDED_INTERVIEW.MINUTES" outlined dense hide-details  @input="timeControl($event)"></v-text-field>
                  </v-col>
                </div>
              </v-row>
              <v-col class="col-12">
                <v-spacer></v-spacer>
                <v-btn text color="red" @click="dateInterviewMenu = false">
                  Отменить
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="dateTimeinner(), $refs.dateInterviewMenu.save(contdata.DIVIDED_INTERVIEW.DATE)"
                  >
                  Сохранить
                </v-btn>
              </v-col>
            </div>
          </v-date-picker>
        </v-menu>

        <!--SB time pickers-->

        <v-menu
          ref="dateOnSbMenu"
          v-model="dateOnSbMenu"
          :close-on-content-click="false"
          :return-value.sync="contdata.UF_CRM_1660798222"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="contdata.UF_CRM_1660798222 | dateToLocal"
              label="Дата отправки СБ"
              outlined
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker 
            v-model="contdata.UF_CRM_1660798222" 
            no-title 
            scrollable
            locale="ru-RU"
            first-day-of-week="1"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateOnSbMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateOnSbMenu.save(contdata.UF_CRM_1660798222)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-menu
          ref="dateOffSbMenu"
          v-model="dateOffSbMenu"
          :close-on-content-click="false"
          :return-value.sync="contdata.UF_CRM_1660798266"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="contdata.UF_CRM_1660798266 | dateToLocal"
              label="Дата прохождения СБ"
              outlined
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker 
            v-model="contdata.UF_CRM_1660798266" 
            no-title 
            scrollable
            locale="ru-RU"
            first-day-of-week="1"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateOffSbMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateOffSbMenu.save(contdata.UF_CRM_1660798266)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-select
          v-model="contdata.UF_RECRUIT_PASS_SS"
          :items="passSSList"
          item-text="VALUE"
          item-value="ID"
          label="Прошел Сб"
          outlined
        ></v-select>
        <!--SB end-->

        <!--LKM time piker-->
        <v-menu
          ref="dateOnLkmMenu"
          v-model="dateOnLkmMenu"
          :close-on-content-click="false"
          :return-value.sync="contdata.UF_CRM_1660798441"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="contdata.UF_CRM_1660798441 | dateToLocal"
              label="Дата отправки ЛКМ"
              outlined
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker 
            v-model="contdata.UF_CRM_1660798441" 
            no-title 
            scrollable
            locale="ru-RU"
            first-day-of-week="1"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateOnLkmMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateOnLkmMenu.save(contdata.UF_CRM_1660798441)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-menu
          ref="dateOffLkmMenu"
          v-model="dateOffLkmMenu"
          :close-on-content-click="false"
          :return-value.sync="contdata.UF_CRM_1660798573"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="contdata.UF_CRM_1660798573 | dateToLocal"
              label="Дата прохождения ЛКМ"
              outlined
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="contdata.UF_CRM_1660798573"
            no-title 
            scrollable
            locale="ru-RU"
            first-day-of-week="1"
          >
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="dateOffLkmMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.dateOffLkmMenu.save(contdata.UF_CRM_1660798573)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-select
          v-model="contdata.UF_RECRUIT_PASS_LMK"
          :items="passLMKList"
          label="Прошел ЛКМ"
          item-text="VALUE"
          item-value="ID"
          outlined
        ></v-select>
        <!--LKM end-->
        <v-text-field
          v-model="contdata.CONT_PHONE"
          outlined
          label="Телефон"
          placeholder="7-999-333-22-11"
        >
          <template v-slot:append>
            <a :href="'tel:' + contdata.CONT_PHONE">
              <v-icon> mdi-phone </v-icon>
            </a>
          </template>
        </v-text-field>
        <v-select
          v-model="contdata.CONT_DOC_TYPE"
          :items="docTypesList"
          item-text="VALUE"
          item-value="ID"
          label="Документ, удостоверяющий личность"
          outlined
        >
        </v-select>
        <v-select
          v-model="contdata.CONT_SITIZENSHIP"
          :items="sitizenshipList"
          item-text="VALUE"
          item-value="ID"
          label="Гражданство"
          outlined
        ></v-select>

        <v-text-field
          v-model="contdata.CONT_LAST_NAME"
          label="Фамилия"
          outlined
        ></v-text-field>
        <v-text-field 
          v-model="contdata.CONT_NAME" 
          label="Имя" 
          outlined>
        </v-text-field>
        <v-text-field
          v-model="contdata.CONT_SECOND_NAME"
          label="Отчество"
          outlined
        ></v-text-field>
        <v-select
          v-model="contdata.CONT_SEX"
          :items="sexList"
          label="Пол"
          item-text="VALUE"
          item-value="ID"
          outlined
        >
        </v-select>
        <v-menu
          ref="birthDateMenu"
          v-model="birthDateMenu"
          :close-on-content-click="false"
          :return-value.sync="birthDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :value="contdata.CONT_BIRTHDATE | dateToLocal"
              label="Дата рождения"
              outlined
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="contdata.CONT_BIRTHDATE" 
            no-title 
            scrollable
            locale="ru-RU"
            first-day-of-week="1"
          >
            <v-spacer></v-spacer>
            <v-btn text color="red" @click="birthDateMenu = false">
              Отменить
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.birthDateMenu.save(contdata.CONT_BIRTHDATE)"
            >
              Сохранить
            </v-btn>
          </v-date-picker>
        </v-menu>
        <!--Паспорт-->
        <v-text-field
          v-model="contdata.REQ_IDENT_DOC_SER"
          label="Серия паспорта"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="contdata.REQ_IDENT_DOC_NUM"
          label="Номер паспорта"
          outlined
        ></v-text-field>
        <v-text-field
          v-model="contdata.REQ_IDENT_DOC_ISSUED_BY"
          label="Кем выдан"
          outlined
        ></v-text-field>
        <v-menu
          ref="issuedDateMenu"
          v-model="issuedDateMenu"
          :close-on-content-click="false"
          :return-value.sync="issuedDate"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="issuedDate"
              label="Дата выдачи паспорта"
              outlined
              append-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="issuedDate" no-title scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="issuedDateMenu = false">
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.issuedDateMenu.save(issuedDate)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>

        <!-- <v-text-field v-model="second_name" label="Адрес регистрации" outlined></v-text-field> -->

        <v-text-field
          v-model="registrationAddress"
          label="Адрес регистрации"
          outlined
        ></v-text-field>

        <v-text-field
          v-model="addressOfActualResidence"
          label="Адрес фактического пребывания"
          outlined
        ></v-text-field>

        <v-file-input
          v-model="files"
          show-size
          counter
          multiple
          label="Документы сканы"
        ></v-file-input>

        <v-expansion-panels focusable class="mt-2 mb-3">
          <v-expansion-panel>
            <v-expansion-panel-header
              >Сканы документов</v-expansion-panel-header
            >
            <v-expansion-panel-content>
              <v-row>
                <v-col
                  v-for="item in images"
                  :key="item.name"
                  class="d-flex child-flex"
                  cols="4"
                >
                  <v-img
                    :src="item.href"
                    :lazy-src="item.href"
                    :alt="item.name"
                    aspect-ratio="1"
                    class="grey lighten-2"
                    @click="openImg(item.href)"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                  </v-img>
                </v-col>
              </v-row>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-text-field 
          v-model="contdata.REQ_RQ_INN" 
          label="ИНН" 
          outlined>
        </v-text-field>

        <v-text-field
          v-model="comment"
          label="Коментарий"
          outlined
        ></v-text-field>
      </div>
      <div class="row justify-center pa-3">
        <v-btn @click="saveUser()">Сохранить</v-btn>
      </div>
    </v-sheet>
    <v-dialog
      transition="dialog-bottom-transition"
      max-width="600"
      v-model="history"
    >
      <v-card>
        <v-toolbar color="primary" dark>История статусов</v-toolbar>
        <v-card-text>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left text-caption">Дата</th>
                  <th class="text-left text-caption">Обьект</th>
                  <th class="text-left text-caption">Статус</th>
                  <th class="text-left text-caption">Причина</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="item in historyList" :key="item.date">
                  <td class="text-caption">{{ item.date }}</td>
                  <td class="text-caption">{{ item.object }}</td>
                  <td class="text-caption">{{ item.currstatus }}</td>
                  <td class="text-caption">{{ item.reason }}</td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="history = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog max-width="600px" v-model="galleryDialog">
      <v-card color="background">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
        </v-card-actions>
        <v-card-section class="pl-3 pr-3">
          <v-img
            :src="image"
            :lazy-src="image"
            contain
            aspect-ratio="0.7"
            max-height="800px"
          />
        </v-card-section>
      </v-card>
    </v-dialog>

    <v-overlay :value="loader">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  props: ["id"],
  data() {
    return {
      contID: "",
      appsID: "",
      galleryDialog: false,
      history: false,
      historyList: [],
      title: "",
      loader: true,
      object: "",
      position: "",
      status: "",
      statusItem: [],
      dateInterview: "",
      dateInterviewMenu: false,
      //start Sb
      dateOnSb: "",
      dateOnSbMenu: false,
      dateOffSb: "",
      dateOffSbMenu: false,
      okSb: "",
      okSbItems: [],
      //end Sb
      //start Lkm
      dateOnLkm: "",
      dateOnLkmMenu: false,
      dateOffLkm: "",
      dateOffLkmMenu: false,
      okLkm: "",
      okLkmItems: [],
      //end Lkm
      phone: "",
      docType: "",
      docTypeItems: [],
      cityzenship: "",
      cityzenshipItem: [],
      last_name: "",
      name: "",
      second_name: "",
      sex: "",
      sexItems: [],
      birthDate: "",
      birthDateMenu: false,
      serialPassport: "",
      numberPassport: "",
      issuedBy: "",
      issuedDate: "",
      issuedDateMenu: "",
      registrationAddress: "",
      photoPassport: "",
      scanDocks: "",
      checkRegistration: "",
      addressOfActualResidence: "",
      INN: "",
      comment: "",
      files: [],
      images: [],
      image: [],
      dateInter: "",
      hours: "",
      minutes: "",

      contdata: {},
      statuses: [],
      sexList: [],
      passLMKList: [],
      passSSList: [],
      docTypesList: [],
      sitizenshipList: []
    };
  },
  methods: {
    dateTimeinner() {
      this.contdata.UF_RECRUIT_INTERVIEW = 
        this.contdata.DIVIDED_INTERVIEW.DATE + " " + 
        this.contdata.DIVIDED_INTERVIEW.HOURS + ":" + 
        this.contdata.DIVIDED_INTERVIEW.MINUTES;
        this.dateInterviewMenu = false;
    },
    async getUser() {
      var bodyFormData = new FormData();

      bodyFormData.append("action", "getCandidate");
      bodyFormData.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      bodyFormData.append("id", this.id);

      await axios({
        method: "post",
        url: this.getUrl,

        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(
        (response) => {
          const obj = response.data;
          if (obj.length > 0) {
            this.loader = false;
          }

          obj.LKMstatuses.forEach((item) => {
            this.okLkmItems.push({
              text: item.VALUE.toString(),
              value: item.ID.toString(),
            });
          });
          obj.SSstatuses.forEach((item) => {
            this.okSbItems.push({
              text: item.VALUE.toString(),
              value: item.ID.toString(),
            });
          });
          obj.statuses.forEach((item) => {
            this.statusItem.push({
              text: item.value.toString(),
              value: item.id.toString(),
            });
          });
          obj.cityzenship.forEach((item) => {
            this.cityzenshipItem.push({
              text: item.value.toString(),
              value: item.id.toString(),
            });
          });
          obj.docType.forEach((item) => {
            this.docTypeItems.push(item);
          });
          obj.sex.forEach((item) => {
            this.sexItems.push({
              text: item.VALUE.toString(),
              value: item.ID.toString(),
            });
          });
          this.contID = obj.cont.ID;
          this.appsID = obj.empl.PROPERTY_359_VALUE;
          this.status = obj.empl.PROPERTY_357_ENUM_ID;
          this.dateInterview = obj.empl.PROPERTY_366_VALUE;
          this.cityzenship = obj.pos.PROPERTY_365_ENUM_ID;
          this.dateOnSb = obj.cont.UF_CRM_1623995349984;
          this.dateOnLkm = obj.cont.UF_CRM_1627222900935;
          this.phone = obj.cont.PHONE;
          this.sex = obj.cont.UF_CRM_5F929626B7513;
          this.birthDate = obj.cont.BIRTHDATE;
          this.historyList = obj.history;
          this.comment = obj.cont.COMMENTS;
          this.dateOffSb = obj.empl.PROPERTY_393_VALUE;
          this.dateOffLkm = obj.empl.PROPERTY_395_VALUE;
          this.position = obj.pos.NAME;
          this.object =
            obj.cont.UF_CRM_1625539465891 > 0
              ? obj.cont.UF_CRM_1625539465891
              : this.getObjectId;
          this.title =
            obj.req.length > 0 &&
            obj.req.RQ_LAST_NAME.length > 0 &&
            obj.req.RQ_FIRST_NAME.length > 0
              ? obj.req.RQ_LAST_NAME + " " + obj.req.RQ_FIRST_NAME
              : obj.cont.LAST_NAME + " " + obj.cont.NAME;
          this.name =
            obj.req.length > 0 && obj.req.RQ_FIRST_NAME.length > 0
              ? obj.req.RQ_FIRST_NAME
              : obj.cont.NAME;
          this.last_name =
            obj.req.length > 0 && obj.req.RQ_LAST_NAME.length > 0
              ? obj.req.RQ_LAST_NAME
              : obj.cont.LAST_NAME;
          this.second_name =
            obj.req.length > 0 && obj.req.RQ_SECOND_NAME.length > 0
              ? obj.req.RQ_SECOND_NAME
              : obj.cont.SECOND_NAME;
          this.serialPassport = obj.req.RQ_IDENT_DOC_SER;
          this.numberPassport = obj.req.RQ_IDENT_DOC_NUM;
          this.issuedBy = obj.req.RQ_IDENT_DOC_ISSUED_BY;
          this.issuedDate = obj.req.RQ_IDENT_DOC_DATE;
          this.docType = obj.cont.UF_CRM_5ED602E9E7C45;
          this.okSb = obj.cont.UF_CRM_1627226163985;
          this.okLkm = obj.cont.UF_CRM_1627226190610;
          this.INN = obj.req.RQ_INN;
          if (obj.req.addr) {
            obj.req.addr.forEach((item) => {
              if (item.TYPE_ID == 4) {
                this.registrationAddress = item.ADDRESS_1
                  ? item.ADDRESS_1
                  : item.ADDRESS_2;
              }

              if (item.TYPE_ID == 1) {
                this.addressOfActualResidence = item.ADDRESS_1
                  ? item.ADDRESS_1
                  : item.ADDRESS_2;
              }
            });
          }
          if (obj.cont.img) {
            this.images = obj.cont.img;
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    saveUser() {
      var filds = {
        NAME: this.name,
        LAST_NAME: this.last_name,
        SECOND_NAME: this.second_name,
        BIRTHDATE: this.birthDate,
        interviewDate: this.dateInterview.length > 0 ? this.dateInterview : 0,
        intDate: this.dateInter,
        UF_CRM_1625539465891: this.object, //object
        UF_CRM_1623994100759: this.position, //position
        UF_CRM_1623995349984: this.dateOnSb,
        UF_CRM_1627222900935: this.dateOnLkm,
        UF_CRM_5F929626B7513: this.sex,
        //'UF_CRM_1627280014423' => $filesArray,
        COMMENTS: this.comment,
        UF_CRM_1627226190610: this.okLkm,
        UF_CRM_1627226163985: this.okSb,
        UF_CRM_5ED602E9E7C45: this.cityzenship,
        PHONE: this.phone,
        STATUS: this.status,
        RQ_INN: this.INN,
        RQ_FIRST_NAME: this.name,
        RQ_LAST_NAME: this.last_name,
        RQ_SECOND_NAME: this.second_name,
        RQ_IDENT_DOC: this.docType,
        RQ_IDENT_DOC_SER: this.serialPassport,
        RQ_IDENT_DOC_NUM: this.numberPassport,
        RQ_IDENT_DOC_DATE: this.issuedDate,
        RQ_IDENT_DOC_ISSUED_BY: this.issuedBy,
        dateCheckSS: this.dateOffSb,
        datePassLMK: this.dateOffLkm,
        registrationAddress: this.registrationAddress,
        addressOfActualResidence: this.addressOfActualResidence,
      };

      var bodyFormData = new FormData();

      bodyFormData.append("action", "saveCandidate");
      bodyFormData.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      bodyFormData.append("appid", this.appsID);
      bodyFormData.append("contid", this.contID);
      bodyFormData.append("filds", JSON.stringify(filds));
      this.files.forEach((file, index) => {
        bodyFormData.append("files[" + index + "]", file);
      });

      axios({
        method: "post",
        url: this.getUrl,

        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((response) => {
        this.$router.back();
      });
    },
    openImg(image) {
      this.galleryDialog = true;
      this.image = image;
    },
    close() {
      this.galleryDialog = false;
    },

    getUserData(){
      BX.rest.callMethod('recruit.aspirants.getdata', {dealId: this.id}, res=>{
        this.contdata = res.data();

        this.title =
          this.contdata.REQ_LAST_NAME?.length > 0 &&
          this.contdata.REQ_FIRST_NAME?.length > 0
            ? this.contdata.REQ_LAST_NAME + " " + this.contdata.REQ_FIRST_NAME
            : this.contdata.CONT_LAST_NAME + " " + this.contdata.CONT_NAME;

        this.loader = false;
      });
    },
    getDealStages(){
      BX.rest.callMethod('recruit.aspirants.stageslist', {}, res=>{
        this.statuses = res.data();
      });
    },
    timeControl(time, isHours = false) {
      this.$nextTick(() => {
        time = +(time.toString().replace(/[^\d-]+/, "")) || 0;
          if(isHours) {
            if(time == 24) time = 0;
                  if(time > 24) time = time % 10;
                  if(time < 0) time = 23;
                  time = time.toString().padStart(2, "0");
            } else {
                  if(time == 60) time = 0;
                  if(time > 60) time = time % 10;
                  if(time < 0) time = 59;
                  time = time.toString().padStart(2, "0");
              }
              this.contdata.DIVIDED_INTERVIEW[isHours ? "HOURS" : "MINUTES"] = time;
          });
    },
  },
  computed: {
    ...mapGetters(["getUrl", "getObjectId", "getObjs"]),
    getObjectName() {
      const obj = this.getObjs;
      var name = obj.filter((item) => item.id == this.getObjectId);

      return name[0].text;
    },
  },
  filters:{
    dateToLocal(date) {
      if (date)
        return date.split('-').reverse().join('.');
      else 
        return '';
    },
    dateTimeToLocal(dateTime){
      if(dateTime){
        let tmp = dateTime.split(' ')[0].split('-').reverse().join('.');
        return tmp + ' ' + dateTime.split(' ')[1];
      }
    }
  },
  watch: {
    title: function () {
      this.loader = false;
    },
  },
  async mounted() {
    //await this.getUser();
    this.getUserData();
    this.getDealStages();
    BX.rest.callMethod("crm.contact.userfield.list", {filter:{FIELD_NAME: 'UF_CRM_5F929626B7513'}}, res=> {this.sexList = res.data()[0].LIST});
    BX.rest.callMethod("crm.contact.userfield.list", {filter:{FIELD_NAME: 'UF_RECRUIT_DOC_TYPES'}}, res=> {this.docTypesList = res.data()[0].LIST});
    BX.rest.callMethod("crm.deal.userfield.list", {filter:{FIELD_NAME: 'UF_RECRUIT_PASS_LMK'}}, res=> {this.passLMKList = res.data()[0].LIST});
    BX.rest.callMethod("crm.deal.userfield.list", {filter:{FIELD_NAME: 'UF_RECRUIT_PASS_SS'}}, res=> {this.passSSList = res.data()[0].LIST});
    let params = {
      'IBLOCK_TYPE_ID': 'lists',
      'IBLOCK_ID': '86',
    };
    BX.rest.callMethod('lists.element.get', params, res=>
      {
        for(let item of res.data()){
          this.sitizenshipList.push({ID: item.ID, VALUE: item.NAME})
        }
      }
    );
  },
};
</script>
<style lang="sass" scoped>
a
  text-decoration: none
.fakeForm
  margin: 10px
  padding: 10px

p
  padding:0
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
