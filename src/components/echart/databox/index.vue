<template>
    <div >
        <DataBox :cdata="dataBoxList" />
    </div>
</template>

<script>
import DataBox from './databox.vue'
import { mapState } from 'vuex'
import axios from 'axios'

export default {
    name: 'DataBoxIndex',
    components: {
        DataBox
    },
    data() {
        return {
            dataBoxList: [
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
            ]
        }
    },
    computed: {
        ...mapState(['currentRepository'])
    },
    watch: {
        currentRepository: {
            async handler(newVal) {
                if (newVal) {
                    try {
                        const data = await this.fetchData('https://oss.x-lab.info/open_digger/github/' + newVal);
                        if (data) {
                            this.dataBoxList = data;
                        }
                    } catch (error) {
                        console.error('数据获取失败:', error);
                    }
                }
            },
            immediate: true
        }
    },
    methods: {
        async fetchData(path) {
            if (!path) return null;

            const datePattern = /^\d{4}-(0[1-9]|1[0-2])$/;
            const filterData = (datas) => {
                let filteredDatas = {};
                for (const key in datas) {
                    if (datePattern.test(key)) {
                        filteredDatas[key] = datas[key];
                    }
                }
                return filteredDatas;
            }

            try {
                const [starResponse, forkResponse, issueResponse, requestResponse] = await Promise.all([
                    axios.get(path + '/stars.json'),
                    axios.get(path + '/technical_fork.json'),
                    axios.get(path + '/issues_new.json'),
                    axios.get(path + '/change_requests.json')
                ]);

                let starData = filterData(starResponse.data);
                let forkData = filterData(forkResponse.data);
                let issueData = filterData(issueResponse.data);
                let requestData = filterData(requestResponse.data);

                // 获取所有的键
                let commonKeys = Object.keys(starData)
                    .filter(value => 
                        Object.keys(forkData).includes(value) && 
                        Object.keys(issueData).includes(value) && 
                        Object.keys(requestData).includes(value)
                    );

                // 计算各项数据总和
                const calculateSum = (data) => {
                    return commonKeys.reduce((sum, key) => sum + data[key], 0);
                };

                const starSum = calculateSum(starData);
                const forkSum = calculateSum(forkData);
                const issueSum = calculateSum(issueData);
                const requestSum = calculateSum(requestData);

                // 设置基准值
                const maxStarValue = 183392;
                const maxForkValue = 93647;
                const maxIssueValue = 199064;
                const maxRequestValue = 39155;

                return [
                    {
                        value: starSum.toLocaleString(),
                        label: 'star总数',
                        percentage: Math.round((starSum / maxStarValue) * 100),
                        color: '#2d8cf0'
                    },
                    {
                        value: forkSum.toLocaleString(),
                        label: 'fork总数',
                        percentage: Math.round((forkSum / maxForkValue) * 100),
                        color: '#19be6b'
                    },
                    {
                        value: issueSum.toLocaleString(),
                        label: 'issue总数',
                        percentage: Math.round((issueSum / maxIssueValue) * 100),
                        color: '#ff9900'
                    },
                    {
                        value: requestSum.toLocaleString(),
                        label: 'PR总数',
                        percentage: Math.round((requestSum / maxRequestValue) * 100),
                        color: '#ed4014'
                    }
                ];
            } catch (error) {
                console.error('数据获取失败:', error);
                return null;
            }
        }
    }
}
</script>

