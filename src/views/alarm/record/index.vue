<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-02-08 01:26:22
 * @FilePath     : \reactor-vue\src\views\alarm\record\index.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleEmailTest">
          {{ t('view.main.alarm.record.button.emailTest') }}
        </a-button>
        <a-button v-auth="'alarmRecord:empty'" type="primary" @click="handleEmpty">
          {{ t('view.main.alarm.record.button.empty') }}
        </a-button>
      </template>
    </BasicTable>
    <EmailTestModal @register="registerEmailTestModal" :canFullscreen="false" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable } from '/@/components/Table';
  import { alarmRecordPage, alarmRecordEmpty } from '/@/api/main/alarmManage';

  import { columns, searchFormSchema } from './alarmRecord.data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import EmailTestModal from './EmailTestModal.vue';

  const { t } = useI18n();
  const [registerEmailTestModal, { openModal: openEmailTestModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: t('view.system.timedTask.label.taskList'),
    api: alarmRecordPage,
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
      ifShow: false,
      width: 120,
      title: t('common.operating'),
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  function handleEmpty() {
    alarmRecordEmpty({}).then(() => reload());
  }
  function handleEmailTest() {
    openEmailTestModal(true, { isUpdate: false });
  }
</script>
