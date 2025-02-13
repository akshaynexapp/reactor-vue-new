<!--
 * @Description  : 
 * @Date         : 2021-08-17 15:59:19
 * @LastEditors  : Hu
 * @LastEditTime : 2023-05-18 09:29:46
 * @FilePath     : \reactor-vue\src\views\alarm\template\index.vue
-->
<template>
  <div class="px-4" v-bind="$attrs">
    <a-list :class="prefixCls">
      <a-row :gutter="16">
        <template v-for="item in templateList" :key="item.alarmCode">
          <a-col :span="6">
            <a-list-item>
              <a-card
                :title="templateTitle(item.alarmCode)"
                :hoverable="true"
                :class="`${prefixCls}__card`"
              >
                <template #extra>
                  <a
                    v-if="hasPermission(['alarmTemplate:edit'])"
                    target="#"
                    @click="handleEdit(item)"
                  >
                    <Icon :class="`${prefixCls}__card-icon`" icon="clarity:note-edit-line" />
                  </a>
                </template>
                <div :class="`${prefixCls}__card-content`">
                  {{ t('common.updateUser') + ': ' + item.updateUsername }}
                </div>
                <div :class="`${prefixCls}__card-content`">
                  {{ t('common.updateTime') + ': ' + item.updateTime }}
                </div>
              </a-card>
            </a-list-item>
          </a-col>
        </template>
      </a-row>
    </a-list>
    <AlarmTemplateModal
      @register="registerModal"
      defaultFullscreen
      :canFullscreen="false"
      @success="handleSuccess"
    />
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import Icon from '@/components/Icon/Icon.vue';
  import AlarmTemplateModal from './AlarmTemplateModal.vue';
  import { alarmTemplateList } from '/@/api/main/alarmManage';

  const prefixCls = 'alarm-template';
  const { t } = useI18n();
  const { hasPermission } = usePermission();
  const templateList = ref<any>();

  const [registerModal, { openModal }] = useModal();

  // 初始化加载数据
  onMounted(() => handleSuccess());

  // 翻译模板标题
  const templateTitle = (type: String) => t('view.main.alarm.type.' + type);

  // 查询数据
  function handleSuccess() {
    alarmTemplateList({}).then((data) => (templateList.value = data));
  }

  // 编辑模板
  function handleEdit(record: Recordable) {
    openModal(true, { record, isUpdate: true });
  }
</script>
<style lang="less">
  .alarm-template {
    &__card {
      width: 100%;
      margin-bottom: -12px;

      .ant-card-body {
        padding: 16px;
      }

      &-icon {
        color: @primary-color;
      }

      &-content {
        margin-left: 16px;
        color: @text-color-secondary;
        line-height: 36px;
      }
    }
  }
</style>
