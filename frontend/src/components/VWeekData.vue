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
      labels: ["月", "火", "水", "木", "金", "土", "日"],
      datasets: [
        {
          data: [30, 40, 60, 70, 5, 0, 10],
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(142, 255, 29,0.8)",
          ],
        },
      ],
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: true,
          text: "Chart.js Doughnut Chart",
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
}
</style>
