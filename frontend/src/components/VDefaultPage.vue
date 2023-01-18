<template>
  <div class="home">
    <h1 class="title">応用情報技術者試験対策</h1>
    <div class="main">
      <div class="text-content">
        <h1 class="main-text">複数回出た問題だけ出題</h1>
        <h1 class="sub-text">ログインするとデータを集計</h1>
      </div>
      <div class="image-content">
        <img class="first-image" src="../assets/image/問題.png" alt="" />
        <img class="second-image" src="../assets/image/解説.png" alt="" />
      </div>
    </div>
    <div class="button-content">
      <div class="auth-button">
        <button class="login-button" @click="route('login')">ログイン</button>
        <button class="register-button" @click="route('register')">登録</button>
      </div>

      <button class="start-button" @click="route('quiz')">スタート</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {},
  setup() {
    const router = useRouter();
    const route = (destination: string) => {
      router.push(`/${destination}`);
    };
    return {
      route,
    };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_font";
@import "../assets/scss/_function";

.home {
  margin: 0;
  background-image: url(../assets/image/360_F_220891203_dVsGHE3dnjyWkifJw7nyxEIJZgEh3NTW.jpeg);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 100vh;
  .title {
    text-align: center;
    font-family: "ZenMaru-medium";
    margin: 0 10px 10px 10px;
    font-weight: bolder;
    font-size: 40px;
  }
  .main {
    display: flex;
    flex-direction: column;
    @include mq(md) {
      flex-direction: row;
    }
    .text-content {
      width: auto;
      padding: 30px;
      margin: 10px 5px 0 5px;
      box-sizing: border-box;
      backdrop-filter: blur(20px);
      background-color: rgba(207, 234, 240, 0.3);
      border-radius: 100px;
      @include mq(md) {
        width: 40%;
      }
      .main-text {
        font-size: 50px;
      }
      .sub-text {
        font-size: x-large;
      }
    }
    .image-content {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;

      @include mq(md) {
        width: 55%;
      }
      @include mq(sm) {
        flex-direction: row;
      }
      .first-image {
        width: 100%;
        margin: 5px;

        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05),
          0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1),
          8px 32px 32px rgba(0, 0, 0, 0.15), 8px 64px 64px rgba(0, 0, 0, 0.15);
        @include mq(sm) {
          width: 50%;
          &:active {
            transform: translateX(50%) scale(2);
            z-index: 1;
            transition-duration: 500ms;
          }
        }
        @include mq(md) {
          width: 50%;
          &:active {
            transform: translateY(100%) scale(2);
            transition-duration: 500ms;
            z-index: 1;
          }
        }
      }
      .second-image {
        width: 100%;
        margin: 5px;

        box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1), 0 1px 6px rgba(0, 0, 0, 0.05),
          0 8px 8px rgba(0, 0, 0, 0.1), 0 16px 16px rgba(0, 0, 0, 0.1),
          8px 32px 32px rgba(0, 0, 0, 0.15), 8px 64px 64px rgba(0, 0, 0, 0.15);
        @include mq(sm) {
          width: 50%;
          &:active {
            transform: translateX(-50%) scale(2);
            z-index: 1;
            transition-duration: 500ms;
          }
        }
        @include mq(md) {
          width: 50%;
          transform: translateY(100%);
          &:active {
            transform: translate(-100%, 100%) scale(2);
            z-index: 1;
            transition-duration: 500ms;
          }
        }
      }
    }
  }
  .button-content {
    width: 100%;
    margin: 10px;
    @include mq(sm) {
      width: 100%;
    }
    @include mq(md) {
      width: 600px;
      position: absolute;
      bottom: 0;
    }

    .auth-button {
      display: flex;
      flex-direction: column;
      .login-button {
        margin: 10px 0;
        @include homeButtonCenter(rgba(50, 66, 246, 0.8));
      }
      .register-button {
        margin: 10px 0;
        @include homeButtonCenter(rgba(0, 238, 255, 0.8));
      }
    }
    .start-button {
      margin: 10px 0;
      @include homeButtonCenter(
        linear-gradient(
          to right,
          rgba(50, 66, 246, 0.8),
          rgba(0, 238, 255, 0.8)
        )
      );
      border: 3px solid black;
      &:hover {
        border: 3px solid white;
      }
    }
  }
}
</style>
