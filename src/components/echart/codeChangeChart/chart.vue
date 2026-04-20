<template>
    <div id="CodeChangeChart" class="chart-container" ></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'CodeChangeChartContent',
    data() {
        return {
            chart: null,
            options: {}
        }
    },
    props: {
        cdata: {
            type: Object,
            default: () => ({
                timeData: [],
                addData: [],
                removeData: []
            })
        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('CodeChangeChart'))
            this.updateChart()
        },
        updateChart() {
            if (this.chart) {
                this.chart.setOption(this.options)
            }
        }
    },
    watch: {
        cdata: {
            handler(newData) {
                this.options = {
                    tooltip: {
                        trigger: 'axis',
                        triggerOn: 'mousemove',
                        enterable: true,
                        axisPointer: {
                            type: 'cross',
                            snap: true,
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    legend: {
                        data: ['新增代码行数', '删除代码行数', '代码变更总量'],
                        textStyle: {
                            fontSize: 26,
                            color: '#4682B4'
                        },
                        itemGap: 20,
                        padding: [15, 5]
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: newData.timeData?.map(str => str.replace(' ', '\n')) || []
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '新增代码行数',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {
                                color: '#87CEEB',
                                opacity: 0.95
                            },
                            itemStyle: {
                                color: '#87CEEB'
                            },
                            lineStyle: {
                                color: '#87CEEB'
                            },
                            emphasis: {
                                focus: 'series',
                                areaStyle: {
                                    opacity: 1
                                }
                            },
                            data: newData.addData || []
                        },
                        {
                            name: '删除代码行数',
                            type: 'line',
                            stack: 'Total',
                            areaStyle: {
                                color: '#FFA07A',
                                opacity: 0.95
                            },
                            itemStyle: {
                                color: '#FFA07A'
                            },
                            lineStyle: {
                                color: '#FFA07A'
                            },
                            emphasis: {
                                focus: 'series',
                                areaStyle: {
                                    opacity: 1
                                }
                            },
                            data: (newData.removeData || []).map(value => -Math.abs(value))
                        },
                        {
                            name: '代码变更总量',
                            type: 'line',
                            stack: undefined,
                            itemStyle: {
                                color: '#DDA0DD'
                            },
                            lineStyle: {
                                color: '#DDA0DD',
                                width: 2,
                                shadowColor: '#DDA0DD',
                                shadowBlur: 10
                            },
                            emphasis: {
                                focus: 'series',
                                lineStyle: {
                                    shadowBlur: 20
                                }
                            },
                            data: newData.sumData || []
                        }
                    ]
                }
                this.$nextTick(() => {
                    this.updateChart()
                })
            },
            immediate: true,
            deep: true
        }
    },
    beforeUnmount() {
        if (this.chart) {
            this.chart.dispose()
            this.chart = null
        }
    }
}
</script>
<style scoped>

.chart-container {

  position: absolute;

  top: 6vh;

  left: 0;

  right: 0;

  bottom: 0;

  will-change: transform;

}

</style>