<template>
  <div class="quiz">
    <div class="content">
      <div class="circle" :class="{ animation: isSlide }">
        <div class="slide" v-for="n in 7" :key="n" :style="{ '--i': n }">
          <span class="test"></span>
          <div class="sub">
            <img
              class="image"
              src="../assets/image/animal_study_usagi.png"
              alt=""
            />
          </div>
        </div>
        <div class="slide" style="--i: 8">
          <div class="back" :class="{ animationOpen: isTurn }">
            <h2 class="title">解説</h2>
            <h2 class="text">{{ data[questionCount].explanation }}</h2>
            <button
              v-if="questionCount == data.length - 1"
              class="button"
              @click="isSelected && nextPage()"
            >
              結果を見る
            </button>
            <button
              v-else
              class="button"
              @click="
                doAnime(700);
                nextPage();
              "
            >
              次の問題
            </button>
          </div>
        </div>
        <div class="slide" style="--i: 8">
          <div class="main" :class="{ test: isTurn }">
            <h2 class="title">問題{{ questionCount + 1 }}</h2>
            <div class="sentence-wrapper">
              <h2 class="text">{{ data[questionCount].text }}</h2>
              <div class="choice-wrapper">
                <div
                  class="choice"
                  v-for="(choice, index) in data[questionCount].choice"
                  :key="index"
                >
                  <button
                    class="choice-button"
                    @click="isSelected || checkTheAnswer(index)"
                    v-if="index === 0"
                  >
                    ア
                  </button>
                  <button
                    class="choice-button"
                    @click="isSelected || checkTheAnswer(index)"
                    v-else-if="index === 1"
                  >
                    イ
                  </button>
                  <button
                    class="choice-button"
                    @click="isSelected || checkTheAnswer(index)"
                    v-else-if="index === 2"
                  >
                    ウ
                  </button>
                  <button
                    class="choice-button"
                    @click="isSelected || checkTheAnswer(index)"
                    v-else
                  >
                    エ
                  </button>
                  <h2 class="choice-text">{{ choice }}</h2>
                  <div v-if="isCollect == index" class="collect"></div>
                  <VIcon v-else-if="isCollect < 4"></VIcon>
                </div>
              </div>
            </div>
            <div class="button-wrapper" :class="{ opacity: !isSelected }">
              <button class="button" @click="isSelected && doAnime(2000)">
                解説
              </button>
              <button
                v-if="questionCount == data.length - 1"
                class="button"
                @click="isSelected && nextPage()"
              >
                結果を見る
              </button>
              <button
                v-else
                class="button"
                @click="
                  isSelected && doAnime(700);
                  isSelected && nextPage();
                "
              >
                次の問題
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Dummydata from "@/dummydata";
import { useRouter } from "vue-router";
import VIcon from "@/components/VIcon.vue";
import { useStore } from "vuex";
import axios from "axios";

