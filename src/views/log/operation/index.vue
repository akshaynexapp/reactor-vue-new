<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-20 13:32:06
 * @FilePath     : \reactor-vue\src\views\log\operation\index.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysOpLog:delete'" type="primary" @click="handleDelete">
          {{ t('view.system.operationLog.button.clear') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:info-standard-line',
              onClick: handleDetail.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <OperationLogDrawer @register="registerDrawer" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { sysOpLogPage, sysOpLogDelete } from '/@/api/system/logManage';

  import { useDrawer } from '/@/components/Drawer';
  import OperationLogDrawer from './OperationLogDrawer.vue';

  import { columns, searchFormSchema } from './operationLog.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AccessLog',
    components: { BasicTable, OperationLogDrawer, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: t('view.system.operationLog.label.logList'),
        api: sysOpLogPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          fieldMapToTime: [['dates', ['searchBeginTime', 'searchEndTime'], 'YYYY-MM-DD']],
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
        },
      });

      function handleDetail(record: Recordable) {
        openDrawer(true, { record, isUpdate: true });
      }

      function handleDelete(record: Recordable) {
        sysOpLogDelete(record.id).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerDrawer,
        handleDetail,
        handleDelete,
        handleSuccess,
        t,
      };
    },
  });
</script>
