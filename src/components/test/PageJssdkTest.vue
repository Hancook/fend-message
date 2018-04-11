<template>
  <div>
    <div class="weui-cells__title">企业会话</div>
    <div class="weui-cells weui-cells_checkbox">
      <label class="weui-cell weui-check__label" v-for="user in users">
        <div class="weui-cell__hd">
          <input type="checkbox" class="weui-check" name="selectUserIds" :value="user.userId"
                 v-model="selectUserIds">
          <i class="weui-icon-checked"></i>
        </div>
        <div class="weui-cell__bd">
          <p>{{user.name}}</p>
        </div>
      </label>
    </div>


    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="openEnterpriseChat">开启企业会话</a>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="scanQRCode">测试扫一扫</a>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:" @click="closeWindow">关闭窗口</a>
    </div>


    <div class="weui-cells__title">地理位置</div>

    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">latitude</label>
      </div>
      <div class="weui-cell__bd">
        <input class="weui-input" placeholder="latitude" v-model="latitude">
      </div>
      <div class="weui-cell__ft">
        <button class="weui-vcode-btn" @click="resetLocation()">重置</button>
      </div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">longitude</label>
      </div>
      <div class="weui-cell__bd">
        <input class="weui-input" placeholder="longitude" v-model="longitude">
      </div>
      <div class="weui-cell__ft">
        <button class="weui-vcode-btn" @click="getLocation()">定位</button>
      </div>
    </div>

    <div class="weui-cell">
      <div class="weui-cell__hd">
        <label class="weui-label">坐标类型</label>
      </div>
      <div class="weui-cell__bd">
        <select class="weui-select" name="locationType" v-model="locationType">
          <option :value="lt.value" v-for="lt in locationTypes" v-text="lt.name"></option>
        </select>
      </div>
    </div>

    <div class="weui-btn-area">
      <a class="weui-btn weui-btn_primary" href="javascript:"
         @click="openLocation({latitude,longitude})">openLocation</a>
    </div>


    <!--有问题-->
    <div class="weui-btn-area" v-show="false">
      <a class="weui-btn weui-btn_primary" href="javascript:"
         @click="share">分享</a>
    </div>


  </div>
</template>

<script>
  import {wx, isWx} from 'st_wx'
  import {mapGetters} from 'vuex'
  import {catchAxiosError} from "../../utils/common"
  import types from '../../store/global/types'
  import {Toast} from 'mint-ui'

  const users = [
    {name: '王豪', userId: '0333aba5a87f4531870caa2a38046797',},
    {name: '阮笛沛', userId: '5750b23a-4e4f-4ab4-be00-ddf8784f2fd8'},
    {name: '程小龙', userId: '320f44031a60437caabe19cf93315e78'},
  ]

  const defaultLocation = {
    latitude: 30.51092,
    longitude: 114.36396,
  }

  const locationTypes = [
    {
      value: 'gcj02',
      name: 'gcj02 火星坐标 openLocation 用',
    },
    {
      value: 'wgs84',
      name: 'wgs84 gps坐标',
    },
  ]

  export default {
    name: 'PageJssdkTest',
    data() {
      return {
        users,
        selectUserIds: users.map(u => u.userId),
        latitude: 30.51346,
        longitude: 114.3583,
        location: {},
        locationType: locationTypes[0].value,
        locationTypes,
      }
    },
    methods: {
      share() {
        const vm = this
        wx.onMenuShareWechat({
          title: '分享标题', // 分享标题
          desc: '分享描述', // 分享描述
          link: '分享链接', // 分享链接
          imgUrl: '分享图标', // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
          }
        });
      },
      resetLocation() {
        const vm = this
        vm.latitude = defaultLocation.latitude
        vm.longitude = defaultLocation.longitude
      },
      getLocation(complete) {
        const vm = this
        wx.getLocation({
          type: vm.locationType, // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function (res) {
            vm.location = res
            vm.latitude = vm.location.latitude
            vm.longitude = vm.location.longitude
            console.log('getLocation', JSON.stringify(res))
            complete && complete(true)
          },
          fail: function (res) {
            complete && complete(false)
            alert('获取地理位置失败')
            console.log('getLocation fail', res)
          }
        })
      },
      openLocation({latitude, longitude}) {
        latitude = parseFloat(latitude)
        longitude = parseFloat(longitude)
        wx.openLocation({
          latitude, // 纬度，浮点数，范围为90 ~ -90
          longitude, // 经度，浮点数，范围为180 ~ -180。
          name: '位置名', // 位置名
          address: '地址详情说明', // 地址详情说明
          scale: 28, // 地图缩放级别,整形值,范围从1~28。默认为16
        })
      },
      initJssdk() {
        const vm = this
        let url = location.href
        let {origin, pathname, search} = location
        // 企业微信不能加hash段，用 location.href
        url = origin + pathname + search
        const {corpId, agentType} = vm.vxGlobal_tokenData
//        console.log({corpId})
        vm.$axios.post('wx/jssdk', {url, corpId, agentType}).then(res => {
          const jssdk = res.data.data
          const config = {
            debug: !true,
            appId: jssdk.appId,
            timestamp: jssdk.timestamp,
            nonceStr: jssdk.nonceStr,
            signature: jssdk.signature,
            jsApiList: ['getLocation', 'scanQRCode', 'closeWindow', 'openEnterpriseChat', 'openLocation', 'onMenuShareWechat']
          }
          // alert(JSON.stringify({config}))
          wx.config(config)
        })
      },
      scanQRCode() {
        wx.scanQRCode({
          desc: 'scanQRCode desc',
          needResult: 0, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
          scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
          success: function (res) {
            // 回调
            alert('scanQRCode res:' + JSON.stringify(res))
          },
          error: function (res) {
            if (res.errMsg.indexOf('function_not_exist') > 0) {
              alert('版本过低请升级')
            }
          }
        });
      },
      closeWindow() {
        const vm = this
        wx.closeWindow()
      },
      openEnterpriseChat() {
        const vm = this
        wx.openEnterpriseChat({
          userIds: (vm.selectUserIds || []).join(';'),    // 必填，参与会话的成员列表。格式为userid1;userid2;...，用分号隔开，最大限制为2000个。userid单个时为单聊，多个时为群聊。
//          userIds: '5750b23a-4e4f-4ab4-be00-ddf8784f2fd8',    // 必填，参与会话的成员列表。格式为userid1;userid2;...，用分号隔开，最大限制为2000个。userid单个时为单聊，多个时为群聊。
          groupName: '学习交流组',  // 必填，会话名称。单聊时该参数传入空字符串""即可。
          success: function (res) {
            // 回调
          },
          fail: function (res) {
            if (res.errMsg.indexOf('function not exist') > -1) {
              alert('版本过低请升级')
            }
          }
        })
      },
    },
    created() {
      const vm = this
      vm.initJssdk()
    },
    computed: {
      ...mapGetters({
        vxGlobal_tokenData: types.GETTERS.tokenData,
        vxGlobal_agentType: types.GETTERS.agentType,
      }),
    },
  }
</script>

<style>
</style>
