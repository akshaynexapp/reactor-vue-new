<template>
  <div class="gmap-wrapper">
    <GoogleMap
      id="gmap"
      api-key=""
      style="width: 100%; height: 100%"
      :center="center"
      :zoom="15"
      @idle="handler"
    >
      <!-- <Marker
        v-for="(item, index) in deviceList"
        :key="index"
        :options="{ position: item.position }"
      >
        <InfoWindow>
          <DeviceDescription :deviceInfo="item" @event="handleEvent"></DeviceDescription>
        </InfoWindow>
      </Marker>
      <Polyline :options="flightPath" /> -->
    </GoogleMap>
    <div class="device-list">
      <DeviceList />
    </div>
    <div class="control-panel" v-show="visible">
      <ControlPanel />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, onMounted, reactive, getCurrentInstance } from 'vue';
  import { useRoute } from 'vue-router';
  import ControlPanel from './ControlPanel.vue';
  import DeviceDescription from './DeviceDescription.vue';
  import DeviceList from './DeviceList.vue';
  import { GoogleMap, Marker, InfoWindow, Polyline } from 'vue3-google-map';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { devDetail, getGpsListByDevSn } from '/@/api/main/deviceManage';
  import carImg from '/@/assets/images/car.png';
  import startPlayImg from '/@/assets/images/start_playback.png';

  const devList = [
    {
      name: 'test',
      longitude: 113.23,
      latitude: 23.16,
      updataTime: '2022-02-2414:59:44',
      speed: 30,
      mileage: 1062232,
      todayMileage: 135.9,
      devSn: 'MUXH202101110001',
      id: '1435245282676838400',
      devSerialNo: 'H00001',
      address: '',
      status: {
        online: 'online',
        signalType: '4G',
        signalQuality: 0,
        satellites: 15,
      },
      lineCoordinates: [
        { latitude: 23.16, longitude: 113.23 },
        { latitude: 23.13, longitude: 113.81 },
        { latitude: 23.57, longitude: 113.55 },
      ],
    },
    {
      name: 'test2',
      longitude: 113.23,
      latitude: 23.2,
      updataTime: '2022-02-2414:59:44',
      speed: 30,
      mileage: 1062232,
      todayMileage: 135.9,
      devSn: 'CR20XL2103031306',
      id: '1466647992105832448',
      devSerialNo: 'H00001',
      address: '',
      status: {
        online: 'online',
        signalType: '4G',
        signalQuality: 0,
        satellites: 15,
      },
      lineCoordinates: [
        { latitude: 23.18, longitude: 113.2 },
        { latitude: 23.16, longitude: 113.79 },
        { latitude: 23.54, longitude: 113.57 },
      ],
    },
  ];
  // const markerList = devList.map((e) => ({
  //   ...e,
  //   position: {
  //     lat: e.latitude,
  //     lng: e.longitude,
  //   },
  //   label: "L",
  //   title: e.name,
  //   icon: "../../../assets/images/car.png",
  // }));

  export default defineComponent({
    name: 'GMap',
    components: {
      ControlPanel,
      GoogleMap,
      Marker,
      InfoWindow,
      DeviceDescription,
      DeviceList,
      Polyline,
    },
    props: {
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: 'calc(100vh - 78px)',
      },
    },
    setup() {
      const internalInstance = getCurrentInstance();
      const $bus = internalInstance.appContext.config.globalProperties.$bus;

      const route = useRoute();
      const { t } = useI18n();
      const center = reactive({ lat: devList[0].latitude, lng: devList[0].longitude });
      const visible = ref(false);
      // google map 变量

      let timer = null;
      let flightPath = {};
      let sleep = 500;
      let cacheProgress = 0;
      let count = 0;
      let gMap = {};
      let myMap = {};
      let lineCoordinates = [];
      let markerList = [];
      let deviceList = [];
      let infoWindow = {};
      let config = {
        devSn: '',
        interval: 200,
        playMode: 0, //0正常 1快速
        count: 10,
      };

      if (route.query.hasOwnProperty('longitude') && route.query.hasOwnProperty('latitude')) {
        center.lat = parseFloat(route.query.latitude);
        center.lng = parseFloat(route.query.longitude);
      }

      if (!$bus.all.get('APPLY')) {
        $bus.on('APPLY', (res) => {
          config = res;
          cacheProgress = 0;
          count = 0;
          clearInterval(timer);
          // 根据devSn查询经纬度

          startPlayback(res.devSn);
        });
      }
      if (!$bus.all.get('SET_CENTER')) {
        $bus.on('SET_CENTER', (res) => {
          const { devSn } = res;
          const dev = deviceList.find((f) => f.devSn == res.devSn);
          myMap.setCenter({ lat: dev.latitude, lng: dev.longitude });
          if (infoWindow.anchor && infoWindow.anchor.visible) {
            infoWindow.close();
          }
          if (flightPath && flightPath.visible) {
            flightPath.setMap(null);
          }
        });
      }

      if (!$bus.all.get('RENDER_DEV')) {
        $bus.on('RENDER_DEV', (res) => {
          deviceList = res;
          const dev = res[0];
          console.log(dev);
          myMap.setCenter({
            lat: parseFloat(dev.latitude),
            lng: parseFloat(dev.longitude),
          });
          if (infoWindow.anchor && infoWindow.anchor.visible) {
            infoWindow.close();
          }
          if (flightPath && flightPath.visible) {
            flightPath.setMap(null);
          }
          renderMarker(res, myMap);
        });
      }

      const handler = async () => {
        gMap = google.maps;
        let map = new gMap.Map(document.getElementById('gmap'), {
          zoom: 15,
          center: center,
          // 地图类型 默认
          mapTypeId: 'roadmap',
          panControl: true,
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: true,
          overviewMapControl: true,
          // 禁用默认控件 便于修改控件样式 自定义控件 自定义位置
          // disableDefaultUI: true
        });
        myMap = map;

        if (route.query.hasOwnProperty('id')) {
          const param = {
            id: route.query.id,
          };
          const device = await devDetail(param);
          renderMarker([device], myMap);
        }

        // document.getElementById("gmap").onclick = () => {
        //   visible.value = false;
        // };
      };
      const renderMarker = (markList, map) => {
        if (markerList && markerList.length > 0) {
          markerList.forEach((f) => {
            f.setMap(null);
          });
          markerList = [];
        }
        markList.forEach((f) => {
          const marker = new gMap.Marker({
            position: { lat: parseFloat(f.latitude), lng: parseFloat(f.longitude) },
            icon: carImg,
            // icon:  require('../../../assets/images/car.png'),
            // 不写icon默认为旗标图标
            // 引用本地图片使用require
            map: map,
          });
          marker._data = f;
          console.log(marker);
          marker.addListener('click', function () {
            // clearInterval(timer.value)
            // $bus.emit("DEV_LIST_FINISH", deviceList);
            $bus.emit('SELECT_DEV', { marker, deviceList });
            visible.value = true;
            cacheProgress = 0;
            count = 0;
            renderInfoWindow(this);
          });
          markerList = [...markerList, marker];
        });
      };

      const startPlayback = (devSn) => {
        if (!devSn) return;
        if (flightPath && flightPath.visible) {
          flightPath.setMap(null);
        }
        if (infoWindow.anchor && infoWindow.anchor.visible) {
          infoWindow.close();
        }
        getGpsListByDevSn({ devSn }).then((res) => {
          if (!res || res.length === 0) return;
          const lineCoordinates = res.map((m) => new gMap.LatLng(m.lat, m.lon));

          var lineSymbol = {
            path: gMap.SymbolPath.FORWARD_CLOSED_ARROW,
            // scale: 2,
            strokeColor: '#f00',
          };

          flightPath = new gMap.Polyline({
            path: lineCoordinates,
            strokeColor: '#999', // 线条颜色
            icons: [
              {
                icon: lineSymbol,
                offset: '0%',
              },
            ],
            // map: unref(myMap),
          });
          flightPath.setMap(myMap);
          animateCircle(flightPath, 0, config.count, config.interval);
        });

        function animateCircle(line, progress = 0, space = 5, sleep = 300) {
          var icons = line.get('icons');
          timer = setInterval(() => {
            count = (count + 1) % (100 * space);
            cacheProgress = count;
            icons[0].offset = `${count / space}%`;
            line.set('icons', icons);
          }, sleep);
          /*
      if((count / 2)>=99){
          clearInterval(animate1);
      }
      */
        }
      };

      const renderInfoWindow = (ctx) => {
        if (infoWindow.anchor && infoWindow.anchor.visible) {
          infoWindow.close();
        }
        const { _data: info } = ctx;
        var contentString = `
        <div>
          <div class='mb-2'> <span>${t('view.main.gis.info.deviceGroup')}:</span> <span>${
          info.orgName || ''
        }</span> </div>
          <div class='mb-2'> <span >${t('view.main.gis.info.time')}:</span> <span class='mr-5'>${
          info.loginTime || ''
        }</span> <span>${t('view.main.gis.info.speed')}:</span> <span>${info.speed || ''}${t(
          'view.main.gis.info.speedUnit',
        )}</span> </div>
          <div class='mb-2'> <span >${t('view.main.gis.info.mileage')}:</span> <span class='mr-5'>${
          info.mileage || ''
        }${t('view.main.gis.info.mileageUnit')}</span> <span>${t(
          'view.main.gis.info.todayMileage',
        )}:</span> <span>${info.todayMileage || ''}${t(
          'view.main.gis.info.mileageUnit',
        )}</span> </div>
          <div class='mb-2'> <span>${t('view.main.gis.info.devSn')}:</span> <span>${
          info.devSn || ''
        }</span> </div>
          <div class='mb-2'> <span>${t('view.main.gis.info.devSerialNo')}:</span> <span>${
          info.devSerialNo || ''
        }</span> </div>
          <div class='mb-2'> <span>${t('view.main.gis.info.location')}:</span> <span>${
          info.address || ''
        }</span> </div>
          <div class='mb-2'> <span>${t('view.main.gis.info.devStatus')}:</span> <span>${
          info.online || ''
        },${info.signalType},${info.signalQuality || ''}</div>
          <div class='mb-2'> <span>${t('view.main.gis.info.numberofSatellites')}:</span> <span>${
          info.satellites || ''
        }</span> </div>
          <div> <img style='margin:0 4px 10px' id='dev${info.devSn || ''}' data-name=${
          info.orgName || ''
        } src=${startPlayImg} width='30' height='30'/> </div>
       </div>`;
        infoWindow = new gMap.InfoWindow({
          content: contentString,
        });
        gMap.event.addListener(infoWindow, 'closeclick', () => {
          visible.value = false;
          infoWindow.close();
        });
        infoWindow.open(myMap, ctx);
        // nextTick(() => {
        setTimeout(() => {
          const oEle = document.getElementById(`dev${info.devSn}`);
          (oEle as Element).onclick = (e) => {
            visible.value = true;
            cacheProgress = 0;
            count = 0;
            clearInterval(timer);
            startPlayback(info.devSn);
          };
        }, 500);
        // });
      };
      onMounted(() => {});

      return { center, handler, visible };
    },
  });
</script>

<style lang="less" scoped>
  .gmap-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .control-panel {
      display: flex;
      position: absolute;
      z-index: 999;
      top: 4px;
      left: 4px;
      justify-content: center;
      width: 300px;
      height: 100%;
      padding: 10px 20px;
      border-radius: 5px;
      background-color: #4b565f;
      box-shadow: 0 15px 15px rgb(0 0 0 / 10%);

      .ant-tabs {
        width: 100%;
      }
    }

    .device-list {
      position: absolute;
      z-index: 999;
      top: 12px;
      right: 36px;
      padding: 10px 20px;
      // width: 300px;
      // height: calc(100% - 10px);
      // background-color: #fff;
      // border-radius: 5px;
      // box-shadow: 0 15px 15px rgba(0, 0, 0, 0.1);
      // display: flex;
      // justify-content: center;
    }
  }
</style>
