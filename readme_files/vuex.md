# vuex 相关说明

- ### `mutations，getters，actions` 名称定义规则
  
  - 定义`types.js`文件
  
    ```javascript
    const namespace = 'app_study_diagnose/do_diagnose/'
    const namespace_do_status = namespace+'do_status/'
    
    export default {
      GETTERS: {
        paperData: namespace + 'paperData',
        paper: namespace + 'paper',
        sortedSubtypeQuestions: namespace + 'sortedSubtypeQuestions',
        DO_STATUS:{//做题状态
          curSubTypeQuestionIndex: namespace_do_status + 'curSubTypeQuestionIndex',
          hint: namespace_do_status + 'hint',
          answerMaps: namespace_do_status + 'answerMaps',
        },
    
      },
      ACTIONS: {
        loadPaperData: namespace + 'loadPaperData',
        loadPaperAnswerSheet: namespace + 'loadPaperAnswerSheet',
      },
      MUTATIONS: {
        setPaperData: namespace + 'setPaperData',
        setPaperAnswerSheet: namespace + 'setPaperAnswerSheet',
        DO_STATUS:{
          setCurSubTypeQuestionIndex: namespace_do_status + 'setCurSubTypeQuestionIndex',
          setAnswerMaps: namespace_do_status + 'setAnswerMaps',
          setHint: namespace_do_status + 'setHint',
          commitQuestionChoices: namespace_do_status + 'commitQuestionChoices',
        },
      }
    }
    ```
    > - 所有`mutations，getters，actions` 名称变量都在此声明，调用
    
    > - 定义`namespace`变量，变量值对应文件或者模块所在路径
    
    > - `mutations，getters，actions` 名称变量必须加上`namespace`前缀

  <br/>
  
  - 定义 入口文件 `index.js`
  
    ```javascript
      // 切记动态注册的组件 state 的初始数据要是通过方法临时生成的
      export default function () {
        const state = {
          // 当前选择的科目
          // [{"id": 37, "code": "M","name":"语文"}]
          jsonData: {
            subjects: [],//学科列表
          },
          // {"id": 37, "code": "M","name":"语文"}
          selectedSubject: null
        }
        return {
          state,
          actions,
          getters,
          mutations
        }
      }
    ```
  
  
  - 非全局状态管理的逻辑，抽离成模块，动态注册

    ```javascript
        //...vue instance
        {
          beforeCreate(){
            let vm = this
            vm.$store.registerModule(STORE_DO_DIAGNOSE, do_diagnose())
          }
          destroyed(){
            let vm = this
            vm.$store.unregisterModule(STORE_DO_DIAGNOSE)
          }
        }
    ```
