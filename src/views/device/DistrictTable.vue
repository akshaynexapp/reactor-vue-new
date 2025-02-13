<template>
  <div class="bg-white m-4 p-4">
    <h2 class="text-lg font-bold mb-4">{{ t('view.system.overview.label.groupList') }}</h2>
    <BasicTable :columns="columns" :dataSource="tableData" bordered />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, toRaw, reactive, h } from 'vue';
  import { getOrgTree } from '/@/api/system/orgManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { BasicTable } from '/@/components/Table';
  import { downloadByData } from '/@/utils/file/download';
  import dayjs from 'dayjs';
  import { useGo } from '/@/hooks/web/usePage';
  import { FoldLayout } from '/@/components/FoldLayout';
  import OrgTree from './OrgTree.vue';
  import { PageWrapper } from '/@/components/Page';

  const { t } = useI18n();
  const tableData = ref([]);

  const columns = [
    {
      title: t('view.system.account.label.orgName'),
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: t('view.system.account.label.orgId'),
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: t('view.system.account.label.orgType'),
      dataIndex: 'type',
      key: 'type',
    },
  ];

  async function fetchData() {
    const response = await getOrgTree();
    tableData.value = response;
  }

  onMounted(() => {
    fetchData();
  });
</script>

<style>
  .bg-white {
    background-color: #fff;
  }

  .p-4 {
    padding: 1rem;
  }
</style>
