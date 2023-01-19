<template>
  <div class="chart">
    <BarChart :chartData="testData"></BarChart>
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
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          data: [30, 40, 60, 70, 5],
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
          ],
        },
      ],
    };

    return { testData };
  },
});
</script>

<style lang="scss">
@import "../assets/scss/_function";
.chart {
  width: 100%;
  @include mq(md) {
    width: 50%;
  }
}
</style>
