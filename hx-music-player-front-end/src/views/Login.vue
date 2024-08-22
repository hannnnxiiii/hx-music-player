<template>
  <div class="form">
    <h1>登录</h1>
    <form @submit.prevent="login">
      <el-input v-model="username" placeholder="用户名" />
      <el-input v-model="password" placeholder="密码" type="password" show-password/>
      <div class="button-group">   
        <el-button type="primary" @click="login(username, password)">登录</el-button>
        <el-button @click="goRegister()">注册</el-button>
      </div>
      <p v-if="message">{{ message }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import router from '@/router';
import { useUserInfoStore } from '@/stores/userInfo';
// 引入登录api
import { postLogin } from '@/api/account';
import { usePlaylistStore } from '@/stores/playlist';
const playlistStore = usePlaylistStore()
const userInfoStore = useUserInfoStore()

const username = ref('');
    const password = ref('');
    const message = ref('');

    const login = async (username, password) => {
      const result = await postLogin(username, password)
      console.log(result);
      
      userInfoStore.saveInfo(result.token, result.user.username, result.user.collect)
      playlistStore.updateStarList()
      router.replace('/profile')
    };

    const goRegister = () => {
      router.replace('/register')
    }

    defineExpose({
      username,
      password,
      message,
      login,
    }) 



</script>

<style scoped>
.form{
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
}
h1{
  margin: 20px 0;
  text-align: center
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-input{
  width: 240px;
  margin: 10px 0;
}

.el-button{
  margin: 10px 0;
  width: 70px;
}

.button-group{
  display: flex;
  justify-content: space-evenly;
  width: 100%;
}
</style>