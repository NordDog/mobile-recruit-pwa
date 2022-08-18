<template>
    <v-container>
        <v-sheet elevation="1" class="pa-3 mb-3 d-flex ">
            <v-icon large color="primary" @click="$router.back(id)">
                mdi-chevron-left
            </v-icon>
            <v-spacer></v-spacer>
            <div class="box">
                <p class="text-h6 text-right cuttedText">{{ title }}</p>
                <p class="text-caption text-right">Выбранный контакт</p>
            </div>
        </v-sheet>
        <v-sheet elevation="1">
            <div class="fakeForm">
                <v-text-field v-model="object" label="Объект" outlined></v-text-field>
                <v-text-field v-model="position" label="Должность" outlined></v-text-field>
                <v-select v-model="status" :items="statusItem" label="Статус" outlined></v-select>

                <!--SB time pickers-->

                <v-menu ref="dateOnSbMenu" v-model="dateOnSbMenu" :close-on-content-click="false"
                    :return-value.sync="dateOnSb" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateOnSb" label="Дата отправки СБ" outlined append-icon="mdi-calendar"
                            readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateOnSb" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dateOnSbMenu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.dateOnSbMenu.save(dateOnSb)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-menu ref="dateOffSbMenu" v-model="dateOffSbMenu" :close-on-content-click="false"
                    :return-value.sync="dateOffSb" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateOffSb" label="Дата прохождения СБ" outlined
                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateOffSb" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dateOffSbMenu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.dateOffSbMenu.save(dateOffSb)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-select :items="okSbItems" label="Прошел Сб" outlined></v-select>
                <!--SB end-->

                <!--LKM time piker-->
                <v-menu ref="dateOnLkmMenu" v-model="dateOnLkmMenu" :close-on-content-click="false"
                    :return-value.sync="dateOnLkm" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateOnLkm" label="Дата отправки СБ" outlined append-icon="mdi-calendar"
                            readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateOnLkm" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dateOnLkmMenu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.dateOnLkmMenu.save(dateOnLkm)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-menu ref="dateOffLkmMenu" v-model="dateOffLkmMenu" :close-on-content-click="false"
                    :return-value.sync="dateOffLkm" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="dateOffLkm" label="Дата прохождения СБ" outlined
                            append-icon="mdi-calendar" readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="dateOffLkm" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="dateOffLkmMenu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.dateOffLkmMenu.save(dateOffLkm)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <v-select v-model="okLkm" :items="okLkmItems" label="Прошел ЛКМ" outlined></v-select>
                <!--LKM end-->
                <v-text-field v-model="phone" outlined label="Телефон" placeholder="79993332211">
                    <template v-slot:append>
                        <a :href="'tel:' + phone">
                            <v-icon>
                                mdi-phone
                            </v-icon>
                        </a>
                    </template>

                </v-text-field>
                <v-select v-model="docType" :items="docTypeItems" label="Документ, удоставеряющий личность" outlined>
                </v-select>
                <v-select v-model="cityzenship" :items="cityzenshipItem" item-text="text" item-value="value"
                    label="Гражданство" outlined></v-select>



                <v-text-field v-model="last_name" label="Фамилия" outlined></v-text-field>
                <v-text-field v-model="name" label="Имя" outlined></v-text-field>
                <v-text-field v-model="second_name" label="Отчество" outlined></v-text-field>
                <v-select v-model="sex" :items="sexItems" label="Пол" item-text="text" item-value="value" outlined>
                </v-select>
                <v-menu ref="birthDateMenu" v-model="birthDateMenu" :close-on-content-click="false"
                    :return-value.sync="birthDate" transition="scale-transition" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="birthDate" label="Дата рождения" outlined append-icon="mdi-calendar"
                            readonly v-bind="attrs" v-on="on"></v-text-field>
                    </template>
                    <v-date-picker v-model="birthDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="birthDateMenu = false">
                            Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.birthDateMenu.save(birthDate)">
                            OK
                        </v-btn>
                    </v-date-picker>
                </v-menu>
                <!--Паспорт-->
                <v-text-field v-model="second_name" label="Серия паспорта" outlined></v-text-field>
                <v-text-field v-model="second_name" label="Номер паспорта" outlined></v-text-field>
                <v-text-field v-model="second_name" label="Кем выдан" outlined></v-text-field>
              

                <v-text-field v-model="second_name" label="Адрес регистрации" outlined></v-text-field>
                <!-- <v-text-field v-model="second_name" label="Отчество" outlined></v-text-field> -->

            </div>

        </v-sheet>

        <v-overlay :value="loader">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

    </v-container>
