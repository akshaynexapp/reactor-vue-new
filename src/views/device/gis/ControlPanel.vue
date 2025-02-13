<!--
 * @Description  : 
 * @Date         : 2022-03-01 00:22:55
 * @LastEditors  : Hu
 * @LastEditTime : 2022-04-15 11:14:37
 * @FilePath     : \reactor_web_3.0\src\views\device\GIS\ControlPanel.vue
-->
<template>
  <Tabs default-active-key="1" @change="callback">
    <!-- <TabPane key="1" tab="录像回放">
      <TrackPlayback></TrackPlayback>
    </TabPane> -->
    <TabPane key="2" :tab="t('view.main.gis.label.trackPlayback')" force-render>
      <TrackPlayback />
    </TabPane>
    <!-- <TabPane key="3" tab="安全回放">
      <TrackPlayback></TrackPlayback>
    </TabPane> -->
  </Tabs>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { Tabs, TabPane } from 'ant-design-vue';
  import TrackPlayback from './TrackPlayback.vue';
  export default defineComponent({
    name: 'ControlPanel',
    components: {
      Tabs,
      TabPane,
      TrackPlayback,
    },
    setup(props, { emit }) {
      const { t } = useI18n();
      return {
        t,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.ant-tabs-content-holder) {
    overflow: auto;
  }
</style>
