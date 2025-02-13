<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-11-21 09:09:24
 * @FilePath     : \reactor-vue\src\views\system\role\index.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-auth="'sysRole:add'" type="primary" @click="handleCreate">
          {{ t('view.system.role.button.add') }}
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              auth: 'sysRole:edit',
              title: 'Edit Role',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: 'sysRole:delete',
              popConfirm: {
                title: t('common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
          :dropDownActions="[
            {
              label: t('view.system.role.button.grantData'),
              auth: 'sysRole:grantMenu',
              onClick: handleGrantData.bind(null, record),
            },
            {
              label: t('view.system.role.button.grantMenu'),
              auth: 'sysRole:grantData',
              onClick: handleGrantMenu.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <RoleModal @register="registerRoleModal" @success="handleSuccess" />
    <RoleMenuDrawer @register="registerRoleMenuDrawer" @success="handleSuccess" />
    <RoleDataModal @register="registerRoleDataModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRoleList, deleteRole } from '/@/api/system/roleManage';

  // 角色编辑及新增Modal
  import { useModal } from '/@/components/Modal';
  import RoleModal from './RoleModal.vue';

  import { useDrawer } from '/@/components/Drawer';
  import RoleMenuDrawer from './RoleMenuDrawer.vue';
  import RoleDataModal from './RoleDataModal.vue';

  import { columns, searchFormSchema } from './role.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'RoleManagement',
    components: { BasicTable, RoleModal, RoleMenuDrawer, RoleDataModal, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerRoleModal, { openModal: openRoleModal }] = useModal();
      const [registerRoleMenuDrawer, { openDrawer: openRoleMenuDrawer }] = useDrawer();
      const [registerRoleDataModal, { openModal: openRoleDataModal }] = useModal();
      const [registerTable, { reload }] = useTable({
        title: t('view.system.role.label.roleList'),
        api: getRoleList,
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
          width: 150,
          title: t('common.operating'),
          dataIndex: 'action',
          auth: ['sysRole:edit', 'sysRole:delete', 'sysRole:grantMenu', 'sysRole:grantData'],
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

      function handleGrantMenu(record: Recordable) {
        openRoleMenuDrawer(true, { record });
      }

      function handleGrantData(record: Recordable) {
        openRoleDataModal(true, { record });
      }

      function handleDelete(record: Recordable) {
        deleteRole(record.id).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        registerRoleModal,
        registerRoleMenuDrawer,
        registerRoleDataModal,
        handleCreate,
        handleEdit,
        handleGrantMenu,
        handleGrantData,
        handleDelete,
        handleSuccess,
        t,
      };
    },
  });
</script>
