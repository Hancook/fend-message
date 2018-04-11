<template>
  <div class="sp_page sp_page_scroll">
    <!--<p>点击题目对应发送按钮，即可发送调查问卷</p>-->
    <div class="sp_list_answer">
      <div class="sp_answer_item" v-for="(q,index) in questions">
        <p class="answer_item_title">{{index+1}}、{{q.title}}</p>
        <div class="answer_item_operate">
          <a class="answer_item_btn align_center" href="javascript:void(0);" :class="{disabled:!canSend(q)}"
             @click="clickSend(q)">
            {{q.sent?'已发送':(q.sending?'发送中':(q.sending===null?'发送':'重新发送'))}}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {catchAxiosError, cloneData, getStorageDataAndDecode, setStorageDataAndEncode} from "../../utils/common";
  import {LOCAL_STORAGE__SEND_QUES} from "../../utils/constants";
  import {Toast, MessageBox} from 'mint-ui'

  //  【课堂签到】信息时代的教育自信  内容为：请同学们签到；
  //  【课堂调查】信息时代的教育自信   内容为：请同学们填写一下问卷，所有的问题都没有对错之分。（可以多选）
  //  【课堂提问】信息时代的教育自信   内容为：请同学们回答下列问题。
  //  【课后提问】信息时代的教育自信   内容为：请同学们回答下列问题。
  const QUESTIONS = [
    {
      msgTitle: '【课堂调查】信息时代的教育自信',
      msgContent: '请同学们填写一下问卷，所有的问题都没有对错之分。（可以多选）',
      title: '【课堂调查】你选择成为华师师范生的原因是什么？',
      id: 1,
    },
    {
      msgTitle: '【课堂提问】信息时代的教育自信',
      msgContent: '请同学们回答下列问题。',
      title: '【课堂提问】你认为教育信息化对我国教育现代化的意义何在？',
      id: 2,
    },
    {
      msgTitle: '【课后提问】信息时代的教育自信',
      msgContent: '请同学们回答下列问题。',
      title: '【课后提问】你对我国教育信息化前景及自己未来的职业发展有什么想法？',
      id: 3,
    },
  ]

  function checkQuestionSendFromStorage(qId) {
    const sendQues = getStorageDataAndDecode(LOCAL_STORAGE__SEND_QUES) || []
    return sendQues.indexOf(qId) != -1
  }

  export default {
    name: 'AnswerPageSend',
    data() {
      let questions = cloneData(QUESTIONS)
      questions = _.map(questions, q => (
        {
          ...q,
          sent: checkQuestionSendFromStorage(q.id),
          sending: null,
        }
      ))
      return {
        questions,
      }
    },
    methods: {
      clickSend(question) {
        const vm = this

        if (!vm.canSend(question)) {
          return
        }

        MessageBox.confirm('确认发送?').then(action => {
          question.sending = true
          vm.fetchPost(question, success => {
            question.sending = false
            if (success) {
              question.sent = true
              vm.storeSent()
              Toast('发送成功')
            }
          })
        }).catch(error => {
        })

      },
      fetchPost(question, complete) {
        const vm = this
        const params = {
          "content": question.msgContent,
          "title": question.msgTitle,
          "urlParams": {
            "qIds": question.id
          }
        }
        vm.$axios.post('message/sendquestion', params).then(res => {
          const success = res.data.status == 0
          if (!success) {
            Toast('发送失败 ' + (res.data.status || ''))
          }
          complete && complete(success)
        }).catch(res => {
          complete && complete(false)
          catchAxiosError(res, vm)
        })
      },
      canSend(q) {
        return !q.sending && !q.sent
      },
      storeSent() {
        const vm = this
        const sendQues = vm.questions.filter(q => q.sent === true).map(q => q.id)
        setStorageDataAndEncode(LOCAL_STORAGE__SEND_QUES, sendQues)
      },
    },
    computed: {},
    created() {
      const vm = this
    },
    mounted() {
      const vm = this
      const height = vm.$$el.height() / 3
      console.log('height:', height)
      vm.$$el.find('.sp_answer_item').height(height)
    },
    beforeCreate() {
      const vm = this
      if (vm.$route.meta['resetSent'] === true) {
        setStorageDataAndEncode(LOCAL_STORAGE__SEND_QUES, '')
        vm.$router.replace('answer_send')
      }
    },
  }
</script>

<style type="text/less" lang="less">
  .sp_list_answer {
    width: 100%;
  }

  .sp_answer_item {

    &:nth-of-type(3n+1) {
      background-color: #BEF1EC;
    }
    &:nth-of-type(3n+2) {
      background-color: #F1D7BE;
    }
    &:nth-of-type(3n+3) {
      background-color: #BED1F1;
    }
  }

  .sp_answer_item {
    position: relative;

    .answer_item_title {
      position: absolute;
      width: 100%;
      top: 20px;
      left: 0;
      font-size: 17px;
      font-weight: bold;
      text-align: center;
      padding: 7px;
      box-sizing: border-box;
    }

    .answer_item_operate {
      text-align: center;
      margin-top: 20px;
      position: absolute;
      width: 100%;
      bottom: 30px;
      left: 0;
      box-sizing: border-box;
    }

    .answer_item_btn {
      font-size: 12px;
      color: #fff;
      display: inline-block;
      padding: 5px 30px;
      background-color: #29BC4F;
      border-radius: 15px;
      text-align: center;
      margin: 0 auto;
      &:active {
        opacity: 0.8;
      }
      &.disabled {
        /*background-color: lighten(#29BC4F, 20%);*/
        background-color: #9e9e9e;
        &:active {
          opacity: 1;
        }
      }
    }
  }


</style>
