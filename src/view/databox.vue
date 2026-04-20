<template>
    <div class="databox-view">
        <DataBoxContainer />
    </div>
</template>

<script>
import DataBoxContainer from '@/components/echart/databox'
export default {
    components: {
        DataBoxContainer
    }
}
</script>

<style scoped>
.databox-view {
    width: 100%;
    height: 100%;
}
</style>
