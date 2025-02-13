<!--
 * @Description  : 
 * @Date         : 2021-08-09 14:57:08
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-12 01:09:29
 * @FilePath     : \reactor_web_3.0\src\views\device\detail\SimInfo.vue
-->
<template>
  <Description @register="registerSim" />
</template>
<script lang="ts">
  import { defineComponent, computed } from 'vue';
  import { Description, DescItem, useDescription } from '/@/components/Description/index';

  const simSchema: DescItem[] = [
    {
      field: 'netType',
      label: 'Net Type',
      contentMinWidth: 100,
    },
    {
      field: 'netBand',
      label: 'Net Band',
      contentMinWidth: 100,
    },
    {
      field: 'ci',
      label: 'CI',
      contentMinWidth: 100,
    },
    {
      field: 'csq',
      label: 'CSQ',
      contentMinWidth: 100,
    },
    {
      field: 'iccid',
      label: 'ICCID',
      contentMinWidth: 100,
    },
    {
      field: 'imei',
      label: 'IMEI',
      contentMinWidth: 100,
    },
    {
      field: 'imsi',
      label: 'IMSI',
      contentMinWidth: 100,
    },
    {
      field: 'ip',
      label: 'IP',
      contentMinWidth: 100,
    },
    {
      field: 'lac',
      label: 'LAC',
      contentMinWidth: 100,
    },
    {
      field: 'moduleVersion',
      label: 'Module Version',
      contentMinWidth: 100,
    },
    {
      field: 'operator',
      label: 'Carrier',
      contentMinWidth: 100,
    },
    {
      field: 'rsrp',
      label: 'RSRP',
      contentMinWidth: 100,
    },
    {
      field: 'rsrq',
      label: 'RSRQ',
      contentMinWidth: 100,
    },
    {
      field: 'sinr',
      label: 'SINR',
      contentMinWidth: 100,
    },
    {
      field: 'status',
      label: 'Status',
      contentMinWidth: 100,
    },
    {
      field: 'updateTime',
      label: 'Update Time',
      contentMinWidth: 100,
    },
  ];
  export default defineComponent({
    components: { Description },
    props: {
      record: { type: Object, default: null },
      title: { type: String },
    },
    setup(props) {
      const simInfo = computed(() => {
        return props.record;
      });
      const [registerSim] = useDescription({
        title: props.title,
        data: simInfo,
        schema: simSchema,
        column: 3,
      });
      return { registerSim };
    },
  });
</script>
