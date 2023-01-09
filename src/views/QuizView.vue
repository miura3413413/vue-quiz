<template>
  <div class="quiz">
    <div class="content">
      <div class="circle" :class="{ animation: isAnime }">
        <span style="--i: 1"><div class="one">1</div></span>
        <span style="--i: 2"><div class="two">2</div></span>
        <span style="--i: 3"><div class="three">3</div></span>
        <span style="--i: 4"><div class="for">4</div></span>
        <span style="--i: 5"><div class="five">5</div></span>
        <span style="--i: 6"><div class="six">6</div></span>
        <span style="--i: 7"><div class="seven">7</div></span>
        <span style="--i: 8"><div class="eight">8</div></span>
      </div>
    </div>

    <button @click="doAnime">a</button>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, toRefs, ref } from "vue";

export default defineComponent({
  components: {},
  setup() {
    // const state = reactive({
    //   radX: Math.sin(360),
    //   radY: "a" as string,
    // });
    // // state.name = "";
    // // state.age = "a";
    // return { ...toRefs(state) };
    const state: {
      isAnime: boolean;
      interval: number | null;
    } = reactive({
      isAnime: false,
      interval: null,
    });

    const doAnime = () => {
      if (state.isAnime == true || state.interval !== null) {
        return;
      }
      state.isAnime = true;
      state.interval = setInterval(() => {
        state.isAnime = false;
        clearInterval(state.interval as number);
        state.interval = null;
      }, 1000);
    };
    return { ...toRefs(state), doAnime };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_function";
@keyframes animate {
  0% {
    transform: perspective(1000px) rotateY(0deg);
  }
  100% {
    transform: perspective(1000px) rotateY(-45deg);
  }
}
.quiz {
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .animation {
      animation: animate 0.5s linear;
    }
    .circle {
      position: relative;
      width: 350px;
      height: 280px;
      transform-style: preserve-3d;
      transform: perspective(1000px) rotateY(0deg);

      span {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transform-origin: center;
        transform-style: preserve-3d;
        transform: rotateY(calc(var(--i) * 45deg)) translateZ(500px);
        div {
          width: 100%;
          height: 100%;
          border: 1px solid;
        }
      }
      .one {
        background: white;
      }
      .two {
        background: white;
      }
      .three {
        background: white;
      }
      .for {
        background: white;
      }
      .five {
        background: white;
      }
      .six {
        background: white;
      }
      .seven {
        background: white;
      }
      .eight {
        background: white;
      }
    }
  }
}
</style>
