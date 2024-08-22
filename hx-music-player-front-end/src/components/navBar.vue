<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="/findmusic">发现音乐</el-menu-item>
    <el-menu-item index="/mymusic">我的音乐</el-menu-item>
    <el-menu-item index="/login" v-show="!checkToken">登录/注册</el-menu-item>
    <el-menu-item index="/profile" v-show="checkToken">个人信息</el-menu-item>
  </el-menu>
  <div class="h-6" />
  
</template>

<script lang="ts" setup>
import { computed,  } from 'vue'
import router from '@/router';
import { useRoute } from 'vue-router';
import { useUserInfoStore } from '@/stores/userInfo';
const userInfoStore = useUserInfoStore()
const route = useRoute()
const checkToken = computed(() => {
  return userInfoStore.token || localStorage.getItem('token')
})
// 计算属性，确定当前激活的导航项
const activeIndex = computed(() => {
  return route.path === '/register' ? '/login' : route.path
});
const handleSelect = (key) => {
  console.log(key)
  router.push(key)
}
</script>



<style>
.el-menu--horizontal{
  justify-content: center;
}
</style>