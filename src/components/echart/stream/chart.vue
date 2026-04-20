<template>
    <div ref="chartContainer" id="StreamChart" class="chart-container" ></div>
</template>
<script>
import * as echarts from 'echarts'

export default {
    name: 'StreamChartContent',
    props: {
        cdata: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            chart: null,
            timer: null,
            currentIndex: 0,
            months: [],
            treeDataURI: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAA2CAYAAADUOvnEAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA5tJREFUeNrcWE1oE0EUnp0kbWyUpCiNYEpCFSpIMdpLRTD15s2ePHixnj00N4/GoyfTg2fbiwdvvagHC1UQ66GQUIQKKgn1UAqSSFua38b3prPJZDs7s5ufKn0w7CaZ2W/fe9/73kyMRqNB3Nrj1zdn4RJ6du9T2u1a2iHYSxjP4d41oOHGQwAIwSUHIyh8/RA8XeiXh0kLGFoaXiTecw/hoTG4ZCSAaFkY0+BpsZceLtiAoV2FkepZSDk5EpppczBvpuuQCqx0YnkYcVVoqQYMyeCG+lFdaGkXeVOFNu4aEBalOBk6sbQrQF7gSdK5JXjuHXuYVIVyr0TZ0FjKDeCs6km7JYMUdrWAUVmZUBtmRnVPK+x6nIR2xomH06R35ggwJPeofWphr/W5UjPIxq8B2bKgE8C4HVHWvg+2gZjXj19PkdFztY7bk9TDCH/g6oafDPpaoMvZIRI5WyMB/0Hv++HkpTKE0kM+A+h20cPAfN4GuRyp9G+LMTW+z8rCLI8b46XO9zRcYZTde/j0AZm8WGb3Y2F9KLlE2nqYkjFLJAsDOl/lea0q55mqxXcL7YBc++bsCPMe8mUyU2ZIpnCoblca6TZA/ga2Co8PGg7UGUlEDd0ueptglbrRZLLE7poti6pCaWUo2pu1oaYI1CF9b9cCZPO3F8ikJQ/rPpQT5YETht26ss+uCIL2Y8vHwJGpA96GI5mjOlaKhowUy6BcNcgIhDviTGWCGFaqEuufWz4pgcbCh+w0gEOyOjTlTtYYlIWPYWKEsLDzOs+nhzaO1KEpd+MXpOoTUgKiNyhdy5aSMPNVqxtSsJFgza5EWA4zKtCJ2OGbLn0JSLu8+SL4G86p1Fpr7ABXdGFF/UTD4rfmFYFw4G9VAJ9SM3aF8l3yok4/J6IV9sDVb36ynmtJ2M5+CwxTYBdKNMBaocKGV2nYgkz6r+cHBP30MzAfi4Sy+BebSoPIOi8PW1PpCCvr/KOD4k9Zu0WSH0Y0+SxJ2awp/nlwKtcGyHOJ8vNHtRJzhPlsHr8MogtlVtwUU0tSM1x58upSKbfJnSKUR07GVMKkDNfXpzpv0RTHy3nZMVx5IOWdZIaPabGFvfpwpjnvfmJHXLaEvZUTseu/TeLc+xgAPhEAb/PbjO6PBaOTf6LQRh/dERde23zxLtOXbaKNhfq2L/1fAOPHDUhOpIf5485h7l+GNHHiSYPKE3Myz9sFxoJuAyazvwIMAItferha5LTqAAAAAElFTkSuQmCC',
            lineCount: 10
        }
    },
    watch: {
        cdata: {
            handler(newVal) {
                if (!newVal || !newVal.monthlyData) {
                    console.error('No valid data provided');
                    this.months = [];
                    return;
                }
                
                this.currentIndex = 0;
                
                this.months = Object.keys(newVal.monthlyData).sort();
                
                if (this.timer) {
                    clearInterval(this.timer);
                }
                
                if (this.chart) {
                    this.chart.clear();
                }
                
                if (this.months.length > 0) {
                    this.initChart();
                    this.startAnimation();
                }
            },
            deep: true
        }
    },
    mounted() {
        if (!this.cdata || !this.cdata.monthlyData) {
            console.error('No valid data provided');
            return;
        }
        
        this.months = Object.keys(this.cdata.monthlyData).sort();
        
        if (this.months.length > 0) {
            this.initChart();
            this.startAnimation();
        }
    },
    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer)
        }
        if (this.chart) {
            this.chart.dispose()
            this.chart = null
        }
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$refs.chartContainer)
            this.updateChart()
        },
        makeCategoryData() {
            const categoryData = [];
            for (let i = 0; i < this.lineCount; i++) {
                categoryData.push(i + 'a');
            }
            return categoryData;
        },
        makeSeriesData(currentMonth, negative) {
            if (!currentMonth || !this.cdata.monthlyData[currentMonth]) {
                return [];
            }
            
            const value = this.cdata.monthlyData[currentMonth];
            const seriesData = [];
            
            for (let i = 0; i < this.lineCount; i++) {
                let sign = negative ? -1 * (i % 3 ? 0.9 : 1) : 1 * ((i + 1) % 3 ? 0.9 : 1);
                seriesData.push({
                    value: sign * (
                        value <= 10
                            ? Math.abs(i - this.lineCount / 2 + 0.5) < this.lineCount / 5
                                ? value * 10
                                : 0
                            : (this.lineCount - Math.abs(i - this.lineCount / 2 + 0.5)) * value
                    ),
                    symbolOffset: i % 2 ? ['50%', 0] : undefined
                });
            }
            return seriesData;
        },
        updateChart() {
            if (!this.months.length) {
                return;
            }
            
            const currentMonth = this.months[this.currentIndex];
            const option = {
                color: ['#e54035'],
                xAxis: {
                    axisLine: { show: false },
                    axisLabel: { show: false },
                    axisTick: { show: false },
                    splitLine: { show: false },
                    name: currentMonth,
                    nameLocation: 'middle',
                    nameGap: 40,
                    nameTextStyle: {
                        color: 'green',
                        fontSize: 30,
                        fontFamily: 'Arial'
                    },
                    min: -2800,
                    max: 2800
                },
                yAxis: {
                    data: this.makeCategoryData(),
                    show: false
                },
                grid: {
                    top: 'center',
                    height: 280
                },
                series: [
                    {
                        name: 'all',
                        type: 'pictorialBar',
                        symbol: 'image://' + this.treeDataURI,
                        symbolSize: [30, 55],
                        symbolRepeat: true,
                        data: this.makeSeriesData(currentMonth),
                        animationEasing: 'elasticOut'
                    },
                    {
                        name: 'all',
                        type: 'pictorialBar',
                        symbol: 'image://' + this.treeDataURI,
                        symbolSize: [30, 55],
                        symbolRepeat: true,
                        data: this.makeSeriesData(currentMonth, true),
                        animationEasing: 'elasticOut'
                    }
                ]
            }
            this.chart.setOption(option)
        },
        startAnimation() {
            if (this.months.length > 0) {
                this.timer = setInterval(() => {
                    this.currentIndex = (this.currentIndex + 1) % this.months.length;
                    this.updateChart();
                }, 800);
            }
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