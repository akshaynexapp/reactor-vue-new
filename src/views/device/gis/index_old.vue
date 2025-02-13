<template>
  <div class="bmap-wrapper">
    <div ref="wrapRef" :style="{ height, width }"> </div>
    <div class="control-panel">
      <ControlPanel />
    </div>
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, unref, onMounted, h } from 'vue';
  import { useRoute } from 'vue-router';
  import InfoWindow from './InfoWindow.vue';
  import ControlPanel from './ControlPanel.vue';
  import { useScript } from '/@/hooks/web/useScript';

  const BAI_DU_MAP_URL =
    'https://api.map.baidu.com/getscript?v=3.0&ak=5Ulk0Mq3ZWMxYrXIHl1ZEePYd9REDhjV&services=&t=20210201100830&s=1';
  export default defineComponent({
    name: 'BaiduMap',
    components: {
      InfoWindow,
      ControlPanel,
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
      const route = useRoute();
      const wrapRef = ref<HTMLDivElement | null>(null);
      const { toPromise } = useScript({ src: BAI_DU_MAP_URL });

      const markerList = [
        { name: '����', log: '113.23', lat: '23.16' },
        { name: '����', log: '113.19', lat: '23.4' },
        { name: '��ʮ', log: '114.2', lat: '24.09' },
        { name: '����', log: '113.81', lat: '23.13' },
        { name: '�ӻ�', log: '113.55', lat: '23.57' },
        { name: '����', log: '114.25', lat: '23.75' },
        { name: '��خ', log: '113.36', lat: '22.95' },
        { name: '����', log: '110.35', lat: '20.02' },
        { name: '��ͷ', log: '116.69', lat: '23.39' },
        { name: '�齭', log: '110.38', lat: '21.2' },
        { name: 'ï��', log: '110.88', lat: '21.68' },
        { name: '��ɽ', log: '113.11', lat: '23.05' },
        { name: '����', log: '113.06', lat: '22.61' },
        { name: '����', log: '114.07', lat: '22.62' },
        { name: '����', log: '113.85', lat: '22.58' },
        { name: '�麣', log: '113.52', lat: '22.3' },
        { name: '�ع�', log: '113.62', lat: '24.84' },
        { name: '����', log: '113.58', lat: '24.68' },
        { name: '�ֲ�', log: '113.35', lat: '25.14' },
        { name: '�ʻ�', log: '113.73', lat: '25.11' },
        { name: '����', log: '114.33', lat: '25.14' },
        { name: 'ʼ��', log: '114.08', lat: '24.78' },
        { name: '��Դ', log: '114.13', lat: '24.36' },
        { name: '���', log: '113.52', lat: '23.86' },
        { name: 'Ӣ��', log: '113.38', lat: '24.17' },
        { name: '��Զ', log: '113.01', lat: '23.7' },
        { name: '��ɽ', log: '112.65', lat: '24.48' },
        { name: '����', log: '112.4', lat: '24.77' },
        { name: '��ɽ', log: '112.07', lat: '24.59' },
        { name: '����', log: '112.28', lat: '24.77' },
        { name: '����', log: '114.4', lat: '23.09' },
        { name: '����', log: '114.4', lat: '23.09' },
        { name: '����', log: '114.28', lat: '23.18' },
        { name: '��Դ', log: '114.68', lat: '23.73' },
        { name: '��ƽ', log: '114.48', lat: '24.39' },
        { name: '��ƽ', log: '114.89', lat: '24.45' },
        { name: '����', log: '115.25', lat: '24.09' },
        { name: '�Ͻ�', log: '115.18', lat: '23.64' },
        { name: '�ݶ�', log: '114.7', lat: '22.97' },
        { name: '��ݸ', log: '113.75', lat: '23.04' },
        { name: '÷��', log: '116.1', lat: '24.55' },
        { name: '÷��', log: '116.1', lat: '24.55' },
        { name: 'ƽԶ', log: '117.9', lat: '24.59' },
        { name: '����', log: '116.18', lat: '24.66' },
        { name: '����', log: '116.7', lat: '24.34' },
        { name: '��˳', log: '116.18', lat: '23.78' },
        { name: '�廪', log: '115.75', lat: '23.93' },
        { name: '����', log: '115.75', lat: '24.15' },
        { name: '����', log: '116.63', lat: '23.68' },
        { name: '�κ�', log: '116.8', lat: '23.48' },
        { name: '����', log: '116.63', lat: '23.68' },
        { name: '��ƽ', log: '117.01', lat: '23.7' },
        { name: '�ϰ�', log: '117.03', lat: '23.44' },
        { name: '����', log: '116.61', lat: '23.27' },
        { name: '����', log: '116.29', lat: '23.07' },
        { name: '½��', log: '117.64', lat: '22.95' },
        { name: '����', log: '117.33', lat: '22.98' },
        { name: '����', log: '116.17', lat: '23.29' },
        { name: '����', log: '115.82', lat: '23.45' },
        { name: '����', log: '116.35', lat: '23.55' },
        { name: '�Ϻ�', log: '113.11', lat: '23.05' },
        { name: '��ˮ', log: '112.89', lat: '23.18' },
        { name: '˳��', log: '113.24', lat: '22.84' },
        { name: '��ɽ', log: '113.38', lat: '22.52' },
        { name: '����', log: '113.25', lat: '22.2' },
        { name: '�»�', log: '113.02', lat: '22.52' },
        { name: '��ɽ', log: '112.94', lat: '22.76' },
        { name: '��ƽ', log: '112.68', lat: '22.36' },
        { name: '̨ɽ', log: '112.78', lat: '22.27' },
        { name: '��ƽ', log: '112.29', lat: '22.21' },
        { name: '����', log: '112.76', lat: '21.71' },
        { name: '����', log: '110.27', lat: '21.63' },
        { name: '����', log: '110.59', lat: '21.64' },
        { name: '����', log: '110.83', lat: '21.95' },
        { name: '����', log: '110.9', lat: '22.36' },
        { name: '����', log: '111.78', lat: '22.16' },
        { name: '����', log: '111.95', lat: '21.85' },
        { name: '���', log: '110.99', lat: '21.52' },
        { name: '�⴨', log: '110.78', lat: '21.43' },
        { name: '����', log: '110.17', lat: '20.34' },
        { name: '����', log: '110.07', lat: '20.91' },
        { name: '��Ϫ', log: '110.24', lat: '21.39' },
        { name: '����', log: '112.44', lat: '23.05' },
        { name: '��Ҫ', log: '112.44', lat: '23.05' },
        { name: '����', log: '112.18', lat: '23.93' },
        { name: '����', log: '112.43', lat: '23.14' },
        { name: '�Ļ�', log: '112.68', lat: '23.36' },
        { name: '����', log: '112.2', lat: '22.68' },
        { name: '�Ƹ�', log: '112.02', lat: '22.93' },
        { name: '�޶�', log: '111.56', lat: '22.77' },
        { name: '����', log: '111.51', lat: '23.23' },
        { name: '����', log: '111.75', lat: '23.15' },
        { name: '�⿪', log: '111.48', lat: '23.45' },
      ];

      async function initMap() {
        await toPromise();
        await nextTick();
        const wrapEl = unref(wrapRef);
        if (!wrapEl) return;
        const BMap = (window as any).BMap;
        const map = new BMap.Map(wrapEl);
        const { longitude, latitude } = route.query;
        console.log(longitude, latitude);
        const point = new BMap.Point(longitude, latitude);
        map.centerAndZoom(point, 15);
        map.enableScrollWheelZoom(); // ���ù��ַŴ���С

        var geoc = new BMap.Geocoder();
        // map.addEventListener('click', function (e) {
        //   console.log(e);
        //   var pt = e.point;
        //   geoc.getLocation(pt, function (rs) {
        //     console.log(rs);
        //     var addComp = rs.addressComponents;
        //     alert(
        //       addComp.province +
        //         ', ' +
        //         addComp.city +
        //         ', ' +
        //         addComp.district +
        //         ', ' +
        //         addComp.street +
        //         ', ' +
        //         addComp.streetNumber,
        //     );
        //   });
        // });
        const myIcon = new BMap.Icon('/src/assets/images/car.png', new BMap.Size(52, 26));
        //  ����Marker��ע��ʹ��С��ͼ��
        //  ����λ���ӵ���¼�
        function addClickHandler(marker, i) {
          // console.log(marker);
          marker.addEventListener('click', function (e) {
            // console.log(e);
            openInfo(e, i);
          });
        }
        //����Ϣ����
        function openInfo(e, i) {
          var p = e.target;
          var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
          point.name = p.name;
          let address = '';
          let sContent = '';
          const opts = {
            width: 432,
            // height: 200,
            // title: '00000000000',
            enableMessage: true,
          };
          geoc.getLocation(point, function (rs) {
            address = '';
            console.log(rs);
            var addComp = rs.addressComponents;
            address =
              addComp.province +
              ', ' +
              addComp.city +
              ', ' +
              addComp.district +
              ', ' +
              addComp.street +
              ', ' +
              addComp.streetNumber;
            console.log(address);
            sContent = `
        <div>
          <h4>01032989241</h4>
          <div> <span>��˾:</span> <span>${point.name}��˾</span> </div>
          <div> <span >ʱ��:</span> <span class='mr-5'>2022-02-27 18��05��39</span> <span>�ٶ�:</span> <span>0����/ʱ(��)</span> </div>
          <div> <span >���:</span> <span class='mr-5'>106326.4����</span> <span>�������:</span> <span>135.9����</span> </div>
          <div> <span>�豸��:</span> <span>01422244(����)</span> </div>
          <div> <span>�豸���к�:</span> <span>H000001</span> </div>
          <div> <span>��ַ:</span> <span>${address}</span> </div>
          <div> <span>״̬:</span> <span>����,4G,ACC�ر�,ͣ��( 3ʱ14��22��),IO״̬λ:</span> </div>
          <div class='mb-5'> <span>����״̬������:</span> <span>15�������ź���</span> </div>
          <div> <img style='margin:0 4px 22px' id='imgDemo-${i}' data-name=${point.name} src='/src/assets/images/tianAnMen.jpg' width='40' height='40'/> </div>
       </div>`;
            const data = {
              sContent,
              opts,
            };

            var infoWindow = new BMap.InfoWindow(data.sContent, data.opts); // ������Ϣ���ڶ���
            map.openInfoWindow(infoWindow, point); //������Ϣ����
            // �жϴ��ڵĴ�״̬
            if (!infoWindow.isOpen()) {
              //���û�д򿪣���������¼�����ȡ��ť�������¼�
              infoWindow.addEventListener('open', function () {
                document.getElementById('imgDemo-' + i).onclick = function (e) {
                  // console.log(e);
                  // alert('�ŵ��ţ�' + e.target.dataset.name);
                };
              });
            } else {
              //����Ѿ��򿪣�ֱ�ӻ�ȡ��ť�������¼�
              document.getElementById('imgDemo-' + i).onclick = function (e) {
                // console.log(e);
                // alert('�ŵ��ţ�' + e.target.dataset.name);
              };
            }
          });
        }

        markerList.forEach(async (f, i) => {
          const pt = new BMap.Point(f.log, f.lat);
          const marker = new BMap.Marker(pt, {
            icon: myIcon,
          });
          marker.name = f.name;
          // ����ע���ӵ���ͼ
          map.addOverlay(marker);

          addClickHandler(marker, i + 1);
        });
      }
      //   const infoWindow = new BMap.InfoWindow(sContent, opts);
      //   // �������ӵ���¼�
      //   marker.addEventListener('click', function () {
      //     map.openInfoWindow(infoWindow, point); // ������Ϣ����
      //   });
      // });

      // map.enableScrollWheelZoom(true);
      // new BMap.Map(wrapEl, {
      //   zoom: 11,
      //   center: [116.397428, 39.90923],
      //   viewMode: '3D',
      // });

      onMounted(() => {
        initMap();
      });

      return { wrapRef };
    },
  });
</script>

<style lang="less" scoped>
  .bmap-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    .control-panel {
      display: flex;
      position: absolute;
      z-index: 999;
      top: 0;
      left: 2px;
      justify-content: center;
      width: 280px;
      height: 100%;
      padding: 10px 20px;
      border-radius: 5px;
      background-color: #fff;
      box-shadow: 0 15px 15px rgb(0 0 0 / 10%);
    }
  }

</style>