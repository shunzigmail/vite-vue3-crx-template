<template>
  <el-button type="primary" @click="handleClick"> 345 </el-button>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
const counter = ref<number>(1)
const router = useRouter()
const handleClick = () => {
  chrome.cookies.remove({
    url: 'https://www.google.com.hk/',
    name: 'login'
  })
  // router.push({ name: 'login' })
}
</script>

<style lang="scss" scoped></style>
