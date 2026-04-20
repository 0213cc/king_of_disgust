<template>
  <div class="screen-wrapper">
    <dv-full-screen-container mode="scale" :updateScale="true">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="content-wrapper" style="display: flex; flex-direction: column;">
        <div style="text-align: center; padding: 1vh 0;">
          <span style="font-size: 3vw; text-align: center;color: rebeccapurple;">开源数据可视化</span>
        </div>
        <!-- 第二行 -->
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 1vh 0;">
          <div  style="font-size: 1.2vw;width: 28vw;height: 5vh;line-height: 5vh;text-align: center;transform: skewX(45deg);background-color: #6c07f1;">
            <span style="display: inline-block;transform: skewX(-45deg);white-space: nowrap;overflow: hidden;text-overflow: ellipsis;width: 26vw;color: #fff;font-size: 1.5vw;">
            华东师范大学数据科学与工程学院
            </span>
          </div>

          <div
            style="width: 56vw; height: 4vh; display: flex; justify-content: center; align-items: center;">
            <span style="font-size: 2.2vw;color: rgba(255, 0, 0, 0.9);">
            当前仓库：{{ this.$store.state.currentRepository }}
            </span>
          </div>

          <div style="display: flex; align-items: center; height: 5vh; justify-content: flex-end; background-color: #6c07f1;text-align: right;width: 26vw;font-size: 1.2vw;line-height: 5vh;text-align: center;transform: skewX(-45deg);">
            <span style="height: 100%; display: flex; align-items: center; transform: skewX(45deg);">
              <el-tooltip effect="light" content="输入格式: Github用户名/仓库名. " placement="top" >
                <el-row >
                  <el-col :span="24" >
                    <el-autocomplete v-model="state1" prefix-icon="el-icon-search" :fetch-suggestions="querySearch"
                      placeholder="请输入仓库名" @select="handleSelect" @change="handleSelect" clearable
                      >
                      <template #suffix>
                        <i class="el-icon-search" style="line-height: 100px;"></i>
                      </template>
                    </el-autocomplete>
                  </el-col>
                </el-row>
              </el-tooltip>
            </span>
          </div>
        </div>

        <!-- 第三行 -->
        <div
          style="flex: 1; display: flex; flex-direction: column; padding: 0 1vw; min-height: 0;">
          <!-- 上半部分 -->
          <div style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1vw; height: 50%; padding-bottom: 1vh;">
            <dv-border-box-1 style="height: 100%; min-width: 0;">
              <div style="height: 100%; padding: 1vh 1vw;">
                <DataBox/>
              </div>
            </dv-border-box-1>
            <dv-border-box-1 style="height: 100%; min-width: 0;">
              <div style="height: 100%; padding:1vh 1vw;">
                <cardchart/>
              </div>
            </dv-border-box-1>
            <dv-border-box-1 style="height: 100%; min-width: 0;">
              <div style="height: 100%; padding: 1vh 1vw;">
                <cloud></cloud>
              </div>
            </dv-border-box-1>
            <dv-border-box-1 style="height: 100%; min-width: 0;">
              <div style="height: 100%; padding: 1vh 1vw;">
                  <StreamChart />
              </div>
            </dv-border-box-1>
          </div>

          <!-- 下半部分 -->
          <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1vw; height: 50%; padding-top: 1vh;">
            <dv-border-box-1 style="height: 100%; min-width: 0;">
              <div style="height: 100%; width: 100%; padding: 1vh 1vw; display: flex; flex-direction: column;">
                <CodeChangeChart />
              </div>
            </dv-border-box-1>
            <dv-border-box-1 style="height: 100%; min-width: 0;">
              <div style="height: 100%; width: 100%; padding: 8px; display: flex; flex-direction: column;">
                <RainfallChart/>
              </div>
            </dv-border-box-1>
          </div>
        </div>
        <el-popover placement="left" :width="460" trigger="click">
          <template #reference>
            <el-button class="share-entry" type="primary">分享</el-button>
          </template>
          <div class="share-content">
            <div class="share-title">复制到 README</div>
            <div class="share-desc">README 中展示入口，点击后进入可交互大屏。</div>
            <el-input
              :model-value="badgeMarkdown"
              type="textarea"
              :rows="3"
              readonly
            />
            <div class="share-actions">
              <el-button type="primary" size="small" @click="copyShareText(badgeMarkdown)">复制徽章</el-button>
              <el-button size="small" @click="copyShareText(linkMarkdown)">复制链接</el-button>
              <el-button size="small" @click="copyShareText(shareUrl)">复制 URL</el-button>
            </div>
          </div>
        </el-popover>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import drawMixin from "../utils/drawMixin";
import { formatTime } from '../utils/index.js'
import axios from 'axios'
import RainfallChart from "./RainfallChart.vue";
import DataBox from "./databox.vue";
import cardchart from  "./cardchart.vue"
import StreamChart from "./streamchart.vue"
import cloud from"./wordCloudchart.vue"
import CodeChangeChart from "./CodeChangeChart.vue"
import bgImage from '@/assets/Bg.gif'

