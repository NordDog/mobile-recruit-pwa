<template>
  <div>
    <v-text-field
      class="mx-3"
      label="Поиск обьекта"
      prepend-inner-icon="mdi-magnify"
      v-model="search"
      clearable
      @click:clear="clearSearch"
    >
    </v-text-field>

    <v-list flat>
      <v-list-item-group v-model="selectedItem" color="primary">
        <v-list-item
          v-for="(item, index) in filteredItems"
          :key="index"
          :to="'/menu/' + item.id"
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
  </div>
</template>
<script>
import axios from "axios";

import { mapGetters } from "vuex";
export default {
  mounted() {
    this.getObjectAll();
  },
  data: () => ({
    search: "",
    selectedItem: 1,
    items: [],
  }),
  computed: {
    ...mapGetters(["getUrl", "getUserId"]),
    filteredItems() {
      return this.items.filter((item) => {
        if (!this.search) return this.items;
        return item.text.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    clearSearch() {
      this.search = "";
    },
    getObjectAll() {
      var bodyFormData = new FormData();

      bodyFormData.append("action", "getUserObjects");
      bodyFormData.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );
      bodyFormData.append("id", this.getUserId);
      axios({
        method: "post",
        url: this.getUrl,

        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(
        (response) => {
          const obj = response.data;

          for (var key in obj) {
            this.items.push({
              id: key,
              text: obj[key],
              icon: "mdi-domain",
              iconRight: "mdi-chevron-right",
            });
          }

          this.$store.commit("setObjs", this.items);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
<style lang="sass" scoped></style>
