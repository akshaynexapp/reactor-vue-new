<!--
 * @Description  : 
 * @Date         : 2022-06-28 14:53:55
 * @LastEditors  : Hu
 * @LastEditTime : 2022-12-03 19:06:00
 * @FilePath     : \reactor-vue\src\views\task\devTask\index.vue
-->
<template>
  <div class="p-2">
    <div class="p-4 mb-2 bg-white">
      <BasicForm @register="registerForm" />
    </div>
    <div class="p-2 bg-white">
      <a-list :grid="{ gutter: 8 }" :data-source="data" :pagination="paginationProp">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-card hoverable style="width: 325px">
              <!-- 标题 -->
              <template #title>
                <a-card-meta :title="`${taskType[item.taskType]} (${item.createUsername})`" />
              </template>

              <!-- 正文部分 -->
              <a-descriptions :column="2">
                <a-descriptions-item>
                  <template #label
                    ><a-badge status="default" :text="t('view.main.deviceTask.label.totalCount')"
                  /></template>
                  {{ item.totalCount }}
                </a-descriptions-item>

                <!-- 运行中 -->
                <a-descriptions-item
                  v-if="
                    item.status == TaskStatus.START &&
                    (item.unexecutedCount > 0 || item.executingCount > 0)
                  "
                >
                  <a-tag color="blue">
                    <template #icon>
                      <sync-outlined :spin="true" />
                    </template>
                    Processing
                  </a-tag>
                </a-descriptions-item>

                <!-- 完成 -->
                <a-descriptions-item
                  v-if="
                    item.status == TaskStatus.START &&
                    item.unexecutedCount == 0 &&
                    item.executingCount == 0
                  "
                >
                  <a-tag :color="item.failureCount > 0 ? 'warning' : 'success'">
                    <template #icon>
                      <minus-circle-outlined />
                    </template>
                    Finish
                  </a-tag>
                </a-descriptions-item>

                <!-- 待启动 -->
                <a-descriptions-item v-if="TaskStatus.CREATE == item.status">
                  <a-tag color="red">
                    <template #icon>
                      <clock-circle-outlined />
                    </template>
                    Waiting for start
                  </a-tag>
                </a-descriptions-item>

                <!-- 执行结果数量 -->
                <a-descriptions-item>
                  <template #label
                    ><a-badge status="success" :text="t('view.main.deviceTask.label.successCount')"
                  /></template>
                  {{ item.successCount }}
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label
                    ><a-badge status="error" :text="t('view.main.deviceTask.label.failureCount')"
                  /></template>
                  {{ item.failureCount }}
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label
                    ><a-badge status="blue" :text="t('view.main.deviceTask.label.executingCount')"
                  /></template>
                  {{ item.executingCount }}
                </a-descriptions-item>
                <a-descriptions-item>
                  <template #label
                    ><a-badge
                      status="warning"
                      :text="t('view.main.deviceTask.label.unexecutedCount')"
                  /></template>
                  {{ item.unexecutedCount }}
                </a-descriptions-item>
              </a-descriptions>
              <a-divider />
              <!-- 日期部分 -->
              <a-descriptions :column="2" size="small" :colon="false" layout="vertical">
                <a-descriptions-item :label="t('view.main.deviceTask.label.createTime')">
                  {{ item.createTime }}
                </a-descriptions-item>
                <a-descriptions-item :label="t('view.main.deviceTask.label.planBeginTime')">
                  {{ item.planBeginTime }}
                </a-descriptions-item>
              </a-descriptions>

              <!-- 操作按钮组 -->
              <template #actions>
                <template v-if="hasPermission('devTaskDetail:page')">
                  <a-tooltip :title="t('view.main.deviceTask.tooltip.taskList')">
                    <BarsOutlined @click="handleDetail(item.id)" />
                  </a-tooltip>
                </template>

                <template
                  v-if="hasPermission('devTask:startTask') && item.status == TaskStatus.CREATE"
                >
                  <a-tooltip :title="t('view.main.deviceTask.tooltip.start')">
                    <PlayCircleOutlined @click="handleStart(item.id)" />
                  </a-tooltip>
                </template>

                <template v-if="hasPermission('devTask:redoTask') && item.failureCount > 0">
                  <a-tooltip :title="t('view.main.deviceTask.tooltip.redo')">
                    <ReloadOutlined @click="handleRedo(item.id)" />
                  </a-tooltip>
                </template>

                <template v-if="hasPermission('devTask:delete')">
                  <a-tooltip :title="t('view.main.deviceTask.tooltip.delete')">
                    <DeleteOutlined @click="handleDelete(item.id)" />
                  </a-tooltip>
                </template>
              </template>
            </a-card>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>
<script lang="ts" setup name="DeviceTask">
  import { onMounted, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form';
  import { usePermission } from '/@/hooks/web/usePermission';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { searchFormSchema, taskType, TaskStatus } from './devTask.data';
  import {
    devTaskPage,
    devTaskStart,
    devTaskRedo,
    devTaskDelete,
  } from '/@/api/main/deviceTaskManage';
  import { useGo } from '/@/hooks/web/usePage';
  import {
    PlayCircleOutlined,
    DeleteOutlined,
    ReloadOutlined,
    BarsOutlined,
    SyncOutlined,
    MinusCircleOutlined,
    ClockCircleOutlined,
  } from '@ant-design/icons-vue';

  const { t } = useI18n();
  const go = useGo();
  const { hasPermission } = usePermission();
  //数据
  const data = ref([]);
  //表单
  const [registerForm, { validate, updateSchema }] = useForm({
    schemas: searchFormSchema,
    labelWidth: 80,
    baseColProps: { span: 6 },
    actionColOptions: { span: 8 },
    autoSubmitOnEnter: true,
    submitFunc: handleSubmit,
  });
  //表单提交
  async function handleSubmit() {
    await fetch();
  }

  // 自动请求
  onMounted(async () => {
    // 点击按钮自动查询任务
    updateSchema([
      {
        field: 'taskType',
        componentProps: {
          onChange: () => fetch(),
        },
      },
    ]);
    await fetch();
  });

  // 查询数据
  async function fetch() {
    const params = await validate();
    const res = await devTaskPage({
      pageNo: pageNo.value,
      pageSize: pageSize.value,
      ...params,
    });
    data.value = res.rows;
    total.value = res.totalRows;
  }
  //分页相关
  const pageNo = ref(1);
  const pageSize = ref(20);
  const total = ref(0);
  const paginationProp = ref({
    showSizeChanger: true,
    showQuickJumper: true,
    pageSize,
    current: pageNo,
    total,
    showTotal: (total) => t('component.table.total', { total }),
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });

  function pageChange(p, pz) {
    pageNo.value = p;
    pageSize.value = pz;
    fetch();
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
    fetch();
  }

  // 启动任务（后台设置二级授权才会显示）
  function handleStart(taskId: any) {
    devTaskStart({ id: taskId }).then(() => fetch());
  }

  // 重启执行失败的任务
  function handleRedo(taskId: any) {
    devTaskRedo({ id: taskId }).then(() => fetch());
  }

  // 删除任务及明细
  function handleDelete(taskId: any) {
    devTaskDelete({ id: taskId }).then(() => fetch());
  }

  // 查看任务明细
  function handleDetail(taskId: any) {
    go('/device-task-detail/' + taskId);
  }
</script>
