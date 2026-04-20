<template>
  <div>
    <CodeChangeChartContent :cdata="chartData" />
  </div>
</template>

<script>
import CodeChangeChartContent from './chart.vue'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
  name: 'CodeChangeChartContainer',
  components: {
    CodeChangeChartContent
  },
  data() {
    return {
      chartData: {
    "timeData": [
        "2015",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
        "2023",
        "2024"
    ],
    "addData": [
        182914,
        294861,
        519203,
        879381,
        1850423,
        1965241,
        1382637,
        4237393,
        3233713,
        1895355
    ],
    "removeData": [
        55706,
        112886,
        182147,
        396519,
        1438759,
        1226965,
        505645,
        2647973,
        2593570,
        1744213
    ],
    "sumData": [
        127208,
        181975,
        337056,
        482862,
        411664,
        738276,
        876992,
        1589420,
        640143,
        151142
    ]
}
    }
  },
  computed: {
    ...mapState(['currentRepository'])
  },
  methods: {
    async fetchData(path) {
      const datePattern = /^\d{4}-(0[1-9]|1[0-2])$/;
      const filterData = (datas) => {
        let filteredDatas = {};
        for (const key in datas) {
          if (datePattern.test(key)) {
            // 提取年份
            const year = key.split('-')[0];
            if (!filteredDatas[year]) {
              filteredDatas[year] = 0;
            }
            // 累加该年份的数据
            filteredDatas[year] += datas[key];
          }
        }
        return filteredDatas;
      }

      let addResponse = await axios.get(path + '/code_change_lines_add.json');
      let addData = await addResponse.data;
      addData = filterData(addData);
      
      let removeResponse = await axios.get(path + '/code_change_lines_remove.json');
      let removeData = await removeResponse.data;
      removeData = filterData(removeData);

      let sumResponse = await axios.get(path + '/code_change_lines_sum.json');
      let sumData = await sumResponse.data;
      sumData = filterData(sumData);

      // 获取所有的年份
      let years = new Set([
        ...Object.keys(addData),
        ...Object.keys(removeData),
        ...Object.keys(sumData)
      ]);
      
      // 按年份排序
      let sortedYears = Array.from(years).sort();

      // 创建新的数据对象
      let data = {
        timeData: sortedYears,
        addData: sortedYears.map(year => addData[year] || 0),
        removeData: sortedYears.map(year => removeData[year] || 0),
        sumData: sortedYears.map(year => sumData[year] || 0)
      }

      return data
    }
  },
  watch: {
    currentRepository: {
      handler: async function (newVal) {
        this.chartData = await this.fetchData('https://oss.x-lab.info/open_digger/github/' + newVal);
      },
      deep: true
    }
  }
}
</script> 