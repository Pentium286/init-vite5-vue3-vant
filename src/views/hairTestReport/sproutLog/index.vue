<template>
  <div id="all" class="sprout" @scroll="scrollFun">
    <div id="top" class="sprout_top">
      <div class="top_compare_num">
        <div @click="firstCompare.title === secondCompare.title ? handleShowToast() : onCompare('one')"
          class="top_box compare_one">
          <div class="font_18 weight_600">{{ firstCompare.title }}</div>
          <div class="font_10 one_margin">{{ firstCompare.customTime }}</div>
          <van-image src="https://static.aiwobeauty.com/myai/home/icon_09.png" class="top_bottom_icon" />
        </div>
        <van-image src="https://static.aiwobeauty.com/myai/home/icon_10.png" class="top_img" />
        <div @click="firstCompare.title === secondCompare.title ? handleShowToast() : onCompare('two')"
          class="top_box compare_one">
          <div class="font_18 weight_600">
            {{ firstCompare.title === secondCompare.title ? "-" : secondCompare.title }}
          </div>
          <div class="font_10 one_margin">
            {{ firstCompare.customTime === secondCompare.customTime ? "-" : secondCompare.customTime }}
          </div>
          <van-image src="https://static.aiwobeauty.com/myai/home/icon_09.png" class="top_bottom_icon" />
        </div>
      </div>
      <div class="flex tabsBox">
        <div v-for="item in $tabList" :key="item.type" @click="onTabChange('tab', item)"
          :class="{ 'top_tab_item': true, 'tab_active': tabActive == item.type }">
          <span class="tabText">{{ item.title }}</span>
        </div>
      </div>
    </div>
    <div id="one" class="sprout_bottom">
      <div class="bottom_main">
        <div class="bottom_title">头皮油脂</div>
        <div class="flex bottom_area">
          <div v-for="item in $areaList" :key="item.type" @click="onTabChange('1', item)"
            :class="{ 'area_item': true, 'area_active': areaActive1 === item.type }">
            {{ item.title }}
          </div>
        </div>
        <compareImg :info="compareImgInfo1" />
      </div>
    </div>
    <div id="two" class="sprout_bottom">
      <div class="bottom_main">
        <div class="bottom_title">头皮敏感</div>
        <div class="flex bottom_area">
          <div v-for="item in $areaList" :key="item.type" @click="onTabChange('2', item)"
            :class="{ 'area_item': true, 'area_active': areaActive2 === item.type }">
            {{ item.title }}
          </div>
        </div>
        <compareImg :info="compareImgInfo2" />
      </div>
    </div>
    <div id="three" class="sprout_bottom">
      <div class="bottom_main">
        <div class="bottom_title">毛囊健康</div>
        <div class="flex bottom_area">
          <div v-for="item in $areaList" :key="item.type" @click="onTabChange('3', item)"
            :class="{ 'area_item': true, 'area_active': areaActive3 === item.type }">
            {{ item.title }}
          </div>
        </div>
        <compareImg :info="compareImgInfo3" />
      </div>
    </div>
    <div id="four" class="sprout_bottom bottom_last">
      <div class="bottom_main">
        <div class="bottom_title">发质粗细</div>
        <div class="flex bottom_area">
          <div v-for="item in $areaList" :key="item.type" @click="onTabChange('5', item)"
            :class="{ 'area_item': true, 'area_active': areaActive5 === item.type }">
            {{ item.title }}
          </div>
        </div>
        <compareImg :info="compareImgInfo5" class="bottom_last" />
      </div>
    </div>
    <comparePopup v-model:show="isPopup" :arrowType="arrowType" :selected="compareSected"
      :disabledSelect="disabledSelect" :list="compareList" @updateNum="updateCompareNum" />
    <div class="noData">没有更多了</div>
  </div>
</template>
<script>
import http from "@/api/http";
import dayjs from "dayjs";
import comparePopup from '../sproutComponent/comparePopup.vue';
import compareImg from '../sproutComponent/compareImg.vue';
import { showToast } from 'vant';
import { getLoseHairCompareList, getLoseHairLog } from './data'; // TODO:测试数据

