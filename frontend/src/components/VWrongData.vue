<template>
  <div class="chart">
    <BarChart :chartData="testData" :options="options"></BarChart>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { BarChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
export default defineComponent({
  components: { BarChart },
  setup() {
    Chart.register(...registerables);
    const testData = {
      labels: ["1", "2", "3", "4", "5", "7", "8", "9", "10"],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: ["rgba(5, 52, 52, 0.5)"],
        },
      ],
    };

    const options = {
      responsive: true,
      chartArea: {
        backgroundColor: "white",
      },
      indexAxis: "y",
      scales: {
        y: {
          min: 0,
          max: 100,
          ticks: {
            color: "black",
          },
          grid: {
            color: "black",
          },
        },
        x: {
          ticks: {
            color: "black",
          },
          grid: {
            color: "black",
          },
        },
      },

      plugins: {
        customCanvasBackgroundColor: {
          color: "black",
        },
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "間違えた問題",
          font: { weight: "bold", size: 16 },
          padding: {
            top: 15,
            bottom: 15,
          },
          color: "black",
        },
      },
    };

    return { testData, options };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_function";
.chart {
  width: 90%;
  margin: 10px;
  @include mq(md) {
    width: 50%;
    margin: 50px;
  }
  background-color: rgba(68, 219, 219, 0.127); /* 背景色 */
  border-radius: 15px;
  backdrop-filter: blur(20px);
  padding: 10px;
}
</style>
