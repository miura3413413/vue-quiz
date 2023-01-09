<template>
  <div class="quiz">
    <div class="content">
      <div class="circle" :class="{ animation: isSlide }">
        <span style="--i: 1"
          ><div class="sub">
            <img
              class="image"
              src="../assets/image/animal_study_usagi.png"
              alt=""
            /></div
        ></span>
        <span style="--i: 2"
          ><div class="sub">
            <img
              class="image"
              src="../assets/image/animal_study_usagi.png"
              alt=""
            /></div
        ></span>
        <span style="--i: 3"
          ><div class="sub">
            <img
              class="image"
              src="../assets/image/animal_study_usagi.png"
              alt=""
            /></div
        ></span>
        <span style="--i: 4"
          ><div class="sub">
            <img
              class="image"
              src="../assets/image/animal_study_usagi.png"
              alt=""
            /></div
        ></span>
        <span style="--i: 5"
          ><div class="sub">
            <img
              class="image"
              src="../assets/image/animal_study_usagi.png"
              alt=""
            /></div
        ></span>
        <span style="--i: 6"
          ><div class="sub">
            <img
              class="image"
              src="../assets/image/animal_study_usagi.png"
              alt=""
            /></div
        ></span>
        <span style="--i: 7"
          ><div class="sub">
            <img
              class="image"
              src="../assets/image/animal_study_usagi.png"
              alt=""
            /></div
        ></span>
        <span style="--i: 8"
          ><div class="back" :class="{ animationOpen: isTurn }">
            <h2>解説</h2>
            <button class="button" @click="doAnime(700)">次の問題</button>
          </div></span
        >
        <span style="--i: 8"
          ><div class="main">
            <h2>問題</h2>
            <div class="sentence-wrapper">
              <h2 class="text">{{ data[0].text }}</h2>
              <ul class="choice-wrapper">
                <button class="choice">ア{{ data[0].choice[0] }}</button>
                <button class="choice">イ{{ data[0].choice[1] }}</button>
                <button class="choice">ウ{{ data[0].choice[2] }}</button>
                <button class="choice">エ{{ data[0].choice[3] }}</button>
              </ul>
            </div>
            <div class="button-wrapper">
              <button class="button" @click="doAnime(2000)">解説</button>
              <button class="button" @click="doAnime(700)">次の問題</button>
            </div>
          </div></span
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";
import dummydata from "@/assets/dummyData.json";
import Dummydata from "@/dummydata";
export default defineComponent({
  setup() {
    const state: {
      isSlide: boolean;
      isTurn: boolean;
      interval: number | null;
      data: Dummydata[];
    } = reactive({
      isSlide: false,
      isTurn: false,
      interval: null,
      data: dummydata,
    });

    const doAnime = (second: 700 | 2000) => {
      if (state.isSlide == true || state.interval !== null) {
        return;
      }
      second == 700 ? (state.isSlide = true) : (state.isTurn = true);
      state.interval = setInterval(() => {
        state.isSlide = false;
        clearInterval(state.interval as number);
        state.interval = null;
      }, second);
      second == 700 && (state.isTurn = false);
    };

    return { ...toRefs(state), doAnime };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_function";

//左に45度回転
@keyframes animate45 {
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }
  100% {
    transform: perspective(1000px) rotateY(-45deg);
  }
}
//左に90度回転
@keyframes animate90 {
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }
  100% {
    transform: perspective(1000px) rotateY(-90deg);
  }
}
//後ろから目に1回転
@keyframes animate359 {
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateX(-359deg);
  }
}
.quiz {
  height: 100%;
  width: 100%;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    .animation {
      animation: animate90 0.5s;
      @include mq(md) {
        animation: animate45 0.5s;
      }
    }
    .circle {
      position: relative;
      width: 40%;
      height: 280px;
      transform-style: preserve-3d; //3d
      transform: perspective(1000px); //要素と画面の距離(手前)
      @include mq(sm) {
        width: 40%;
      }
      @include mq(md) {
        width: 400px;
      }
      span {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: center;
        transform-style: preserve-3d;
        pointer-events: none;
        transform: rotateY(calc(var(--i) * 90deg)) translateZ(500px); //初期位置 translateZは親要素からの距離(奥)
        @include mq(md) {
          transform: rotateY(calc(var(--i) * 45deg)) translateZ(550px);
        }
        div {
          width: 100%;
          height: 100%;
          border: 1px solid;
          @include flexCenter;
          .image {
            width: 50%;
            height: 50%;
            backface-visibility: visible;
            object-fit: contain;
          }
        }
      }
      .sub {
        background: white;
      }
      .animationOpen {
        animation: animate359 3s;
        transform-origin: top;
        animation-fill-mode: forwards; // 最後の状態
      }
      .main {
        background: white;
        display: block;
        height: 100%;
        position: relative;
        h2 {
          position: absolute;
          font-family: "ZenMaru-light";
          font-size: medium;
          left: 0;
          right: 0;
          margin: auto;
          text-align: center;
        }
        div {
          position: relative;
          .text {
            @include mq(tb) {
              font-size: medium;
            }
            font-size: x-small;
            position: absolute;
            top: 20px;
          }
          .choice-wrapper {
            position: absolute;
            bottom: 15px;
            display: flex;

            flex-wrap: wrap;
            padding: 0;

            .choice {
              width: 50%;
              list-style: none;
              text-align: left;
              background-color: white;
              @include buttonCenter(23px, 50%, xx-small);
              pointer-events: auto;
              margin: 2px 0;
              font-size: 10px;
              transform: scale(0.8);
              transform-origin: 0, 0;
              @include mq(tb) {
                font-size: x-small;
              }
            }
          }
        }
        .button-wrapper {
          position: absolute;
          border: none;
          height: fit-content;
          bottom: 4px;
          .button {
            @include buttonCenter(23px, 100px, xx-small);
            pointer-events: auto;
          }
        }
      }
      .back {
        background: white;
        height: 100%;
        position: relative;
        .button {
          @include buttonCenter(23px, 120px, xx-small);
          transform: translateY();
          pointer-events: auto;
          position: absolute;
          bottom: 4px;
        }
        h2 {
          position: absolute;
          font-family: "ZenMaru-light";
          font-size: medium;
          top: 0;
          margin: 0;
          text-align: center;
        }
      }
    }
  }
}
</style>
