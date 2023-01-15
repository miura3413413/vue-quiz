<template>
  <div class="incorrect"></div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "default value",
    },
  },

  setup() {
    const state = reactive({
      text: "Have a good day!",
    });
    return { ...toRefs(state) };
  },
});
</script>

<style lang="scss">
@keyframes animation {
  from {
    height: 0px;
  }
  to {
    height: 24px;
  }
}

.incorrect {
  position: absolute;
  left: 9px;
  &:before {
    content: "";
    position: absolute;
    width: 2px;
    /* height: 24px; */

    background-color: red;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    animation: animation 0.5s forwards;
    animation-delay: 0.5s;
  }
  &:after {
    content: "";
    position: absolute;

    width: 2px;
    /* height: 24px; */
    background-color: red;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    animation: animation 0.5s forwards;
  }
}
</style>
