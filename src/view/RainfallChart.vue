<template>
  <div id="center1-container">
    <div class="chart-title">openrank值与项目活跃度的关系</div>
        <RainfallChartContainer/>
  </div>
</template>

<script>
import RainfallChartContainer from '@/components/echart/rainfallChart'

export default {
  components: {
    RainfallChartContainer
  }
}
</script>

<style lang="scss" scoped>
#center1-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1vw;
  
  .chart-title {
    color: #05aef1;
    font-size: 3vh;
    text-align: center;
    font-weight: bold;
    margin-top: -2vh;
    margin-bottom: 2vh;
    padding: 1vh 0;
  }
  
  
}
</style> 