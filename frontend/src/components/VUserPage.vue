<template>
  <div class="user-page">
    <h1 class="message">こんにちは {{ name }}さん</h1>
    <div class="charts">
      <VWeekData></VWeekData>
      <WrongData></WrongData>
    </div>
    <button class="button" @click="route">スタート</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import VWeekData from "@/components/VWeekData.vue";
import WrongData from "@/components/VWrongData.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default defineComponent({
  components: { VWeekData, WrongData },
  setup() {
    const store = useStore();
    const state: {
      name: string;
    } = reactive({
      name: store.getters["user/getProperty"].name,
    });
    const router = useRouter();
    const route = () => {
      router.push(`/quiz`);
    };
    return { ...toRefs(state), route };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_function";

.user-page {
  background-image: url(../assets/image/360_F_220891203_dVsGHE3dnjyWkifJw7nyxEIJZgEh3NTW.jpeg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  .message {
    margin: 0;
    text-align: center;
    padding-top: 10px;
  }
  .charts {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;
    @include mq(md) {
      flex-direction: row;
    }
  }
  .button {
    margin: 10px 0;
    @include homeButtonCenter(
      linear-gradient(to right, rgba(50, 66, 246, 0.8), rgba(0, 238, 255, 0.8))
    );
    border: 3px solid black;
    max-width: 250px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    &:hover {
      border: 3px solid white;
    }
  }
}
</style>
