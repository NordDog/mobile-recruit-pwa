<template>
  <v-container>
    <app_object></app_object>
  </v-container>
</template>

<script>
import app_object from "@/components/Object/Objects.vue";

import axios from "axios";

export default {
  name: "Home",
  methods: {
    logout() {
      var bodyFormData = new FormData();

      bodyFormData.append("action", "unautorise");
      bodyFormData.append(
        "key",
        "brNzfuxqQGz2PUYlqdd6zpduzuEm52v0wTXp0LWm7BdxR64bXxLOw9C6njbvDPeM"
      );

      axios({
        method: "post",
        url: "https://"+this.$root.serverURL+"/recruitApp/2.0/php/api/ajax.php",

        data: bodyFormData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
  components: {
    app_object,
  },
};
</script>
