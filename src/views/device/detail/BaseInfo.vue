<!--
 * @Description  : 
 * @Date         : 2021-08-09 14:57:08
 * @LastEditors  : Hu
 * @LastEditTime : 2023-03-10 15:59:49
 * @FilePath     : \reactor-vue\src\views\device\detail\BaseInfo.vue
-->
<template>
  <Descriptions bordered :title="title" :column="3">
    <DescriptionsItem v-for="item in baseSchema" :key="item.field" :label="item.label" :span="1"
      ><div class="wrapper">
        <template v-if="item.edit == true">
          <div
            class="no-editable flex justify-between align-center"
            v-if="!params[item.field].editable"
          >
            <span>{{ params ? params[item.field].value : '' }}</span>
            <EditOutlined class="cursor-pointer" @click="handleOpenEdit(item)" />
          </div>
          <div class="editable flex justify-between align-center" v-else>
            <Input
              v-show="item.editComponent === 'Input'"
              class="edit-input"
              v-model:value="params[item.field].value"
              @change="handleInput($event, item)"
            />
            <Select
              v-if="item.editComponent === 'Select'"
              class="edit-input"
              v-model:value="params[item.field].value"
              @change="handleInput($event, item)"
            >
              <SelectOption
                v-for="option in item.editComponentProps.options"
                :key="option.value"
                :value="option.value"
                >{{ option.label }}</SelectOption
              >
            </Select>
            <div class="op-wrapper">
              <CheckOutlined @click="handleConfirm(item)" />
              <CloseOutlined @click="handleCancel(item)" class="ml-2" />
            </div>
          </div>
        </template>
        <template v-else>
          <div>
            <span>{{ renderValue(baseInfo, item) }}</span>
          </div>
        </template>
      </div>
    </DescriptionsItem>
  </Descriptions>
