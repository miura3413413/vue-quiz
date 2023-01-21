<template>
  <!-- <VDefaultPage v-if="id == 0"></VDefaultPage>
  <VUserPage v-else></VUserPage> -->
  <VUserPage></VUserPage>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import VDefaultPage from "@/components/VDefaultPage.vue";
import VUserPage from "@/components/VUserPage.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { VUserPage },
  // components: { VDefaultPage, VUserPage },

  setup() {
    const store = useStore();
    const state: {
      id: number;
      name: string;
    } = reactive({
      id: store.getters["user/getProperty"].id,
      name: store.getters["user/getProperty"].name,
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
}
</style>
