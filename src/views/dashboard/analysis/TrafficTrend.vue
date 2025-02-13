<!--
 * @Description  : 
 * @Date         : 2021-06-21 20:08:43
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2024-03-27 23:21:42
 * @FilePath     : \reactor-vue\src\views\dashboard\analysis\TrafficTrend.vue
-->
<template>
  <Card :title="t('view.main.dashboard.trafficTrend.title')">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, defineProps, Ref, ref } from 'vue';

  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getTrafficTrend } from '/@/api/main/dashboardManage';

  defineProps({
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '300px',
    },
  });

  const { t } = useI18n();
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
  const getTrafficTrendData = (param: any) => {
    getTrafficTrend(param).then((res) => {
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
  };
  defineExpose({ loadData: getTrafficTrendData });
</script>
