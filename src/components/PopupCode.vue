<template>
  <van-popup v-model:show="show" round>
    <div class="content">
      <div class="title">
        {{ props.title }}
      </div>
      <img :src="`${$imgBaseUrl}icon_icon_black.png`" alt="" class="close" @click="show = false" />
      <img class="image" referrerpolicy="no-referrer" :src="props.img" draggable="false" />
      <div class="des">
        <div class="des1">长按添加专家微信</div>
        <div class="des2">获取贴心1V1养发指导</div>
      </div>
    </div>
  </van-popup>
</template>
<script setup name="">
const show = defineModel();
const props = defineProps({ title: String, img: String });
const $imgBaseUrl = 'https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/';
</script>
<style scoped>
.content {
  padding: 0 46px;
  border-radius: 8px;

  .title {
    overflow-wrap: break-word;
    color: rgba(28, 28, 31, 1);
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    text-align: left;
    white-space: nowrap;
    line-height: 24px;
    text-align: center;
    margin-top: 24px;
  }

  .close {
    position: fixed;
    right: 24px;
    top: 24px;
    width: 24px;
    height: 24px;
  }

  .image {
    width: 260px;
    height: 260px;
    margin-top: 34px;

  }

  .des {
    margin: 28px 85px 38px 64px;

    .des1 {
      overflow-wrap: break-word;
      color: rgba(18, 14, 14, 1);
      font-size: 16px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      text-align: right;
      white-space: nowrap;
      line-height: 28px;
      margin: 0 3px 0 2px;
      text-align: center;
    }

    .des2 {
      overflow-wrap: break-word;
      color: rgba(182, 131, 121, 1);
      font-size: 14px;
      font-weight: normal;
      text-align: right;
      white-space: nowrap;
      line-height: 18px;
      margin-top: 4px;
      text-align: center;
    }
  }
}
</style>