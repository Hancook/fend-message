<template>
  <div class="sel_course_div">
    <div v-show="getIframe">
      <div class="weui-panel__hd"
           style="overflow:hidden;background-color: #3dd2ad;color: white;line-height:2.0rem;"><span
        class="spoc_curCourseName">当前课程：{{this.$route.query.siteName}}</span>
        <a href="javascript:history.go(-1)" class="spoc_seminar_select">
          选择课程
          <span class=sel_course_icon>
             <img src="../../../static/images/more.png" alt="">
       </span>
        </a>
      </div>

      <div class="weui-panel">
        <div class="weui-panel__hd">课程章节</div>
        <div class="weui-panel__bd">
          <div class="weui-media-box weui-media-box_small-appmsg" v-show="!loadingShow">
            <div class="weui-cells sd_left_area_workbook">
              <el-tree :props="defaultProps"
                       :load="loadNode1"
                       :highlight-current=true
                       :expand-on-click-node="true"
                       lazy
                       @check-change="handleCheckChange"
                       @node-click="handleNodeClick"></el-tree>
            </div>
          </div>
        </div>
      </div>
      <div class="weui-loadmore" v-show="loadingShow">
        <i class="weui-loading"></i>
        <span class="weui-loadmore__tips">正在加载</span>
      </div>
      <!--弹层-->
      <!--<div class="js_dialog" v-if="detailDialog">-->
      <!--<div class="weui-mask" @click="detailDialog=false"></div>-->
      <!--<div class="weui-dialog weui-skin_android">-->
      <!--<iframe :src="iframeUrl">-->
      <!--<p>您的浏览器不支持  iframe 标签。</p>-->
      <!--</iframe>-->
      <!--<div class="weui-dialog__ft">-->
      <!--<a class="weui-dialog__btn weui-dialog__btn_primary" @click="detailDialog=false">知道了</a>-->
      <!--</div>-->
      <!--</div>-->
      <!--</div>-->
    </div>
    <div class="iframe" v-if="!getIframe">
      <iframe :src="iframeUrl" class="course_iframe" frameBorder=0 id="frame">
        <p>您的浏览器不支持 iframe 标签。</p>
      </iframe>
      <!--<span>刷新</span>-->
      <button @click="getIframe=true" class="iframe_close_btn">关闭</button>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {catchAxiosError} from "../../utils/common";
  import {Toast} from 'mint-ui'
  import {Button, Select, Tree} from 'element-ui'
  import {ENV_CONFIG} from '../../utils/constants'

  Vue.component(Button.name, Button)
  Vue.component(Select.name, Select)
  Vue.component(Tree.name, Tree)
  //
  //  function _transformTreeData(originData, newData) {
  //
  //  }

  export default {
    name: 'CoursePageShow',
    data() {
      return {
        getIframe: true,
        navbarChoose: 0,
        treeData: null,
        iframeUrl: null,
        loadingShow: true,
        detailDialog: false,
        nodeListOne: null,
        currentToken: null,//用户token
        defaultProps: {
          children: 'zones',
          label: 'resourceName',
          isLeaf: function (data, node) {
            if (data.hasChildNode == '0' && data.resourceAttachmentList.length == 0) {
              return true
            } else {
              return false
            }

          }
        },
      }

    },
    methods: {
      getResList(nodeResData) {
        return nodeResData.resourceAttachmentList.filter(item=>!!item.attachment).map(item => {
          return {
            "fatherNodeId": '111',
            "hasChildNode": '0',
            "hasFatherNode": null,
            "id": '111',
            "isdelete": null,
            "level": nodeResData.level,
            "recommendLearnTime": null,
            "resourceAttachmentList": [],
            "resourceName": '[资源]' + item.attachment.attachmentName,//此项作为节点名字传值
            "ext": item.attachment.ext,
            "resourceType": null,
            "resourceVisible": null,
            "siteId": item.siteResourceId,//此项作为siteResourceId传值
            "teachingPlanId": item.attachmentInfoId,//此项作为achmentId传值
          }
        })

      },
      loadNode1(node, resolve) {
//          console.log(node)
//        console.log(resolve)
        const vm = this
        const params = {			//#路径参数 课程Id
          parentNodeId: null,//#请求参数 父节点id
          level: 0,//#节点层数
        }
        vm.$axios.get(`site/${this.$route.query.siteid}/nodes`, {params}).then(res => {
          if (res.status == 200) {
            vm.nodeListOne = res.data.data.nodeList
            vm.loadingShow = false
//            console.log(vm.nodeListOne)
            if (node.level === 0) {
              return resolve(vm.nodeListOne);
            } else {
              var hasChild;
              if (node.data.hasChildNode === '1' || node.data.resourceAttachmentList.length > 0) {
                hasChild = true;
              } else {
                hasChild = false;
              }
              setTimeout(() => {
                var data;
                if (hasChild) {
                  const vm = this
                  const params = {
                    parentNodeId: node.data.id,//#请求参数 父节点id
                    level: node.data.level + 1,//#节点层数
                  }
                  vm.$axios.get(`site/${this.$route.query.siteid}/nodes`, {params}).then(res => {
                    if (res.status == 200) {
//              vm.nodeListOne=res.data.data.nodeList
//                      console.log(res.data.data.nodeList)
                      data = res.data.data.nodeList
                      data = data.concat(vm.getResList(node.data))
//                      console.log(vm.getResList(node.data))
//                      console.log(data)
                      resolve(data);
                    } else {
                      Toast('获取通知公告失败' + (res.data.message || ''))
                    }
                  }).catch(res => {
                    catchAxiosError(res, vm)
                  })
//            data = [{
//              name: 'zone' + this.count++
//            }, {
//              name: 'zone' + this.count++
//            }];
                } else {
                  data = [];
                  resolve(data);
                }
//                console.log(data)

              }, 500);
            }

//            if (node.level > 1) return resolve([]);

          } else {
            vm.loadingShow = false
            Toast('获取通知公告失败' + (res.data.message || ''))
          }
        }).catch(res => {
          catchAxiosError(res, vm)
        })


//        else {
//          hasChild = Math.random() > 0.5;
//        }


      },
      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },
      handleNodeClick(data) {
//        console.log(data)
        const vm = this
//        console.log("判断", data.id === '111' && vm.currentToken)
//        console.log('ENV_CONFIG.spocBaseUrl', ENV_CONFIG.spocBaseUrl)
        if (data.id === '111' && vm.currentToken) {
          if (data.ext == 'swf' || data.ext == 'impp') {
//              console.log(data)
            Toast('该资源暂时无法查看')

          } else {
            vm.getIframe = false
            var url = ENV_CONFIG.spocBaseUrl + "filePreview/" + data.teachingPlanId + '?siteResourceId=' + data.siteId + '&token=' + vm.currentToken
//            console.log(url)
            vm.detailDialog = true
//          const params = {
//            siteResourceId: data.siteId,
//            token: vm.currentToken,
//          }
            vm.iframeUrl = url
          }
//          console.log(data)

//          var url = 'http://starmooc.nercel.cn/starmooc/filePreview/'+data.teachingPlanId+'?siteResourceId'+data.siteId+'&token'+vm.currentToken
//          const loginComplete = () => {
//            window.location.href = '/'
//          }
//          const $iframe = $('<iframe>').attr('src', 'http://www.runoob.com').appendTo($(document.body))
//          $iframe.on('load', loginComplete)
//          setTimeout(loginComplete, 10 * 1000)
//          vm.$axios.get(`http://starmooc.nercel.cn/starmooc/filePreview/${data.teachingPlanId}`, {params}).then(res => {
//            if (res.status == 200) {
//              const loginComplete = () => {
//                window.location.href = '/'
//              }
////              const $iframe = $('<iframe style="display: none;">').attr('src', `http://starmooc.nercel.cn/starmooc/filePreview/${data.teachingPlanId}?${siteResourceId=data.siteId}&${token=vm.currentToken}`).appendTo($(document.body))
////              $iframe.on('load', loginComplete)
////              setTimeout(loginComplete, 2 * 1000)
//            } else {
//              Toast('获取内容失败' + (res.data.message || ''))
//            }
//          }).catch(res => {
//            catchAxiosError(res, vm)
//          })
        }


      },

      obtainToken() {
        const vm = this
        const params = {
//            "code":1,
//            "msg":"请求成功",
//            "data":"60a1fbef-ee3b-495b-b071-2be295db4347"
        }
        vm.$axios.get(`resource/token`).then(res => {
          if (res.status == 200) {
            vm.token = res.data.data

            if (vm.token != null) {
              vm.currentToken = res.data.data

            } else {
              Toast('获取内容失败' + (res.data.msg || ''))
            }
//            console.log(res.data.data)
//                        console.log( vm.currentToken)
          } else {
            Toast('获取内容失败' + (res.data.msg || ''))
          }
        }).catch(res => {
          catchAxiosError(res, vm)
        })
      },
      fetchCourseTree() {
        const vm = this
        const params = {			//#路径参数 课程Id
          parentNodeId: null,//#请求参数 父节点id
          level: 0,//#节点层数
        }
        vm.$axios.get(`site/${this.$route.query.siteid}/nodes`, {params}).then(res => {
          if (res.status == 200) {
            vm.nodeListOne = res.data.data.nodeList
//            console.log(vm.nodeListOne)
          } else {
            Toast('获取通知公告失败' + (res.data.message || ''))
          }
        }).catch(res => {
          catchAxiosError(res, vm)
        })
      },
    },
    computed: {},
    created() {
      const vm = this
      vm.obtainToken()
    },
  }
</script>

<style scoped="">
  .active {
    color: #3dd1ad;
  }

</style>
