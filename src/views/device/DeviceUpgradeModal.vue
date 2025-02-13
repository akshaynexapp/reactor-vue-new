<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-05 09:33:27
 * @FilePath     : \reactor-vue\src\views\device\DeviceUpgradeModal.vue
-->
<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="t('view.main.device.modal.upgrade')"
    width="800px"
    @ok="handleSubmit"
  >
    <a-row :gutter="[32, 32]">
      <a-col :span="18">
        <!-- 条件选择 -->
        <a-row :gutter="[16, 16]">
          <a-col :span="12">
            <a-radio-group v-model:value="configType">
              <a-radio-button value="0">By Device</a-radio-button>
              <a-radio-button value="1">By Group</a-radio-button>
            </a-radio-group>
          </a-col>
          <a-col :span="12">
            <a-input style="width: 100%" v-if="configType === '0'" :value="devSnArr.join()" />
            <a-tree-select
              v-else
              v-model:value="orgId"
              style="width: 100%"
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
          </a-col>
        </a-row>

        <!-- 选择文件 -->
        <a-row :gutter="[32, 32]" class="mt-4">
          <a-col :span="24">
            <a-select
              v-model:value="fileType"
              :getPopupContainer="getPopupContainer"
              placeholder="File type"
              style="width: 20%; padding-right: 8px"
            >
              <a-select-option
                v-for="item in [
                  { id: 'patch', name: 'patch' },
                  { id: 'firmware', name: 'firmware' },
                  { id: 'boot', name: 'boot' },
                  { id: 'configure', name: 'configure' },
                  { id: 'cert', name: 'cert' },
                ]"
                :key="item.id"
                :value="item.id"
                >{{ item.name }}</a-select-option
              >
            </a-select>
            <a-select
              v-model:value="fileId"
              :options="fileList"
              :field-names="{ label: 'fileOriginName', value: 'id', key: 'id' }"
              show-search
              :filterOption="fileFilterOption"
              style="width: 80%"
              placeholder="Please select a file"
            >
              <template #option="{ id, fileOriginName }">
                <span>
                  <label>{{ fileOriginName }}</label>
                  <Icon
                    v-if="hasPermission('sysFileInfo:delete')"
                    color="#f5222d"
                    class="float-right pr-2 mt-1.2"
                    icon="ant-design:close-circle-outlined"
                    @click.stop.prevent="handleDeleteFile(id)"
                /></span>
              </template>
            </a-select>
          </a-col>
        </a-row>
        <!-- 执行时间 -->
        <a-row :gutter="[32, 32]" class="mt-4">
          <a-col :span="12"
            ><a-date-picker
              format="YYYY-MM-DD HH:mm:ss"
              show-time
              v-model:value="planBeginTime"
              placeholder="Select Execute Time"
          /></a-col>
          <a-col :span="12"
            ><a-radio-group v-model:value="forceFlag" button-style="solid">
              <a-tooltip :title="t('view.main.deviceTask.tooltip.forceUpgrade-0')">
                <a-radio-button value="0">{{
                  t('view.main.deviceTask.option.forceUpgrade-0')
                }}</a-radio-button>
              </a-tooltip>
              <a-tooltip :title="t('view.main.deviceTask.tooltip.forceUpgrade-1')">
                <a-radio-button value="1">{{
                  t('view.main.deviceTask.option.forceUpgrade-1')
                }}</a-radio-button>
              </a-tooltip>
            </a-radio-group></a-col
          ></a-row
        >
      </a-col>
      <a-col :span="6">
        <!-- 上传文件 -->
        <a-upload
          name="file"
          accept=".trx, .lix, .lcx, .conf, .orx, .tar.gz"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :customRequest="customRequest"
        >
          <div>
            <Icon size="24" :icon="uploadLoading ? 'line-md:loading-loop' : 'ic:sharp-plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
      </a-col>
    </a-row>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs, h } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import Icon from '@/components/Icon/Icon.vue';
  import dayjs from 'dayjs';

  import { devUpgrade } from '/@/api/main/deviceTaskManage';
  import { sysFileInfoList, sysFileInfoUpload, sysFileInfoDelete } from '/@/api/system/fileManage';
  import { getOrgTree } from '/@/api/system/orgManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getPopupContainer } from '/@/utils';
  import { usePermission } from '/@/hooks/web/usePermission';

  export default defineComponent({
    name: 'DeviceUpgradeModal',
    components: {
      BasicModal,
      Icon,
    },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const { createMessage, createConfirm } = useMessage();
      const { t } = useI18n();
      const { hasPermission } = usePermission();
      const model = reactive<any>({
        // 上传loading状态
        uploadLoading: false,
        // 设备序列号
        devSnArr: [],
        // 分组编号
        orgId: null,
        // 分组树数据
        orgTreeData: [],
        // 文件类型
        fileType: 'firmware',
        // 配置类型（根据设备 0、根据分组 1）
        configType: '0',
        // 执行时间
        planBeginTime: '',
        // 非强制升级
        forceFlag: '0',
        // 文件编号
        fileId: '',
        // 升级文件列表
        fileList: [],
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        setModalProps({ confirmLoading: false });
        model.devSnArr = [];
        model.orgId = null;
        model.planBeginTime = '';
        model.devSnArr = data.selectRows.map((item: any) => {
          return item.devSn;
        });
        model.orgId = data.selectRows[0].orgId;
        // 获取升级文件列表
        getFileList();
        // 初始化分组树
        model.orgTreeData = await getOrgTree();
      });

      // 获取升级文件列表
      function getFileList() {
        sysFileInfoList({ fileSuffix: 'trx,lix,lcx,conf,orx,tar.gz' }).then((res) => {
          model.fileList = res;
        });
      }

      // 升级文件筛选
      const fileFilterOption = (input: string, option: any) => {
        return option.fileOriginName.toLowerCase().indexOf(input.toLowerCase()) >= 0;
      };

      /**
       * 上传文件
       */
      function customRequest(data) {
        const formData = new FormData();
        formData.append('file', data.file);
        model.uploadLoading = true;
        sysFileInfoUpload(formData)
          .then(() => getFileList())
          .finally(() => (model.uploadLoading = false));
      }

      /**
       * 删除文件
       * @param id 文件编号
       */
      function handleDeleteFile(id) {
        sysFileInfoDelete(id).then(() => getFileList());
      }

      async function handleSubmit() {
        try {
          setModalProps({ confirmLoading: true });
          // 升级文件
          if (model.fileId === '') {
            createMessage.error('Please select a file');
            return;
          }
          // 文件相关参数
          let params = {};
          params['forceFlag'] = model.forceFlag == 1 ? true : false;
          params['fileType'] = model.fileType;
          params['fileId'] = model.fileId;

          // 根据设备配置
          if (model.configType === '0') {
            params['devSnArr'] = model.devSnArr;
          } else {
            // 根据分组配置
            params['orgId'] = model.orgId;
          }
          params['planBeginTime'] = model.planBeginTime;
          // 任务类型为升级
          params['taskType'] = 0;

          // 智能升级提示
          if (!params['forceFlag']) {
            createConfirm({
              iconType: 'warning',
              title: () => h('span', t('sys.app.logoutTip')),
              content: () => t('view.main.deviceTask.tooltip.smartUpgradeConfirm'),
              onOk: async () => {
                await devUpgrade(params);
                closeModal();
                emit('success');
              },
            });
          } else {
            await devUpgrade(params);
            closeModal();
            emit('success');
          }
        } finally {
          setModalProps({ confirmLoading: false });
        }
      }

      return {
        registerModal,
        customRequest,
        handleSubmit,
        ...toRefs(model),
        fileFilterOption,
        getPopupContainer,
        hasPermission,
        handleDeleteFile,
        t,
        dayjs,
      };
    },
  });
</script>
