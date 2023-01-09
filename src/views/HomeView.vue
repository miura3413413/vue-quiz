<template>
  <div class="home">
    <h1 class="title">応用情報技術者試験対策</h1>
    <button class="button" @click="home">スタート</button>
  </div>
</template>

<script lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
import { defineComponent, reactive, toRefs, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const home = () => {
      router.push("/quiz");
    };
    return {
      home,
    };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_font";
@import "../assets/scss/_function";

.home {
  .title {
    text-align: center;
    font-family: "ZenMaru";
  }
  .button {
    background-color: white;
    box-shadow: 0 5px 0 rgb(76, 76, 76);
    position: absolute;
    bottom: 50px;
    right: 100px;
    width: 300px;
    height: 50px;
    border-radius: 50px;
    font-size: larger;
    font-family: "ZenMaru";
    &:active {
      box-shadow: none;
      transform: translateY(5px);
    }
  }
}
</style>
