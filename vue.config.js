const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/_variable.scss";`,
        additionalData: `@import "@/assets/scss/_function.scss";`,
        additionalData: `@import "@/assets/scss/_font.scss";`,
      },
    },
  },
});
