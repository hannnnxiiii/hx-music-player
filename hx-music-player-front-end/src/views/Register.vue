<script setup>
  import { ref } from 'vue';
  import router from '@/router';
  import { useUserInfoStore } from '@/stores/userInfo';
  import { postRegister } from '@/api/account';
  import { usePlaylistStore } from '@/stores/playlist';
  import { linkMyStar } from '@/api/account';
  const playlistStore = usePlaylistStore()
  const userInfoStore = useUserInfoStore()
  const username = ref('');
  const email = ref('');
  const password = ref('');
  const usernameError = ref(false);
  const emailError = ref(false);
  const passwordError = ref(false)
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;


  // 校验模块
  const validateUsername = () => {
    usernameError.value = !usernameRegex.test(username.value);
  }
  const validateEmail = () => {
    emailError.value = !emailRegex.test(email.value);
  }
  const validatePassword = () => {
    passwordError.value = !passwordRegex.test(password.value);
  };
  
  // 引入创建歌单api
  import { createMyStar } from '@/api/songLists';
  // 处理注册事件
  const register = () => {
    validateUsername()
    validateEmail()
    validatePassword()
    if (!usernameError.value && !emailError.value && !passwordError.value) {
      // 继续处理注册逻辑
      const res = async (username,email,password ) => {
        const result = await postRegister(username,email,password)
        console.log(result);
        userInfoStore.saveInfo(result.token, result.user.username, result.user.collect, result.user.id)
        // 注册完成时自动创建一个我star的歌单
        await createMyStar('我喜欢的音乐', 'http://localhost:3000/pic/defaultSongListPic.jpg', [], result.user.username, result.user.username)
        playlistStore.updateStarList()
        router.replace('/profile')
        
      }
      res(username.value,email.value,password.value)
    }
  }
</script>

<template>
  <div class="form">
    <h1>注册</h1>
    <form @submit.prevent="register">
      <div class="input-group">
        <el-input
          v-model="username"
          placeholder="用户名"
          :class="{ 'is-invalid': usernameError }"
          @input="validateUsername"
        />
        <p v-if="usernameError" class="error-message">用户名不符合要求</p>
      </div>
      
      <div class="input-group">
        <el-input
          v-model="email"
          placeholder="邮箱"
          :class="{ 'is-invalid': emailError }"
          @input="validateEmail"
        />
        <p v-if="emailError" class="error-message">邮箱格式不正确</p>
      </div>
      
      <div class="input-group">
        <el-input
          v-model="password"
          placeholder="密码"
          type="password"
          :class="{ 'is-invalid': passwordError }"
          @input="validatePassword"
          show-password
        />
        <p v-if="passwordError" class="error-message">密码不符合要求</p>
      </div>

      <el-button type="primary" @click="register">注册</el-button>
    </form>
  </div>
</template>

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
  margin: 15px 0;
}

.el-button{
  margin: 15px 0;
  width: 70px;
}

.is-invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
}

.input-group{
  position:relative;
}

p{
  position: absolute;
  top: 53px;
  left: 3px;
}

</style>