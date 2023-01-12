<template>
  <div class="login">
    <div class="box">
      <h2>Login</h2>
      <form>
        <div class="input-box">
          <input type="text" name="" required="true" />
          <label>名前</label>
        </div>
        <div class="input-box">
          <input type="password" name="" required="true" />
          <label>パスワード</label>
        </div>
        <button type="submit" name="">送信</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return;
  },
});
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
.login {
  margin: 0;
  padding: 0;
  background: aqua;
  .box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    padding: 40px;
    background: rgba(0, 0, 0, 0.8);
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
        padding: 10px 0;
        font-size: 16px;
        color: white;
        margin-bottom: 30px;
        border: none;
        border-bottom: 1px solid white;
        outline: none;
        background: transparent;
        letter-spacing: 1px;
        &:focus ~ label,
        &:valid ~ label {
          top: -10px;
          left: 0;
          color: #03a9f4;
          font-size: 12px;
        }
      }
      label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 10px 0;
        font-size: 16px;
        color: white;
        pointer-events: none;
        transition: 0.5s;
      }
    }
  }
}
</style>