const $tabList = [
  { title: '头皮油脂', type: 1 },
  { title: '头皮敏感', type: 2 },
  { title: '毛囊密度', type: 3 },
  { title: '发质粗细', type: 4 },
];
const $areaList = [
  { title: '前额', type: 0 },
  { title: '头顶', type: 1 },
  { title: '左侧', type: 2 },
  { title: '右侧', type: 3 },
  { title: '后脑', type: 4 },
];

export default {
  components: {comparePopup, compareImg },
  data() {
    return {
      $imgBaseUrl: 'https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/',
      $tabList,
      $areaList,
      isPopup: false,
      tabActive: 1,
      areaActive1: 0, // 头皮油脂选中状态
      areaActive2: 0, // 头皮敏感选中状态
      areaActive3: 0, // 毛囊健康选中状态
      areaActive5: 0, // 发质粗细选中状态
      detailtInfo: {},
      firstCompare: {}, // 对比起始点
      secondCompare: {}, // 对比结束点
      compareSected: 0,
      disabledSelect: 0,
      arrowType: 'first',
      chartInfo1: {},
      chartInfo2: {},
      chartInfo3: {},
      chartInfo4: {},
      chartInfo5: {},
      compareImgInfo1: {},
      compareImgInfo2: {},
      compareImgInfo3: {},
      compareImgInfo5: {},
      compareList: [],
      detailId: '',
    };
  },
  async mounted() {
    let params = this.$route.query.id;
    // console.log('sprout', params);
    this.detailId = params;
    this.getCompareCount();
  },
  methods: {
    handleShowToast() {
      showToast("需要检测两次以上，才能选择对比哦~");
    },
    getCompareCount() {
      http.get('/api/aiwo-aiot-service/maneMaxDetectionRecord/getLoseHairCompareList', { id: this.detailId }).then(res => {
        // res = getLoseHairCompareList; // TODO:测试数据
        this.compareList = this.updateArr(res.data || []);
        if (res.data.length > 0) {
          const length = this.compareList.length;
          this.firstCompare = this.compareList[0];
          this.secondCompare = this.compareList[length - 1];
          this.getLog();
        } else {
          this.getLog();
        }
      }).catch(err => {
        this.getLog();
      });
    },
    getLog() {
      http.get('/api/aiwo-aiot-service/maneMaxDetectionRecord/getLoseHairLog', { id: this.detailId }).then(res => {
        // res = getLoseHairLog; // TODO:测试数据
        this.detailtInfo = res.data || {};
        this.chartInfo1 = this.setSourceData(res.data.tyAnalysis || []);
        this.chartInfo2 = this.setSourceData(res.data.mgAnalysis || []);
        this.chartInfo3 = this.setSourceData(res.data.mnAnalysis || [], 0, 'density');
        this.chartInfo4 = this.setSourceData(res.data.mnAnalysis || [], 0, 'ratio');
        this.chartInfo5 = this.setSourceData(res.data.mfAnalysis || []);
        // 对比图片
        this.compareImgInfo1 = this.getCompareInfo(res.data || {}, '1', this.areaActive1);
        this.compareImgInfo2 = this.getCompareInfo(res.data || {}, '2', this.areaActive2);
        this.compareImgInfo3 = this.getCompareInfo(res.data || {}, '3', this.areaActive3);
        this.compareImgInfo5 = this.getCompareInfo(res.data || {}, '4', this.areaActive5);
      });
    },
    // 修改对比点数据
    updateArr(arr) {
      arr.map((item, index) => {
        item.title = `第${index + 1}次`;
        item.customTime = item.nursingStartTime ? dayjs(item.nursingStartTime).format('YYYY-MM-DD') : '';
      });
      return arr;
    },
    // 设置chart的数据以及点的位置,
    setSourceData(arr, type1 = 0, type) {
      // type1:0-前额;1-头顶;2-左侧;3-右侧 4-后脑
      // type:density:毛囊密度 ratio:健康毛囊占比
      let result = [];
      arr.map(item => {
        const photoList = item.pictureAlgorithmInfo || [];
        const photoResult = photoList.find(findItem => findItem.pictureTag === type1);
        let obj = {
          id: item.id,
          textX: item.x,
          ...photoResult
        };
        if (type) {
          obj.textY = type == 'density' ? Number(photoResult.follicleDensityResult || 0) : Number(photoResult.follicleRatioResult || 0);
        } else {
          obj.textY = Number(photoResult.y || 0);
        }
        result.push(obj);
      });
      const firstResult = result.find(findItem => findItem.id === this.firstCompare.id);
      const secondResult = result.find(findItem => findItem.id === this.secondCompare.id);
      const chartInfo1 = {
        formatY: type == 'density' ? '' : '%',
        sourceData: result,
      };
      // console.log({
      //   result,
      //   firstResult,
      //   secondResult,
      //   firstCompare: this.firstCompare,
      //   secondCompare: this.secondCompare,
      // });
      if (firstResult?.id !== secondResult?.id) {
        if (firstResult?.id) {
          chartInfo1.firstStartLine = [firstResult.textX, firstResult.textY],
            chartInfo1.firstEndLine = [firstResult.textX, 0],
            chartInfo1.firstPointTitle = firstResult.textX,
            chartInfo1.firstPointNum = `${firstResult.textY}${type == 'density' ? '个/cm²' : '%'}`;
        }
        if (secondResult?.id) {
          chartInfo1.secondStartLine = [secondResult.textX, secondResult.textY],
            chartInfo1.secondEndLine = [secondResult.textX, 0],
            chartInfo1.secondPointTitle = secondResult.textX,
            chartInfo1.secondPointNum = `${secondResult.textY}${type == 'density' ? '个/cm²' : '%'}`;
        }
        return chartInfo1;
      } else {
        if (firstResult?.id) {
          chartInfo1.firstStartLine = [firstResult.textX, firstResult.textY],
            chartInfo1.firstEndLine = [firstResult.textX, 0],
            chartInfo1.firstPointTitle = firstResult.textX,
            chartInfo1.firstPointNum = `${firstResult.textY}${type == 'density' ? '个/cm²' : '%'}`;
        }
        if (secondResult?.id) {
          chartInfo1.secondStartLine = [],
            chartInfo1.secondEndLine = [],
            chartInfo1.secondPointTitle = "",
            chartInfo1.secondPointNum = ``;
        }
        return chartInfo1;
      }
    },
    // 获取对比图片
    getCompareInfo(res, type, type1) {
      // type: 1:头油 2:敏感 3:毛囊密度 4: 发质粗细
      // type1: 0-前额;1-头顶;2-左侧;3-右侧 4-后脑
      const typeMap = {
        '1': 'tyAnalysis',
        '2': 'mgAnalysis',
        '3': 'mnAnalysis',
        '4': 'mfAnalysis',
      };
      const result = {
        firstTitle: this.firstCompare.title,
        firstId: this.firstCompare.id,
        firstTime: this.firstCompare.nursingStartTime,
        secondTitle: this.secondCompare.title,
        secondId: this.secondCompare.id,
        secondTime: this.secondCompare.nursingStartTime,
        fiveType: type1,
        fourType: type,
        detailList: res[typeMap[type]] || []
      };
      return result;
    },
    // 弹框
    onCompare(type) {
      this.isPopup = !this.isPopup;
      this.compareSected = this[type == 'one' ? 'firstCompare' : 'secondCompare'].id;
      this.disabledSelect = this[type == 'one' ? 'secondCompare' : 'firstCompare'].id;
      this.arrowType = type == 'one' ? 'first' : 'second';
    },
    // tab切换
    onTabChange(type, item) {
      if (type == 'tab') {
        if (this.tabActive != item.type) {
          this.tabActive = item.type;
          this.getElement(item.type);
        }
      } else {
        // density:毛囊密度 ratio:健康毛囊占比
        if (this[`areaActive${type}`] === item.type) {
          return;
        }
        this[`areaActive${type}`] = item.type;
        this[`compareImgInfo${type}`] = this.getCompareInfo(this.detailtInfo, type == '5' ? '4' : type, item.type);
        switch (type) {
          case '3':
            this.updateChartData('3', { fourType: item.type, fiveType: 'density' });
            this.updateChartData('4', { fourType: item.type, fiveType: 'ratio' });
            break;
          default:
            this.updateChartData(type, { fourType: item.type });
            break;
        }
      }
    },
    // 更新对比点
    updateCompareNum(item) {
      if (item) {
        const originItem = item.arrowType == 'first' ? this.secondCompare : this.firstCompare;
        if (item.id === originItem.id) {
          return;
        }
        const obj = { ...item };
        delete obj.arrowType;
        this[item.arrowType == 'first' ? 'firstCompare' : 'secondCompare'] = { ...obj };
        this.updateChartData('1', { fourType: this.areaActive1 });
        this.updateChartData('2', { fourType: this.areaActive2 });
        this.updateChartData('3', { fourType: this.areaActive3, fiveType: 'density' });
        this.updateChartData('4', { fourType: this.areaActive3, fiveType: 'ratio' });
        this.updateChartData('5', { fourType: this.areaActive5 });

        this.compareImgInfo1 = this.getCompareInfo(this.detailtInfo, '1', this.areaActive1);
        this.compareImgInfo2 = this.getCompareInfo(this.detailtInfo, '2', this.areaActive2);
        this.compareImgInfo3 = this.getCompareInfo(this.detailtInfo, '3', this.areaActive3);
        this.compareImgInfo5 = this.getCompareInfo(this.detailtInfo, '4', this.areaActive5);
      }
    },
    // 更新图表数据
    updateChartData(type, options) {
      const typeMap = {
        '1': 'tyAnalysis',
        '2': 'mgAnalysis',
        '3': 'mnAnalysis',
        '4': 'mnAnalysis',
        '5': 'mfAnalysis',
      };
      this[`chartInfo${type}`] = this.setSourceData(this.detailtInfo[typeMap[type]] || [], options.fourType, options.fiveType);
      this.$refs[`chart${type}`].repaintChart(this[`chartInfo${type}`]);
    },
    // 滚动
    scrollFun(e) {
      // 获取父元素和子元素
      const all = document.getElementById('all');
      const tops = document.getElementById('top');
      const one = document.getElementById('one');
      const two = document.getElementById('two');
      const three = document.getElementById('three');
      const four = document.getElementById('four');
      const scrollTop = all.scrollTop;
      const bottomHeight = all.clientHeight + all.scrollTop;
      const oneTop = one.offsetTop - tops.offsetHeight;
      const twoTop = two.offsetTop - tops.offsetHeight;
      const threeTop = three.offsetTop - tops.offsetHeight;
      const fourTop = four.offsetTop - tops.offsetHeight;

      if (scrollTop >= oneTop && scrollTop < twoTop) {
        this.tabActive = 1;
      } else if (scrollTop >= twoTop && scrollTop < threeTop) {
        this.tabActive = 2;
      } else if (scrollTop >= threeTop && scrollTop < fourTop - 80) {
        this.tabActive = 3;
      } else if (scrollTop >= fourTop - 80 || bottomHeight >= all.scrollHeight - 50) {
        this.tabActive = 4;
      }
    },
    // 定位
    getElement(key) {
      const eleMap = {
        1: 'one',
        2: 'two',
        3: 'three',
        4: 'four',
      };
      const currKey = eleMap[key];
      const all = document.getElementById('all');
      const tops = document.getElementById('top');
      const one = document.getElementById('one');
      const two = document.getElementById('two');
      const three = document.getElementById('three');
      const four = document.getElementById('four');
      if (currKey == 'one') all.scrollTop = one.offsetTop - tops.offsetHeight;
      if (currKey == 'two') all.scrollTop = two.offsetTop - tops.offsetHeight;
      if (currKey == 'three') all.scrollTop = three.offsetTop - tops.offsetHeight;
      if (currKey == 'four') all.scrollTop = four.offsetTop - tops.offsetHeight;
    }
  },
};
</script>
<style scoped lang="less">
@import url("./mobile.less");
</style>