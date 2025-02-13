<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-21 00:59:18
 * @FilePath     : \reactor-vue\src\views\log\access\index.vue
-->
<template>
  <div class="m-4">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysVisLog:delete'" type="primary" @click="handleClear">
          {{ t('view.system.accessLog.button.clear') }}
        </a-button>
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { sysVisLogPage, sysVisLogDelete } from '/@/api/system/logManage';

  import { columns } from './accessLog.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'AccessLog',
    components: { BasicTable },
    setup() {
      const { t } = useI18n();
      const [registerTable, { reload }] = useTable({
        title: t('view.system.accessLog.label.accessLogList'),
        api: sysVisLogPage,
        columns,
        useSearchForm: false,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: true,
        striped: true,
      });

      function handleClear(record: Recordable) {
        sysVisLogDelete(record.id).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleSuccess,
        handleClear,
        t,
      };
    },
  });
</script>
