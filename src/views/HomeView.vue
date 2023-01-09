<template>
  <div class="home">
    <h1 class="title">応用情報技術者試験対策</h1>
    <button class="button" @click="home">スタート</button>
  </div>
</template>

<script lang="ts">
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
    font-family: "ZenMaru-medium";
  }
  .button {
    position: absolute;
    bottom: 50px;
    right: 5vh;

    @include buttonCenter(50px, 300px, large);
  }
}
</style>
