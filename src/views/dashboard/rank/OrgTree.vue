<!--
 * @Description  :
 * @Date         : 2021-05-27 17:17:49
 * @LastEditors  : Hu
 * @LastEditTime : 2021-12-06 18:30:24
 * @FilePath     : \reactor-vue\src\views\system\account\OrgTree.vue
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
<script lang="ts">
  import { defineComponent, nextTick, onMounted, unref, ref } from 'vue';

  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { getOrgTree } from '/@/api/system/orgManage';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'OrgTree',
    components: { BasicTree },

    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      const treeData = ref<TreeItem[]>([]);
      const asyncExpandTreeRef = ref<Nullable<TreeActionType>>(null);

      async function fetch() {
        treeData.value = (await getOrgTree()) as unknown as TreeItem[];
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
      return { asyncExpandTreeRef, treeData, handleSelect, t };
    },
  });
</script>

<style>
  .overflow-hiddenn {
    height: 500px;
    overflow: scroll;
  }
</style>
