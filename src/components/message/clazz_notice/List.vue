<template>

  <paging :fetch-page-data="fetchPageData" class="weui-cells weui-cells-list">

    <slot></slot>

    <template slot="item" scope="props">
      <template v-for="msg in {__:props.item.message}">

        <router-link class="weui-cell" :to="'/main/message/'+msg.id" :class="{'active':props.item.hasRead}">
          <div class="weui-cell__hd">
            <p class="msg-hd">
              <span class="msg-name" v-text="msg.senderName">江海欧</span>
              <span class="msg-time">{{msg.createTime | sd_date}}</span>
            </p>
            <template v-for="titles in {__:splitTitle(msg.title)}">
              <p class="msg-bd">
                <template v-if="titles[0]">
                  【<span :class="[getTypeClazz(titles[0])]" v-text="titles[0]"
                         :title="msg.messageType">作业通知</span>】
                </template>
                {{titles[1]}}
              </p>
            </template>
          </div>
        </router-link>

      </template>
    </template>

  </paging>

</template>

<script>
  import {Toast} from 'mint-ui'
  import {catchAxiosError, splitTitle} from "../../../utils/common"
  import {getTypeClazz} from "../utils";
  import paging from "../../_common/Paging.vue"

  export default {
    name: 'ClazzNoticeList',
    data() {
      return {}
    },
    methods: {
      splitTitle, getTypeClazz,
      fetchPageData(pageParams, complete) {
        const vm = this
        const params = {
          ...pageParams,
        }
        vm.$axios.get(`message/records`, {params}).then(res => {
          const success = res.data.status == 0
          if (!success) {
            Toast('获取通知公告失败' + (res.data.message || ''))
          }
          complete && complete(success, res.data.data)
        }).catch(res => {
          complete && complete(false, null)
          catchAxiosError(res, vm)
        })
      },
    },
    created() {
    },
    computed: {},
    components: {paging,}
  }
</script>

<style>
</style>
