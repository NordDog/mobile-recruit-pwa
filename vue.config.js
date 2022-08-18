const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  //подменяем индексный файл на index.php
  indexPath: 'index.php',
  chainWebpack: config => {
    if(process.env.NODE_ENV === 'production'){
      config
        .plugin('html')
        .tap(args => {
          args[0].template = './public/index.php';
          //args[0].minify.removeAttributeQuotes = false
          return args;
        })
    }
  },

  publicPath: process.env.NODE_ENV == "development" ? "" : "/recruitApp/pwa/",
  transpileDependencies: ["vuetify"],
  pwa:{
    manifestOptions: {
      name: "Рекрутинг",
      short_name: "Рекрутинг",
      start_url: "/recruit/",
      icons: [
        {
          "src": "assets/icons/icon-72x72.png",
          "sizes": "72x72",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-96x96.png",
          "sizes": "96x96",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-128x128.png",
          "sizes": "128x128",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-144x144.png",
          "sizes": "144x144",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-152x152.png",
          "sizes": "152x152",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-384x384.png",
          "sizes": "384x384",
          "type": "image/png",
          "purpose": "maskable any"
        },
        {
          "src": "assets/icons/icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable any"
        }
      ]
    }
  }
});
