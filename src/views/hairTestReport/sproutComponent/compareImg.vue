<template>
  <div class="compare_img position_re flex ">
    <div>
      <div class="position_re ">
        <div class="compare_num">{{ imgInfo.firstTitle }}</div>
        <img src="https://static.aiwobeauty.com/myai/home/icon_11.png" class="bottom_icon1" />
      </div>
      <img @click="onCheck('one')" :src="firstUrl" class="bottom_icon2" />
    </div>
    <div class="compare_ml">
      <div class="position_re ">
        <div class="compare_last_num">{{ imgInfo.firstTitle === imgInfo.secondTitle ? "-" : imgInfo.secondTitle }}</div>
        <img src="https://static.aiwobeauty.com/myai/home/icon_12.png" class="bottom_icon1" />
      </div>
      <template v-if="secondUrl">
        <img @click="onCheck('two')" :src="secondUrl" class="bottom_icon2" />
      </template>
      <template v-else>
        <div class="bottom_icon2 noImg">
          <img src="https://static.aiwobeauty.com/myai/home/icon_14.png" />
        </div>
      </template>
    </div>
    <van-image src="https://static.aiwobeauty.com/myai/home/icon_13.png" class="bottom_icon3" />
    <checkImagePop ref="checkImagePopRef" :nursingStartTime="nursingStartTime" :photoList="photoList"
      :popImageIndex="0">
    </checkImagePop>
  </div>
</template>
<script>
import checkImagePop from '../checkImagePop/index.vue';
import dayjs from "dayjs";
import { sortArr, deepClone } from '@/utils/common';

export default {
  props: {
    info: Object,
  },
  components: { checkImagePop },
  data() {
    return {
      $imgBaseUrl: 'https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/',
      firstUrl: '',
      secondUrl: '',
      nursingStartTime: dayjs().millisecond(),
      popImageIndex: 0,
      photoList: []
    };
  },
  methods: {
    setData(info) {
      // type: 1:头油 2:敏感 3:毛囊密度 4: 发质粗细
      // type1: 0-前额;1-头顶;2-左侧;3-右侧 4-后脑
      let photoInfo1 = info.detailList.find(item => item.id === info.firstId);
      let photoInfo2 = info.detailList.find(item => item.id === info.secondId);
      if (photoInfo1.id !== photoInfo2.id) {
        let currPhoto1 = photoInfo1.pictureAlgorithmInfo.find(item => item.pictureTag === info.fiveType);
        let currPhoto2 = photoInfo2.pictureAlgorithmInfo.find(item => item.pictureTag === info.fiveType);
        this.firstUrl = currPhoto1?.pictureAlgorithmUrl;
        this.secondUrl = currPhoto2?.pictureAlgorithmUrl;
      } else {
        let currPhoto1 = photoInfo1.pictureAlgorithmInfo.find(item => item.pictureTag === info.fiveType);
        let currPhoto2 = {};
        this.firstUrl = currPhoto1?.pictureAlgorithmUrl;
        this.secondUrl = "";
      }
    },
    onCheck(type) {
      this.nursingStartTime = type == 'one' ? this.imgInfo.firstTime : this.imgInfo.secondTime;
      const id = type == 'one' ? this.imgInfo.firstId : this.imgInfo.secondId;
      let photoInfo = this.imgInfo.detailList.find(item => item.id === id);

      let tyPicture = deepClone(photoInfo?.pictureAlgorithmInfo || []);
      let tySortList = sortArr(tyPicture, 'pictureTag');
      this.photoList = tySortList;
      // console.log('onCheck', this.photoList);
      // this.photoList = photoInfo.pictureAlgorithmInfo
      // this.popImageIndex = photoInfo.pictureAlgorithmInfo?.findIndex(item => item.pictureTag === this.info.fiveType)
      this.$refs.checkImagePopRef.showImg();
    }
  },
  computed: {
    imgInfo() {
      return this.info;
    },
  },
  watch: {
    imgInfo: {
      handler(newV, oldV) {
        if (newV && newV?.firstId) {
          this.setData(newV);
        }
      },
      immediate: true,
      deep: true
    },
  }
};
</script>
<style scoped lang="less">
@import url("./compareImg.less");
</style>