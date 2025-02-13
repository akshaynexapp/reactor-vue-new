<template>
  <div>
    <BasicTable @register="registerTable" @fetch-success="onFetchSuccess">
      <template #toolbar>
        <a-button v-auth="'sysOrg:add'" type="primary" @click="handleCreate">
          {{ t('view.system.org.button.add') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              auth: 'sysOrg:edit',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: 'sysOrg:delete',
              popConfirm: {
                title: t('common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <OrgModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, nextTick } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getOrgList, deleteOrg } from '/@/api/system/orgManage';

  import { useModal } from '/@/components/Modal';
  import OrgModal from './OrgModal.vue';

  import { useI18n } from '/@/hooks/web/useI18n';

  import { columns, searchFormSchema } from './org.data';

  export default defineComponent({
    name: 'OrgManagement',
    components: { BasicTable, OrgModal, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerModal, { openModal }] = useModal();
      const [registerTable, { reload, expandAll }] = useTable({
        title: t('view.system.org.label.orgList'),
        api: getOrgList,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        isTreeTable: true,
        pagination: false,
        striped: true,
        useSearchForm: true,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: false,
        actionColumn: {
          width: 100,
          title: t('common.operating'),
          auth: ['sysOrg:edit', 'sysOrg:delete'],
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleCreate() {
        openModal(true, {
          isUpdate: false,
        });
      }

      function handleEdit(record: Recordable) {
        openModal(true, {
          record,
          isUpdate: true,
        });
      }

      function handleDelete(record: Recordable) {
        deleteOrg(record.id).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      function onFetchSuccess() {
        nextTick(expandAll);
      }

      return {
        registerTable,
        registerModal,
        handleCreate,
        handleEdit,
        handleDelete,
        handleSuccess,
        onFetchSuccess,
        t,
      };
    },
  });
</script>
