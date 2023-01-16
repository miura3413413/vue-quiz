<template>
  <VDefaultPage v-if="id == 0"></VDefaultPage>
  <VUserPage v-else></VUserPage>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import VDefaultPage from "@/components/VDefaultPage.vue";
import VUserPage from "@/components/VUserPage.vue";
import { useStore } from "vuex";
export default defineComponent({
  components: { VDefaultPage, VUserPage },

  setup() {
    const store = useStore();
    const state: {
      id: number;
      name: string;
    } = reactive({
      id: store.getters.getProperty.id,
      name: store.getters.getProperty.name,
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  background-image: url(../assets/image/99-998560_question-mark-background-vector-question-mark-quiz-background.jpeg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
}
</style>
