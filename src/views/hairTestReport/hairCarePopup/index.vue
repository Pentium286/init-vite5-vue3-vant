<template>
  <div class="hairCarePopupWrap">
    <van-popup :show="showHairCare" position="bottom" closeable close-icon="close" round @close="close">
      <div class="hairCarePopup">
        <div class="title">养发科普</div>
        <div class="popup-main">
          <div class="popup-grid">
            <div class="grid-title">{{ detail.name }}</div>
            <div class="scalp">
              <div class="box">
                <img :src="detail.details[0].imgUrl" class="img" />
                <div class="name">{{ detail.details[0].name }}</div>
                <div class="info">{{ detail.details[0].instruction }}</div>
              </div>
              <div class="box">
                <img :src="detail.details[1].imgUrl" class="img" />
                <div class="name">{{ detail.details[1].name }}</div>
                <div class="info">{{ detail.details[1].instruction }}</div>
              </div>
            </div>
          </div>
          <div class="popup-grid">
            <div class="grid-title">形成原因说明</div>
            <div class="reason">{{ detail.summary }}</div>
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts">
import http from '@/api/http';

export default {
  props: {
    showHairCare: Boolean,
    type: Number
  },
  data() {
    return {
      detail: {
        details: [{}, {}],
      } as any,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      http.get('/api/aiwo-aiot-service/hairCareSciencePopConfig/getHairCareSciencePopByDimonType', {
        dimonType: this.type
      }, {}).then((res: any) => {
        this.detail = res.data || {
          details: [{}, {}]
        };
      });
    },
    close() {
      this.detail = { details: [{}, {}] };
      this.$emit('close');
    }
  },
  watch: {
    type(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getData();
      }
    }
  }
};
</script>
<style scoped lang="less">
@import url("./index.less");
</style>