<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-02-08 01:23:48
 * @FilePath     : \reactor-vue\src\views\alarm\rule\index.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'alarmRule:add'" type="primary" @click="handleCreate">
          {{ t('view.main.alarm.rule.button.add') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              auth: 'alarmRule:edit',
              tooltip: 'Edit Rule',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: 'alarmRule:delete',
              popConfirm: {
                title: t('common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <AlarmRuleModal
      @register="registerRuleModal"
      defaultFullscreen
      :canFullscreen="false"
      @success="handleSuccess"
    />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { alarmRulePage, alarmRuleDelete } from '/@/api/main/alarmManage';

  import { useModal } from '/@/components/Modal';
  import AlarmRuleModal from './AlarmRuleModal.vue';

  import { columns, searchFormSchema } from './alarmRule.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const [registerRuleModal, { openModal: openRuleModal }] = useModal();
  const [registerTable, { reload }] = useTable({
    title: t('view.main.alarm.rule.label.ruleList'),
    api: alarmRulePage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: false,
    showIndexColumn: true,
    striped: true,
    actionColumn: {
      width: 120,
      title: t('common.operating'),
      dataIndex: 'action',
      auth: ['alarmRule:edit', 'alarmRule:delete'],
      slots: { customRender: 'action' },
      fixed: 'right',
    },
  });

  function handleCreate() {
    openRuleModal(true, { isUpdate: false });
  }

  function handleEdit(record: Recordable) {
    openRuleModal(true, { record, isUpdate: true });
  }

  function handleDelete(record: Recordable) {
    alarmRuleDelete({ id: record.id }).then(() => reload());
  }

  function handleSuccess() {
    reload();
  }
</script>
