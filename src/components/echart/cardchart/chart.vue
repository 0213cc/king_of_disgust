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
        updateChartData(newData) {
            const currentData = newData[this.currentType + 'data']
            
            this.options = {
                title: {
                    text: ''
                },

                polar: {},
                tooltip: {
                    formatter: function (params) {
                        return (
                            params.value[2] +
                            ' commits in ' +
                            newData.months[params.value[1]] +
                            ' of ' +
                            newData.year[params.value[0]]
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
                        symbolSize: function (val) {
                            const minSize = 1;  // 最小点大小
                            const maxSize = 30; // 最大点大小
                            const value = val[2];
                            
                            // 如果数值为0，直接返回最小大小
                            if (value === 0) return minSize;
                            
                            // 线性映射函数
                            return minSize + (maxSize - minSize) * (Math.log(value + 1) / Math.log(1000));
                        },
                        itemStyle: {
                            color: function(params) {
                                const value = params.value[2];
                                
                                // 定义颜色断点
                                const colorStops = [
                                    { value: 0, color: 'rgb(180, 140, 240)' },    // 最小值：浅紫色
                                    { value: 50, color: 'rgb(160, 80, 220)' },    // 中小值：中紫色
                                    { value: 200, color: 'rgb(140, 40, 200)' },   // 中大值：深紫色
                                    { value: 500, color: 'rgb(100, 0, 180)' }     // 最大值：暗紫色
                                ];
                                
                                // 找到value所在的区间
                                let startColor, endColor, startValue, endValue;
                                for (let i = 0; i < colorStops.length - 1; i++) {
                                    if (value >= colorStops[i].value && value <= colorStops[i + 1].value) {
                                        startColor = colorStops[i].color;
                                        endColor = colorStops[i + 1].color;
                                        startValue = colorStops[i].value;
                                        endValue = colorStops[i + 1].value;
                                        break;
                                    }
                                }
                                
                                // 如果超出最大值，使用最深的颜色
                                if (!startColor) {
                                    startColor = endColor = colorStops[colorStops.length - 1].color;
                                }
                                
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