export default defineComponent({
  components: { VIcon },
  setup() {
    const store = useStore();
    const router = useRouter();

    const state: {
      isSlide: boolean;
      isTurn: boolean;
      isSelected: boolean;
      interval: number | null;
      data: Dummydata[];
      questionCount: number;
      isCollect: number;
      blur: string;
      answer: number[];
      id: number;
    } = reactive({
      isSlide: false,
      isTurn: false,
      isSelected: false,
      interval: null,
      data: store.getters["question/getData"].data,
      questionCount: store.getters["question/getData"].questionCount,
      isCollect: 4,
      blur: "blur(20px)",
      answer: store.getters["question/getData"].answer,
      id: store.getters["user/getProperty"].id,
    });

    const doAnime = (second: 700 | 2000) => {
      if (state.isSlide == true || state.interval !== null) {
        return;
      }
      //700秒は次の問題2000秒は解説
      second == 700 ? (state.isSlide = true) : (state.isTurn = true);
      state.interval = setTimeout(() => {
        state.isSlide = false;
        clearInterval(state.interval as number);
        state.interval = null;
      }, second); //アニメーションを待つ
      second == 700 && (state.isTurn = false);
      state.blur = "blur(0px)";
    };

    const nextPage = () => {
      if (state.questionCount == state.data.length - 1) {
        //解いた問題数を登録する
        if (state.id != 0) {
          axios
            // .post(`http://localhost:3001/api/set_data/solved`, {
            .post(`${process.env.VUE_APP_API_URL}/api/set_data/solved`, {
              id: state.id,
              solved: state.questionCount + 1,
            })
            .then((response) => {
              console.log("成功");
            })
            .catch((err) => {
              console.log(err);
            });
        }
        store.commit("question/resetCount");
        router.push("/result");
      } else {
        state.questionCount += 1;
        store.commit("question/incrementCount");
      }
      //初期化
      state.isSelected = false;
      state.isCollect = 4;
      state.blur = "blur(20px)";
    };

    const checkTheAnswer = (index: number) => {
      if (
        state.data[state.questionCount].choice[index] ==
        state.data[state.questionCount].answer
      ) {
        //正解
        console.log("正解");
        store.commit("question/pushAnswer", 1);
      } else {
        //不正解
        console.log("ふ正解");
        store.commit("question/pushAnswer", 0);
      }

      const collectIndex = state.data[state.questionCount].choice.indexOf(
        state.data[state.questionCount].answer
      );
      state.isCollect = collectIndex;
      setTimeout(() => {
        state.isSelected = true;
      }, 1000); //アニメーションを待つ
      return;
    };

    return { ...toRefs(state), doAnime, nextPage, checkTheAnswer };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_function";

//左に45度回転
@keyframes animate45 {
  0% {
    transform: perspective(1100px) rotateY(0deg);
  }
  100% {
    transform: perspective(1100px) rotateY(-45deg);
  }
}
//左に90度回転
@keyframes animate90 {
  0% {
    transform: perspective(1100px) rotateY(0deg);
  }
  100% {
    transform: perspective(1100px) rotateY(-90deg);
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
body {
  margin: 0;
  .quiz {
    height: 100vh;
    min-height: 600px;
    background-image: url(../assets/image/hatena35.png);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      .animation {
        animation: animate90 0.5s;
        @include mq(md) {
          animation: animate45 0.5s;
        }
      }
      .circle {
        position: relative;
        width: 60%;
        height: 280px;
        transform-style: preserve-3d; //3d
        transform: perspective(1100px); //要素と画面の距離(手前)
        @include mq(sm) {
          width: 40%;
        }
        @include mq(md) {
          width: 400px;
        }
        .slide {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform-origin: center;
          transform-style: preserve-3d;
          pointer-events: none;
          transform: rotateY(calc(var(--i) * 90deg)) translateZ(400px); //初期位置 translateZは親要素からの距離(奥)
          @include mq(md) {
            transform: rotateY(calc(var(--i) * 45deg)) translateZ(550px);
          }

          .sub {
            width: 100%;
            height: 100%;
            border: 1px solid;
            @include flexCenter;
            background-color: white;
            border-radius: 10px;
            backdrop-filter: blur(20px);
            background-color: rgba(255, 255, 255, 0.634);

            box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
            border: 2px rgba(255, 255, 255, 0.4) solid;
            border-bottom: 2px rgba(40, 40, 40, 0.35) solid;
            border-right: 2px rgba(40, 40, 40, 0.35) solid;
            .image {
              width: 50%;
              height: 50%;
              backface-visibility: visible;
              object-fit: contain;
            }
          }
          .back {
            width: 100%;
            height: 100%;
            background: white;
            height: 100%;
            position: relative;
            border: 1px solid;
            border-radius: 10px;
            background-color: rgba(255, 255, 255, 0.789);
            box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
            border: 2px rgba(255, 255, 255, 0.4) solid;
            border-bottom: 2px rgba(40, 40, 40, 0.35) solid;
            border-right: 2px rgba(40, 40, 40, 0.35) solid;
            .title {
              @include titleCenter;
            }
            .text {
              position: relative;
              font-size: 1vh;
              margin: 0;
              padding: 0 6px;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 15; /* 制限したい行数が3の場合 */
              overflow: hidden;
            }
            .button {
              @include quizButtonCenter(23px, 100px, xx-small);
              pointer-events: auto;
              position: absolute;
              bottom: 4px;
              left: 50%;
              margin-left: -50px; //ボタンのwidth/2
            }
            h2 {
              position: absolute;
              font-size: medium;
              top: 0;
              margin: 0;
              text-align: center;
            }
          }
          .main {
            width: 100%;
            height: 100%;
            border: 1px solid;
            background: white;
            height: 100%;
            position: relative;
            border-radius: 10px;
            backdrop-filter: v-bind(blur);
            background-color: rgba(255, 255, 255, 0.634);
            box-shadow: rgba(0, 0, 0, 0.3) 2px 8px 8px;
            border: 2px rgba(255, 255, 255, 0.4) solid;
            border-bottom: 2px rgba(40, 40, 40, 0.35) solid;
            border-right: 2px rgba(40, 40, 40, 0.35) solid;
            .title {
              @include titleCenter;
            }
            .sentence-wrapper {
              position: relative;
              height: 91%;
              padding: 0 6px;
              .text {
                font-size: 1vh;
                height: 50%;
                margin: 0;
                padding: 0;
                vertical-align: top;
              }
              .choice-wrapper {
                width: 100%;
                height: 40%;
                bottom: 15px;
                display: flex;
                flex-wrap: wrap;
                padding: 0;
                .choice {
                  width: 50%;
                  display: flex;
                  position: relative;
                  .choice-button {
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    pointer-events: auto;
                    font-size: 1vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    background-color: white;
                    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.29);
                    border: 1px solid;
                    transition: 0.2s;
                    cursor: pointer;
                    &:active {
                      transform: translateY(2px);
                      box-shadow: 0 0 1px rgba(0, 0, 0, 0.15);
                    }
                  }
                  .choice-text {
                    font-size: 1vh;
                    margin: 0;
                  }
                  .collect {
                    position: absolute;
                    width: 25px;
                    height: 25px;
                    top: -4px;
                    left: -5px;
                    border-radius: 50%;
                    border: 2px solid red;
                  }
                }
              }
            }
            .button-wrapper {
              width: 100%;
              position: absolute;
              bottom: 4px;
              display: flex;
              justify-content: center;
              .button {
                @include quizButtonCenter(23px, 90px, xx-small);
                pointer-events: auto;
              }
            }
          }
        }
        .opacity {
          opacity: 0.2;
        }
        .animationOpen {
          animation: animate359 3s;
          transform-origin: top;
          animation-fill-mode: forwards; // 最後の状態
          backdrop-filter: blur(10px);
        }
      }
    }
  }
}
</style>
