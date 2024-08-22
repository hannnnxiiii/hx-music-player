import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userName = ref('')
  const token = ref('')
  // 同步用户数据
  const saveInfo = (newToken, newUserName) => {
    console.log('Saving token:', newToken)
    console.log('Saving userName:', newUserName)
    token.value = newToken
    userName.value = newUserName
    console.log('Current store state:', { token: token.value, userName: userName.value })
  }
  
  return { userName,token,saveInfo }
},
{
  persist: true,
}
)