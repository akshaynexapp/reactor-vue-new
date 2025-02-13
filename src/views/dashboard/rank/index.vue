<!--
 * @Description  : 
 * @Date         : 2022-02-10 13:32:37
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-14 15:23:43
 * @FilePath     : \reactor_web_3.0\src\views\dashboard\rank\index.vue
-->
<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <FoldLayout>
      <template #left>
        <OrgTree class="left-wrap" @select="handleSelect" />
      </template>
      <template #main>
        <div class="p-2 m-4 bg-white right-wrap">
          <!-- <SearchForm @submit="handleSubmit" /> -->
          <RankTable ref="rankTableRef" :searchInfo="searchInfo" />
        </div>
      </template>
    </FoldLayout>
  </PageWrapper>
</template>
<script lang="ts">
  import dayjs from 'dayjs';
  import { defineComponent, reactive, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import OrgTree from './OrgTree.vue';
  import { FoldLayout } from '/@/components/FoldLayout';
  import SearchForm from './SearchForm.vue';
  import RankTable from './RankTable.vue';
  export default defineComponent({
    name: 'RankManagement',
    components: { PageWrapper, OrgTree, FoldLayout, SearchForm, RankTable },
    setup() {
      // 查询条件
      const searchInfo = reactive<{ date: string; orgId: string }>({
        date: dayjs().format('YYYY-MM-DD'),
        orgId: '',
      });

      // 子组件引用
      const rankTableRef = ref<any>();

      // 选择日期回调
      const handleSubmit = (data) => {
        searchInfo.date = data.date;
      };

      // 选择分组回调
      const handleSelect = (orgId = '') => {
        searchInfo.orgId = orgId;
        rankTableRef.value.reloadAll();
      };

      return {
        searchInfo,
        rankTableRef,
        handleSubmit,
        handleSelect,
      };
    },
  });
</script>

<style lang="less" scoped>
  .left-wrap {
    height: calc(100% - 32px);
  }

  .right-wrap {
    height: calc(100% - 32px);
    overflow: auto;
  }
</style>
