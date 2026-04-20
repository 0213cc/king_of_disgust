<template>
  <div id="card-container">
    <div class="chart-title">贡献者词云</div>
    <wordCloud :cdata="yourData" />
  </div>
</template>

<script>
import wordCloud from "@/components/wordCloud";
export default {
  components: {
    wordCloud
  },
};
</script>

<style lang="scss" scoped>
#card-container {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1vw;
  .chart-title {
    color: #B22222;  
    font-size: 3vh;
    text-align: center;
    font-weight: bold;
    margin-top: -2vh;
    margin-bottom: 2vh;
    padding: 1vh 0;
  }
}
</style>