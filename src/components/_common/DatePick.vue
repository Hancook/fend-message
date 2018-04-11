<template>
  <!-- 日期选择器 -->
  <div style="display:inline-block">

    <span>创建日期:</span>
    <div class="block data_picker">

      <el-date-picker
        v-model="datePicker.startDate" type="date" placeholder="选择日期" format="yyyy-MM-dd"
        :picker-options="startDateConfig" @change="startDate">
      </el-date-picker>

      <span>—</span>

      <el-date-picker
        v-model="datePicker.endDate" type="date" placeholder="选择日期" format="yyyy-MM-dd"
        :picker-options="endDateConfig" @change="endDate">
      </el-date-picker>

    </div>

  </div>
</template>
<script>

  export default {
    name: 'DatePicker',
    data() {
      return {
        filter: {
          startDate: '',
          endDate: '',
        },
        datePicker: {
          startDate: '',
          endDate: '',
        },
      }
    },
    computed: {
      startDateConfig() {
        return {
          disabledDate(time) {
            return time.getTime() > Date.now()
          }
        }
      },
      endDateConfig() {
        let vm = this
        return {
          disabledDate(time) {
            let timestamp = time.getTime()
            return timestamp < new Date(vm.datePicker.startDate).getTime() || timestamp > Date.now()
          }
        }
      },
    },
    methods: {
      startDate(date) {
        let vm = this
        vm.datePicker.startDate = date
        vm.filter.startDate = date
      },
      endDate(date) {
        let vm = this
        vm.datePicker.endDate = date
        vm.filter.endDate = date
      },
      setFilterDate() {
        let vm = this
        if (vm.datePicker.endDate && vm.datePicker.startDate) {
          vm.filter.startDate = vm.datePicker.startDate
          vm.filter.endDate = vm.datePicker.endDate
        }
      },
    },
  }
</script>
