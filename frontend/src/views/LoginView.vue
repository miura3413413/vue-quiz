<template>
  <div class="login">
    <div class="box">
      <h2>ログイン</h2>
      <form @submit="register">
        <div class="input-box">
          <input type="text" name="" required="true" />
          <label>メールアドレス</label>
        </div>
        <div class="input-box">
          <input type="password" name="" required="true" />
          <label>パスワード</label>
        </div>
        <a>登録はこちら</a>
        <button type="submit" name="">ログイン</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import axios from "axios";
export default defineComponent({
  setup() {
    const state: {
      name: string;
      password: string;
    } = reactive({
      name: "",
      password: "",
    });
    const register = () => {
      axios.post("http://localhost:5000/api/auth", {
        name: state.name,
        password: state.password,
      });
      return;
    };
    return { ...toRefs(state), register };
  },
});
</script>

<style lang="scss">
.login {
  margin: 0;
  padding: 0;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    padding: 40px;
    background: gray;
    box-sizing: border-box;
    box-shadow: 0px 15px 25px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
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
          background: gray;
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
    button {
      margin-top: 50%;
      margin-left: 50%;
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
      &:hover {
        background-color: #03a8f4de;
        color: white;
      }
      &:active {
        opacity: 0.4;
        color: white;
      }
    }
  }
}
</style>
