<!--
 * @Description  : 
 * @Date         : 2022-01-27 13:31:06
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2024-03-27 23:28:44
 * @FilePath     : \reactor_web_3.0\src\views\dashboard\analysis\Firmware.vue
-->
<template>
  <Card :title="t('view.main.dashboard.firmware.title')">
    <div ref="chartRef" :style="{ width, height }"></div>
  </Card>
</template>
<script lang="ts" setup>
  import { defineExpose, defineProps, Ref, ref } from 'vue';

  import { Card } from 'ant-design-vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { getSoftVerPie } from '/@/api/main/dashboardManage';

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
  const getSoftVerPieData = (param: any) => {
    getSoftVerPie(param).then((res) => {
      setOptions({
        tooltip: {
          trigger: 'item',
        },
        series: [
          {
            name: t('view.main.device.label.softVer'),
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            data: res,
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
  defineExpose({ loadData: getSoftVerPieData });
</script>
