<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-03 13:40:40
 * @FilePath     : \reactor-vue\src\views\task\devTask\devTaskDetail.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { computed, defineComponent, reactive, unref } from 'vue';
  import { useRouter } from 'vue-router';

  import { BasicTable, useTable } from '/@/components/Table';
  import { devTaskDetailPage } from '/@/api/main/deviceTaskManage';

  import { columns, searchFormSchema } from './devTaskDetail.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'DeviceTaskDetail',
    components: { BasicTable },
    setup() {
      const { t } = useI18n();
      const { currentRoute } = useRouter();
      // 路由中获取参数
      const params = computed(() => {
        return unref(currentRoute).params;
      });
      // 搜索参数
      const searchInfo = reactive<Recordable>({});
      searchInfo.taskId = params.value.taskId ? params.value.taskId : 0;
      const [registerTable, { reload }] = useTable({
        title: t('view.main.deviceTask.label.taskList'),
        api: devTaskDetailPage,
        searchInfo: searchInfo,
        columns,
        formConfig: {
          labelWidth: 100,
          schemas: searchFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: true,
        striped: true,
        actionColumn: {
          width: 100,
          title: t('common.operating'),
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
          ifShow: false,
        },
      });

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleSuccess,
        t,
      };
    },
  });
</script>