</template>
<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
    props: ['id'],
    data() {
        return {
            title: '',
            loader: true,
            object: '',
            position: '',
            status: '',
            statusItem: [],
            dateInterview: '',
            //start Sb
            dateOnSb: '',
            dateOnSbMenu: false,
            dateOffSb: '',
            dateOffSbMenu: false,
            okSb: '',
            okSbItems: [],
            //end Sb
            //start Lkm
            dateOnLkm: '',
            dateOnLkmMenu: false,
            dateOffLkm: '',
            dateOffLkmMenu: false,
            okLkm: '',
            okLkmItems: [],

            //end Lkm

            phone: '',
            docType: '',
            docTypeItems: [],
            cityzenship: '',
            cityzenshipItem: [],
            last_name: '',
            name: '',
            second_name: '',
            sex: '',
            sexItems: [],
            birthDate: '',
            birthDateMenu: false,
            serialPassport: '',
            numberPassport: '',
            issuedBy: '',
            dateIssuedBy: '',
            dateIssuedByMenu: '',
            registrationAddress: '',
            photoPassport: '',
            scanDocks: '',
            checkRegistration: '',
            addressOfActualResidence: '',
            INN: '',
            comment: '',


















        }
    },
    methods: {
        async getUser() {

            var bodyFormData = new FormData();

            bodyFormData.append('action', 'getCandidate')
            bodyFormData.append('key', 'brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM')
            bodyFormData.append('id', this.id)

            await axios({
                method: 'post',
                url: this.getUrl,

                data: bodyFormData,
                headers: { "Content-Type": "multipart/form-data" },
            })
                .then((response) => {

                    const obj = response.data
                    console.log(obj)
                    obj.LKMstatuses.forEach(item => {
                        this.okLkmItems.push({
                            text: item.VALUE.toString(),
                            value: item.ID.toString()
                        })
                    })
                    obj.SSstatuses.forEach(item => {
                        this.okSbItems.push({
                            text: item.VALUE.toString(),
                            VALvalueE: item.ID.toString()
                        })
                    })
                    obj.statuses.forEach(item => {
                        this.statusItem.push({
                            text: item.value.toString(),
                            value: item.id.toString()
                        })
                    })
                    obj.cityzenship.forEach(item => {
                        this.cityzenshipItem.push({
                            text: item.value.toString(),
                            value: item.id.toString()
                        })
                    })
                    obj.docType.forEach(item => {
                        this.docTypeItems.push(item)
                    })
                    obj.sex.forEach(item => {
                        this.sexItems.push({
                            text: item.VALUE.toString(),
                            value: item.ID.toString()
                        })
                    })



                    this.dateOnSb = obj.empl.PROPERTY_392_VALUE
                    this.phone = obj.cont.PHONE
                    this.sex = obj.cont.UF_CRM_5F929626B7513
                    this.birthDate = obj.cont.BIRTHDATE

                    if (obj.req) {
                        this.title = obj.req.RQ_LAST_NAME + ' ' + obj.req.RQ_FIRST_NAME
                        this.name = obj.req.RQ_FIRST_NAME
                        this.last_name = obj.req.RQ_LAST_NAME
                        this.second_name = obj.req.RQ_SECOND_NAME
                        this.serialPassport = obj.req.RQ_IDENT_DOC_SER
                        this.numberPassport = obj.req.RQ_IDENT_DOC_NUM
                        this.issuedBy = obj.req.RQ_IDENT_DOC_ISSUED_BY
                        this.dateIssuedBy = obj.req.RQ_IDENT_DOC_DATE




                    } else {
                        this.title = obj.cont.LAST_NAME + ' ' + obj.cont.NAME
                        this.name = obj.cont.NAME
                        this.last_name = obj.cont.LAST_NAME
                        this.second_name = obj.cont.SECOND_NAME
                        this.docTyp = obj.cont.UF_CRM_5ED602E9E7C45


                    }




                }, (error) => {
                    console.log(error);
                });




        }
    },
    computed: {
        ...mapGetters([
            'getUrl'
        ])
    },
    watch: {
        title: function () { this.loader = false }
    },
    async mounted() {
        await this.getUser()





    }
}



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