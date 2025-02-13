<!--
 * @Description  : 
 * @Date         : 2021-06-18 16:36:45
 * @LastEditors  : Hu
 * @LastEditTime : 2023-09-24 13:41:32
 * @FilePath     : \reactor-vue\src\views\device\OnlineList.vue
-->

<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <FoldLayout>
      <template #left>
        <OrgTree class="left-wrap" @select="handleSelect" />
      </template>

      <template #main>
        <div class="mt-6 p-4 border rounded-lg bg-white">
          <h2 class="text-lg font-semibold mb-2">District Information</h2>

          <button
            @click="exportTableToExcel"
            class="text-blue-500 hover:text-blue-700 cursor-pointer"
            style="position: absolute; top: 40px; right: 20px; border: none; background: none"
          >
            <i class="fa-solid fa-cloud-arrow-down" style="color: #ef8b1e"></i>
          </button>
          <button
            @click="refreshTable"
            class="text-blue-500 hover:text-blue-700 cursor-pointer"
            style="
              /* float: right; */
              position: absolute;
              top: 40px;
              right: 60px;
              border: none;
              background: none;
            "
          >
            <i class="fa-solid fa-rotate-right" style="color: #ef8b1e"></i>
          </button>
          <div class="overflow-x-auto">
            <div class="max-h-100 overflow-y-auto border border-gray-300 rounded-md">
              <table class="table-auto w-full border-collapse border border-gray-300">
                <thead class="bg-gray-200 sticky top-0 z-10">
                  <tr class="bg-gray-200">
                    <th class="border border-gray-300 px-4 py-2">SR No</th>
                    <th class="border border-gray-300 px-4 py-2">District Name</th>
                    <th class="border border-gray-300 px-4 py-2">Total Number of Online devices</th>
                    <th class="border border-gray-300 px-4 py-2"
                      >Total Number of Offline devices</th
                    >
                    <th class="border border-gray-300 px-4 py-2">Switch On at least once</th>
                    <th class="border border-gray-300 px-4 py-2">Non active till now</th>
                    <th class="border border-gray-300 px-4 py-2"
                      >Total Number of Devices Supplied</th
                    >
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(district, index) in districtList"
                    :key="index"
                    :class="{ 'bg-gray-200': index % 2 !== 0 }"
                  >
                    <td class="border border-gray-300 px-4 py-2 text-center">{{ index + 1 }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">{{
                      district.title
                    }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                      {{ deviceDataMap[orgIds[index]]?.online || 0 }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                      {{ deviceDataMap[orgIds[index]]?.offline || 0 }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                      {{
                        (deviceDataMap[district.title]?.count_range_1 || 'Loading...') -
                        (deviceDataMap[orgIds[index]]?.online || 0)
                      }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                      {{ deviceDataMap[district.title]?.count_range_2 || 'Loading...' }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                      {{
                        (Number(deviceDataMap[orgIds[index]]?.online) || 0) +
                        (Number(deviceDataMap[orgIds[index]]?.offline) || 0)
                      }}
                    </td>
                  </tr>

                  <tr class="bg-gray-200 font-bold">
                    <td class="border border-gray-300 px-4 py-2 text-center" colspan="2">Total</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">{{
                      totalOnlineDevices
                    }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">{{
                      totalOfflineDevices
                    }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">
                      {{ totalCountRange1 - totalOnlineDevices }}
                    </td>
                    <td class="border border-gray-300 px-4 py-2 text-center">{{
                      totalCountRange2
                    }}</td>
                    <td class="border border-gray-300 px-4 py-2 text-center">{{ totalDevices }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </FoldLayout>
    <DeviceAdjustOrgModal @register="registerAdjustOrgModal" @success="reload" />
    <DeviceConfigModal @register="registerDeviceConfigModal" />
    <DeviceUpgradeModal @register="registerDeviceUpgradeModal" />
    <DeviceDetailDrawer @close="handleCloseDetailDrawer" @register="registerDetailDrawer" />
    <DeviceAppDrawer @register="registerDevAppDrawer" />
    <DeviceSerialModal @register="registerDevSerialModal" />
  </PageWrapper>
</template>
<script lang="ts" setup name="OnlineDevices">
  import Icon from '@/components/Icon/Icon.vue';
  import { ref, computed, toRaw, reactive, h, onMounted, watch } from 'vue';
  import * as XLSX from 'xlsx';

  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { devPage, devEdit, devExport, devDelete } from '/@/api/main/deviceManage';
  import { devReboot } from '/@/api/main/deviceTaskManage';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { columns, searchFormSchema } from './device.datanew';
  import { getSignalIcon } from './device.service';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useModal } from '/@/components/Modal';
  import { useDrawer } from '/@/components/Drawer';
  import DeviceConfigModal from './DeviceConfigModal.vue';
  import DeviceUpgradeModal from './DeviceUpgradeModal.vue';
  import DeviceAdjustOrgModal from './DeviceAdjustOrgModal.vue';
  import DeviceDetailDrawer from './detail/index.vue';
  import DeviceAppDrawer from './sdlan/DevAppDrawer.vue';
  import DeviceSerialModal from './DeviceSerialModal.vue';
  import { downloadByData } from '/@/utils/file/download';
  import dayjs from 'dayjs';
  import { useGo } from '/@/hooks/web/usePage';
  import { FoldLayout } from '/@/components/FoldLayout';
  import OrgTree from './OrgTree.vue';
  import { getOrgTree } from '/@/api/system/orgManage';
  import { getDeviceCard } from '/@/api/main/dashboardManage';

  import { PageWrapper } from '/@/components/Page';
  import { debounce } from 'lodash';

  // import { all } from 'axios';
  import axios from 'axios';

  const go = useGo();
  const { t } = useI18n();
  const { createMessage, createConfirm } = useMessage();
  const [registerAdjustOrgModal, { openModal: openAdjustOrgModal }] = useModal();
  const [registerDeviceConfigModal, { openModal: openDeviceConfigModal }] = useModal();
  const [registerDeviceUpgradeModal, { openModal: openDeviceUpgradeModal }] = useModal();
  const [registerDetailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
  const [registerDevAppDrawer, { openDrawer: openAppDrawer }] = useDrawer();
  const [registerDevSerialModal, { openModal: openSerialModal }] = useModal();
  const [registerTable, { reload, getForm, getSelectRows, getSelectRowKeys }] = useTable({
    title: t('view.main.device.label.deviceList'),
    api: devPage,
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
    },
    striped: true,
    useSearchForm: true,
    showTableSetting: true,
    bordered: false,
    showIndexColumn: true,
    clickToRowSelect: false,
    rowSelection: { type: 'checkbox' },
    rowKey: 'id',
  });

  getOrgTree()
    .then((response) => {
      // console.log('District Titles:', response);
      const districtNode = response.find((item) => item.title === 'District');

      if (districtNode && districtNode.children) {
        const districtTitles = districtNode.children.map((child) => child.title);
        // console.log('District Titles:', districtTitles);
      } else {
        console.log('No children found for District.');
      }
    })
    .catch((error) => {
      console.error('API Error:', error);
    });

  // Reactive state for district data
  const districtList = ref([]);

  // Table columns
  const column = reactive([{ title: 'District Name', dataIndex: 'title', key: 'title' }]);

  // Fetch district data
  const fetchDistricts = async () => {
    try {
      const response = await getOrgTree();
      const districtNode = response.find((item) => item.title === 'District');

      if (districtNode && districtNode.children) {
        districtList.value = districtNode.children.map((child) => ({
          title: child.title,
        }));
      } else {
        console.log('No children found for District.');
      }
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  // Fetch data when the component is mounted
  onMounted(fetchDistricts);

  const deviceDataMap = ref({}); // Store device data for multiple orgIds
  // const orgIds = ref(['1772627419044466689', '1859840576711782401']);
  const orgIds = ref([
    '1772627419044466689',
    '1859840576711782401',
    '1859840788146647041',
    '1859840891561406466',
    '1859840953297367042',
    '1859841102870441986',
    '1859841174655954945',
    '1859841227441270785',
    '1859841276241997825',
    '1859841352066625538',
    '1859841404247961601',
    '1859841450171396097',
    '1859841488607997953',
    '1859841532983734274',
    '1859841579704086529',
    '1859841621768761345',
    '1859841673258037249',
    '1859841731323981825',
    '1859841795698159618',
    '1859841840677875714',
    '1859841881995964417',
    '1859841921544056833',
    '1859841960584638465',
    '1859842007653117953',
    '1859842046865666049',
    '1859842093581824001',
  ]);

  const fetchDeviceCards = async () => {
    try {
      for (const orgId of orgIds.value) {
        const params = { orgId };
        const response = await getDeviceCard(params);
        // console.log(`Device Card Response for orgId ${orgId}:`, response);
        // console.log(`Device Data for ${district.orgId}:`, response); // Debugging

        // Store response separately for each orgId
        deviceDataMap.value[orgId] = response;
        // deviceDataMap.value[district.id] = {
        //   online: response.online || 0,
        //   offline: response.offline || 0,
        // };

        // console.log('Map', deviceDataMap);
      }
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  // Fetch data when the component mounts
  onMounted(fetchDeviceCards);

  const devicePageMap = ref({});

  const fetchDevicePage = async () => {
    try {
      for (const orgId of orgIds.value) {
        let params = { orgId };
        let allRows = [];
        let totalPages = 76; // You can also set this dynamically if needed

        for (let page = 1; page <= totalPages; page++) {
          params.pageNo = page;
          params.pageSize = 20;

          try {
            const response = await devPage(params);

            // Validate the response before using it
            if (!response || typeof response !== 'object') {
              // console.error(`Invalid response for orgId ${orgId}, Page ${page}:`, response);
              continue;
            }

            if (!Array.isArray(response.rows)) {
              // console.error(
              //   `Missing or invalid 'rows' array for orgId ${orgId}, Page ${page}:`,
              //   response,
              // );
              continue;
            }

            allRows = [...allRows, ...response.rows];
          } catch (apiError) {
            // console.error(`API request failed for orgId ${orgId}, Page ${page}:`, apiError);
          }
        }

        // console.log(`Device Data for orgId ${orgId}:`, allRows);
        devicePageMap.value[orgId] = allRows;

        // for (const device of allRows) {
        //   if (device.devSn) {
        //     fetchHeartbeat(device.devSn);
        //   }
        // }
      }
    } catch (error) {
      console.error('Error fetching device data:', error);
    }
  };

  // const fetchHeartbeat = async (devSn) => {
  //   try {
  //     const response = await axios.get('/heartbeat', {
  //       params: {
  //         sn: devSn, // Use device serial number dynamically
  //         username: 'Apts',
  //         password: 'Apts@20256',
  //       },
  //     });

  //   } catch (error) {
  //     console.error(`Error fetching heartbeat for device ${devSn}:`, error);
  //   }
  // };

  // Computed property to get all devices
  const allDevices = computed(() => {
    const flattenedDevices = Object.values(devicePageMap.value).flat();
    // console.log('Total devices across all orgIds:', flattenedDevices.length);
    return flattenedDevices;
  });

  onMounted(() => {
    fetchDevicePage(); // Fetch all pages of devices when component is mounted
  });

  // Watch for updates in the device data
  watch(allDevices, (newDevices) => {
    // console.log('Devices updated:', newDevices.length);
  });

  const ext02Districts = [
    'Ananthapuram',
    'Alluri Sitharama Raju',
    'Anakapalli',
    'Annamayya',
    'Bapatla',
    'Chittoor',
    'East Godavari',
    'Eluru',
    'Guntur',
    'Kakinada',
    'Konaseema',
    'Krishna',
    'Kurnool',
    'Manyam',
    'Nandyal',
    'NTR',
    'Palnadu',
    'Prakasam',
    'SPS Nellore',
    'Sri Satyasai',
    'Srikakulam',
    'Tirupati',
    'Visakhapatnam',
    'Vizianagaram',
    'West Godavari',
    'YSR Kadapa',
  ];

  const allDevicesFlattened = computed(() => Object.values(devicePageMap.value).flat());

  // ✅ Fetch Heartbeat (Checks Cache & Queues Requests)
  // const fetchHeartbeat = async (devSn) => {
  //   if (deviceHeartbeats.value[devSn]) return; // Already fetched

  //   const cachedData = localStorage.getItem(`heartbeat_${devSn}`);
  //   const cachedTimestamp = localStorage.getItem(`heartbeat_time_${devSn}`);

  //   if (cachedData && cachedTimestamp && Date.now() - cachedTimestamp < CACHE_DURATION) {
  //     deviceHeartbeats.value[devSn] = cachedData; // Use cache
  //     return;
  //   }

  //   fetchQueue.value.push(devSn);
  //   processQueue();
  // };

  // ✅ Process Request Queue (Limits API Calls)
  // const processQueue = async () => {
  //   if (fetchQueue.value.length === 0) return;

  //   const activeRequests = fetchQueue.value.splice(0, MAX_CONCURRENT_REQUESTS); // Take 5 at a time

  //   try {
  //     const responses = await Promise.all(
  //       activeRequests.map((sn) =>
  //         axios.get('/heartbeat', { params: { sn, username: 'Apts', password: 'Apts@20256' } }),
  //       ),
  //     );

  //     responses.forEach((response, index) => {
  //       const sn = activeRequests[index];
  //       if (response.data?.time) {
  //         deviceHeartbeats.value[sn] = response.data.time;
  //         localStorage.setItem(`heartbeat_${sn}`, response.data.time);
  //         localStorage.setItem(`heartbeat_time_${sn}`, Date.now().toString());
  //       }
  //     });
  //   } catch (error) {
  //     console.error('Error fetching heartbeats:', error);
  //   }

  //   if (fetchQueue.value.length > 0) {
  //     setTimeout(processQueue, 1000); // Delay before next batch
  //   }
  // };

  // const deviceDataMap = ref({});

  const fetchHeartbeat = async (district, beginTime, endTime, rangeKey) => {
    try {
      const response = await axios.get('/heartbeat', {
        params: {
          ext02: district,
          beginTime: beginTime,
          endTime: endTime,
          username: 'Apts',
          password: 'Apts@20256',
        },
      });

      if (response.data?.count !== undefined) {
        if (!deviceDataMap.value[district]) {
          deviceDataMap.value[district] = {}; // Ensure district key exists
        }
        deviceDataMap.value[district][rangeKey] = response.data.count; // Store count in specific range key

        console.log(`Heartbeat count for ${district} (${rangeKey}):`, response.data.count);
      }
    } catch (error) {
      console.error(`Error fetching heartbeat count for ${district} (${rangeKey}):`, error);
    }
  };

  onMounted(async () => {
    for (const district of ext02Districts) {
      const today = new Date().toISOString().split('T')[0] + ' 23:59:59'; // Today's date at 23:59:59

      await fetchHeartbeat(district, '2024-09-01 00:00:00', today, 'count_range_1');

      // Small delay to ensure proper API requests

      await fetchHeartbeat(district, '2024-01-01 00:00:00', '2024-08-31 00:00:00', 'count_range_2');
    }
  });

  onMounted(fetchDevicePage);

  // const combinedData = computed(() =>
  //   districtList.value.map((district) => {
  //     const data = deviceDataMap.value[district.orgId] || { offline: 0, online: 0 };
  //     return { title: district.title, offline: data.offline, online: data.online };
  //   }),
  // );

  // const combinedData = computed(() =>
  //   districtList.value.map((district) => ({
  //     title: district.title,
  //     offline: deviceDataMap.value[district.orgId]?.offline || 0,
  //     online: deviceDataMap.value[district.orgId]?.online || 0,
  //   })),
  // );

  // 导出loading状态
  const exportLoadingFlag = ref<boolean>();

  const searchInfo = reactive<Recordable>({ online: true });

  function handleDelete() {
    const devIds: string[] = getSelectRowKeys();
    if (devIds.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    createConfirm({
      iconType: 'warning',
      title: () => h('span', t('sys.app.logoutTip')),
      content: () => t('common.confirmDelete'),
      onOk: async () => {
        devDelete({ idArr: devIds }).then(() => reload());
      },
    });
  }

  // 编辑
  function handleEditEnd({ record, index, key, value }: Recordable) {
    devEdit({ id: record.id, [key]: value }).then(() => reload());
  }

  // 打开SDLAN
  function handleOpenSDLAN() {
    const record = getOneRecord();
    if (record === undefined) {
      return;
    }
    if (!record.online) {
      createMessage.warn(t('view.main.common.msg.selectOnlineDevice'));
      return;
    }
    openAppDrawer(true, { record });
    return;
  }

  // 打开串口通信
  function handleOpenSerial() {
    const record = getOneRecord();
    if (record === undefined) {
      return;
    }
    if (!record.online) {
      createMessage.warn(t('view.main.common.msg.selectOnlineDevice'));
      return;
    }
    openSerialModal(true, { record });
    return;
  }

  // 设备重启
  function handleReboot() {
    const selectRows = getSelectRows();
    if (!selectRows || selectRows.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    // 只保留在线设备
    const onlineRows: Recordable<any>[] = selectRows.filter((v) => {
      return v.online;
    });
    if (onlineRows.length == 0) {
      createMessage.warn(t('view.main.common.msg.selectOnlineDevice'));
      return;
    }

    // 生成最终的sn数组
    const devSnArr = onlineRows.map((item: any) => {
      return item.devSn;
    });
    devReboot({ devSnArr: devSnArr });
  }

  // 打开调整分组表单
  function openAdjustOrgForm() {
    const devIds: string[] = getSelectRowKeys();
    if (devIds.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    openAdjustOrgModal(true, { record: { devIds: devIds } });
  }

  // 打开设备配置表单
  function openConfigForm() {
    const selectRows = getSelectRows();
    if (!selectRows || selectRows.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    openDeviceConfigModal(true, { selectRows });
  }

  // 打开升级表单
  function openUpgradeForm() {
    const selectRows = getSelectRows();
    if (!selectRows || selectRows.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    openDeviceUpgradeModal(true, { selectRows });
  }

  // 打开设备详情
  function handleDetail(record) {
    openDetailDrawer(true, { record });
  }

  const handleJumpDeviceLocation = () => {
    const record = getOneRecord();
    if (record === undefined) {
      return;
    }
    if (!record.online) {
      createMessage.warn(t('view.main.common.msg.selectOnlineDevice'));
      return;
    }
    const { longitude, latitude, id } = record;
    if (record === undefined) {
      return;
    }
    if (longitude === undefined || latitude === undefined) {
      createMessage.warn(t('view.main.common.msg.noLocableDevices'));
      return;
    }
    go(`/device/gis/index?longitude=${longitude}&latitude=${latitude}&id=${id}`);
  };

  // 导出设备数据
  async function handleExport() {
    exportLoadingFlag.value = true;
    const params: any = getForm().getFieldsValue();
    const res = await devExport(
      toRaw({
        ...params,
        orgId: searchInfo.orgId,
        online: true,
      }),
    );
    downloadByData(res.data, 'online_device_' + dayjs().format('YYYY-MM-DD') + '.xls');
    exportLoadingFlag.value = false;
  }

  function handleSelect(orgId = '') {
    searchInfo.orgId = orgId;
    reload();
  }

  const handleCloseDetailDrawer = () => {
    reload();
  };
  const getOneRecord = () => {
    const selectRows = getSelectRows();
    if (!selectRows || selectRows.length === 0) {
      createMessage.warn(t('view.main.common.msg.selectOneOrMore'));
      return;
    }
    if (selectRows.length > 1) {
      createMessage.warn(t('view.main.common.msg.selectOneOnly'));
      return;
    }
    return selectRows[0];
  };
  function refreshTable() {
    fetchDeviceCards();
    fetchDistricts();
  }

  function exportTableToExcel() {
    // Get the table element
    const table = document.querySelector('table');

    // Convert table to worksheet
    const ws = XLSX.utils.table_to_sheet(table);

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Append worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'District Information');

    // Export to Excel file
    XLSX.writeFile(wb, 'district_information.xlsx');
  }

  // console.log('Device Data Map:', deviceDataMap);
  // console.log('Organization IDs:', orgIds.value);

  // Computed property to calculate total online devices
  const totalOnlineDevices = computed(() => {
    return orgIds.value.reduce((total, orgId) => {
      const onlineDevices = Number(deviceDataMap.value[orgId]?.online) || 0; // Ensure it's a number
      // console.log(`orgId: ${orgId}, online: ${onlineDevices}`);
      return total + onlineDevices;
    }, 0);
  });

  // Computed property to calculate total offline devices
  const totalOfflineDevices = computed(() => {
    return orgIds.value.reduce((total, orgId) => {
      const offlineDevices = Number(deviceDataMap.value[orgId]?.offline) || 0; // Ensure it's a number
      // console.log(`orgId: ${orgId}, offline: ${offlineDevices}`);
      return total + offlineDevices;
    }, 0);
  });

  const totalDevices = computed(() => {
    return totalOnlineDevices.value + totalOfflineDevices.value;
  });

  const totalOfflineMinusOnline = computed(() => {
    return orgIds.value.reduce((total, orgId) => {
      return (
        total +
        ((Number(deviceDataMap.value[orgId]?.offline) || 0) -
          (Number(deviceDataMap.value[orgId]?.online) || 0))
      );
    }, 0);
  });
  const totalCountRange1 = computed(() => {
    return ext02Districts.reduce((sum, district) => {
      return sum + (deviceDataMap.value[district]?.count_range_1 || 0); // Fix: Use `district`
    }, 0);
  });

  const totalDifferenceRange1 = computed(() => {
    if (!deviceDataMap.value) return 0; // Handle empty object

    return ext02Districts.reduce((sum, district, index) => {
      const count1 = Number(deviceDataMap.value?.[district.title]?.count_range_1 || 0);
      const onlineCount = Number(deviceDataMap.value?.[orgIds[index]]?.online || 0);

      console.log(
        `District: ${district.title}, Count1: ${count1}, OrgId: ${orgIds[index]}, Online: ${onlineCount}`,
      );

      return sum + (count1 - onlineCount);
    }, 0);
  });

  const totalCountRange2 = computed(() => {
    return ext02Districts.reduce((sum, district) => {
      return sum + (deviceDataMap.value[district]?.count_range_2 || 0); // Fix: Use `district`
    }, 0);
  });

  const totalDifference = computed(() => {
    return Math.abs(totalCountRange1.value - totalCountRange2.value);
  });
</script>

<style lang="less" scoped>
  .left-wrap {
    height: calc(100% - 32px);
  }

  a {
    color: black;
    text-decoration: none;
  }

  a:link {
    text-decoration: none;
  }

  a:visited {
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  a:active {
    text-decoration: none;
  }
</style>
