<template>
  <div data-root="true" class="root">
    <el-config-provider :locale="local">
      <el-button v-if="btnShow" type="primary" @click="handleOpen"
        >打开</el-button
      >

      <!-- <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="90%"
      :before-close="handleClose"
    >
     
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">Cancel</el-button>
          <el-button type="primary" @click="handleConfirm">Confirm</el-button>
        </span>
      </template>
    </el-dialog> -->
      <el-drawer v-model="dialogVisible" size="80%">
        <div class="d-flex flex-col height-100">
          <div class="d-flex justify-between header">
            <div>极速塞车</div>
            <div class="d-flex">
              <div class="prev-period text-red">123</div>
              <div>期</div>
            </div>
            <div class="prev-result text-red">result</div>
            <div class="d-flex mr-10">
              <div>第</div>
              <div class="current-period text-red">123</div>
              <div>期</div>
              <div class="ml-2">封盘时间</div>
              <div class="frooze-time text-red">12</div>
            </div>
          </div>
          <div class="d-flex mt-10 flex-1 w-100 content">
            <div class="left-side height-100">
              <el-tabs stretch type="border-card">
                <el-tab-pane label="极速赛车">
                  <pk10-result></pk10-result>
                </el-tab-pane>
                <el-tab-pane label="极速飞艇">Config</el-tab-pane>
              </el-tabs>
            </div>
            <div class="ml-2 right-side h-100 flex-1">
              <runtime-content></runtime-content>
            </div>
          </div>
        </div>
      </el-drawer>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { getCache } from './utils'
import http from '@/utils/http'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import pk10Result from './components/PK10result.vue'
import runtimeContent from './components/runtimeContent.vue'
import { useStore } from '@/store'
const store = useStore()
const local = zhCn

const dialogVisible = ref<boolean>(false)
const cache = ref<string>('')
const btnShow = ref<boolean>(true)
const handleOpen = async () => {
  // console.log(new Date().getTime())
  // https://7835491026-yj.qdk63ayw8g.com/member/bet

  // http.post('https://7835491026-yj.qdk63ayw8g.com/member/bet', {
  //   data: {
  //     lottery: 'PK10JSC',
  //     drawNumber: '32723557',
  //     bets: [{ game: 'GDX', contents: 'D', amount: 1, odds: 2.175, title: '' }],
  //     fastBets: false,
  //     ignore: false
  //   }
  // })

  // setInterval(() => {
  // http
  //   .get('/member/dayResult?lottery=PK10JSC&_=' + new Date().getTime())
  //   .then((res) => {
  //     console.log(res)
  //   })
  // }, 1000)

  // chrome.runtime.sendMessage({ msg: 'from-content-script' })
  dialogVisible.value = true
  // const data = await getCache('key1')
  // cache.value = data.result
}
chrome.runtime.onMessage.addListener((request, sender, response) => {
  console.log(request)
  if (request.login) {
    btnShow.value = true
  }
})
const handleCancel = () => {
  console.log('cancel')
}
const handleClose = () => {
  dialogVisible.value = false
}
const handleConfirm = () => {
  console.log('object')
}
</script>

<style lang="scss" scoped>
.root {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
  height: 100%;
  .header {
    width: 100%;
    height: 100px;
  }
  .text-red {
    color: #ff6347;
    text-align: center;
  }
  .prev-period {
    width: 200px;
  }
  .prev-result {
    width: 400px;
  }
  .current-period {
    width: 200px;
  }
  .frooze-time {
    width: 100px;
  }
  .left-side {
    width: 30%;
  }

  :deep(.el-tabs--border-card) {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100%;
  }
  :deep(.el-tabs__content) {
    flex: 1;
    height: 0;
  }
  :deep(.el-tab-pane) {
    height: 100%;
  }
  .content {
    max-height: calc(100% - 150px);
  }
}
</style>
