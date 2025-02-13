<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-21 00:25:34
 * @FilePath     : \reactor-vue\src\views\system\onlineUser\index.vue
-->
<template>
  <div class="m-4">
    <BasicTable @register="registerTable">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:close-circle-outlined',
              title: t('view.system.onlineUser.label.forceExist'),
              auth: 'sysOnlineUser:forceExist',
              onClick: handleForceExist.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { sysOnlineUserList, sysOnlineUserForceExist } from '/@/api/system/onlineUser';

  import { columns } from './onlineUser.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'OnlineUserManagement',
    components: { BasicTable, TableAction },
    setup() {
      const { t } = useI18n();
      const [registerTable, { reload }] = useTable({
        title: t('view.system.onlineUser.label.userList'),
        api: sysOnlineUserList,
        columns,
        useSearchForm: false,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: true,
        striped: true,
        actionColumn: {
          width: 120,
          title: t('common.operating'),
          dataIndex: 'action',
          auth: ['sysOnlineUser:forceExist'],
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function handleForceExist(record: Recordable) {
        sysOnlineUserForceExist({ sessionId: record.sessionId }).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleForceExist,
        handleSuccess,
        t,
      };
    },
  });
</script>
