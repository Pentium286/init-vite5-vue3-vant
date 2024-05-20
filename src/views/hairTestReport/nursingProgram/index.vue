<template>
  <div class="nursingProgram" id="nursingProgram">
    <div class="back" @click="backTo" v-show="query.originType === 'pc'">
      <van-icon name="arrow-left" /> 返回
    </div>
    <div class="summary" v-show="false">{{ detail.summary }}</div>
    <div class="grid goalBox" v-show="false">
      <div class="goal">护理目标</div>
      <div class="current">
        当前阶段：<span class="brown">{{
          levelObj[query.lossHairLevel] + query.lossHairName
        }}</span>
      </div>
      <div class="axisBox">
        <img src="https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/targetAxis.png"
          class="axis" />
        <div class="bubble">
          <div class="brown">{{ detail.targetTerm }}天后为：</div>
          <div>{{ levelObj[detail.target] + query.lossHairName }}</div>
        </div>
      </div>
    </div>
    <div class="grid box1">
      <div class="title">上液护理指导</div>
      <div class="main">
        <img :src="detail.medicineImg" class="img" />
        <div class="info">
          <div class="name">{{ detail.medicineName }}</div>
          <div class="text">频次：每周{{ detail.medicineFrequency }}次</div>
          <div class="text">用量：每次{{ detail.medicineAmount }}支</div>
        </div>
      </div>
    </div>
    <div class="grid box2">
      <div class="title">MYAI护理推荐</div>
      <div class="main">
        <div class="block">
          <div class="subtitle">· 光能量传输</div>
          <div class="desc">红光能量：{{ detail.redEnergy }}</div>
          <div class="desc">激光能量：{{ detail.laserEnergy }}</div>
        </div>
        <div class="block">
          <div class="subtitle">· 按摩促渗</div>
          <div class="desc">
            EMS电流按摩档位：{{ detail.electricLevel }}档（推荐档位，可按自己身体舒适度调节）
          </div>
          <div class="desc">
            按摩使用：每周按摩{{ detail.adviceMassageTimes }}次，每次{{
              detail.adviceMassageFrequency
            }}分钟
          </div>
        </div>
        <div class="block" v-if="detail.channelFileType">
          <div class="subtitle">· 经络按摩</div>
          <img v-if="detail.channelFileType == 1" :src="detail.channelFileUrl" class="img" @click="previewImg" />
          <video v-else ref="video" :poster="detail.channelCoverImg" controls preload="auto" webkit-playsinline
            playsinline>
            <source :src="detail.channelFileUrl" type="video/mp4" />
            您的浏览器不支持 HTML5 video 标签。
          </video>
        </div>
      </div>
    </div>
    <div class="dailyTitle" v-if="detail.dailyConfigList.length">日常护理</div>
    <div class="grid box1" v-for="item in detail.dailyConfigList" :key="item.id">
      <div class="title">{{ item.moduleName }}</div>
      <div class="main">
        <img :src="item.imgUrl" class="img" v-if="item.imgUrl" />
        <div class="info">
          <div class="name" v-if="item.title">{{ item.title }}</div>
          <div class="text">{{ item.doc }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import http from '@/api/http';
import { showImagePreview } from 'vant';

export default {
  data() {
    return {
      showHairCare: true,
      levelObj: {
        0: '健康',
        1: '轻度',
        2: '中度',
        3: '重度',
      },
      query: {},
      detail: {
        dailyConfigList: [],
      },
    };
  },
  mounted() {
    this.query = this.$route.query;
    this.fromOrigin = this.query.fromOrigin;
    this.originType = this.query.originType;
    this.initData();
  },
  methods: {
    initData() {
      http
        .get(
          '/api/aiwo-aiot-service/maneMaxDetectionRecord/getHairCareDimonConfigById',
          {
            id: this.query.id,
          },
          {},
        )
        .then((res: any) => {
          res.data.dailyConfigList = res.data.dailyConfigList || [];
          this.detail = res.data || {};
        });
    },
    previewImg() {
      showImagePreview([this.detail.channelFileUrl]);
    },
    backTo() {
      if (this.fromOrigin && this.fromOrigin === 'hairReport') {
        this.$router.back();
      }
    },
  },
};
</script>
<style scoped lang="less">
@import url('./mobile.less');
</style>
