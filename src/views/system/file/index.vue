<!--
 * @Description  : 
 * @Date         : 2021-06-18 16:36:45
 * @LastEditors  : Hu
 * @LastEditTime : 2023-01-10 19:20:35
 * @FilePath     : \reactor-vue\src\views\system\file\index.vue
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <Upload
          :customRequest="customRequest"
          :multiple="false"
          :showUploadList="false"
          name="file"
          v-auth="'sysFileInfo:upload'"
        >
          <a-button
            type="primary"
            :disabled="uploadLoading"
            :preIcon="uploadLoading ? 'line-md:loading-loop' : 'carbon:cloud-upload'"
          >
            {{ t('component.upload.upload') }}
          </a-button>
        </Upload>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'ant-design:cloud-download-outlined',
              auth: 'sysFileInfo:download',
              onClick: handleDownload.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              color: 'error',
              auth: 'sysFileInfo:delete',
              popConfirm: {
                title: t('common.confirmDelete'),
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { Upload } from 'ant-design-vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import {
    sysFileInfoPage,
    sysFileInfoDelete,
    sysFileInfoUpload,
    sysFileInfoDownload,
  } from '/@/api/system/fileManage';

  import { useI18n } from '/@/hooks/web/useI18n';

  import { columns, searchFormSchema } from './file.data';

  export default defineComponent({
    name: 'FileManagement',
    components: { BasicTable, TableAction, Upload },
    setup() {
      const { t } = useI18n();
      // 上传loading状态
      const uploadLoading = ref<Boolean>(false);
      const [registerTable, { reload }] = useTable({
        title: t('view.system.file.label.fileList'),
        api: sysFileInfoPage,
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
        },
        striped: true,
        useSearchForm: true,
        showTableSetting: true,
        bordered: false,
        showIndexColumn: true,
        actionColumn: {
          width: 100,
          title: t('common.operating'),
          auth: ['sysFileInfo:download', 'sysFileInfo:delete'],
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: 'right',
        },
      });

      function customRequest(record: Recordable) {
        uploadLoading.value = true;
        const formData = new FormData();
        formData.append('file', record.file);
        sysFileInfoUpload(formData)
          .then(() => reload())
          .finally(() => (uploadLoading.value = false));
      }

      function handleDownload(record: Recordable) {
        sysFileInfoDownload(record.id);
      }

      function handleDelete(record: Recordable) {
        sysFileInfoDelete(record.id).then(() => reload());
      }

      function handleSuccess() {
        reload();
      }

      return {
        registerTable,
        handleDelete,
        handleSuccess,
        customRequest,
        handleDownload,
        uploadLoading,
        t,
      };
    },
  });
</script>
