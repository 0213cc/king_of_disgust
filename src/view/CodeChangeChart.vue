<template>
  <div id="code-change-container">
    <div class="chart-title">代码变更统计</div>
        <CodeChangeChartContainer/>
  </div>
</template>

<script>
import CodeChangeChartContainer from '@/components/echart/codeChangeChart'

export default {
  components: {
    CodeChangeChartContainer
  }
}
</script>

<style lang="scss" scoped>
#code-change-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1vw;
  
  .chart-title {
    color: #0270ca;
    font-size: 3vh;
    text-align: center;
    font-weight: bold;
    margin-top: -2vh;
    margin-bottom: 2vh;
    padding: 1vh 0;
  }
  
  
}
</style> 