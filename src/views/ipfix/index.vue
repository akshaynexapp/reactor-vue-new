<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-17 13:48:52
 * @FilePath     : \reactor-vue\src\views\log\access\index.vue
-->
<template>
  <div class="m-4">
    <BasicTable @register="registerTable" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable } from '/@/components/Table';
  import { ipfixMessagePage } from '/@/api/main/ipfixManage';

  import { columns, searchFormSchema } from './ipfixMessage.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'IPFIXMessage',
    components: { BasicTable },
    setup() {
      const { t } = useI18n();
      const [registerTable, { reload }] = useTable({
        title: t('view.main.ipfix.label.ipfixList'),
        api: ipfixMessagePage,
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
        indexColumnProps: {
          width: 120,
        },
        striped: true,
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
