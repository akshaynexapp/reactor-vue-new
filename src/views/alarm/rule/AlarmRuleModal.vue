<!--
 * @Description  :
 * @Date         : 2021-06-06 02:30:47
 * @LastEditors  : Hu
 * @LastEditTime : 2023-03-07 16:06:10
 * @FilePath     : \reactor-vue\src\views\alarm\rule\AlarmRuleModal.vue
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <ScrollContainer>
      <div class="w-4/5">
        <!-- ① 基础配置 -->
        <BasicTitle>{{ '① ' + t('view.main.alarm.rule.label.basicInfo') }}</BasicTitle>
        <div class="mx-8 my-8"><BasicForm @register="registerBasicForm" /></div>

        <!-- ② 触发条件 -->
        <BasicTitle>{{ '② ' + t('view.main.alarm.rule.label.condition') }}</BasicTitle>
        <div class="mx-8 my-8">
          <BasicForm @register="registerConditionForm">
            <template #add="{ field }">
              <Button v-if="Number(field) === 0" @click="addConditionRow">+</Button>
              <Button v-if="field > 0" @click="delConditionRow(field)">-</Button>
            </template>
          </BasicForm>
        </div>

        <!-- ③ 通知方式 -->
        <BasicTitle>{{ '② ' + t('view.main.alarm.rule.label.noticeType') }}</BasicTitle>
        <div class="mx-8 my-8"><BasicForm @register="registerNoticeForm" /></div>
      </div>
    </ScrollContainer>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { Button } from '/@/components/Button';
  import { ScrollContainer } from '/@/components/Container/index';
  import { BasicTitle } from '/@/components/Basic/index';
  import { getPopupContainer } from '/@/utils';

  import {
    basicFormSchema,
    conditionFormSchema,
    noticeFormSchema,
    getUnitByAlarmCode,
  } from './alarmRule.data';

  import {
    alarmTemplateList,
    alarmRuleAdd,
    alarmRuleEdit,
    alarmRuleDetail,
  } from '/@/api/main/alarmManage';
  import { useI18n } from '/@/hooks/web/useI18n';

  const emit = defineEmits(['success', 'register']);
  const { t } = useI18n();
  const isUpdate = ref(true);
  const alarmTypeSelect = ref<Array<Recordable>>([]);

  // 基础信息
  const [
    registerBasicForm,
    { setFieldsValue: setBasicFieldsValue, resetFields: resetBasicFields, validate: validateBasic },
  ] = useForm({
    layout: 'vertical',
    labelWidth: 120,
    schemas: basicFormSchema,
    showActionButtonGroup: false,
  });

  // 规则条件
  const [
    registerConditionForm,
    {
      appendSchemaByField,
      removeSchemaByField,
      setFieldsValue: setConditionFieldsValue,
      resetFields: resetConditionFields,
      resetSchema: resetConditionSchema,
      validate: validateCondition,
      updateSchema: updateConditionSchema,
    },
  ] = useForm({
    schemas: conditionFormSchema,
    layout: 'vertical',
    labelWidth: 120,
    showActionButtonGroup: false,
  });
  // 条件行数
  const conditionRowNum = ref(1);
  // 添加规则条件行
  function addConditionRow() {
    const rowNum = unref(conditionRowNum);
    appendSchemaByField(
      {
        field: `alarmCode_${conditionRowNum.value}`,
        component: 'Select',
        componentProps: {
          placeholder: t('view.main.alarm.rule.placeholder-type'),
          options: alarmTypeSelect,
          onChange: (e: any) => {
            const unit = getUnitByAlarmCode(e);
            // 修改后面的单位
            updateConditionSchema({
              field: `alarmThreshold_${rowNum}`,
              componentProps: {
                placeholder: t('view.main.alarm.rule.placeholder-threshold'),
                addonAfter: unit,
              },
            });
            // 状态变化告警默认为=1
            if ('Time' === unit) {
              setConditionFieldsValue({
                ['alarmCondition_' + rowNum]: '=',
                ['alarmThreshold_' + rowNum]: '1',
              });
            }
          },
          getPopupContainer: getPopupContainer,
        },
        label: '',
        colProps: {
          span: 4,
        },
        required: true,
      },
      '',
    );
    appendSchemaByField(
      {
        field: `alarmCondition_${conditionRowNum.value}`,
        component: 'Select',
        label: '',
        componentProps: {
          placeholder: t('view.main.alarm.rule.placeholder-condition'),
          options: [
            {
              label: '>',
              value: '>',
              key: '0',
            },
            {
              label: '=',
              value: '=',
              key: '1',
            },
            {
              label: '<',
              value: '<',
              key: '2',
            },
          ],
        },
        colProps: {
          span: 4,
          offset: 1,
        },
        required: true,
      },
      '',
    );
    appendSchemaByField(
      {
        field: `alarmThreshold_${conditionRowNum.value}`,
        component: 'Input',
        label: '',
        colProps: {
          span: 4,
          offset: 1,
        },
        componentProps: {
          placeholder: t('view.main.alarm.rule.placeholder-threshold'),
        },
        required: true,
      },
      '',
    );
    appendSchemaByField(
      {
        field: `${conditionRowNum.value}`,
        component: 'Input',
        label: '',
        colProps: {
          span: 10,
        },
        slot: 'add',
      },
      '',
    );

    conditionRowNum.value++;
  }

  // 删除规则条件行
  function delConditionRow(field) {
    removeSchemaByField([
      `id_${field}`,
      `alarmCode_${field}`,
      `alarmCondition_${field}`,
      `alarmThreshold_${field}`,
      `${field}`,
    ]);
    conditionRowNum.value--;
  }

  // 通知方式
  const [
    registerNoticeForm,
    {
      setFieldsValue: setNoticeFieldsValue,
      resetFields: resetNoticeFields,
      validate: validateNotice,
    },
  ] = useForm({
    layout: 'vertical',
    labelWidth: 120,
    schemas: noticeFormSchema,
    showActionButtonGroup: false,
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    // 清空表单
    resetBasicFields();
    resetConditionSchema(conditionFormSchema);
    resetConditionFields();
    resetNoticeFields();
    conditionRowNum.value = 1;
    // 查询告警规则明细
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    // 设置下拉列表
    alarmTypeSelect.value = [];
    const templateList = await alarmTemplateList({});
    templateList.forEach((element) => {
      alarmTypeSelect.value.push({
        label: t('view.main.alarm.type.' + element.alarmCode),
        value: element.alarmCode,
        key: element.alarmCode,
      });
    });
    updateConditionSchema({
      field: 'alarmCode_0',
      componentProps: {
        placeholder: t('view.main.alarm.rule.placeholder-type'),
        options: alarmTypeSelect,
        getPopupContainer: getPopupContainer,
        onChange: (e: any) => {
          const unit = getUnitByAlarmCode(e);
          // 修改后面的单位
          updateConditionSchema({
            field: 'alarmThreshold_0',
            componentProps: {
              placeholder: t('view.main.alarm.rule.placeholder-threshold'),
              addonAfter: unit,
            },
          });
          // 状态变化告警默认为=1
          if ('Time' === unit) {
            setConditionFieldsValue({
              ['alarmCondition_0']: '=',
              ['alarmThreshold_0']: '1',
            });
          }
        },
      },
    });
    // 回填数据
    if (unref(isUpdate)) {
      const id = data.record.id;
      const alarmRule = await alarmRuleDetail({ id });
      const { conditionList } = alarmRule;
      setBasicFieldsValue({
        ...alarmRule,
      });
      setNoticeFieldsValue({
        ...alarmRule,
      });
      // 设置告警条件
      setConditionFieldsValue({
        id_0: conditionList[0]['id'],
        alarmCode_0: conditionList[0]['alarmCode'],
        alarmCondition_0: conditionList[0]['alarmCondition'],
        alarmThreshold_0: conditionList[0]['alarmThreshold'],
      });
      const len = conditionList.length;
      for (let i = 1; i < len; i++) {
        addConditionRow();
        nextTick(() => {
          updateConditionSchema([
            {
              field: 'alarmCode_' + i,
              componentProps: {
                options: alarmTypeSelect,
              },
            },
          ]);
          setConditionFieldsValue({
            ['id_' + i]: conditionList[i]['id'],
            ['alarmCode_' + i]: conditionList[i]['alarmCode'],
            ['alarmCondition_' + i]: conditionList[i]['alarmCondition'],
            ['alarmThreshold_' + i]: conditionList[i]['alarmThreshold'],
          });
        });
      }
    }
  });

  const getTitle = computed(() =>
    !unref(isUpdate) ? t('view.main.alarm.rule.modal.add') : t('view.main.alarm.rule.modal.edit'),
  );

  async function handleSubmit() {
    try {
      setModalProps({ confirmLoading: true });
      const basicValues = await validateBasic();
      const conditionValues = await validateCondition();
      const noticeValues = await validateNotice();
      const conditionList: Array<Recordable> = [];
      for (let i = 0; i < unref(conditionRowNum); i++) {
        conditionList.push({
          id: conditionValues['id_' + i],
          alarmCode: conditionValues['alarmCode_' + i],
          alarmCondition: conditionValues['alarmCondition_' + i],
          alarmThreshold: conditionValues['alarmThreshold_' + i],
        });
      }
      !unref(isUpdate)
        ? await alarmRuleAdd({ ...basicValues, ...noticeValues, conditionList })
        : await alarmRuleEdit({ ...basicValues, ...noticeValues, conditionList });
      closeModal();
      emit('success');
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
