<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <el-button class="button" type="primary">方案设置</el-button>
      </div>
    </template>
    <div class="card-content">
      <div class="option-bar pa-4 d-flex align-center justify-between">
        <div class="flex-1">
          <div class="d-flex justify-around mb-4">
            <div class="d-flex">
              <el-checkbox
                v-model="formData.startTimeStatus"
                class="mr-2"
                label="停止时间"
              ></el-checkbox>

              <el-time-picker
                v-model="formData.endTime"
                :teleported="false"
                placeholder="请选择停止时间"
              />
            </div>
            <div class="d-flex ml-4">
              <el-checkbox
                v-model="formData.stopLossStatus"
                class="mr-2"
                label="止亏≤"
              ></el-checkbox>

              <el-input
                v-model="formData.stopLoss"
                :teleported="false"
                placeholder="请输入止亏额度"
              />
            </div>
          </div>
          <div class="d-flex justify-around">
            <div class="d-flex">
              <el-checkbox
                v-model="formData.endTimeStatus"
                class="mr-2"
                label="开始时间"
              ></el-checkbox>

              <el-time-picker
                v-model="formData.startTime"
                :teleported="false"
                placeholder="请选择开始时间"
              />
            </div>
            <div class="d-flex ml-4">
              <el-checkbox
                v-model="formData.takeProfitStatus"
                class="mr-2"
                label="止盈≥"
              ></el-checkbox>

              <el-input
                v-model="formData.takeProfit"
                placeholder="请输入止盈额度"
              />
            </div>
          </div>
        </div>
        <el-button type="primary" @click="onSubmit">立即生效</el-button>
      </div>
      <div class="bet-detail pa-2">
        <div v-for="item in listData" :key="item">{{ item }}</div>
      </div>
      <div class="footer-bar d-flex justify-around">
        <el-button :loading="true" type="success">
          <el-icon class="mr-2" size="18">
            <VideoPlay />
          </el-icon>
          开始
        </el-button>
        <el-button type="danger">
          <el-icon class="mr-2" size="18">
            <SwitchButton />
          </el-icon>
          停止
        </el-button>
        <el-button type="warning">
          <el-icon class="mr-2" size="18">
            <VideoPause />
          </el-icon>
          暂停
        </el-button>
        <el-button type="primary">
          <el-icon class="mr-2" size="18">
            <Document />
          </el-icon>
          查看投注
        </el-button>
      </div>
    </div>
  </el-card>
</template>
<script setup lang="ts">
import moment from 'moment'
import { reactive, ref } from 'vue'
console.log(
  new Date(moment().startOf('day').add(7, 'hour').valueOf()).getHours()
)
const formData = reactive({
  startTime: moment().startOf('day').add(7, 'hour').valueOf(),
  endTime: moment().endOf('day').subtract(1, 'hour').valueOf(),
  startTimeStatus: false,
  endTimeStatus: false,
  takeProfit: '',
  takeProfitStatus: false,
  stopLoss: '',
  stopLossStatus: false
})
const listData = ref([])

// setInterval(() => {
//   listData.value.unshift(new Date().getTime())
// }, 1000)
const onSubmit = () => {
  console.log(formData)
  console.log('object')
}
</script>
<style lang="scss" scoped>
.el-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
:deep(.el-card__body) {
  flex: 1;
  padding: 0;
}
.card-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.bet-detail {
  flex: 1 0 auto;
  border-top: 1px solid var(--el-card-border-color);
  border-bottom: 1px solid var(--el-card-border-color);
  height: 0;
  overflow-y: scroll;
  color: tomato;
}
.option-bar {
  height: 100px;
}
.footer-bar {
  height: 50px;
}
</style>
