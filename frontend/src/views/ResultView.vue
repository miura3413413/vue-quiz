<template>
  <div class="result">
    <table :border="1">
      <caption>
        結果
      </caption>
      <thead>
        <th>番号</th>
        <th>問題</th>
        <th>正誤</th>
      </thead>
      <tbody>
        <tr v-for="n in data.length" :key="n">
          <td>{{ data[n - 1].id }}</td>
          <td>
            <div>
              {{ data[n - 1].text }}
            </div>
          </td>
          <td v-if="answer[n - 1] == 1">⭕️</td>
          <td v-else-if="answer[n - 1] == 0">✖️</td>
          <td v-else>➖</td>
        </tr>
      </tbody>
    </table>
    <button @click="route">ホームに戻る</button>
  </div>
</template>
<script lang="ts">
import Dummydata from "@/dummydata";
import { defineComponent, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";

import { useStore } from "vuex";

export default defineComponent({
  components: {},

  setup() {
    const store = useStore();
    const router = useRouter();
    const state: {
      data: Dummydata[];
      answer: number[];
    } = reactive({
      data: store.getters["question/getData"].data,
      answer: store.getters["question/getData"].answer,
    });

    const route = () => {
      router.push("/");
      store.commit("question/resetAnswer");
    };
    return { ...toRefs(state), route };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_function";
body {
  margin: 0;
}
.result {
  margin: 0;
  background-image: url(../assets/image/blue-question.jpeg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  min-width: 900px;
  table {
    border-collapse: collapse;
    margin: 0 20px 20px 20px;
    background-color: white;

    caption {
      font-size: xx-large;
      font-weight: bold;
      margin-top: 10px;
    }
    thead {
      font-size: large;
      th:nth-child(1) {
        width: 5%;
      }
      th:nth-child(2) {
        width: 90%;
      }
      th:nth-child(3) {
        width: 5%;
      }
    }
    tbody {
      tr {
        font-size: small;
        td:nth-child(1) {
          width: 5%;
          text-align: center;
        }
        td:nth-child(2) {
          div {
            width: 700px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        td:nth-child(3) {
          text-align: center;
        }
      }
    }
  }
  button {
    margin-left: 20px;
    border-radius: 20px;
    border: none;
    @include homeButtonCenter(rgba(0, 128, 60, 0.567));
    width: 200px;
    height: 50px;
  }
}
</style>
