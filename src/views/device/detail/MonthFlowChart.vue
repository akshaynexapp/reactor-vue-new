<!--
 * @Description  : 
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-13 10:28:05
 * @FilePath     : \reactor-vue\src\views\dashboard\analysis\TrafficTrend.vue
-->
<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>
<script lang="ts">
  import { defineComponent, Ref, ref, watch } from 'vue';

  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getMonthFlowChart } from '/@/api/main/deviceManage';

  export default defineComponent({
    components: {},
    props: {
      params: { type: Object, default: null },
      width: {
        type: String as PropType<string>,
        default: '100%',
      },
      height: {
        type: String as PropType<string>,
        default: '300px',
      },
    },
    setup(props) {
      const { t } = useI18n();
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      watch(
        () => props.params,
        (newVal) => {
          if (!newVal) {
            return;
          }
          getMonthFlowChart(newVal).then((res) => {
            if (!res) {
              return;
            }
            const { date, up, down } = res;
            setOptions({
              dataZoom: [
                {
                  type: 'inside',
                },
              ],
              tooltip: {
                show: true,
                trigger: 'axis',
                formatter: function (params) {
                  let str = '';
                  params.forEach((item, idx) => {
                    str += `${item.marker}${item.seriesName}: ${item.data} GB`;
                    str += idx === params.length - 1 ? '' : '<br/>';
                  });
                  return str;
                },
                axisPointer: {
                  type: 'shadow',
                },
              },
              legend: {
                data: [
                  t('view.main.dashboard.trafficTrend.legend_1'),
                  t('view.main.dashboard.trafficTrend.legend_2'),
                ],
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true,
              },
              xAxis: {
                type: 'category',
                data: date,
              },
              yAxis: {
                type: 'value',
                axisLabel: {
                  show: true,
                  formatter: '{value} GB',
                },
                splitLine: {
                  show: false,
                },
              },
              series: [
                {
                  name: t('view.main.dashboard.trafficTrend.legend_1'),
                  type: 'bar',
                  color: 'green',
                  data: up,
                },
                {
                  name: t('view.main.dashboard.trafficTrend.legend_2'),
                  type: 'bar',
                  color: '#0084f4',
                  data: down,
                },
              ],
            });
          });
        },
        {
          immediate: true,
        },
      );
      return { chartRef, t };
    },
  });
</script>
