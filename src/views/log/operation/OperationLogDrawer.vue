<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2021-06-20 03:35:05
 * @FilePath     : \reactor-vue\src\views\log\operation\OperationLogDrawer.vue
-->
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    :title="t('view.system.operationLog.modal.detail')"
    width="500px"
  >
    <BasicForm @register="registerForm" />
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { formSchema } from './operationLog.data';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'OperationLogDrawer',
    components: { BasicDrawer, BasicForm },
    emits: ['success', 'register'],
    setup(_, {}) {
      const { t } = useI18n();

      const [registerForm, { resetFields, setFieldsValue }] = useForm({
        labelWidth: 100,
        schemas: formSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });

        setFieldsValue({
          ...data.record,
        });
      });

      return {
        registerDrawer,
        registerForm,
        t,
      };
    },
  });
</script>
