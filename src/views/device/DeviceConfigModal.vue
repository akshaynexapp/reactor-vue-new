<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-12 12:10:19
 * @FilePath     : \reactor-vue\src\views\device\DeviceConfigModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('view.main.device.modal.config')"
    :canFullscreen="false"
    defaultFullscreen
    @ok="handleSubmit"
    ok-text="Push"
  >
    <!-- 操作区域 -->
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-space>
          <!-- 同步按钮 -->
          <a-button
            type="primary"
            v-if="hasPermission('devTask:syncConfig')"
            :loading="syncConfigLoading"
            @click="handleSyncConfig"
            ><CloudSyncOutlined v-if="!syncConfigLoading" />Pull Config</a-button
          >
          <!-- 配置类型 -->
          <a-radio-group v-model:value="configType">
            <a-radio-button value="0">By Device</a-radio-button>
            <a-radio-button value="1">By Group</a-radio-button>
          </a-radio-group>
          <a-input style="width: 100%" v-if="configType === '0'" :value="devSnArr.join()" />
          <a-tree-select
            v-else
            v-model:value="orgId"
            style="width: 235px"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="orgTreeData"
            placeholder="Please select"
            tree-default-expand-all
            :fieldNames="{
              label: 'title',
              key: 'id',
              value: 'value',
            }"
          />
        </a-space>
      </a-col>
      <a-col :span="12">
        <a-space>
          <!-- Save 按钮 -->
          <a-button
            type="primary"
            v-if="hasPermission('configTemplate:edit')"
            :disabled="!templateId"
            @click="handleEditTemplate"
            ><SaveOutlined />Save</a-button
          >
          <!-- Save As 按钮 -->
          <a-button
            type="primary"
            v-if="hasPermission('configTemplate:add')"
            @click="beforeAddTemplate"
            ><SaveOutlined />Save As</a-button
          >
          <a-select
            v-model:value="templateId"
            :options="templateList"
            :field-names="{ label: 'name', value: 'id', key: 'id' }"
            style="width: 300px"
            @select="onTemplateSelect"
            placeholder="Please select a config telmplate"
          >
            <template #option="{ id, name }">
              <span>
                <label>{{ name }}</label>
                <Icon
                  v-if="hasPermission('configTemplate:delete')"
                  color="#f5222d"
                  class="float-right pr-2 mt-1.2"
                  icon="ant-design:close-circle-outlined"
                  @click.stop.prevent="handleDeleteTempate(id)"
              /></span>
            </template> </a-select
        ></a-space>
      </a-col>
    </a-row>

    <!-- 原始配置和待下发配置 -->
    <a-row :gutter="[16, 16]" class="mt-4">
      <a-col :span="12">
        <a-textarea v-model:value="currConfig" :rows="25" />
      </a-col>
      <a-col :span="12">
        <a-textarea v-model:value="newConfig" :rows="25" :placeholder="t('common.inputText')" />
      </a-col>
    </a-row>
    <!-- 保存输入弹窗 -->
    <a-modal v-model:visible="showInputModal" title="Save As" @ok="handleAddTemplate">
      <div class="p-4">
        <a-input v-model:value="templateName" placeholder="Please input template name" />
      </div>
    </a-modal>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';

  import {
    devConfigFile,
    configTemplateDropDown,
    configTemplateAdd,
    configTemplateEdit,
    configTemplateDetail,
    configTemplateDelete,
  } from '/@/api/main/deviceManage';
  import { syncConfig, devConfig } from '/@/api/main/deviceTaskManage';
  import { getOrgTree } from '/@/api/system/orgManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import Icon from '@/components/Icon/Icon.vue';
  import { CloudSyncOutlined, SaveOutlined } from '@ant-design/icons-vue';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'DeviceConfigModal',
    components: {
      BasicModal,
      Icon,
      SaveOutlined,
      CloudSyncOutlined,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage } = useMessage();
      const { hasPermission } = usePermission();
      const { t } = useI18n();
      // 同步按钮加载状态
      const syncConfigLoading = ref<Boolean>(false);
      // 同步参数定时器
      let syncTimer: NodeJS.Timer;
      // 同步参数计数器
      let syncCounter = 0;
      // 显示新增模板是的名称输入窗口
      const showInputModal = ref<Boolean>(false);
      const templateName = ref<String>('');
      const model = reactive<any>({
        // 设备序列号
        devSnArr: [],
        // 分组编号
        orgId: null,
        // 分组树数据
        orgTreeData: [],
        // 配置类型（根据设备 0、根据分组 1）
        configType: '0',
        // 设备当前配置
        currConfig: '',
        // 待下发配置
        newConfig: '',
        // 模板编号
        templateId: '',
        // 模板列表
        templateList: [],
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        // 重置参数
        model.currConfig = '';
        model.newConfig = '';
        model.devSnArr = [];
        model.orgId = null;
        // 更新数据
        model.devSnArr = data.selectRows.map((item: any) => {
          return item.devSn;
        });
        model.orgId = data.selectRows[0].orgId;
        // 查询设备当前配置
        devConfigFile({ id: data.selectRows[0].id }).then((res) => {
          model.currConfig = res?.content;
        });

        // 初始化分组树
        model.orgTreeData = await getOrgTree();

        // 获取模板下拉列表
        getTemplateList();
      });

      // 获取模板下拉列表
      function getTemplateList() {
        configTemplateDropDown({}).then((res) => {
          model.templateList = res;
        });
      }

      // 同步设备参数
      function handleSyncConfig() {
        let devSn = model.devSnArr[0];
        // 启动加载状态
        syncConfigLoading.value = true;
        syncConfig({ devSn: devSn }).then(() => createMessage.success(t('common.success')));

        // 启动定时查询
        syncTimer = setInterval(() => {
          devConfigFile({ id: devSn })
            .then((res) => {
              // 回写当前配置
              model.currConfig = res?.content;
              if (res?.content) {
                clearInterval(syncTimer);
                // 关闭加载状态
                syncConfigLoading.value = false;
                createMessage.success('Sync config file success');
              }
            })
            .finally(() => {
              syncCounter++;
              if (syncCounter == 20) {
                clearInterval(syncTimer);
                // 关闭加载状态
                syncConfigLoading.value = false;
                model.currConfig = '';
                createMessage.error('Sync config file timeout');
              }
            });
        }, 1000);
      }

      // 点击新增按钮打开输入名称弹框
      function beforeAddTemplate() {
        let content = model.newConfig.trim();
        if (!content) {
          createMessage.error('The config is empty');
          showInputModal.value = false;
          return;
        }
        showInputModal.value = true;
      }

      // 新增模板
      function handleAddTemplate() {
        let name = templateName.value.trim();
        if (!name) {
          createMessage.error('template name is empty');
          return;
        }
        configTemplateAdd({ name: name, content: model.newConfig.trim() })
          .then(() => getTemplateList())
          .finally(() => (showInputModal.value = false));
      }

      // 编辑模板
      function handleEditTemplate() {
        let templateId = model.templateId;
        if (!templateId) {
          createMessage.error('Please select a template');
          return;
        }
        let content = model.newConfig.trim();
        if (!content) {
          createMessage.error('The new config is empty');
          return;
        }
        configTemplateEdit({ id: model.templateId, content: model.newConfig.trim() }).then(() =>
          getTemplateList(),
        );
      }

      // 模板选中之后查询模板内容
      function onTemplateSelect(value) {
        configTemplateDetail({ id: value }).then((data) => (model.newConfig = data?.content));
      }

      /**
       * 删除配置模板
       * @param id 模板编号
       */
      function handleDeleteTempate(id) {
        configTemplateDelete({ id: id }).then(() => getTemplateList());
      }

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          let params = {};

          // 配置内容
          let content = model.newConfig.trim();
          if (!content) {
            createMessage.error('The config is empty');
            return;
          }
          params['content'] = content;

          // 根据设备配置
          if (model.configType === '0') {
            params['devSnArr'] = model.devSnArr;
          } else {
            // 根据分组配置
            params['orgId'] = model.orgId;
          }
          // 任务类型为配置
          params['taskType'] = 2;
          await devConfig(params);
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        hasPermission,
        syncConfigLoading,
        handleSyncConfig,
        onTemplateSelect,
        beforeAddTemplate,
        handleAddTemplate,
        handleEditTemplate,
        handleDeleteTempate,
        showInputModal,
        templateName,
        handleSubmit,
        ...toRefs(model),
        t,
      };
    },
  });
</script>
