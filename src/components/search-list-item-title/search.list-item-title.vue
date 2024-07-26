<template>
<div class="list-item-title">
    <div class="info">
        <van-tag color="#3f4954" text-color="#fff">{{ itemData.address }}</van-tag>
        <span class="name">{{ itemData.unit }}</span>
        <span class="desp">{{ itemData.unitDesp }}</span>
    </div>
</div>

</template>

<script setup>
const props = defineProps({
    itemData: {
        type:Object,
        default: () => {}
    }
})

</script>

<style lang="less" scoped>
.info {
    display: flex;
    align-items: center;

    .name,
    .desp {
        font-size: 12px;
        white-space: nowrap;
        color: #666;
    }

    .name {
        position: relative;
        margin-left: 10px;
        margin-right: 10px;
    }

    .title {
        line-height: 22px;
        font-size: 18px;
        margin-top: 8px;
        font-weight: 800;
    }
}

</style>