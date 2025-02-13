<!--
 * @Description  : 
 * @Date         : 2021-08-17 15:59:19
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-18 09:30:18
 * @FilePath     : \reactor-vue\src\views\device\sdlan\DevAppList.vue
-->
<template>
  <div class="px-4" v-bind="$attrs">
    <a-list :class="prefixCls">
      <a-row :gutter="16">
        <template v-for="item in appList" :key="item.id">
          <a-col :span="6">
            <a-list-item @click="handleOpenWindow(item)">
              <a-card :title="item.name" :hoverable="true" :class="`${prefixCls}__card`">
                <template #extra>
                  <a target="#" @click="handleEdit($event, item)">
                    <Icon :class="`${prefixCls}__card-icon`" icon="clarity:note-edit-line" />
                  </a>

                  <a class="ml-3" target="#" @click="handleDelete($event, item)">
                    <Icon :class="`${prefixCls}__card-icon`" icon="ant-design:delete-outlined" />
                  </a>
                </template>
                <a-descriptions size="middle" :column="1">
                  <a-descriptions-item :label="t('view.main.sdlan.label.protocol')">
                    {{ item.protocol?.toUpperCase() }}
                  </a-descriptions-item>
                  <a-descriptions-item :label="t('view.main.sdlan.label.ip')">
                    {{ item.ip }}
                  </a-descriptions-item>
                  <a-descriptions-item :label="t('view.main.sdlan.label.port')">
                    {{ item.port }}
                  </a-descriptions-item>
                  <a-descriptions-item :label="t('view.main.sdlan.modal.target')">
                    {{
                      item.target == 1
                        ? t('view.main.sdlan.option.target-1')
                        : t('view.main.sdlan.option.target-0')
                    }}
                  </a-descriptions-item>
                </a-descriptions>
              </a-card>
            </a-list-item>
          </a-col>
        </template>
        <a-col :span="6">
          <a-list-item>
            <a-card
              @click="handleAdd"
              :hoverable="true"
              :class="`${prefixCls}__card flex justify-center align-center`"
            >
              <div :class="`${prefixCls}__card-content flex justify-center align-center`">
                <Icon icon="mdi:plus" class="add-icon" size="30" />
                <span class="add-text">{{ t('view.main.sdlan.label.add') }}</span>
              </div>
            </a-card>
          </a-list-item>
        </a-col>
      </a-row>
    </a-list>
    <DevAppEditModal @register="registerModal" @success="handleSuccess" />
    <AppFrameDrawer @register="registerAppFrameDrawer" />
  </div>
</template>
<script lang="ts">
  import { ref, defineComponent, h } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { openNewWindow } from '/@/utils/reactorUtil';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import Icon from '@/components/Icon/Icon.vue';
  import DevAppEditModal from './DevAppEditModal.vue';
  import AppFrameDrawer from './AppFrameDrawer.vue';
  import { devAppPage, devAppDelete } from '/@/api/main/deviceManage';
  import { devProxy } from '/@/api/main/deviceTaskManage';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    name: 'DeviceDetailDrawer',
    components: {
      Icon,
      DevAppEditModal,
      AppFrameDrawer,
    },
    props: ['devSn', 'appList'],
    emits: ['register'],
    setup(props, { emit }) {
      const prefixCls = 'dev-app-list';
      const { t } = useI18n();
      const { hasPermission } = usePermission();
      const devAppList = ref<any>([]);
      const frameSrc = ref<string>();
      const { createConfirm } = useMessage();

      const [registerModal, { openModal }] = useModal();

      const [registerAppFrameDrawer, { openModal: openAppFrameDrawer }] = useModal();

      // 查询数据
      function handleSuccess() {
        const params = {
          devSn: props.devSn,
        };
        devAppPage(params).then((data) => {
          devAppList.value = data;
          emit('update:appList', data);
        });
      }

      // 编辑
      function handleEdit(e: MouseEvent, record: Recordable | undefined) {
        e.preventDefault();
        e.stopPropagation();
        openModal(true, {
          record: { ...record, devSn: props.devSn },
          isUpdate: true,
          devSn: props.devSn,
        });
      }

      //添加
      function handleAdd() {
        openModal(true, { record: { devSn: props.devSn }, isUpdate: false });
      }

      // 删除
      function handleDelete(e: MouseEvent, record: Recordable | undefined) {
        if (record === undefined) return;
        e.preventDefault();
        e.stopPropagation();
        createConfirm({
          iconType: 'warning',
          title: () => h('span', t('sys.app.logoutTip')),
          content: () => t('common.confirmDelete'),
          onOk: async () => {
            devAppDelete({ id: record.id }).then(() => handleSuccess());
          },
        });
      }

      const handleOpenWindow = (record) => {
        const { devSn, protocol, ip, port, target, name } = record;
        devProxy({ devSn, ip, port, protocol }).then((res) => {
          const { listenPort } = res;
          const hostname = window.location.hostname;
          const httpProtocol = window.location.protocol;
          frameSrc.value = httpProtocol + '//' + hostname + ':' + listenPort;
          // 新页面打开
          if (target == 1) {
            // 直接用window.open(url)可能会被浏览器拦截
            openNewWindow(frameSrc.value);
            return;
          }
          // 弹窗打开
          const title = name + '(' + devSn + ')';
          openAppFrameDrawer(true, { title: title, frameSrc: frameSrc });
        });
      };

      return {
        t,
        registerAppFrameDrawer,
        prefixCls,
        devAppList,
        hasPermission,
        registerModal,
        handleEdit,
        handleAdd,
        handleDelete,
        handleSuccess,
        handleOpenWindow,
      };
    },
  });
</script>
<style lang="less">
  .dev-app-list {
    &__card {
      width: 100%;
      height: 220px;

      .ant-card-body {
        padding: 16px;
      }

      &-icon {
        color: @primary-color;
      }

      .add-icon {
        color: @primary-color;
      }

      .add-text {
        font-size: 18px;
        color: @primary-color;
      }
    }
  }
</style>
