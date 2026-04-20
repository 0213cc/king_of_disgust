<template>
    <div class="data-box-container">
        <div v-for="(item, index) in cdata" :key="index" class="data-box">
            <div :id="'dataChart' + index" class="chart-container"></div>
            <div class="data-info">
                <div class="number">{{ item.value }}</div>
                <div class="label">{{ item.label }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-liquidfill'

export default {
    name: 'DataBox',
    data() {
        return {
            charts: [],
            options: []
        }
    },
    props: {
        cdata: {
            type: Array,
            default: () => ([
                {
                    value: '0',
                    label: 'star总数',
                    percentage: 0,
                    color: '#2d8cf0'
                },
                {
                    value: '0',
                    label: 'fork总数',
                    percentage: 0,
                    color: '#19be6b'
                },
                {
                    value: '0',
                    label: 'issue总数',
                    percentage: 0,
                    color: '#ff9900'
                },
                {
                    value: '0',
                    label: 'PR总数',
                    percentage: 0,
                    color: '#ed4014'
                }
            ])
        }
    },
    mounted() {
        this.initChart()
    },
    methods: {
        initChart() {
            // 清除现有图表
            this.charts.forEach(chart => {
                chart && chart.dispose()
            })
            this.charts = []
            
            // 初始化新图表
            this.$nextTick(() => {
                this.cdata.forEach((item, index) => {
                    const chartDom = document.getElementById('dataChart' + index)
                    if (chartDom) {
                        const chart = echarts.init(chartDom)
                        const option = {
                            series: [{
                                type: 'liquidFill',
                                data: [item.percentage / 100],
                                radius: '80%',
                                color: [item.color || '#2d8cf0'],
                                backgroundStyle: {
                                    color:"rgba(220, 208, 255, 0.4)"
                                },
                                outline: {
                                    show: false
                                },
                                label: {
                                    show: true,
                                    position: ['50%', '50%'],
                                    formatter: Math.round(item.percentage) + '%',
                                    fontSize: 24,
                                    color: '#fff'
                                }
                            }]
                        }
                        chart.setOption(option)
                        this.charts.push(chart)
                        this.options.push(option)
                    }
                })
            })
        },
        updateChart() {
            this.charts.forEach((chart, index) => {
                if (chart && this.options[index]) {
                    chart.setOption(this.options[index])
                }
            })
        }
    },
    watch: {
        cdata: {
            handler(newData) {
                if (newData && newData.length > 0) {
                    this.options = newData.map(item => ({
                        series: [{
                            type: 'liquidFill',
                            data: [item.percentage / 100],
                            radius: '80%',
                            color: [item.color || '#2d8cf0'],
                            backgroundStyle: {
                                color: "rgba(220, 208, 255, 0.4)"
                            },
                            outline: {
                                show: false
                            },
                            label: {
                                show: true,
                                position: ['50%', '50%'],
                                formatter: Math.round(item.percentage) + '%',
                                fontSize: 24,
                                color: '#fff'
                            }
                        }]
                    }))
                    this.$nextTick(() => {
                        this.updateChart()
                    })
                }
            },
            immediate: true,
            deep: true
        }
    },
    beforeUnmount() {
        this.charts.forEach(chart => {
            chart && chart.dispose()
        })
        this.charts = []
    }
}
</script>

<style scoped>
.data-box-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    position: absolute;
top: 6vh;

left: 0;

right: 0;

bottom: 3vh;

will-change: transform;
}

.data-box {
    background: rgba(45, 140, 240, 0.01);
    border-radius: 0.5vw;
    padding: 1vh;
    box-shadow: rgba(0, 0, 0, 0.001);
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    overflow: hidden;
}

.chart-container {
    flex: 1;
    width: 100%;
    min-height: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.data-info {
    text-align: center;
    margin-top: 0.3vh;
    flex-shrink: 0;
}

.number {
    font-size: 2.2vh;
    font-weight: bold;
    color: rgba(147, 112, 219, 1);
    line-height: 1.2;
}

.label {
    font-size: 2.2vh;
    color: rgba(147, 112, 219, 1);
    margin-top: 0.3vh;
    line-height: 1.2;
}
</style>
