<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-12 13:49:34
 * @FilePath     : \reactor-vue\src\views\device\sdlan\DevAppDrawer.vue
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :destroyOnClose="true"
    :isDetail="true"
    :closable="false"
    :title="`SDLAN(${record.devSn})`"
  >
    <DevAppList
      v-if="record?.devSn"
      :devSn="record.devSn"
      :appList="appList"
      @update:app-list="updateAppList"
    />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';
  import DevAppList from './DevAppList.vue';
  import { devAppPage } from '/@/api/main/deviceManage';
  export default defineComponent({
    name: 'DeviceAppDrawer',
    components: { BasicDrawer, DevAppList },
    emits: ['register'],
    setup() {
      const { t } = useI18n();
      const record = ref<any>({});
      const appList = ref([]);

      const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
        setDrawerProps({ confirmLoading: false });
        record.value = data.record;
        const params = {
          devSn: data.record.devSn,
        };
        devAppPage(params).then((data) => {
          appList.value = data;
        });
      });

      const updateAppList = (data) => {
        appList.value = data;
      };

      return {
        registerDrawer,
        t,
        record,
        appList,
        updateAppList,
      };
    },
  });
</script>
