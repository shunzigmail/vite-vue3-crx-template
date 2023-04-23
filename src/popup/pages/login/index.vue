<template>
  <div class="container pa-2">
    <el-input
      v-model="username"
      placeholder="请输入用户名"
      clearable
    ></el-input>
    <el-input
      v-model="password"
      class="mt-2"
      placeholder="请输入密码"
      clearable
    ></el-input>
    <div class="mt-2 d-flex justify-center">
      <el-button type="primary" @click="handleClick"> 登录 </el-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
import { ref } from 'vue'
const router = useRouter()
const store = useStore()
let username = ref('')
let password = ref('')
const handleClick = async () => {
  console.log('click')
  store.dispatch('app/appAction')
  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true
  })
  const response = await chrome.tabs.sendMessage(tab.id, { login: true })
  // bg.test()
  // console.log(username.value, password)
  // router.push({ name: 'regist' })
}
</script>

<style lang="scss" scoped>
.container {
  width: 300px;
}
</style>
