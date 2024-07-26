<template>
<div class="list-item">
  <div class="swiper-wrapper">
    <img class="banner" :src="houseData.defaultPicture" >
  </div>
  <div class="content">
    <search-list-item-title :item-data="getTitleData"/>
    <search-list-item-info :item-data="getInfoData"/>
  </div>
</div>
</template>

<script setup>
import { computed, ref, watch } from "vue"
import SearchListItemTitle from "../search-list-item-title/search.list-item-title.vue"
import SearchListItemInfo from "../search-list-item-info/search-list-item-info.vue"

const props = defineProps({
    itemData: {
        type: Object,
        default:() => {}
    }
})
const houseData = ref({})
watch(() => props.itemData,
  (newValue, oldValue) => {
    houseData.value = newValue;
  },
  {
    immediate: true,
  }
);
// console.log(houseData.value);

const getTitleData = computed(() => {
  let data = houseData.value;
  return {
    address: data.address,
    unit: data.unitSummeries[0]?.text,
    unitDesp: data.unitSummeries[1]?.text,
    unitName: data.unitName,
  }
})

const getInfoData = computed(() => {
  let data = houseData.value;
  return {
    houseTags: data.houseTags,
    promoContent: data.promoContent,
    finalPrice: data.finalPrice,
    productPrice: data.productPrice,
    priceTipBadge: data.priceTipBadge,
  }
})
</script>

<style lang="less" scoped>

.list-item {
  margin: 10px 0px;

  .swiper-wrapper {
    position: relative;

    .banner {
      width: 100%;
      border-radius: 6px;
      margin-top: 7px;
    }
  }
} 

</style>