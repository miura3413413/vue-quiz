<template>
  <div class="login">
    <div class="box">
      <h2>ログイン</h2>
      <form @submit.prevent="login">
        <div class="input-box">
          <input type="text" name="" required="true" v-model="email" />
          <label>メールアドレス</label>
        </div>
        <div class="input-box">
          <input type="password" name="" required="true" v-model="password" />
          <label>パスワード</label>
        </div>
        <a href="/register">登録はこちら</a>
        <h1 v-if="errorMessage">{{ errorMessage }}</h1>
        <button type="submit" name="">ログイン</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  setup() {
    const state: {
      email: string;
      password: string;
      errorMessage: string;
    } = reactive({
      email: "",
      password: "",
      errorMessage: "",
    });
    const router = useRouter();
    const store = useStore();
    (function () {
      store.getters["user/getProperty"].id == 0 ? null : router.go(-1);
    })();

    const login = () => {
      axios
        .post(`${process.env.VUE_APP_API_URL}/api/auth/login`, {
          // .post(`http://localhost:3001/api/auth/login`, {
          email: state.email,
          password: state.password,
        })
        .then((response) => {
          console.log(response);
          store.commit("user/setUser", response.data);
          router.push("/");
        })
        .catch((err) => {
          state.errorMessage = err.response.data;
        });
      return;
    };
    return { ...toRefs(state), login };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_function";

.login {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-width: 100vh;
  @include flexCenter;
  background-image: url(../assets/image/istockphoto-1218473959-612x612.jpeg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  .box {
    position: relative;
    width: 450px;
    height: 550px;
    padding: 40px;
    backdrop-filter: blur(100px);
    background-color: rgba(83, 83, 83, 0.859);
    box-sizing: border-box;
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    h2 {
      margin: 0 0 30px;
      padding: 0;
      color: white;
      text-align: center;
    }
    .input-box {
      position: relative;
      input {
        width: 100%;
        height: 50px;
        padding: 10px;
        font-size: 16px;
        color: white;
        margin-bottom: 30px;
        border: none;
        border: 2px solid white;
        border-radius: 10px;
        outline: none;
        background: none;
        letter-spacing: 1px;
        box-sizing: border-box;
        &:focus,
        &:valid {
          border: 2px solid #03a9f4;
        }
        &:focus ~ label,
        &:valid ~ label {
          transform: translateY(-70%);
          color: #03a9f4;
          font-size: 12px;
          background-color: rgba(100, 100, 100, 0.859);
          padding: 0 8px;
          font-weight: bold;
        }
      }
      label {
        position: absolute;
        top: 4px;
        left: 20px;
        padding: 9px 0;
        font-size: 16px;
        color: white;
        pointer-events: none;
        transition: 0.5s;
      }
    }
    a {
      display: block;
      color: white;
      width: fit-content;
      margin: 0 0 0 auto;
      cursor: pointer;
      transition: 0.3s;
      &:hover {
        color: #03a9f4;
        text-decoration: underline #03a9f4;
      }
      &:active {
        opacity: 0.3;
      }
    }
    h1 {
      text-align: center;
      font-size: larger;
      color: red;
    }
    button {
      position: absolute;
      bottom: 30px;
      left: 50%;
      translate: (-50%);
      width: 120px;
      height: 40px;
      border-radius: 10px;
      color: gray;
      background-color: white;
      transition: 0.3s;
      font-weight: bold;
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05),
        0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1);
      &:hover {
        background-color: #03a8f4de;
        color: white;
      }
      &:active {
        transform: translate(3px, 5px);
        box-shadow: none;
      }
    }
  }
}
</style>
