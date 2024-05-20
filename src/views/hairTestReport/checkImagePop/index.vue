<template>
  <div class="checkImagePop">
    <van-image-preview ref="swipeRef" :before-close="checkPhoto" @change="swipeChange" :show="show"
      :images="showUrlList" :show-index="false">
      <template v-slot:cover>
        <div class="head">
          <img @click="close" class="close"
            src="https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/close_icon.png" alt="">
          <div class="text1">{{ dayMD }}</div>
          <div class="text2">{{ dayHM }}</div>
        </div>
        <div id="tagBox" @click="tagHidden" class="tagBox">
          <div class="tagRow">
            <img class="clickIcon"
              src="https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/click_icon.png" alt="">
            <span>点击可看原片效果</span>
          </div>
          <img class="daohang"
            src="https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/clickzuo.png" alt="">
        </div>
        <div class="originalText" v-if="isOriginal">原片</div>
        <div class="title">{{
          swipeIndex === 0 ? '前额发际' : swipeIndex === 1 ? '头顶发旋' : swipeIndex
            === 2 ? '左侧颞部' : swipeIndex === 3 ? '右侧颞部' : swipeIndex === 4 ? '后脑枕突' : null
        }}
        </div>
        <div class="content">
          <img @click="photoChange(index)" :class="index === swipeIndex ? 'selected' : ''"
            v-for="(item, index) in photoList" :key="index" :src="item.pictureAlgorithmUrl" alt="">
        </div>
      </template>
    </van-image-preview>
  </div>
</template>
<script>
import dayjs from "dayjs";

export default {
  props: {
    photoList: {
      type: Array,
      default: [],
    },
    nursingStartTime: {
      type: Number,
      default: dayjs().millisecond()
    },
    popImageIndex: {
      type: Number,
    }
  },
  data() {
    return {
      show: false,
      isOriginal: false,
      timer: null,
      swipeIndex: 0,
      pictureAlgorithmUrlList: [],
      pictureUrlList: [],
      showUrlList: [],
      dayMD: null,
      dayHM: null,
    };
  },
  methods: {
    swipeChange(e) {
      this.isOriginal = false;
      clearInterval(this.timer);
      this.swipeIndex = e;
    },
    photoChange(index) {
      this.isOriginal = false;
      clearInterval(this.timer);
      this.swipeIndex = index;
      console.log(typeof index);
      this.$refs.swipeRef.swipeTo(index);
    },
    checkPhoto() {
      if (this.isOriginal === true) {
        clearInterval(this.timer);
        this.isOriginal = false;
        return;
      }
      this.isOriginal = true;
      this.timer = setTimeout(() => {
        this.isOriginal = false;
      }, 3000);

    },
    close() {
      // this.$emit('popClose');
      this.show = false;
    },
    tagHidden() {
      document.getElementById("tagBox").style.opacity = 0;
    },
    showImg() {
      this.show = true;
      setTimeout(() => {
        document.getElementById("tagBox").style.opacity = 0;
      }, 3000);
    }
  },
  watch: {
    photoList(val) {
      this.pictureAlgorithmUrlList = [];
      this.pictureUrlList = [];
      val.forEach((item) => {
        this.pictureAlgorithmUrlList.push(item.pictureAlgorithmUrl);
        this.pictureUrlList.push(item.pictureUrl);
      });
      this.showUrlList = this.isOriginal ? this.pictureUrlList : this.pictureAlgorithmUrlList;
    },
    nursingStartTime(val) {
      this.dayMD = dayjs(val).format('MM月DD日');
      this.dayHM = dayjs(val).format('HH:mm');
    },
    popImageIndex(val) {
      setTimeout(() => {
        this.$refs.swipeRef.swipeTo(val);
      }, 0);
    },
    isOriginal(newV, oldV) {
      console.log(112, newV);
      this.showUrlList = newV ? this.pictureUrlList : this.pictureAlgorithmUrlList;
      console.log('isOriginal', this.showUrlList);
    }
  }
};
</script>
<style scoped lang="less">
@import url("./mobile.less");
</style>