<template>
  <div class="sp_page bodyBg">

    <div class="bigPanel bigPanel-bg">

      <div class="panel-head"><h4>课堂签到</h4></div>

      <div class="panel-body">
        <dl class="dl-horizontal" v-if="course">
          <dt>课程名：</dt>
          <dd>{{course.siteName}}</dd>

          <dt>主讲人：</dt>
          <dd>{{course.teacherName}}</dd>

          <dt>时间段：</dt>
          <dd>{{course.startTime|sd_date_mdhM}} ~ {{course.endTime|sd_date_mdhM}}</dd>

        </dl>

        <p class="msg-error"
           v-show="course===null&&signing===false" ref="errorMsg">
        </p>

      </div>

      <div class="panel-footer">
        <!--:class="{'weui-btn_disabled':!canSign}"-->
        <a href="javascript:;" class="weui-btn weui-btn_primary"
           @click="clickSign"
           style="visibility: hidden;"
           :class="{'weui-btn_disabled':true}" v-if="!isSigned">
          签到中
        </a>
        <a href="javascript:;" class="weui-btn weui-btn_primary"
           v-else>
          <span class="iconfont icon-chenggong"></span>
          已签到
        </a>
        <p class="time text-center" :class="{'unvisiable':!isSigned}">
          签到时间：
          <template v-if="isSigned">
            {{signed.signTime|sd_date}}
          </template>
        </p>
      </div>

    </div>

    <!--<transition name="fade">-->
    <!--<div class="weui-msg_img hide" v-show="showSuccess==true">-->
    <!--<div class="weui-msg_com">-->
    <!--<div @click="showSuccess=false" class="weui-msg_close"><i class="weui-icon weui-icon-clear"></i></div>-->
    <!--<div class="weui-msg_src">-->

    <!--</div>-->
    <!--<div class="weui-msg_srt">-->

    <!--</div>-->
    <!--<div class="weui-msg-box">-->
    <!--<div class="text-center">-->
    <!--<span class="iconfont icon-chenggong1"></span>-->
    <!--</div>-->
    <!--<div class="weui-msg_title">签到成功</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</div>-->
    <!--</transition>-->


    <loading-toast v-model="loading"/>

  </div>
</template>
<script>

  import Vue from 'vue'
  //  import {wx, isWx} from '../_common/st_wx'
  import {wx, isWx} from 'st_wx'
  import {catchAxiosError} from "../../utils/common"

  import {mapGetters} from 'vuex'
  import types from '../../store/global/types'
  import {Toast} from 'mint-ui'

  export default {
    name: 'Sign',
    props: {
      // 是否自动签到
      isAutoSign: {
        type: Boolean,
        require: false,
      },
      courseId: {
        type: String,
        require: false
      },
      pushLocation: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        signing: null,
        location: null,
        fetchingLocation: null,
        signed: null, // 已签到数据
        course: null,
        fetchingCourse: null,
        showSuccess: null
      }
    },
    created() {
      const vm = this
      vm.initJssdk()
      vm.sign()
    },
    methods: {
      clickSign() {
        const vm = this
        if (!!vm.isSigned) {
//          alert('你已经签到')
          return
        }
        vm.sign()
      },
      sign() {
        const vm = this
        vm.signing = true
        if (isWx && vm.pushLocation) {
          vm.getLocation(success => {
            vm.fetchSign((successSign) => {
              vm.signing = false
            })
          })
        } else {
          vm.fetchSign((successSign) => {
            vm.signing = false
          })
        }
      },
      getLocationParams() {
        const vm = this
        const locationData = vm.location
        const locationParams = !!locationData ? {
          "signInAccuracy": locationData['accuracy'],
          "signInLatitude": locationData['latitude'],
          "signInLongitude": locationData['longitude'],
          "signInSpeed": locationData['speed']
        } : {}
        return locationParams;
      },
      getSignParams(locationParams) {
        const vm = this
        const signParams = {
          "siteId": vm.courseId,
//          "courseLocation": course['courseLocation'],
//          "courseName": course['courseName'],
//          "courseTime": course['courseTime'],
//          "courseTimeStr": course['courseTimeStr'],
          ...locationParams
        }
        return signParams;
      },
      fetchSign(complete) {
        const vm = this

        const locationParams = vm.getLocationParams();

        const signParams = vm.getSignParams(locationParams);
//        console.log({signParams})
        vm.$axios.post('signin', signParams).then(res => {
          const success = res.data.status == 0;
          if (success) {
            vm.showSuccess = true
            vm.handlerSignData(res.data.data)
          } else if (res.data.status == -4) { // 不在时间段内
            vm.$nextTick(() => vm.$refs['errorMsg'].innerText = '签到失败：该时间内没有对应的签到活动')
          } else if (res.data.status == -3) {// 已签到过
            vm.showSuccess = true
            vm.handlerSignData(res.data.data)
          } else {
            Toast('签到失败：' + (res.data.message || ''))
          }
          complete && complete(success)
        }).catch(res => {
          complete && complete(false)
          catchAxiosError(res, vm)
        })
      },
      handlerSignData(data) {
        const vm = this
        vm.signed = {
          signTime: data['signInTime'] || Date.now()
        }

        vm.course = {...data, finish: true}
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
            debug: false,
            appId: jssdk.appId,
            timestamp: jssdk.timestamp,
            nonceStr: jssdk.nonceStr,
            signature: jssdk.signature,
            jsApiList: ['getLocation', 'scanQRCode', 'closeWindow', 'openEnterpriseChat']
          }
          // alert(JSON.stringify({config}))
          wx.config(config)
        })
      },
      getLocation(complete) {
        const vm = this
        vm.fetchingLocation = true
        wx.ready(function () {
          wx.getLocation({
            type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
            success: function (res) {
              const latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
              const longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
              const speed = res.speed // 速度，以米/每秒计
              const accuracy = res.accuracy // 位置精度
              // console.log('getLocation:', JSON.stringify(res))
              vm.location = res
              vm.fetchingLocation = false
              complete && complete(true)
            },
            fail: function (res) {
              complete && complete(false)
              alert('获取地理位置失败')
              vm.fetchingLocation = false
              console.log('getLocation fail', res)
            }
          })
        })
        wx.error(function () {
          Toast('微信jssdk配置出错')
        })
      },
    },
    computed: {
      ...mapGetters({
        vxGlobal_tokenData: types.GETTERS.tokenData,
        vxGlobal_agentType: types.GETTERS.agentType,
      }),
      canSign() {
        const vm = this
        return !vm.isSigned && !!vm.course && !vm.signing
      },
      isSigned() {
        return _.property('course.finish')(this)
      },
      loading() {
        return this.signing || this.fetchingCourse || this.fetchingLocation
      },
    },
    components: {}
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s ease
  }

  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .unvisiable {
    visibility: hidden;
  }

  .msg-error {
    padding: 10px 20px;
  }
</style>
