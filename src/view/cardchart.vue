<template>
        <div id="card-container">
          <div class="chart-title">时间序列分布</div>
          <CardChartContainer/>
        </div>
  </template>
  <script>
  import CardChartContainer from '@/components/echart/cardchart'
  export default {
    components: {
      CardChartContainer
    }
  }
  </script>

  <style lang="scss" scoped>
  #card-container {
    height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1vw;
    
    .chart-title {
      color: #4B0082;  // 靛青色(Indigo)
      font-size: 3vh;
    text-align: center;
    font-weight: bold;
    margin-top: -2vh;
    margin-bottom: 2vh;
    padding: 1vh 0;
    }
  }
  </style>
