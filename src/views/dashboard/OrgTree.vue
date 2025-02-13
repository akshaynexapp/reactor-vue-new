<!--
 * @Description  :
 * @Date         : 2021-05-27 17:17:49
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2024-03-27 22:40:12
 * @FilePath     : \reactor-vue\src\views\dashboard\OrgTree.vue
-->
<template>
  <div class="bg-white m-4 mr-0 overflow-hiddenn h-full">
    <BasicTree
      :title="t('view.system.overview.label.groupList')"
      toolbar
      search
      :clickRowToExpand="false"
      :treeData="treeData"
      :fieldNames="{ key: 'id', title: 'title' }"
      @select="handleSelect"
      ref="asyncExpandTreeRef"
    />
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, unref, ref } from 'vue';

  import { BasicTree, TreeActionType, TreeItem } from '/@/components/Tree';
  import { getOrgTree } from '/@/api/system/orgManage';
  import { useI18n } from '/@/hooks/web/useI18n';

  const emit = defineEmits(['select']);
  defineOptions({
    name: 'OrgTree',
    inheritAttrs: false,
  });
  const { t } = useI18n();
  const treeData = ref<TreeItem[]>([]);
  const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);

  async function fetch() {
    treeData.value = (await getOrgTree()) as unknown as TreeItem[];
    console.log('Tree data fetched:', treeData.value);

    // 展开全部
    nextTick(() => {
      unref(asyncExpandTreeRef)?.expandAll(true);
    });
  }

  function handleSelect(keys: string) {
    emit('select', keys[0]);
  }

  onMounted(() => {
    fetch();
  });
</script>
<style>
  .overflow-hiddenn {
    height: 500px;
    overflow: scroll;
  }
</style>
