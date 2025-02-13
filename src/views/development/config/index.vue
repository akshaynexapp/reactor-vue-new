<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-21 00:10:32
 * @FilePath     : \reactor-vue\src\views\development\config\index.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysConfig:add'" type="primary" @click="handleCreate">
          {{ t('view.system.config.button.add') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              auth: 'sysConfig:edit',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: 'sysConfig:delete',
              popConfirm: {
                title: t('common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <ConfigModal @register="registerRoleModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { sysConfigPage, sysConfigDelete } from '/@/api/system/configManage';

  import { useModal } from '/@/components/Modal';
  import ConfigModal from './ConfigModal.vue';

  import { columns, searchFormSchema } from './config.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'ConfigManagement',
    components: { BasicTable, ConfigModal, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerRoleModal, { openModal: openRoleModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: t('view.system.config.label.configList'),
        api: sysConfigPage,
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
          auth: ['sysConfig:edit', 'sysConfig:delete'],
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
        sysConfigDelete({ id: record.id }).then(() => reload());
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
