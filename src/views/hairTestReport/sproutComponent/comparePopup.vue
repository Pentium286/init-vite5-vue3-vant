<template>
  <van-popup v-model:show="isVisible" position="top" overlay-class="compare_overlay">
    <div class="compare_content">
      <div :class="['compare_arrow', arrowType == 'first' ? 'arrow_left' : 'arrow_right']"></div>
      <div class="compare_title">设置对比点</div>
      <div class="compare_list">
        <div v-for="item in list" :key="item.id" @click="onSelect(item)" class="compare_item">
          <div :class="{ active: item.id == currentId, disable: item.id == disabledSelect }">{{ item.title }}</div>
          <div>
            <van-image v-if="item.id == currentId" :src="`${$imgBaseUrl}sprout_icon5.png`" class="compare_icon" />
            <span :class="{ times: true, active: item.id == currentId, disable: item.id == disabledSelect }">{{
              item.customTime }}</span>
          </div>
        </div>
      </div>
      <div class="compare_foot">
        <div @click="onSave" class="compare_btn">确 定</div>
      </div>
    </div>
  </van-popup>
</template>
<script>
export default {
  props: {
    show: Boolean,
    arrowType: {
      default: 'first',
      type: String
    },
    selected: Number,
    disabledSelect: Number,
    list: Array
  },
  data() {
    return {
      $imgBaseUrl: 'https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/',
      currentId: '',
      selectedInfo: {}
    };
  },
  mounted() {
    // console.log(this.disabledSelect);
  },
  methods: {
    onSelect(item) {
      if (item.id !== this.disabledSelect) {
        this.selectedInfo = item;
        this.currentId = item.id;
      }
    },
    onSave() {
      if (this.selected !== this.currentId) {
        const params = {
          arrowType: this.arrowType,
          ...this.selectedInfo
        };
        this.$emit("updateNum", params);
      }
      this.$emit("update:show", false);
    }
  },
  computed: {
    isVisible: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      }
    },
    currentSelected() {
      return this.selected;
    }
  },
  watch: {
    isVisible(newV, oldV) {
      if (!newV) {
        this.currentId = this.selected;
      }
    },
    currentSelected: {
      handler(newV, oldV) {
        this.currentId = newV;
      },
      immediate: true
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./comparePopup.less");
</style>