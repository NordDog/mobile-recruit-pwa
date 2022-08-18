<template>
  <v-container>
    <v-sheet elevation="1" class="pa-2 d-flex">
      <v-icon large color="primary" @click="$router.back()">
        mdi-chevron-left
      </v-icon>
      <v-spacer></v-spacer>

      <div class="box">
        <p class="text-h6 text-right cuttedText">{{ getObjectName }}</p>
        <p class="text-caption text-right">Выбранный объект</p>
      </div>
    </v-sheet>
    <v-sheet elevation="1">
      <v-list flat class="ma-4">
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
            :to="item.route + id"
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="item.iconRight"> </v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-sheet>
  </v-container>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  props: ["id"],

  data: () => ({
    selectedItem: 1,
    title: "",
    items: [
      {
        text: "Разместить заявку",
        icon: "mdi-file-document-plus-outline",
        iconRight: "mdi-chevron-right",
        route: "/addNewApp/",
      },
      {
        text: "Заявки в работе",
        icon: "mdi-badge-account-alert-outline",
        iconRight: "mdi-chevron-right",
        route: "/listCurrApp/",
      },
      {
        text: "Отклоненные заявки",
        icon: "mdi-file-document-remove-outline",
        iconRight: "mdi-chevron-right",
        route: "/rejectedApp/",
      },
      {
        text: "Сотрудники",
        icon: " mdi-account-tie",
        iconRight: "mdi-chevron-right",
        route: "/employee/",
      },
      {
        text: "Кандидаты",
        icon: "mdi-account-group",
        iconRight: "mdi-chevron-right",
        route: "/candidate/",
      },
      {
        text: "Проверка Документов",
        icon: "mdi-shield-sync-outline",
        iconRight: "mdi-chevron-right",
        route: "/dockCheck/",
      },
      {
        text: "Архив Кандидатов",
        icon: "mdi-account-multiple-outline",
        iconRight: "mdi-chevron-right",
        route: "/archive/",
      },
    ],
  }),
  computed: {
    ...mapGetters(["getObjs"]),
    getObjectName() {
      const obj = this.getObjs;
      var name = obj.filter((item) => item.id == this.id);

      return name[0].text;
    },
  },
  methods: {
    ...mapMutations(["setObjectID"]),
  },
  mounted() {
    this.setObjectID(this.id);
  },
};
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
