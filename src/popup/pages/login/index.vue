<template>
  <el-button type="primary" @click="handleClick"> abcd </el-button>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useStore } from '@/store'
const router = useRouter()
const store = useStore()
const handleClick = () => {
  console.log(store.state.app.appName, 1)
  store.dispatch('app/appAction').then(() => {
    console.log(store.state.app.appName, 2)
  })
  // router.push({ name: 'regist' })
}
</script>

<style lang="scss" scoped></style>
