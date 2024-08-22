<template>
  <div>
    <h1>Profile</h1>
    <form @submit.prevent="updateProfile">
      <input v-model="avatar" placeholder="Avatar URL" />
      <input v-model="email" type="email" placeholder="Email" />
      <button type="submit">Update</button>
      <p v-if="message">{{ message }}</p>
    </form>
    <el-button @click="logOut()">退出登录</el-button>
  </div>
</template>

<script setup>
import { useUserInfoStore } from '@/stores/userInfo';
import router from '@/router';
import { usePlaylistStore } from '@/stores/playlist';
const playlistStore = usePlaylistStore()
const userInfoStore = useUserInfoStore()
const logOut = () => {
  userInfoStore.saveInfo('','')
  playlistStore.updateStarList()
  // 跳转回登录页
  router.replace('/login')
}
</script>
