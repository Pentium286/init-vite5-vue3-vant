<template>
  <div class="chart_content">
    <div class="bottom_txt">· &nbsp;{{ title }}</div>
    <canvas :id="chartId" class="bottom_canvas"></canvas>
  </div>
</template>
<script>
import F2 from "@antv/f2/lib/index";
import '@antv/f2/lib/interaction/pan';
import ScrollBar from '@antv/f2/lib/plugin/scroll-bar';

export default {
  props: {
    chartId: String,
    title: String,
    info: Object,
  },
  data() {
    return {
      chart: null,
      list: [
        {
          textX: 1,
          textY: 1,
        },
        {
          textX: 2,
          textY: 2,
        },
        {
          textX: 3,
          textY: 10,
        },
        {
          textX: 4,
          textY: 1,
        },
        {
          textX: 5,
          textY: 13,
        },
        {
          textX: 6,
          textY: 0,
        },
        {
          textX: 7,
          textY: 0,
        },
        // {
        //     textX:8,
        //     textY:0,
        // },
        // {
        //     textX:9,
        //     textY:0,
        // },
        // {
        //     textX:10,
        //     textY:12,
        // },
        // {
        //     textX:11,
        //     textY:12,
        // },
        // {
        //     textX:12,
        //     textY:12,
        // },
        // {
        //     textX:13,
        //     textY:12,
        // },
        // {
        //     textX:14,
        //     textY:12,
        // },
        // {
        //     textX:15,
        //     textY:12,
        // },
        // {
        //     textX:16,
        //     textY:21,
        // },
        // {
        //     textX:17,
        //     textY:21,
        // },
      ]
    };
  },
  mounted() { },
  methods: {
    getTest(options, type) {
      const { sourceData, formatY = '%' } = options || {};
      // const { formatY = '%'} = options || {}
      // const sourceData = this.list
      // console.log(111, sourceData);
      // console.log(1233, window.devicePixelRatio);
      this.chart = new F2.Chart({
        id: this.chartId,
        pixelRatio: window.devicePixelRatio,
        plugins: ScrollBar
      });
      let min = 1;
      let max = 10;
      if (options.secondPointTitle > 10) {
        min = options.secondPointTitle - 10;
        max = options.secondPointTitle;
      } else {
        min = 1;
        max = sourceData.length > 10 ? 10 : sourceData.length;
      }
      this.chart.source(sourceData, {
        textX: {
          min: min,
          max: max,
        },
        textY: {
          formatter(value) {
            return `${formatY ? value + formatY : value}`;
          }
        }
      });
      this.chart.tooltip({
        showCrosshairs: true,
        showTitle: true,
        showItemMarker: false,
        crosshairsStyle: {
          stroke: '#B68379',
          lineWidth: 1,
          lineDash: [1, 3],
        }, // 配置辅助线的样式
        background: {
          radius: 2,
          fill: 'transparent',
          padding: [0, 0]
        }, // tooltip 内容框的背景样式
        titleStyle: {
          fontSize: 12,
          fill: '#120E0E',
          textAlign: 'center',
          textBaseline: 'middle'
        }, // tooltip 标题的文本样式配置，showTitle 为 false 时不生效
        valueStyle: {
          fontSize: 14,
          fill: '#120E0E',
          textAlign: 'center',
          textBaseline: 'middle'
        }, // tooltip value 项的文本样式配置
        snap: true,
        onShow: function onShow(ev) {
          const items = ev.items;
          if (items.length == 2) {
            items[0].name = null;
            items[0].title = `第${items[0].title}次`;
            items.pop();
          }
        }
      });

      if (sourceData.length < 11) {
        this.chart.scale('textX', {
          tickCount: sourceData.length >= 5 ? 5 : sourceData.length
        });
      }

      this.chart.axis('textX', {
        line: {
          stroke: '#EEDAD6',
          lineWidth: 1
        },
        label: function label(text, index, total) {
          // console.log(11, text);
          const textCfg = {
            textAlign: 'center'
          };
          if (text > 0) {
            if (index === 0) {
              textCfg.textAlign = 'left';
            } else if (index === total - 1) {
              textCfg.textAlign = 'right';
            }
            textCfg.fill = '#C0A6A1';
            textCfg.text = `第${parseInt(text)}次`;
            return textCfg;
          }
        }
      });
      this.chart.axis('textY', {
        grid: (text, index, total) => {
          return {
            stroke: '#EEDAD6',
            lineWidth: 1,
          };
        },
        label: function label(text, index, total) {
          const textCfg = {};
          textCfg.fill = '#C0A6A1';
          return textCfg;
        }
      });
      this.chart.area().position('textX*textY').color('l(90) 0:#F4CEC7 1:#F6F0F0').style({ fillOpacity: 1 }).shape('smooth');
      this.chart.line().position('textX*textY').color('#D6978A').shape('smooth');
      const len = sourceData.length > 0 ? sourceData.length - 1 : 0;
      if (options.firstPointTitle) {
        const firstPoint = {
          startLine: options.firstStartLine,
          endLine: options.firstEndLine,
          pointTitle: `第${options.firstPointTitle}次`,
          pointNum: options.firstPointNum,
          pointColor: '#DB8E7F',
          location: Boolean(options.firstPointTitle === sourceData[len].textX)
        };
        this.setChartPoint(firstPoint);
      }
      if (options.secondPointTitle) {
        const secondPoint = {
          startLine: options.secondStartLine,
          endLine: options.secondEndLine,
          pointTitle: `第${options.secondPointTitle}次`,
          pointNum: options.secondPointNum,
          pointColor: '#71B5B8',
          location: Boolean(options.secondPointTitle === sourceData[len].textX)
        };
        this.setChartPoint(secondPoint);
      }
      if (!type) {
        if (sourceData.length > 11) {
          this.chart.interaction('pan', {
            limitRange: {
              x: {
                min: 1,
                max: sourceData.length
              }
            },
          });
          // 定义进度条
          this.chart.scrollBar({
            mode: 'x',
            xStyle: {
              offsetY: 0,
              backgroundColor: 'transparent',
              fillerColor: 'transparent',
            },
          });
        }
        this.chart.render();
      } else {
        this.chart.repaint();
      }
    },
    // 重新绘制图表
    repaintChart(info) {
      this.chart.clear();
      this.chart.clearInteraction();
      this.getTest(info, 'repaint');
    },
    // 设置辅助点
    setChartPoint(options) {
      const { startLine, endLine, pointTitle, pointNum, pointColor, location } = options;
      // 设置辅助线
      this.chart.guide().line({
        limitInPlot: true,
        start(xScale, yScales) {
          return startLine; // 位置信息
        },
        end(xScale, yScales) {
          let x = 1;
          let y = 0;
          if (endLine.length > 0) {
            x = endLine[0];
          }
          if (yScales.length > 0) {
            y = yScales[0].min;
          }
          return [x, y]; // 位置信息
        },
        style: {
          stroke: '#B68379', // 线的颜色
          lineDash: [1, 3], // 虚线的设置
          lineWidth: 1 // 线的宽度
        },
      });
      this.chart.guide().point({
        limitInPlot: true,
        position: startLine,
        style: {
          fill: pointColor || '#DB8E7F',
          stroke: '#fff',
          lineWidth: 1,
          r: 6, // 点的大小
        },
      });
      this.chart.guide().html({
        limitInPlot: true,
        position: startLine,
        html: `<div style="font-size: 12px;color: #120E0E;text-align: center;width:80px">
                    <div ${location ? "style=margin-right:12px" : null}>${pointTitle}</div>
                    <div ${location ? "style=font-weight:600;margin-right:12px" : "style=font-weight:600;"}>${pointNum}</div>
                </div>`,
        alignX: 'center',
        alignY: 'bottom',
        offsetY: -6
      });
    },
  },
  computed: {
    chartInfo() {
      return this.info;
    },
  },
  watch: {
    chartInfo: {
      handler(newV, oldV) {
        // console.log('chartInfo',newV);
        if (newV.sourceData && newV.sourceData.length > 0) {
          this.getTest(newV);
        }
      },
      immediate: true,
      deep: true
    },
  }
};
</script>
<style scoped lang="less">
@import url("./compareChart.less");
</style>