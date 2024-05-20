<template>
  <div class="hairReport" id="hairReport" @scroll="scrollFun" v-if="flag">
    <div class="hairReportBox">
      <div class="hairReportHeader1">
        <div class="hairBox">
          <img class="hairImg" :src="avatarUrl" alt="" />
          <div class="hairRight">
            <div class="hairRightText">{{ username }}</div>
            <div class="hairRightTime">检测时间：{{ formTime(nursingStartTime) }}</div>
          </div>
        </div>
        <div class="fyrz" v-if="isBud" @click="onLink">
          <div class="fyrzBox" v-if="fyrzBox">
            <div class="fyrzText">这里查看 [检测结果的趋势变化] 哦～</div>
          </div>
        </div>
      </div>
      <div class="performance">
        <div class="content">
          <div class="circleLine">
            <div class="circleLineBox">
              <CircleLine :value="mainAnalysis.folliceScore" />
            </div>
            <div class="circleLineContent">
              <van-rolling-text class="value" v-if="mainAnalysis.folliceScore > 0" :start-num="0"
                :target-num="mainAnalysis.folliceScore" direction="up" :duration="1" />
              <van-rolling-text class="value" v-else :start-num="0" :target-num="0" direction="up" :duration="1" />
              <div class="text">毛囊健康评分</div>
            </div>
          </div>
          <div class="contentRow">
            <div class="rowList">
              <div class="titleType"></div>
              <div class="value">
                {{
                  lossHairLevel === 0
                    ? '暂无'
                    : lossHairLevel === 1
                      ? '轻度'
                      : lossHairLevel === 2
                        ? '中度'
                        : lossHairLevel === 3
                          ? '重度'
                          : '--'
                }}
              </div>
              <div class="title">脱发风险</div>
            </div>
            <div class="rowList">
              <div class="titleType titleType_01" v-if="Number(mainAnalysis?.follicleDensityResult) < 70">
                偏低
              </div>
              <div class="titleType titleType_02"
                v-if="Number(mainAnalysis?.follicleDensityResult) >= 70 && Number(mainAnalysis?.follicleDensityResult) <= 140">
                正常
              </div>
              <div class="titleType titleType_03" v-if="Number(mainAnalysis?.follicleDensityResult) > 140">
                优秀
              </div>
              <div class="value">{{ mainAnalysis?.follicleDensityResult }}<span class="unit">根/cm²</span></div>
              <div class="title">毛囊密度</div>
            </div>
            <div class="rowList">
              <div class="titleType titleType_01" v-if="Number(mainAnalysis?.follicleRatioResult) < 60">偏低</div>
              <div class="titleType titleType_03" v-if="Number(mainAnalysis?.follicleRatioResult) >= 60">优秀</div>
              <div class="value">{{ mainAnalysis?.follicleRatioResult }}<span class="unit">%</span></div>
              <div class="title">健康毛囊占比</div>
            </div>
          </div>
          <div class="scalpContent">
            <div class="hairBox1">
              <div class="flexAC">
                <div class="result">
                  <span>{{ lossHairName }}头皮</span>
                </div>
                <div class="dec">/ 头皮类型</div>
              </div>
            </div>
            <div class="scalpContentList">
              <div class="line"></div>
              <div class="scalpContentListBox">
                <div class="rowList">
                  <div class="value">{{ levelObj[mainAnalysis.tyHealthLevel] }}</div>
                  <div class="title">头皮油脂</div>
                </div>
                <div class="rowList">
                  <div class="value">{{ levelObj[mainAnalysis.mgHealthLevel] }}</div>
                  <div class="title">头皮敏感</div>
                </div>
              </div>
            </div>
          </div>
          <div class="crudenessContent">
            <div class="hairBox1">
              <div class="flexAC">
                <div class="result">
                  <span>{{ mfLevelObj[mainAnalysis.mfHealthLevel] }}</span>
                </div>
                <div class="dec">/ 发质粗细</div>
              </div>
            </div>
            <div class="crudenessContentBottom">
              <div class="hairReportModuleItemRegionPercentagePercentageBox">
                <div
                  class="hairReportModuleItemRegionPercentagePercentageLine hairReportModuleItemRegionPercentagePercentageLine1 lineColor5">
                  <div v-if="mainAnalysis.mfHealthLevel == 7"
                    class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition hairScheduleWidth">
                    <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                      src="https://static.aiwobeauty.com/mmreport/v1.9/icon_02.png?02" alt="" />
                  </div>
                </div>
                <div
                  class="hairReportModuleItemRegionPercentagePercentageLine hairReportModuleItemRegionPercentagePercentageLine1 lineColor6">
                  <div v-if="mainAnalysis.mfHealthLevel == 8"
                    class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition hairScheduleWidth">
                    <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                      src="https://static.aiwobeauty.com/mmreport/v1.9/icon_02.png?02" alt="" />
                  </div>
                </div>
                <div
                  class="hairReportModuleItemRegionPercentagePercentageLine hairReportModuleItemRegionPercentagePercentageLine1 lineColor7">
                  <div v-if="mainAnalysis.mfHealthLevel == 9"
                    class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition hairScheduleWidth">
                    <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                      src="https://static.aiwobeauty.com/mmreport/v1.9/icon_02.png?02" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="decText">*报告结果受拍摄点位、照片清晰度、毛囊漏出完整度等因素影响，若对结果有疑问，可与头皮健康顾问进行1V1解答和分析服务。</div>
        </div>
        <div class="bg"></div>
      </div>
      <div class="hairReportWaistTitle2">
        <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_03.png" alt="" />
      </div>
      <div :class="`hairReportModulesBox ${hairReportModulesBoxFixed}`" ref="hairReportModulesBoxRefs">
        <div class="hairReportModules">
          <div @click="setScrollTopFun('tyAnalysis')"
            :class="`hairReportModule ${setScrollTopKey === 'tyAnalysis' && 'selectModule'}`">头皮油脂
          </div>
          <div @click="setScrollTopFun('mgAnalysis')"
            :class="`hairReportModule ${setScrollTopKey === 'mgAnalysis' && 'selectModule'}`">头皮敏感
          </div>
          <div @click="setScrollTopFun('mnAnalysis')"
            :class="`hairReportModule ${setScrollTopKey === 'mnAnalysis' && 'selectModule'}`">毛囊健康
          </div>
          <div @click="setScrollTopFun('mfAnalysis')"
            :class="`hairReportModule ${setScrollTopKey === 'mfAnalysis' && 'selectModule'}`">发质粗细
          </div>
        </div>
      </div>
      <div class="hairReportModuleDetails">
        <div class="hairReportModuleItemBox">
          <div class="hairReportModuleItem" id="tyAnalysis">
            <div class="hairReportModuleItemHeader">
              <div class="hairReportModuleItemHeaderL">头皮油脂</div>
            </div>

            <div :class="`hairReportModuleItemConclusion ${conclusionClose.tyAnalysis && 'hairReportModuleItemConclusionClose'
              }`">
              <div class="hairReportModuleItemConclusionTitle">头油整体情况：{{ tyAnalysis.healthLevelName }}</div>
              <div class="hairReportModuleItemConclusionText">
                <p>{{ tyAnalysis.doc1 }}</p>
                <p>{{ tyAnalysis.doc2 }}</p>
              </div>
              <div @click="conclusionCloseFun('tyAnalysis', false)"
                v-if="conclusionClose.tyAnalysis && tyAnalysis.doc1?.length + tyAnalysis.doc2?.length > 44"
                class="hairReportModuleItemConclusionBot1">
                <div>展开</div>
                <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_12.png" alt="" />
              </div>
              <div @click="conclusionCloseFun('tyAnalysis', true)"
                v-if="!conclusionClose.tyAnalysis && tyAnalysis.doc1?.length + tyAnalysis.doc2?.length > 44"
                class="hairReportModuleItemConclusionBot2">
                <div>收起</div>
                <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_12.png" alt="" />
              </div>
            </div>
            <div class="hairReportModuleItemRegion">
              <div class="hairReportModuleItemRegionTitle">
                <div>区域头皮图</div>
                <div class="hairReportModuleItemRegionTitle1">*黄色区域为头油分布示意</div>
              </div>
              <van-swipe @change="(e) => swipeChange('tyAnalysis', e)" @click="goPhotoList(tyAnalysis, 'tyAnalysis')"
                class="my-swipe" indicator-color="white">
                <van-swipe-item v-for="(item, index) in tyAnalysis.pictureAlgorithmInfo" :key="index">
                  <div class="iconBox">
                    <img class="icon" :src="`${$imgBaseUrl}head-icon${swipeIndex.tyAnalysis}.png`" alt="" />
                    <span>
                      {{
                        swipeIndex.tyAnalysis === 0
                          ? '前额发际'
                          : swipeIndex.tyAnalysis === 1
                            ? '头顶发旋'
                            : swipeIndex.tyAnalysis === 2
                              ? '左侧颞部'
                              : swipeIndex.tyAnalysis === 3
                                ? '右侧颞部'
                                : swipeIndex.tyAnalysis === 4
                                  ? '后脑枕突'
                                  : null
                      }}
                    </span>
                  </div>
                  <img class="swipeImg" @dragstart.prevent :src="item.pictureAlgorithmUrl
                    ? item.pictureAlgorithmUrl
                    : `${$imgBaseUrl}imgNoneBg.png`
                    " alt="" />
                </van-swipe-item>
              </van-swipe>
              <div class="hairReportModuleItemRegionPercentage">
                <div class="hairReportModuleItemRegionPercentageTitle">头皮油脂</div>
                <div class="hairReportModuleItemRegionPercentagePercentageBox">
                  <div class="hairReportModuleItemRegionPercentagePercentageLine lineColor1">
                    <div v-if="algorithmInfoSelects.tyAnalysis.healthLevel == 0"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition">
                      <div class="hairReportModuleItemRegionPercentageAnchorTextBox1">
                        <div class="hairReportModuleItemRegionPercentageAnchorText">占比
                          <span class="num">{{ algorithmInfoSelects.tyAnalysis.result }}</span><span
                            class="per">%</span>
                        </div>
                      </div>
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                  <div class="hairReportModuleItemRegionPercentagePercentageLine lineColor2">
                    <div v-if="algorithmInfoSelects.tyAnalysis.healthLevel == 1"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition">
                      <div class="hairReportModuleItemRegionPercentageAnchorTextBox">
                        <div class="hairReportModuleItemRegionPercentageAnchorText">占比
                          <span class="num">{{ algorithmInfoSelects.tyAnalysis.result }}</span><span
                            class="per">%</span>
                        </div>
                      </div>
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                  <div class="hairReportModuleItemRegionPercentagePercentageLine lineColor3">
                    <div v-if="algorithmInfoSelects.tyAnalysis.healthLevel == 2"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition">
                      <div class="hairReportModuleItemRegionPercentageAnchorTextBox">
                        <div class="hairReportModuleItemRegionPercentageAnchorText">占比
                          <span class="num">{{ algorithmInfoSelects.tyAnalysis.result }}</span><span
                            class="per">%</span>
                        </div>
                      </div>
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                  <div class="hairReportModuleItemRegionPercentagePercentageLine lineColor4">
                    <div v-if="algorithmInfoSelects.tyAnalysis.healthLevel == 3"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition">
                      <div class="hairReportModuleItemRegionPercentageAnchorTextBox2">
                        <div class="hairReportModuleItemRegionPercentageAnchorText">占比
                          <span class="num">{{ algorithmInfoSelects.tyAnalysis.result }}</span><span
                            class="per">%</span>
                        </div>
                      </div>
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="doc2Content">
                {{
                  swipeIndex.tyAnalysis === 0
                    ? '前额发际'
                    : swipeIndex.tyAnalysis === 1
                      ? '头顶发旋'
                      : swipeIndex.tyAnalysis === 2
                        ? '左侧颞部'
                        : swipeIndex.tyAnalysis === 3
                          ? '右侧颞部'
                          : swipeIndex.tyAnalysis === 4
                            ? '后脑枕突'
                            : null
                }}
                <template v-if="tyAnalysis.pictureAlgorithmInfo?.length > 0">
                  <template v-for="(item, index) in tyAnalysis.pictureAlgorithmInfo[swipeIndex.tyAnalysis].doc">
                    <template v-if="item.moduleType === 1">
                      {{ item.content }}
                    </template>
                  </template>
                </template>
              </div>
            </div>
          </div>
          <div class="questionBox" @click="openModal(tyAnalysis.dimenType)">
            <span class="questionBoxText">为什么有的人容易头油？</span>
            <div class="questionBoxRight"><span>查看原因</span><i></i></div>
          </div>

          <div class="hairReportModuleItem" id="mgAnalysis">
            <div class="hairReportModuleItemHeader">
              <div class="hairReportModuleItemHeaderL">头皮敏感</div>
            </div>

            <div :class="`hairReportModuleItemConclusion ${conclusionClose.mgAnalysis && 'hairReportModuleItemConclusionClose'
              }`">
              <div class="hairReportModuleItemConclusionTitle">敏感整体情况：{{ mgAnalysis.healthLevelName }}</div>
              <div class="hairReportModuleItemConclusionText">
                <p>{{ mgAnalysis.doc1 }}</p>
                <p>{{ mgAnalysis.doc2 }}</p>
              </div>
              <div @click="conclusionCloseFun('mgAnalysis', false)"
                v-if="conclusionClose.mgAnalysis && mgAnalysis.doc1?.length + mgAnalysis.doc2?.length > 44"
                class="hairReportModuleItemConclusionBot1">
                <div>展开</div>
                <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_12.png" alt="" />
              </div>
              <div @click="conclusionCloseFun('mgAnalysis', true)"
                v-if="!conclusionClose.mgAnalysis && mgAnalysis.doc1?.length + mgAnalysis.doc2?.length > 44"
                class="hairReportModuleItemConclusionBot2">
                <div>收起</div>
                <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_12.png" alt="" />
              </div>
            </div>

            <div class="hairReportModuleItemRegion">
              <div class="hairReportModuleItemRegionTitle">
                <div>区域头皮图</div>
                <div class="hairReportModuleItemRegionTitle1">*红色区域为敏感分布示意</div>
              </div>
              <van-swipe @change="(e) => swipeChange('mgAnalysis', e)" @click="goPhotoList(mgAnalysis, 'mgAnalysis')"
                class="my-swipe" indicator-color="white">
                <van-swipe-item v-for="(item, index) in mgAnalysis.pictureAlgorithmInfo" :key="index">
                  <div class="iconBox">
                    <img class="icon" :src="`${$imgBaseUrl}head-icon${swipeIndex.mgAnalysis}.png`" alt="" />
                    <span>
                      {{
                        swipeIndex.mgAnalysis === 0
                          ? '前额发际'
                          : swipeIndex.mgAnalysis === 1
                            ? '头顶发旋'
                            : swipeIndex.mgAnalysis === 2
                              ? '左侧颞部'
                              : swipeIndex.mgAnalysis === 3
                                ? '右侧颞部'
                                : swipeIndex.mgAnalysis === 4
                                  ? '后脑枕突'
                                  : null
                      }}
                    </span>
                  </div>
                  <img class="swipeImg" @dragstart.prevent :src="item.pictureAlgorithmUrl
                    ? item.pictureAlgorithmUrl
                    : `${$imgBaseUrl}imgNoneBg.png`
                    " alt="" />
                </van-swipe-item>
              </van-swipe>

              <div class="hairReportModuleItemRegionPercentage">
                <div class="hairReportModuleItemRegionPercentageTitle">头皮敏感</div>
                <div class="hairReportModuleItemRegionPercentagePercentageBox">
                  <div class="hairReportModuleItemRegionPercentagePercentageLine lineColor1">
                    <div v-if="algorithmInfoSelects.mgAnalysis.healthLevel == 0"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition">
                      <div class="hairReportModuleItemRegionPercentageAnchorTextBox1">
                        <div class="hairReportModuleItemRegionPercentageAnchorText">占比
                          <span class="num">{{ algorithmInfoSelects.mgAnalysis.result }}</span><span
                            class="per">%</span>
                        </div>
                      </div>
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                  <div class="hairReportModuleItemRegionPercentagePercentageLine lineColor2">
                    <div v-if="algorithmInfoSelects.mgAnalysis.healthLevel == 1"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition">
                      <div class="hairReportModuleItemRegionPercentageAnchorTextBox">
                        <div class="hairReportModuleItemRegionPercentageAnchorText">占比
                          <span class="num">{{ algorithmInfoSelects.mgAnalysis.result }}</span><span
                            class="per">%</span>
                        </div>
                      </div>
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                  <div class="hairReportModuleItemRegionPercentagePercentageLine lineColor3">
                    <div v-if="algorithmInfoSelects.mgAnalysis.healthLevel == 2"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition">
                      <div class="hairReportModuleItemRegionPercentageAnchorTextBox">
                        <div class="hairReportModuleItemRegionPercentageAnchorText">占比
                          <span class="num">{{ algorithmInfoSelects.mgAnalysis.result }}</span><span
                            class="per">%</span>
                        </div>
                      </div>
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                  <div class="hairReportModuleItemRegionPercentagePercentageLine lineColor4">
                    <div v-if="algorithmInfoSelects.mgAnalysis.healthLevel == 3"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition">
                      <div class="hairReportModuleItemRegionPercentageAnchorTextBox2">
                        <div class="hairReportModuleItemRegionPercentageAnchorText">占比
                          <span class="num">{{ algorithmInfoSelects.mgAnalysis.result }}</span><span
                            class="per">%</span>
                        </div>
                      </div>
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="doc2Content">
                {{
                  swipeIndex.mgAnalysis === 0
                    ? '前额发际'
                    : swipeIndex.mgAnalysis === 1
                      ? '头顶发旋'
                      : swipeIndex.mgAnalysis === 2
                        ? '左侧颞部'
                        : swipeIndex.mgAnalysis === 3
                          ? '右侧颞部'
                          : swipeIndex.mgAnalysis === 4
                            ? '后脑枕突'
                            : null
                }}
                <template v-if="mgAnalysis.pictureAlgorithmInfo?.length > 0">
                  <template v-for="(item, index) in mgAnalysis.pictureAlgorithmInfo[swipeIndex.mgAnalysis].doc">
                    <template v-if="item.moduleType === 1">
                      {{ item.content }}
                    </template>
                  </template>
                </template>
              </div>
            </div>
          </div>
          <div class="questionBox" @click="openModal(mgAnalysis.dimenType)">
            <span class="questionBoxText">为什么有的人容易头皮敏感？</span>
            <div class="questionBoxRight"><span>查看原因</span><i></i></div>
          </div>

          <div class="hairReportModuleItem" id="mnAnalysis">
            <div class="hairReportModuleItemHeader">
              <div class="hairReportModuleItemHeaderL">毛囊健康</div>
            </div>

            <div :class="`hairReportModuleItemConclusion ${conclusionClose.mnAnalysis && 'hairReportModuleItemConclusionClose'
              }`">
              <div class="mndocHeadBox">
                <div class="mndocHead1">
                  <span class="text2">{{ mainAnalysis?.follicleDensityResult }}<span class="text1">根/cm²</span></span>
                  <div class="text1">毛囊密度</div>
                </div>
                <div class="line"></div>
                <div class="mndocHead1 mndocHead2">
                  <span class="text2">{{ mainAnalysis?.follicleRatioResult }}<span class="text1">%</span></span>
                  <div class="text1">健康毛囊占比</div>
                </div>
              </div>
              <div class="hairReportModuleItemConclusionText">
                <p>{{ mnAnalysis.doc1 }}</p>
                <p>{{ mnAnalysis.doc2 }}</p>
              </div>
              <div @click="conclusionCloseFun('mnAnalysis', false)"
                v-if="conclusionClose.mnAnalysis && mnAnalysis.doc1?.length + mnAnalysis.doc2?.length > 44"
                class="hairReportModuleItemConclusionBot1">
                <div>展开</div>
                <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_12.png" alt="" />
              </div>
              <div @click="conclusionCloseFun('mnAnalysis', true)"
                v-if="!conclusionClose.mnAnalysis && mnAnalysis.doc1?.length + mnAnalysis.doc2?.length > 44"
                class="hairReportModuleItemConclusionBot2">
                <div>收起</div>
                <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_12.png" alt="" />
              </div>
            </div>

            <div class="hairReportModuleItemRegion">
              <div class="hairReportModuleItemRegionTitle">区域头皮图</div>
              <van-swipe @change="(e) => swipeChange('mnAnalysis', e)" @click="goPhotoList(mnAnalysis, 'mnAnalysis')"
                class="my-swipe" indicator-color="white">
                <van-swipe-item v-for="(item, index) in mnAnalysis.pictureAlgorithmInfo" :key="index">
                  <div class="iconBox">
                    <img class="icon" :src="`${$imgBaseUrl}head-icon${swipeIndex.mnAnalysis}.png`" alt="" />
                    <span>
                      {{
                        swipeIndex.mnAnalysis === 0
                          ? '前额发际'
                          : swipeIndex.mnAnalysis === 1
                            ? '头顶发旋'
                            : swipeIndex.mnAnalysis === 2
                              ? '左侧颞部'
                              : swipeIndex.mnAnalysis === 3
                                ? '右侧颞部'
                                : swipeIndex.mnAnalysis === 4
                                  ? '后脑枕突'
                                  : null
                      }}
                    </span>
                  </div>
                  <img class="swipeImg" @dragstart.prevent :src="item.pictureAlgorithmUrl
                    ? item.pictureAlgorithmUrl
                    : `${$imgBaseUrl}imgNoneBg.png`
                    " alt="" />
                </van-swipe-item>
              </van-swipe>
              <div class="hairReportModuleItemRegionPercentage v19Style1">
                <div class="hairReportModuleItemRegionPercentageTitle">毛囊密度</div>
                <div class="progressBarBox">
                  <div class="progressBar">
                    <div class="drop1"></div>
                    <div class="drop1 drop2"></div>
                    <div class="dropText1 dropText10">偏低</div>
                    <div class="dropText1">70</div>
                    <div class="dropText1 dropText8">正常</div>
                    <div class="dropText1 dropText2">140</div>
                    <div class="dropText1 dropText9">优秀</div>
                    <img id="mdProgressDrop" class="progressDrop"
                      src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    <div id="mdDropText" class="dropText3">
                      <span class="dropText4">
                        {{ algorithmInfoSelects.mnAnalysis?.follicleDensityResult }}
                        <span class="unit">根/cm²</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="v19Style3"></div>
              <div class="hairReportModuleItemRegionPercentage v19Style2">
                <div class="hairReportModuleItemRegionPercentageTitle">健康毛囊</div>
                <div class="progressBarBox">
                  <div class="progressBar">
                    <div class="drop1 drop3"></div>
                    <div class="dropText1 dropText5">0</div>
                    <div class="dropText1 dropText11">偏低</div>
                    <div class="dropText1 dropText7">60</div>
                    <div class="dropText1 dropText12">优秀</div>
                    <div class="dropText1 dropText6">100</div>
                    <img id="jkProgressDrop" class="progressDrop"
                      src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    <div id="jkDropText" class="dropText3">
                      <span class="unit">占比</span>
                      <span class="dropText4">
                        {{ algorithmInfoSelects.mnAnalysis?.follicleRatioResult }}
                        <span class="unit">%</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="doc2Content">
                {{
                  swipeIndex.mnAnalysis === 0
                    ? '前额发际'
                    : swipeIndex.mnAnalysis === 1
                      ? '头顶发旋'
                      : swipeIndex.mnAnalysis === 2
                        ? '左侧颞部'
                        : swipeIndex.mnAnalysis === 3
                          ? '右侧颞部'
                          : swipeIndex.mnAnalysis === 4
                            ? '后脑枕突'
                            : null
                }}
                <template v-if="mnAnalysis.pictureAlgorithmInfo?.length > 0">
                  <template v-for="(item, index) in mnAnalysis.pictureAlgorithmInfo[swipeIndex.mnAnalysis].doc">
                    <template v-if="item.moduleType === 5">
                      {{ item.content }}
                    </template>
                    <template v-if="item.moduleType === 4">
                      {{ item.content }}
                    </template>
                  </template>
                </template>
              </div>
            </div>
          </div>
          <div class="questionBox" @click="openModal(mnAnalysis.dimenType)">
            <span class="questionBoxText">怎么看毛囊是否健康？</span>
            <div class="questionBoxRight"><span>查看科普</span><i></i></div>
          </div>

          <div class="hairReportModuleItem" id="mfAnalysis">
            <div class="hairReportModuleItemHeader">
              <div class="hairReportModuleItemHeaderL">发质粗细</div>
            </div>

            <div :class="`hairReportModuleItemConclusion ${conclusionClose.mfAnalysis && 'hairReportModuleItemConclusionClose'
              }`">
              <div class="hairReportModuleItemConclusionTitle">发质粗细情况：{{ mfAnalysis.healthLevelName }}</div>
              <div class="hairReportModuleItemConclusionText">{{ mfAnalysis.doc1 }}</div>
              <div @click="conclusionCloseFun('mfAnalysis', false)"
                v-if="conclusionClose.mfAnalysis && mfAnalysis.doc1?.length > 44"
                class="hairReportModuleItemConclusionBot1">
                <div>展开</div>
                <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_12.png" alt="" />
              </div>
              <div @click="conclusionCloseFun('mfAnalysis', true)"
                v-if="!conclusionClose.mfAnalysis && mfAnalysis.doc1?.length > 44"
                class="hairReportModuleItemConclusionBot2">
                <div>收起</div>
                <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_12.png" alt="" />
              </div>
            </div>

            <div class="hairReportModuleItemRegion">
              <div class="hairReportModuleItemRegionTitle">区域头皮图</div>
              <van-swipe @change="(e) => swipeChange('mfAnalysis', e)" @click="goPhotoList(mfAnalysis, 'mfAnalysis')"
                class="my-swipe" indicator-color="white">
                <van-swipe-item v-for="(item, index) in mfAnalysis.pictureAlgorithmInfo" :key="index">
                  <div class="iconBox">
                    <img class="icon" :src="`${$imgBaseUrl}head-icon${swipeIndex.mfAnalysis}.png`" alt="" />
                    <span>
                      {{
                        swipeIndex.mfAnalysis === 0
                          ? '前额发际'
                          : swipeIndex.mfAnalysis === 1
                            ? '头顶发旋'
                            : swipeIndex.mfAnalysis === 2
                              ? '左侧颞部'
                              : swipeIndex.mfAnalysis === 3
                                ? '右侧颞部'
                                : swipeIndex.mfAnalysis === 4
                                  ? '后脑枕突'
                                  : null
                      }}
                    </span>
                  </div>
                  <img class="swipeImg" @dragstart.prevent :src="item.pictureAlgorithmUrl
                    ? item.pictureAlgorithmUrl
                    : `${$imgBaseUrl}imgNoneBg.png`
                    " alt="" />
                </van-swipe-item>
              </van-swipe>
              <div class="hairReportModuleItemRegionPercentage">
                <div class="hairReportModuleItemRegionPercentageTitle">发质粗细</div>
                <div class="hairReportModuleItemRegionPercentagePercentageBox">
                  <div
                    class="hairReportModuleItemRegionPercentagePercentageLine hairReportModuleItemRegionPercentagePercentageLine1 lineColor5 newUnit">
                    <div v-if="algorithmInfoSelects.mfAnalysis?.hairThicknessLevel == 7"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition hairScheduleWidth">
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                  <div
                    class="hairReportModuleItemRegionPercentagePercentageLine hairReportModuleItemRegionPercentagePercentageLine1 lineColor6 newUnit">
                    <div v-if="algorithmInfoSelects.mfAnalysis?.hairThicknessLevel == 8"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition hairScheduleWidth">
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                  <div
                    class="hairReportModuleItemRegionPercentagePercentageLine hairReportModuleItemRegionPercentagePercentageLine1 lineColor7 newUnit">
                    <div v-if="algorithmInfoSelects.mfAnalysis?.hairThicknessLevel == 9"
                      class="hairReportModuleItemRegionPercentageAnchor percentageAnchorPosition hairScheduleWidth">
                      <img class="hairReportModuleItemRegionPercentageAnchorIcon"
                        src="https://static.aiwobeauty.com/mmreport/v1.9/icon_11.png" alt="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="questionBox" @click="openModal(mfAnalysis.dimenType)">
            <span class="questionBoxText">头发粗细影响掉发吗？</span>
            <div class="questionBoxRight"><span>查看科普</span><i></i></div>
          </div>

        </div>
      </div>
      <!-- 定制我的护理方案 -->
      <div class="hairReportWaistTitle1" @click="
        goto('nursingProgram', {
          id: id,
          lossHairLevel: lossHairLevel,
          lossHairName: lossHairName,
          fromOrigin: isOriginPc ? 'hairReport' : '',
          originType: isOriginPc ? 'pc' : '',
        })
        ">
        <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_06.png?01" alt="" />
      </div>
      <!-- 长按图片添加MYAI头皮护理专家 -->
      <div class="tapAndHold">
        <h2 class="tapAndHoldH2">长按图片添加MYAI头皮护理专家</h2>
        <div class="tapAndHoldBox">
          <img class="tapAndHoldBoxImg" src="https://static.aiwobeauty.com/mmreport/v1.9/icon_08.png" alt="" />
          <div class="tapAndHoldBoxRight">
            <h3 class="tapAndHoldBoxRigthH3">立享1V1专属真人服务</h3>
            <ul>
              <li><i></i>深度解读检测报告</li>
              <li><i></i>定制专属头皮护理方案</li>
              <li><i></i>个性化关怀服务</li>
              <li><i></i>定期抽送专业医师会诊福利</li>
            </ul>
          </div>
        </div>
        <div class="tapAndHoldBottom">此项服务购买产品即可享受，无需额外支付费用</div>
      </div>
    </div>
    <div id="export" class="expert" @touchmove.prevent="touchMove" @touchend.prevent="touchEnd"
      @touchstart.prevent="touchStart" v-show="isShowWechat">
      <img src="https://static.aiwobeauty.com/mmreport/v1.9/icon_07.png?01" alt="" />
    </div>
    <PopupCode v-model="show" title="专家咨询" :img="`${$imgBaseUrl}zj_code_qw.png`" />
    <HairCarePopup v-if="showHairCare" :showHairCare="showHairCare" :type="openType" @close="closeModal" />
    <CheckImagePop ref="checkImagePopRef" :nursingStartTime="nursingStartTime" :photoList="photoList"
      :popImageIndex="popImageIndex" />
  </div>
  <div class="noData" v-else>
    <img class="noDataImg" src="https://static.aiwobeauty.com/mmreport/v1.9/icon_16.png" alt="" />
    <div class="noDataTitle">您的报告生成失败了</div>
    <div class="noDataText">非常抱歉，检测报告生成过程中出现了问题</div>
  </div>
</template>
<script>
import { getQueryString, isEmpty, sortArr, deepClone } from '@/utils/common';
import http from '@/api/http';
import { mapState } from 'pinia';
import { useUserStore } from '@/stores/user';
import qs from 'qs';
import dayjs from 'dayjs';
import { showToast } from 'vant';
import PopupCode from '@/components/PopupCode.vue';
import HairCarePopup from './hairCarePopup/index.vue';
import CheckImagePop from './checkImagePop/index.vue';
import CircleLine from './circleLine/index.vue';

export default {
  data() {
    return {
      flag: false,
      $imgBaseUrl: 'https://aiwo-platform.oss-cn-hangzhou.aliyuncs.com/ailink/hairTestReport/',
      isLogin: false,
      username: '',
      avatarUrl: '',
      lossHairLevel: undefined,
      lossHairName: '--',
      mfAnalysis: {},
      mgAnalysis: {},
      mnAnalysis: {},
      tyAnalysis: {},
      mainAnalysis: {},
      nursingStartTime: 0,
      template: '',
      popImageIndex: 0,
      algorithmInfoSelects: {
        tyAnalysis: {},
        mgAnalysis: {},
        mnAnalysis: {},
        mfAnalysis: {},
      },
      algorithmInfoSelectIndexs: {
        tyAnalysis: 0,
        mgAnalysis: 0,
        mnAnalysis: 0,
        mfAnalysis: 0,
      },
      conclusionClose: {
        tyAnalysis: true,
        mgAnalysis: true,
        mnAnalysis: true,
        mfAnalysis: true,
      },
      levelObj: {
        0: '健康',
        1: '轻度',
        2: '中度',
        3: '重度',
      },
      mnLevelObj: {
        0: '健康',
        1: '轻度稀疏',
        2: '中度稀疏',
        3: '重度稀疏',
      },
      mfLevelObj: {
        7: '细软',
        8: '适中',
        9: '粗硬',
      },
      id: '',
      userId: null,//微信小程序当前登录用户ID
      isShowWechat: true,
      isOriginPc: false,
      show: false,
      setScrollTopKey: 'tyAnalysis',
      showHairCare: false,
      openType: 0,
      swipeIndex: {
        tyAnalysis: 0,
        mgAnalysis: 0,
        mnAnalysis: 0,
        mfAnalysis: 0,
      },
      isBud: false,
      _isBud: true,//默认展示
      photoList: [],
      startX: 0,
      startY: 0,
      moveStartTime: 0,
      hairReportModulesBoxFixed: "",
      fyrzBox: false,
    };
  },
  components: {
    HairCarePopup,
    CheckImagePop,
    PopupCode,
    CircleLine,
  },
  computed: {
    ...mapState(useUserStore, ['authToken']),
  },
  created() { },
  mounted() {
    this.id = getQueryString('id');
    this.userId = Number(getQueryString('userId'));
    const isOriginPc = getQueryString('originType') === 'pc';
    this.isOriginPc = isOriginPc;
    this.isShowWechat = !isOriginPc;
    document.documentElement.addEventListener(
      'touchstart',
      function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      },
      {
        passive: false,
      },
    );
    this.getDetail();
    this.getLoseHairCompareList();

    if (localStorage.getItem("fyrzBox") !== "false") {
      // TODO:本期不展示
      // this.fyrzBox = true;
      localStorage.setItem("fyrzBox", "false");
      setTimeout(() => {
        this.fyrzBox = false;
      }, 5000);
    }
  },
  methods: {
    // 中台登录
    getToken() {
      let body = {
        authToken: this.authToken,
      };
      http.post(
        '/api/aiwo-product-manual/token/freeLogin',
        qs.stringify(body),
        {},
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        },
      ).then((res) => {
        if (res.success) {
          this.isLogin = true;
          this.getDetail();
        }
      });
    },
    getDetail() {
      this.flag = true;
      if (isEmpty(this.id)) {
        showToast('id参数为空');
        return false;
      }
      // 顾客表单查看详情
      let url = `/api/aiwo-aiot-service/maneMaxDetectionRecord/getNursingDetail`;
      http.get(url, { id: this.id, }, {}, {}, false).then((res) => {
        const { success, data = {}, message } = res;
        if (success) {
          const {
            maneMaxMemberId, // 用户ID
            username, // 用户名称
            avatarUrl, // 头像
            lossHairLevel, // 脱发结果等级（0-健康 1-轻度 2-中度 3-重度）
            lossHairName, // 脱发结果名称
            mfAnalysis, // 详细分析-毛囊密度
            mgAnalysis, // 详细分析-敏感
            mnAnalysis, // 详细分析-毛囊密度
            tyAnalysis, // 详细分析-头油
            nursingStartTime, // 检测时间
            mainAnalysis, // 主要表现
          } = data;
          tyAnalysis.doc1 = '';
          mnAnalysis.doc1 = '';
          mgAnalysis.doc1 = '';
          mfAnalysis.doc1 = '';
          tyAnalysis.doc.sort(function (a, b) {
            return a.id - b.id;
          });
          tyAnalysis.doc.forEach((item) => {
            // 头皮油脂
            // moduleType 0-总体表征描述;1-区域程度描述;2-建议;3-稀疏程度;4-健康毛囊占比;5-毛囊密度;6脱发风险程度
            // console.log(item.moduleTypeName, item.moduleType, item.content);
            if (item.moduleType === 0) {
              tyAnalysis.doc1 = item.content;
            }
            if (item.moduleType === 2) {
              tyAnalysis.doc2 = item.content;
            }
          });
          let tyPicture = deepClone(tyAnalysis?.pictureAlgorithmInfo || []);
          let tySortList = sortArr(tyPicture, 'pictureTag');
          tyAnalysis.pictureAlgorithmInfo = tySortList;

          mnAnalysis.doc.sort(function (a, b) {
            return a.id - b.id;
          });
          mnAnalysis.doc.forEach((item) => {
            // 毛囊健康
            // moduleType 0-总体表征描述;1-区域程度描述;2-建议;3-稀疏程度;4-健康毛囊占比;5-毛囊密度;6脱发风险程度
            // console.log(item.moduleTypeName, item.moduleType, item.content);
            if (item.moduleType === 6) {
              mnAnalysis.doc1 = item.content;
            }
            if (item.moduleType === 2) {
              mnAnalysis.doc2 = item.content;
            }
          });
          let mnPicture = deepClone(mnAnalysis?.pictureAlgorithmInfo || []);
          let mnSortList = sortArr(mnPicture, 'pictureTag');
          mnAnalysis.pictureAlgorithmInfo = mnSortList;

          mgAnalysis.doc.sort(function (a, b) {
            return a.id - b.id;
          });
          mgAnalysis.doc.forEach((item) => {
            // 头皮敏感
            // moduleType 0-总体表征描述;1-区域程度描述;2-建议;3-稀疏程度;4-健康毛囊占比;5-毛囊密度;6脱发风险程度
            // console.log(item.moduleTypeName, item.moduleType, item.content);
            if (item.moduleType === 0) {
              mgAnalysis.doc1 = item.content;
            }
            if (item.moduleType === 2) {
              mgAnalysis.doc2 = item.content;
            }
          });
          let mgPicture = deepClone(mgAnalysis?.pictureAlgorithmInfo || []);
          let mgSortList = sortArr(mgPicture, 'pictureTag');
          mgAnalysis.pictureAlgorithmInfo = mgSortList;

          mfAnalysis.doc.sort(function (a, b) {
            return a.id - b.id;
          });
          mfAnalysis.doc.forEach((item) => {
            // 发质粗细
            // console.log(item.moduleTypeName, item.moduleType, item.content);
            mfAnalysis.doc1 += item.content + '\n';
          });
          let mfPicture = deepClone(mfAnalysis?.pictureAlgorithmInfo || []);
          let mfSortList = sortArr(mfPicture, 'pictureTag');
          mfAnalysis.pictureAlgorithmInfo = mfSortList;

          if (!isEmpty(this.userId)) {
            this.isBud = this._isBud = (this.userId === maneMaxMemberId) && this._isBud;
            this.isShowWechat = this.isShowWechat && this.userId === maneMaxMemberId;
          } else {
            this.isShowWechat = false;
            this.isBud = this._isBud = false;
          }

          this.username = username;
          this.avatarUrl = avatarUrl;
          this.lossHairLevel = lossHairLevel;
          this.lossHairName = lossHairName;

          this.mfAnalysis = mfAnalysis;
          this.mgAnalysis = mgAnalysis;
          this.mnAnalysis = mnAnalysis;
          this.tyAnalysis = tyAnalysis;

          this.nursingStartTime = nursingStartTime;
          this.mainAnalysis = mainAnalysis;

          this.algorithmInfoSelects = {
            tyAnalysis: tyAnalysis.pictureAlgorithmInfo[0],
            mgAnalysis: mgAnalysis.pictureAlgorithmInfo[0],
            mnAnalysis: mnAnalysis.pictureAlgorithmInfo[0],
            mfAnalysis: mfAnalysis.pictureAlgorithmInfo[0],
          };
          let follicleDensityResultPercentage = (mnAnalysis.pictureAlgorithmInfo[0]?.follicleDensityResult / 200) * 100;
          if (follicleDensityResultPercentage > 100) {
            follicleDensityResultPercentage = 100;
          }
          this.$nextTick(() => {
            this.calculatePercentage(
              follicleDensityResultPercentage,
              'mdDropText',
              'mdProgressDrop',
            );
            this.calculatePercentage(
              mnAnalysis.pictureAlgorithmInfo[0]?.follicleRatioResult,
              'jkDropText',
              'jkProgressDrop',
            );
          });
        } else {
          this.flag = false;
        }
      });
    },
    regionIemSelectFun(key, index) {
      this.algorithmInfoSelects[key] = this[key].pictureAlgorithmInfo[index] || {};
      this.algorithmInfoSelectIndexs[key] = index;
    },
    conclusionCloseFun(key, bool) {
      this.conclusionClose[key] = bool;
    },
    goto(url, item) {
      this.$router.push({
        path: url,
        query: {
          ...item,
        },
      });
    },
    scrollFun(e) {
      // console.log(e);
      if (this.$refs.hairReportModulesBoxRefs.getBoundingClientRect().top === 0) {
        this.hairReportModulesBoxFixed = "hairReportModulesBoxFixed";
      } else {
        this.hairReportModulesBoxFixed = "";
      }
      // 获取父元素和子元素
      const hairReportBox = document.getElementById('hairReport');
      const tyAnalysis = document.getElementById('tyAnalysis');
      const mgAnalysis = document.getElementById('mgAnalysis');
      const mnAnalysis = document.getElementById('mnAnalysis');
      const mfAnalysis = document.getElementById('mfAnalysis');
      // 判断当前显示的是哪个子元素
      const scrollTop = hairReportBox.scrollTop;
      const tyTop = tyAnalysis.offsetTop - 100;
      const mgTop = mgAnalysis.offsetTop - 100;
      const mnTop = mnAnalysis.offsetTop - 100;
      const mfTop = mfAnalysis.offsetTop - 100;
      // console.log(scrollTop, tyTop, mgTop, mnTop);
      if (scrollTop >= tyTop && scrollTop < mgTop) {
        this.setScrollTopKey = 'tyAnalysis';
      } else if (scrollTop >= mgTop && scrollTop < mnTop) {
        this.setScrollTopKey = 'mgAnalysis';
      } else if (scrollTop >= mnTop && scrollTop < mfTop) {
        this.setScrollTopKey = 'mnAnalysis';
      } else if (scrollTop >= mfTop) {
        this.setScrollTopKey = 'mfAnalysis';
      }
    },
    setScrollTopFun(key) {
      this.setScrollTopKey = key;
      const hairReportBox = document.getElementById('hairReport');
      const tyAnalysis = document.getElementById('tyAnalysis');
      const mgAnalysis = document.getElementById('mgAnalysis');
      const mnAnalysis = document.getElementById('mnAnalysis');
      const mfAnalysis = document.getElementById('mfAnalysis');
      if (key === 'tyAnalysis') hairReportBox.scrollTop = tyAnalysis.offsetTop - 60;
      if (key === 'mgAnalysis') hairReportBox.scrollTop = mgAnalysis.offsetTop - 60;
      if (key === 'mnAnalysis') hairReportBox.scrollTop = mnAnalysis.offsetTop - 60;
      if (key === 'mfAnalysis') hairReportBox.scrollTop = mfAnalysis.offsetTop - 60;
    },
    openModal(type) {
      this.showHairCare = true;
      this.openType = type;
    },
    closeModal() {
      this.showHairCare = false;
    },
    formTime(time) {
      return time ? dayjs(time).format('YYYY-MM-DD HH:mm') : '';
    },
    goPhotoList(item, key) {
      this.photoList = item.pictureAlgorithmInfo;
      this.popImageIndex = this.swipeIndex[key];
      this.$refs.checkImagePopRef.showImg();
    },
    swipeChange(key, index) {
      this.algorithmInfoSelects[key] = this[key].pictureAlgorithmInfo[index] || {};
      this.swipeIndex[key] = index;
      if (key === 'mnAnalysis') {
        // 计算百分比
        let follicleDensityResultPercentage = (this[key].pictureAlgorithmInfo[index]?.follicleDensityResult / 200) * 100;
        if (follicleDensityResultPercentage > 100) {
          follicleDensityResultPercentage = 100;
        }
        this.calculatePercentage(follicleDensityResultPercentage, 'mdDropText', 'mdProgressDrop');
        this.calculatePercentage(this[key].pictureAlgorithmInfo[index]?.follicleRatioResult, 'jkDropText', 'jkProgressDrop');
      }
    },
    calculatePercentage(percentage, key1, key2) {
      // 传入百分比
      let unit = 1;
      if (!this.isOriginPc) {
        unit = window.screen.availWidth / 375;
      } else {
        unit = 1;
      }
      let left = 2.33 * percentage * unit;
      let textWidth = (document.getElementById(key1).offsetWidth / 2) * unit;
      if (key2 === "mdProgressDrop") {
        document.getElementById(key2).style.left = `${left - 14 * unit}px`;
      } else {
        document.getElementById(key2).style.left = `${left - 8 * unit}px`;
      }
      if (textWidth + left > 233 * unit) {
        document.getElementById(key1).style.left = `${233 * unit - textWidth * 2 + 16 * unit}px`;
        return;
      }
      if (textWidth > left + 8 * unit) {
        document.getElementById(key1).style.left = `0px`;
        return;
      }
      if (left + 8 * unit > textWidth) {
        if (key1 === "mdDropText") {
          document.getElementById(key1).style.left = `${(left - 14) * unit - textWidth}px`;
          return;
        } else {
          document.getElementById(key1).style.left = `${(left + 8) * unit - textWidth}px`;
          return;
        }
      }
    },
    getLoseHairCompareList() {
      http.get('/api/aiwo-aiot-service/maneMaxDetectionRecord/getLoseHairCompareList', {
        id: this.id,
      }).then((res) => {
        if (res.data.length >= 2) {
          this.isBud = this._isBud = true && this._isBud;
        } else {
          this.isBud = this._isBud = false;
        }
      });
    },
    onLink() {
      if (!this.id) {
        showToast('id参数为空');
        return;
      }
      this.goto('sproutLog', { id: this.id });
    },
    touchEnd(event) {
      console.log('touchEnd', event);
      const nowTime = new Date().getTime();
      if (nowTime - this.moveStartTime < 150) {
        this.show = true;
      } else {
        console.log('move事件');
        let child = document.getElementById('export');
        let leftX = event.changedTouches[0].pageX - this.startX;
        let clientWidth = document.documentElement.clientWidth;
        let maxX = clientWidth - parseInt(window.getComputedStyle(child).width) + 6;
        console.log(1, leftX);
        if (leftX < maxX / 2) {
          leftX = -6;
        } else {
          leftX = maxX;
        }
        child.style.left = leftX + 'px';
        child.style.transition = 'all 0.1s linear 0s';
      }
    },
    touchStart(event) {
      let child = document.getElementById('export');
      this.startX = event.targetTouches[0].pageX - child.offsetLeft;
      this.startY = event.targetTouches[0].pageY - child.offsetTop;
      this.moveStartTime = new Date().getTime();
    },
    touchMove(event) {
      let child = document.getElementById('export');
      event.preventDefault();
      event.stopPropagation();
      let leftX = event.targetTouches[0].pageX - this.startX;
      let topY = event.targetTouches[0].pageY - this.startY;
      let maxX =
        document.documentElement.clientWidth - parseInt(window.getComputedStyle(child).width) + 6;
      let maxY =
        document.documentElement.clientHeight -
        parseInt(window.getComputedStyle(child).height) -
        5;
      console.log(12, leftX, document.documentElement.clientWidth);
      if (leftX < -6) {
        leftX = -6;
      } else if (leftX >= maxX) {
        leftX = maxX;
      }
      if (topY <= 60) {
        topY = 60;
      } else if (topY >= maxY) {
        topY = maxY;
      }
      child.style.left = leftX + 'px';
      child.style.top = topY + 'px';
    },
  },
};
</script>
<style scoped lang="less">
@import url('./mobile.less');
</style>