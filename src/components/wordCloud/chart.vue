<template>
  <div :id="chartId" class="chart-container"></div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud';

export default {
  data() {
    return {
      chartId: 'wordCloudChart',
      chart: null,
      colorList: [
        '#FF6B6B', // 鲜红色
        '#4ECDC4', // 青绿色
        '#45B7D1', // 天蓝色
        '#96CEB4', // 薄荷绿
        '#FFBE0B', // 明黄色
        '#FF006E', // 亮粉色
        '#8338EC', // 紫色
        '#3A86FF', // 亮蓝色
        '#FB5607', // 橙色
        '#00F5D4'  // 青色
      ]
    };
  },
  props: {
    cdata: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    initChart() {
      const chartDom = document.getElementById(this.chartId);
      if (!chartDom) return;
      
      this.chart = echarts.init(chartDom);
      this.updateChart(this.cdata);
    },
    updateChart(data) {
      if (!this.chart) return;

      const options = {
        tooltip: {
          show: true,
          formatter: function (params) {
            let value = parseFloat(params.value).toFixed(1);
            return `${params.name}贡献值: ${value}`;
          }
        },
        series: [{
          type: 'wordCloud',
          shape: 'circle',
          gridSize: 1,
          sizeRange: [15, 80],
          rotationRange: [-60, 60],
          drawOutOfBound: false,
          layoutAnimation: true,
          textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: () => {
              return this.colorList[Math.floor(Math.random() * this.colorList.length)];
            }
          },
          width: '100%',
          height: '100%',
          emphasis: {
            focus: 'self',
            textStyle: {
              shadowBlur: 10,
              shadowColor: '#333'
            }
          },
          data: data.map(item => ({
            name: item.name,
            value: item.value,
            textStyle: {
              color: this.colorList[Math.floor(Math.random() * this.colorList.length)]
            }
          }))
        }]
      };
      
      this.chart.setOption(options);
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.updateChart(newData);
      },
      immediate: true,
      deep: true,
    }
  },
  mounted() {
    this.initChart();
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.dispose();
      this.chart = null;
    }
  }
};
</script>
<style scoped>

.chart-container {

  position: absolute;

  top: 6vh;

  left: 0;

  right: 0;

  bottom: 3vh;

  will-change: transform;

}

</style>