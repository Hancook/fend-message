<template>
    <div>
      <div class="weui-navbar "
           style="bottom: 0px; z-index: 5; top: auto; border-top: 1px solid #ccc;position: fixed">
        <div class="weui-navbar__item"  v-for="tab in tabs"
             @click="curCompo=tab.compo"
             :class="{active:tab.compo==curCompo}">
          {{tab.name}}
        </div>
      </div>
      <keep-alive>
        <component :is="curCompo">
        </component>
      </keep-alive>
    </div>
</template>
<script>
  const tabs = [
    {
      name: '课程内容',
      compo: 'course_content',
    },
    {
      name: '我的作业',
      compo: 'my_homework',
    },
    {
      name: '学习交流',
      compo: 'study_discuss',
    }
  ]
    export default{
        name: 'study_index',
        data () {
            return {
                tabs,
              curCompo: tabs[0].compo,
            }
        },
        created () {
            const vm = this
        },
      components: {
        course_content: require('./PageShow.vue'),
        my_homework: require('./MyHomework/MyHomework.vue'),
        study_discuss: require('./SeminarIndex.vue'),
      }
    }
</script>
<style scoped="">
  .active {
    color: #3dd1ad;
  }
</style>