</template>
<script lang="ts">
  import { defineComponent, computed, ref, reactive, watch } from 'vue';
  import { Descriptions, DescriptionsItem, Input, Select, SelectOption } from 'ant-design-vue';
  import { Fflow } from '/@/utils/reactorUtil';
  import { EditOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons-vue';
  import { devEdit } from '/@/api/main/deviceManage';

  const baseSchema: any[] = [
    {
      field: 'devSn',
      label: 'SN',
      contentMinWidth: 100,
    },
    {
      field: 'name',
      label: 'Device Name',
      edit: true,
      editComponent: 'Input',
      contentMinWidth: 100,
    },
    {
      field: 'cpuUse',
      label: 'CPU Use',
      contentMinWidth: 100,
    },
    {
      field: 'hardVer',
      label: 'Hard Ver',
      contentMinWidth: 100,
    },
    {
      field: 'heartbeat',
      label: 'Heartbeat',
      contentMinWidth: 100,
    },
    {
      field: 'lanIp',
      label: 'Lan Ip',
      contentMinWidth: 100,
    },
    {
      field: 'lanStatus',
      label: 'Lan Status',
      contentMinWidth: 100,
    },
    {
      field: 'memUse',
      label: 'Mem Use',
      contentMinWidth: 100,
    },
    {
      field: 'netType',
      label: 'Net Type',
      contentMinWidth: 100,
    },
    {
      field: 'online',
      label: 'Online',
      contentMinWidth: 100,
      render: (val) => {
        return val ? 'online' : 'offline';
      },
    },
    {
      field: 'softVer',
      label: 'Soft Ver',
      contentMinWidth: 100,
    },
    {
      field: 'orgName',
      label: 'Group',
      contentMinWidth: 100,
    },
    {
      field: 'wanIp',
      label: 'Wan Ip',
      contentMinWidth: 100,
    },
    {
      field: 'wanMode',
      label: 'Wan Mode',
      contentMinWidth: 100,
    },
    {
      field: 'wanStatus',
      label: 'Wan Status',
      contentMinWidth: 100,
    },
    {
      field: 'loginTime',
      label: 'Login Time',
      contentMinWidth: 100,
    },
    {
      field: 'dayFlow',
      label: 'Day Flow',
      contentMinWidth: 100,
      render: (val) => {
        return Fflow(val);
      },
    },
    {
      field: 'monthFlow',
      label: 'Month Flow',
      contentMinWidth: 100,
      render: (val) => {
        return Fflow(val);
      },
    },
    {
      field: 'longitude',
      label: 'Longitude',
      edit: true,
      editComponent: 'Input',
      contentMinWidth: 100,
    },
    {
      field: 'latitude',
      label: 'Latitude',
      edit: true,
      editComponent: 'Input',
      contentMinWidth: 100,
    },
    {
      field: 'location',
      label: 'Location',
      edit: true,
      editComponent: 'Input',
      contentMinWidth: 100,
    },
    {
      field: 'statusFlag',
      label: 'Status',
      edit: true,
      editComponent: 'Select',
      editComponentProps: {
        options: [
          { label: 'Provisioned', value: 'Provisioned' },
          { label: 'Replaced/Defected', value: 'Replaced/Defected' },
          { label: 'Cancelled', value: 'Cancelled' },
        ],
      },
      contentMinWidth: 100,
    },
  ];

  export default defineComponent({
    components: {
      Descriptions,
      DescriptionsItem,
      Input,
      Select,
      SelectOption,
      EditOutlined,
      CloseOutlined,
      CheckOutlined,
    },
    props: {
      record: { type: Object, default: null },
      title: { type: String },
    },
    setup(props) {
      const editedValue = ref('');

      const baseInfo = computed(() => {
        return props.record;
      });

      const renderValue = computed(() => {
        return (data, item) => {
          if (data) {
            if (item.render && typeof item.render === 'function') {
              return item.render(data[item.field] || '');
            } else {
              return data[item.field] ? data[item.field] : '';
            }
          } else {
            return '';
          }
        };
      });

      let params = reactive({});
      const handleOpenEdit = (item) => {
        params[item.field] = {
          value: params[item.field].value,
          editable: true,
        };
      };
      const handleConfirm = (item) => {
        // params[item.field] = {
        //   value: params[item.field].value,
        //   editable: false,
        // };
        devEdit({
          id: props.record.id,
          [item.field]:
            item.field == 'longitude' || item.field == 'latitude'
              ? parseFloat(params[item.field].value)
              : params[item.field].value,
        }).then(() => {
          params[item.field].editable = false;
        });
      };
      const handleCancel = (item) => {
        params[item.field] = {
          value: props.record[item.field],
          editable: false,
        };
      };
      const handleInput = (e, item) => {
        // params[item.field] = {
        //   value: e.data,
        //   editable: true,
        // };
      };
      watch(
        () => props.record,
        () => {
          baseSchema
            .filter((f) => f.edit)
            .forEach((e) => {
              params[e.field] = {
                value: props.record ? props.record[e.field] : '',
                editable: false,
              };
            });
        },
        {
          immediate: true,
          deep: true,
        },
      );
      return {
        editedValue,
        params,
        baseInfo,
        baseSchema,
        renderValue,
        handleInput,
        handleOpenEdit,
        handleConfirm,
        handleCancel,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep {
    .ant-descriptions-row {
      .ant-descriptions-item-label {
        width: 10%;
      }

      .ant-descriptions-item-content {
        width: 15%;
      }

      th,
      td {
        padding: 8px 16px;
        cursor: pointer;
      }

      .wrapper {
        width: 100%;

        .no-editable {
          width: 100%;
        }

        .editable {
          width: 100%;

          .edit-input {
            width: calc(100% - 50px);
            height: 22px;

            .ant-select-selector {
              height: 100%;

              .ant-select-selection-search {
                height: 100%;

                input {
                  height: 100%;
                }
              }

              .ant-select-selection-item {
                line-height: 22px;
              }
            }
          }

          .op-wrapper {
            width: 44px;
          }
        }
      }
    }
  }
</style>
