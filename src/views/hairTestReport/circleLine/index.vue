<template>
  <svg :viewBox="`0 0 ${2 * radius + srtokeWidth} ${radius + srtokeWidth}`">
    <defs>
      <linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#FFD4D2" />
        <stop offset="100%" stop-color="#CADAF3" />
      </linearGradient>
    </defs>
    <path :d="`M ${srtokeWidth / 2} ${radius + srtokeWidth / 2} a ${radius} ${radius} 0 1 1 ${radius * 2} 0`"
      :stroke-width="srtokeWidth" :stroke="emptyColor" fill="none" stroke-linecap="round"></path>
    <path :d="`M ${srtokeWidth / 2} ${radius + srtokeWidth / 2} a ${radius} ${radius} 0 1 1 ${radius * 2} 0`"
      :stroke-width="srtokeWidth" stroke="url(#linear)" fill="none" stroke-linecap="round"
      :stroke-dasharray="strokeDasharray" :stroke-dashoffset="strokeDashoffset">
      <animate attributeName="stroke-dashoffset" :dur="`${durTime}ms`" fill="freeze" :from="strokeDasharray"
        :to="strokeDashoffset"></animate>
    </path>
  </svg>
</template>
<script lang="ts">
export default {
  data() {
    return {
      defaultDurTime: 1200, // 进度条完结时间
      defaultEmptyColor: '#F9F9FA', // 默认底色
      defaultNegativeColor: '#FF4456',
      // defaultPositiveColor: '#56D5E4', // 进行时底色
      defaultSrtokeWidth: 1.5, // 进度线宽度
      defaultRadius: 32, // 默认半径
    };
  },
  props: ['options', 'value'],
  computed: {
    durTime() {
      return this.options ? this.options.durTime || this.defaultDurTime : this.defaultDurTime;
    },
    radius() {
      return this.options ? this.options.radius || this.defaultRadius : this.defaultRadius;
    },
    emptyColor() {
      return this.options ? this.options.emptyColor || this.defaultEmptyColor : this.defaultEmptyColor;
    },
    srtokeWidth() {
      return this.options ? this.options.srtokeWidth || this.defaultSrtokeWidth : this.defaultSrtokeWidth;
    },
    // valueColor() {
    //   if (this.value < 0) {
    //     return this.options ? this.options.negativeColor || this.defaultNegativeColor : this.defaultNegativeColor;
    //   } else {
    //     return this.options ? this.options.positiveColor || this.defaultPositiveColor : this.defaultPositiveColor;
    //   }
    // },
    strokeDasharray() {
      return 3.1415926 * this.radius;
    },
    strokeDashoffset() {
      // console.log(this.strokeDasharray);
      // return this.strokeDasharray - this.strokeDasharray * this.value;
      return this.strokeDasharray - this.value;
    }
  }
};
</script>
<!-- <style scoped lang="less">
svg {
  filter: drop-shadow(2px 5px 2px rgb(0 0 0 / 0.1));
}
</style> -->