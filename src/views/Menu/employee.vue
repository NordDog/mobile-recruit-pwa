<template>
  <v-container>
    <v-sheet elevation="1" class="pa-3 mb-3 d-flex">
      <v-icon large color="primary" @click="$router.back()">
        mdi-chevron-left
      </v-icon>
      <v-spacer></v-spacer>
      <div class="box">
        <p class="text-h6 text-right cuttedText">{{ getObjectName }}</p>
        <p class="text-caption text-right">Выбранный объект</p>
      </div>
    </v-sheet>
    <v-sheet elevation="1" class="mb-3">
      <v-text-field
        class="mx-3"
        label="Поиск Сотрудника"
        prepend-inner-icon="mdi-magnify"
        v-model="search"
        clearable
      ></v-text-field>
    </v-sheet>
    <v-sheet elevation="1">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">ФИО</th>
              <th class="text-left">Должность</th>
              <th class="text-left">Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in filteredItems"
              :key="item.ID"
              @click="edit(item.ID)"
            >
              <td>{{ item.FULL_NAME }}</td>
              <td>{{ item.POS_NAME }}</td>
              <td>{{ item.STAGE_NAME }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-sheet>

    <v-overlay absolute :value="loader">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      title: "",
      search: "",
      items: [],
      loader: true,
    };
  },
  computed: {
    getObjectName() {
      const obj = this.$store.getters.getObjs;
      var name = obj.filter((item) => item.id == this.id);

      return name[0].text;
    },
    ...mapGetters(["getUrl"]),
    filteredItems() {
      return this.items.filter((item) => {
        if (!this.search) return this.items;
        return item.NAME.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    getEmploee() {
      //427
      var bodyFormData = new FormData();

      bodyFormData.append("action", "getUserList");
      bodyFormData.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      bodyFormData.append("id", this.id);
      bodyFormData.append("statuses", ["422"]); //['423','426','427','428','425','1102']
      axios({
        method: "post",
        url: this.getUrl,

        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(
        (response) => {
          const obj = response.data;
          if (obj.length > 0) {
            this.loader = false;
          } else {
            setTimeout(() => {
              this.loader = false;
            }, 4000);
          }
          obj.forEach((item) => {
            this.items.push({
              name: item.MWS_NAME,
              status: item.MWS_STATUS,
              userId: item.MWS_ID,
              vac: item.MWS_VAC,
              appId: item.MWS_APP_ID,
            });
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    edit(id) {
      this.$router.push("/detailAboutCount/" + id);
    },
    getAspirantsList(){
      let params = {
        type: 'employed',
        entityId: this.id
      }
      BX.rest.callMethod('recruit.aspirants.list', params, res=>{
        this.items = res.data();
        this.loader = false;
      });
    },
  },
  mounted() {
    this.getAspirantsList();
  },
};
</script>
<style lang="sass" scoped>
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
  .v-data-table > .v-data-table__wrapper > table > tbody > tr > td
    font-size: 10px
</style>
