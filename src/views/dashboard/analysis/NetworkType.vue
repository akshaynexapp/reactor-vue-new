<!--
 * @Author: Hulw
 * @Date: 2022-12-23 01:42:04
 * @LastEditors: Hulw
 * @LastEditTime: 2024-03-28 17:10:58
 * @FilePath: \reactor-vue\src\views\dashboard\analysis\NetworkType.vue
 * @Description: 
-->
<template>
  <Card :title="t('view.main.dashboard.networkType.title')">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, defineProps, Ref, ref } from 'vue';

  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getNetTypeCard } from '/@/api/main/dashboardManage';

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
  const data = ref<any>([]);
  const getNetTypeCardData = (params: any) => {
    getNetTypeCard(params).then((res) => {
      // if (!res) return;
      const fiveG = !res ? 0 : Number(res['5G']) || 0;
      const fourG = !res ? 0 : Number(res['4G']) || 0;
      const threeG = !res ? 0 : Number(res['3G']) || 0;
      const twoG = !res ? 0 : Number(res['2G']) || 0;
      const wan = !res ? 0 : Number(res['WAN']) || 0;
      const wlan = !res ? 0 : Number(res['WLAN']) || 0;
      const nullValue = Number(res['null']) || 0;
      const other = threeG + twoG + wan + wlan + nullValue;
      data.value = [
        { name: '5G', value: fiveG },
        { name: '4G', value: fourG },
        { name: 'other', value: other },
      ];

      setOptions({
        tooltip: {
          trigger: 'item',
        },
        legend: {
          left: 'center',
        },
        series: [
          {
            name: t('view.main.device.label.softVer'),
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '54%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2,
            },
            data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
        ],
      });
    });
  };
  defineExpose({ loadData: getNetTypeCardData });
</script>
