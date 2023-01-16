<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ text }}</p>
  </div>
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

<style scoped></style>
