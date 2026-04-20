<template>
    <div class="chart-container">
        <div class="selector-container">
            <button 
                v-for="option in ['star', 'fork', 'issue','request']" 
                :key="option"
                @click="handleTypeChange(option)"
                :class="{ active: currentType === option }"
            >
                {{ option.toUpperCase() }}
            </button>
        </div>
        <div id="cardChart" class="chart-container" ></div>
    </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
    name: 'cardChartContent',
    data() {
        return {
            chart: null,
            options: {},
            currentType: 'request'
        }
    },
    props: {
        cdata: {
            type: Object,
            default: () => ({})
        }
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById('cardChart'))
            this.updateChart()
        },
        updateChart() {
            if (this.chart) {
                this.chart.setOption(this.options)
            }
        },
        handleTypeChange(type) {
            this.currentType = type
            if (this.cdata) {
                this.updateChartData(this.cdata)
            }
        },
        formatNumber(value) {
            if (value === null || value === undefined) return '0'
            return Number(value).toLocaleString()
        },
        getMetricLabel(type) {
            const labels = {
                star: 'Star',
                fork: 'Fork',
                issue: 'Issue',
                request: 'PR'
            }
            return labels[type] || type
        },
        getRobustMax(values) {
            const validValues = values
                .filter(value => Number.isFinite(value) && value > 0)
                .sort((a, b) => a - b)

            if (!validValues.length) return 1

            const p95Index = Math.floor((validValues.length - 1) * 0.95)
            return Math.max(validValues[p95Index], validValues[validValues.length - 1] * 0.35, 1)
        },
        normalizeValue(value, robustMax) {
            if (!value || value <= 0) return 0
            return Math.min(Math.log1p(value) / Math.log1p(robustMax), 1)
        },
        getGradientColor(ratio) {
            const start = [180, 140, 240]
            const end = [100, 0, 180]
            const color = start.map((channel, index) => Math.round(channel + (end[index] - channel) * ratio))
            return `rgb(${color.join(',')})`
        },
        updateChartData(newData) {
            const currentData = newData[this.currentType + 'data'] || []
            const values = currentData.map(item => Number(item[2]) || 0)
            const robustMax = this.getRobustMax(values)
            const metricLabel = this.getMetricLabel(this.currentType)
            
            this.options = {
                title: {
                    text: ''
                },

                polar: {},
                tooltip: {
                    formatter: (params) => {
                        const year = newData.year?.[params.value[0]] || ''
                        const month = newData.months?.[params.value[1]] || ''
                        return (
                            `${year} ${month}<br/>` +
                            `${metricLabel}: ${this.formatNumber(params.value[2])}`
                        );
                    }
                },
                angleAxis: {
                    type: 'category',
                    data: newData.months,
                    boundaryGap: false,
                    splitLine: {
                        show: true
                    },
                    axisLine: {
                        show: false
                    }
                },
                radiusAxis: {
                    type: 'category',
                    data: newData.year,
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        rotate: 45
                    }
                },
                series: [
                    {
                        name: 'Punch Card',
                        type: 'scatter',
                        coordinateSystem: 'polar',
                        symbolSize: (val) => {
                            const minSize = 3
                            const maxSize = 28
                            const ratio = this.normalizeValue(Number(val[2]) || 0, robustMax)
                            return ratio === 0 ? minSize : minSize + (maxSize - minSize) * ratio
                        },
                        itemStyle: {
                            color: (params) => {
                                const value = Number(params.value[2]) || 0
                                const ratio = this.normalizeValue(value, robustMax)
                                const startColor = this.getGradientColor(ratio * 0.55)
                                const endColor = this.getGradientColor(ratio)

                                return new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                                    {
                                        offset: 0,
                                        color: startColor
                                    },
                                    {
                                        offset: 1,
                                        color: value === 0 
                                            ? 'rgba(180, 140, 240, 0.2)' 
                                            : endColor
                                    }
                                ]);
                            }
                        },
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 15,
                                shadowColor: 'rgba(100, 0, 200, 0.8)'
                            }
                        },
                        data: currentData,
                        animationDelay: function (idx) {
                            return idx * 5;
                        }
                    }
                ]
            }
            this.$nextTick(() => {
                this.updateChart()
            })
        }
    },
    mounted() {
        this.initChart()
    },
    watch: {
        cdata: {
            handler(newData) {
                this.updateChartData(newData)
            },
            immediate: true,
            deep: true
        },
        currentType: {
            handler() {
                if (this.cdata) {
                    this.updateChartData(this.cdata)
                }
            }
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
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.selector-container {
    margin-bottom: 20px;
    text-align: center;
}

.selector-container button {
    margin: 0 5px;
    padding: 6px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    background: rgba(180, 140, 240, 0.1);
    color: #666;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 0 0 1px rgba(180, 140, 240, 0.3);
}

.selector-container button:hover {
    background: rgba(180, 140, 240, 0.2);
    box-shadow: 0 0 0 2px rgba(180, 140, 240, 0.4);
}

.selector-container button.active {
    background: rgba(140, 40, 200, 0.2);
    color: rgb(100, 0, 180);
    box-shadow: 0 0 0 2px rgba(140, 40, 200, 0.4);
}
.selector-container button.active:hover {
    background: rgba(140, 40, 200, 0.3);
}
.chart-container {

position: absolute;

top: 6vh;

left: 0;

right: 0;

bottom: 0;

will-change: transform;

}
</style>