export default {
  mixins: [ drawMixin ],
  name: 'IndexPage',
  data() {
    return {
      options: this.$store.state.Repositories,
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      decorationColor: ['#568aea', '#000000'],
      value: '',
      state1: '',
      repositories: [],
      bgImage
    }
  },
  components: {
    cardchart,
    RainfallChart,
    DataBox,
    StreamChart,
    cloud,
    CodeChangeChart
  },
  computed: {
    currentRepository() {
      return this.$store.state.currentRepository
    },
    shareUrl() {
      if (typeof window === 'undefined') return ''
      const baseUrl = `${window.location.origin}${window.location.pathname}`
      return `${baseUrl}#/?repo=${encodeURIComponent(this.currentRepository)}`
    },
    badgeMarkdown() {
      const badgeUrl = 'https://img.shields.io/badge/OpenDigger-Dashboard-6c07f1'
      return `[![OpenDigger Dashboard](${badgeUrl})](${this.shareUrl})`
    },
    linkMarkdown() {
      return `[查看 ${this.currentRepository} 交互式数据大屏](${this.shareUrl})`
    }
  },
  created() {
    this.applyRepositoryFromRoute()
  },
  mounted() {
    this.timeFn()
    this.cancelLoading()
    this.repositories = this.$store.state.Repositories
  },
  beforeUnmount () {
    clearInterval(this.timing)
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    },
    setCurrentRepository() {
      this.setRepository(this.value)
    },
    applyRepositoryFromRoute() {
      const repo = this.$route.query.repo
      if (repo && typeof repo === 'string') {
        this.$store.commit('setCurrentRepository', repo)
        this.state1 = repo
      }
    },
    setRepository(repository) {
      if (!repository) return
      this.$store.commit('setCurrentRepository', repository)
      this.state1 = repository
      if (this.$route.query.repo !== repository) {
        this.$router.replace({
          path: '/',
          query: {
            ...this.$route.query,
            repo: repository
          }
        }).catch(() => {})
      }
    },
    querySearch(queryString, cb) {
      var repositories = this.repositories.map(item => {
        return {
          value: item.label,
          label: item.value
        };
      });
      var results = queryString ? repositories.filter(this.createFilter(queryString)) : repositories;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return (repository) => {
        return (repository.value.indexOf(queryString) === 0);
      };
    },
    async handleSelect(item) {
      if(typeof item == 'string') {
        if (this.state1) {
          if (await this.checkRepoValidity(this.state1)) {
            this.setRepository(this.state1)
          }
        }
      } else {
        this.setRepository(item.value)
      }
    },
    async copyShareText(text) {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
        } else {
          const textarea = document.createElement('textarea')
          textarea.value = text
          textarea.style.position = 'fixed'
          textarea.style.left = '-9999px'
          document.body.appendChild(textarea)
          textarea.focus()
          textarea.select()
          document.execCommand('copy')
          document.body.removeChild(textarea)
        }
        this.$message.success('已复制')
      } catch (error) {
        this.$message.error('复制失败，请手动复制')
      }
    },
    checkRepoValidity(link) {
      return axios.get(`https://oss.x-lab.info/open_digger/github/` + link + '/stars.json')
          .then(response => {
            if (response.status === 200) {
              return 1;
            } else {
              this.$message.error('您输入的仓库名无效, 请检查后重新输入');
              return 0;
            }
          })
          .catch(() => {
            this.$message.error('您输入的仓库名无效, 请检查后重新输入');
            return 0;
      });
    }
  },
  watch: {
    '$route.query.repo'() {
      this.applyRepositoryFromRoute()
    }
  }
}
</script>

<style lang="scss" scoped>
.screen-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/Bg.gif');
  background-size: cover;
  background-position: center center;
  overflow: hidden;

  .content-wrapper {
    position: absolute;
    inset: 0;
    transform-origin: 0 0;
    will-change: transform;
    display: flex;
    flex-direction: column;
    backface-visibility: hidden;
    perspective: 1000;
  }

  :deep(.dv-full-screen-container) {
    position: absolute;
    inset: 0;
    background: transparent;
    transform-origin: 0 0;
    will-change: transform;
    backface-visibility: hidden;
    perspective: 1000;
  }

  :deep(.bottom-charts) {
    position: relative;
    flex: 1;
    
    .chart-container {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      transform: translateZ(0);
    }

    .echarts {
      flex: 1;
      position: relative;
      transform: translateZ(0);
    }
  }
}

.host-body {
  position: absolute;
  inset: 0;
  z-index: 10;
  transform: translateZ(0);
}

.share-entry {
  position: absolute;
  right: 1.5vw;
  bottom: 1.5vh;
  z-index: 20;
}

.share-content {
  color: #303133;
}

.share-title {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
}

.share-desc {
  font-size: 13px;
  color: #606266;
  margin-bottom: 12px;
}

.share-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
</style>
