<template>
    <div>
        <Row class="expand-row1">
            <span class="expand-value">{{ row.describe }}</span>
        </Row>
    </div>
</template>

<script>
    export default {
        props:{
            row:Object
        }
    }
</script>

<style lang="less" scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>