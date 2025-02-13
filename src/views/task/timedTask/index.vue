<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-07-26 14:50:49
 * @FilePath     : \reactor-vue\src\views\task\timedTask\index.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysTimers:add'" type="primary" @click="handleCreate">
          {{ t('view.system.timedTask.button.add') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              auth: 'sysTimers:edit',
              title: 'Edit Role',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: 'sysTimers:delete',
              popConfirm: {
                title: t('common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <TimedTaskModal @register="registerRoleModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { sysTimersPage, sysTimersDelete } from '/@/api/system/timedTaskManage';

  import { useModal } from '/@/components/Modal';
  import TimedTaskModal from './TimedTaskModal.vue';

  import { columns, searchFormSchema } from './timedTask.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'TimedTaskManagement',
    components: { BasicTable, TimedTaskModal, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerRoleModal, { openModal: openRoleModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: t('view.system.timedTask.label.taskList'),
        api: sysTimersPage,
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
          auth: ['sysTimers:edit', 'sysTimers:delete'],
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleCreate() {
        openRoleModal(true, { isUpdate: false });
      }

      function handleEdit(record: Recordable) {
        openRoleModal(true, { record, isUpdate: true });
      }

      function handleDelete(record: Recordable) {
        sysTimersDelete({ id: record.id }).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerRoleModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        t,
      };
    },
  });
</script>
