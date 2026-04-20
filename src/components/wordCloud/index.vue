<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
import { mapState } from 'vuex'
import axios from 'axios'
export default {
  data() {
    return {
      cdata: [
        {
          "name": "303394539",
          "value": 15.05
        },
        {
          "name": "1123612483",
          "value": 11.16
        },
        {
          "name": "1247748612",
          "value": 12.81
        },
        {
          "name": "ibigbug",
          "value": 27.980000000000004
        },
        {
          "name": "simaQ",
          "value": 22.299999999999997
        },
        {
          "name": "yiminghe",
          "value": 99.38
        },
        {
          "name": "sorrycc",
          "value": 50.28000000000001
        },
        {
          "name": "warmhug",
          "value": 55.879999999999995
        },
        {
          "name": "zhujun24",
          "value": 25.89
        },
        {
          "name": "jljsj33",
          "value": 208.26000000000005
        },
        {
          "name": "shepherdwind",
          "value": 11.48
        },
        {
          "name": "benjycui",
          "value": 440.49
        },
        {
          "name": "dqaria",
          "value": 11.18
        },
        {
          "name": "zinkey",
          "value": 19.04
        },
        {
          "name": "crazyair",
          "value": 128.76999999999998
        },
        {
          "name": "krishangoelmt",
          "value": 12.29
        },
        {
          "name": "ionshaw",
          "value": 30.240000000000006
        },
        {
          "name": "specialorange",
          "value": 10.86
        },
        {
          "name": "Thanaen",
          "value": 10.11
        },
        {
          "name": "nicu-chiciuc",
          "value": 12.06
        },
        {
          "name": "crawler-django",
          "value": 14.31
        },
        {
          "name": "hugobarragon",
          "value": 11.48
        },
        {
          "name": "sdhr27",
          "value": 17.72
        },
        {
          "name": "kaysonwu",
          "value": 29.2
        },
        {
          "name": "jhoneybee",
          "value": 22.68
        },
        {
          "name": "mjfwebb",
          "value": 19.450000000000003
        },
        {
          "name": "phoema",
          "value": 22.259999999999998
        },
        {
          "name": "wendellhu95",
          "value": 19.86
        },
        {
          "name": "Stephen2",
          "value": 11.030000000000001
        },
        {
          "name": "susiwen8",
          "value": 15.7
        },
        {
          "name": "request-info[bot]",
          "value": 11.55
        },
        {
          "name": "renovate[bot]",
          "value": 86.91
        },
        {
          "name": "alxkosov",
          "value": 17.85
        },
        {
          "name": "dependabot-preview[bot]",
          "value": 70.52
        },
        {
          "name": "rdmclin2",
          "value": 15.43
        },
        {
          "name": "devuxer",
          "value": 17.96
        },
        {
          "name": "lgtm-com[bot]",
          "value": 36.099999999999994
        },
        {
          "name": "k983551019",
          "value": 16.090000000000003
        },
        {
          "name": "todo[bot]",
          "value": 29.57
        },
        {
          "name": "zgoby",
          "value": 15.620000000000001
        },
        {
          "name": "Kermit-Xuan",
          "value": 74.5
        },
        {
          "name": "zouxiaomingya",
          "value": 14.92
        },
        {
          "name": "weekly-digest[bot]",
          "value": 12.110000000000001
        },
        {
          "name": "liangchaofei",
          "value": 10.11
        },
        {
          "name": "lhx6538665",
          "value": 10.1
        },
        {
          "name": "shaodahong",
          "value": 196.75000000000003
        },
        {
          "name": "binyellow",
          "value": 23.470000000000006
        },
        {
          "name": "Jiang-Xuan",
          "value": 11.48
        },
        {
          "name": "chenyizhongx",
          "value": 13.850000000000001
        },
        {
          "name": "jeessy2",
          "value": 16.39
        },
        {
          "name": "xrkffgg",
          "value": 415.08000000000004
        },
        {
          "name": "fa93hws",
          "value": 16.47
        },
        {
          "name": "xjh22222228",
          "value": 14.55
        },
        {
          "name": "ohhoney1",
          "value": 10.84
        },
        {
          "name": "orzyyyy",
          "value": 50.720000000000006
        },
        {
          "name": "Mohamed-Ghanem",
          "value": 12.72
        },
        {
          "name": "saeedrahimi",
          "value": 35.53
        },
        {
          "name": "keithort",
          "value": 17.94
        },
        {
          "name": "StallionV",
          "value": 18.25
        },
        {
          "name": "thisrabbit",
          "value": 11.010000000000002
        },
        {
          "name": "maxmeng93",
          "value": 15.120000000000001
        },
        {
          "name": "ShawDanon",
          "value": 16.72
        },
        {
          "name": "PeachScript",
          "value": 87.38
        },
        {
          "name": "eslint-disable-watcher[bot]",
          "value": 12.83
        },
        {
          "name": "ISBN9527",
          "value": 20.17
        },
        {
          "name": "theDoinb",
          "value": 10.9
        },
        {
          "name": "wangzongming",
          "value": 10.24
        },
        {
          "name": "hsuanxyz",
          "value": 12.24
        },
        {
          "name": "iicdii",
          "value": 10.94
        },
        {
          "name": "theprimone",
          "value": 11.93
        },
        {
          "name": "Rustin-Liu",
          "value": 49.209999999999994
        },
        {
          "name": "l745230",
          "value": 19.62
        },
        {
          "name": "JounQin",
          "value": 14.920000000000002
        },
        {
          "name": "huntdream",
          "value": 13.22
        },
        {
          "name": "codesandbox[bot]",
          "value": 227.3
        },
        {
          "name": "depfu[bot]",
          "value": 25.449999999999996
        },
        {
          "name": "liuchao233",
          "value": 10.93
        },
        {
          "name": "fengyun2",
          "value": 24.990000000000002
        },
        {
          "name": "mgcrea",
          "value": 10.88
        },
        {
          "name": "iamkun",
          "value": 15.530000000000001
        },
        {
          "name": "admiao",
          "value": 11.57
        },
        {
          "name": "lich-yoo",
          "value": 16.950000000000003
        },
        {
          "name": "abdih",
          "value": 10.81
        },
        {
          "name": "Catsbe",
          "value": 13.13
        },
        {
          "name": "GuichiZhao",
          "value": 10.97
        },
        {
          "name": "Rain120",
          "value": 10.56
        },
        {
          "name": "fred8617",
          "value": 12.13
        },
        {
          "name": "zhangzhi93",
          "value": 17.57
        },
        {
          "name": "piyushk96",
          "value": 19.36
        },
        {
          "name": "myeunhyuk",
          "value": 26.12
        },
        {
          "name": "crazyair",
          "value": 128.76999999999998
        },
        {
          "name": "krishangoelmt",
          "value": 12.29
        },
        {
          "name": "ionshaw",
          "value": 30.240000000000006
        },
        {
          "name": "specialorange",
          "value": 10.86
        },
        {
          "name": "Thanaen",
          "value": 10.11
        },
        {
          "name": "nicu-chiciuc",
          "value": 12.06
        },
        {
          "name": "crawler-django",
          "value": 14.31
        },
        {
          "name": "hugobarragon",
          "value": 11.48
        },
        {
          "name": "sdhr27",
          "value": 17.72
        },
        {
          "name": "kaysonwu",
          "value": 29.2
        },
        {
          "name": "jhoneybee",
          "value": 22.68
        },
        {
          "name": "mjfwebb",
          "value": 19.450000000000003
        },
        {
          "name": "phoema",
          "value": 22.259999999999998
        },
        {
          "name": "wendellhu95",
          "value": 19.86
        },
        {
          "name": "xiexingen",
          "value": 16.18
        },
        {
          "name": "israelKusayev",
          "value": 18.690000000000005
        },
        {
          "name": "geekrainy",
          "value": 10.48
        },
        {
          "name": "hihuangwei",
          "value": 24.8
        },
        {
          "name": "BugHiding",
          "value": 12.13
        },
        {
          "name": "fireairforce",
          "value": 54.36
        },
        {
          "name": "imhxc",
          "value": 13.260000000000002
        },
        {
          "name": "zpr1g",
          "value": 10.73
        },
        {
          "name": "linxianxi",
          "value": 55.48
        },
        {
          "name": "wwyx778",
          "value": 10.9
        },
        {
          "name": "huseyingoztok",
          "value": 14.72
        },
        {
          "name": "poyiding",
          "value": 23.859999999999996
        },
        {
          "name": "ElderJames",
          "value": 16.37
        },
        {
          "name": "zhangyu1818",
          "value": 14.860000000000001
        },
        {
          "name": "Yunfly",
          "value": 13.309999999999999
        },
        {
          "name": "AbhijeetGaware",
          "value": 11.43
        },
        {
          "name": "RedJue",
          "value": 14.48
        }
      ]
    }
  },
  components: {
    Chart,
  },
  mounted() {
  },
  methods: {
    async fetchData(path) {
      let activityResponse = await axios.get(path + '/activity_details.json');
      let activityData = await activityResponse.data;

      return this.processData(activityData);
    },
    processData(data) {
      const result = {};

      Object.values(data).forEach(arr => {
        arr.forEach(item => {
          const [name, value] = item;
          if (!result[name]) {
            result[name] = 0;
          }
          result[name] += value;
        });
      });

      const output = Object.entries(result)
        .filter(([, value]) => value >= 10)
        .map(([name, value]) => ({ name, value }));

      return output;
    }
  },
  computed: {
    ...mapState(['currentRepository']),
  },
  watch: {
    currentRepository: {
      handler: async function (newVal) {
        this.cdata = await this.fetchData('https://oss.x-lab.info/open_digger/github/' + newVal);
      },
      deep: true
    }
  },
}
</script>

<style lang="scss" scoped></style>