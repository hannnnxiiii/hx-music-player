import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userName = ref('')
  const token = ref('')
  const collect = ref([])
  // 同步用户数据
  const saveInfo = (newToken, newUserName, newCollect) => {
    token.value = newToken
    userName.value = newUserName
    collect.value = newCollect
  }
  
  return { userName,token,saveInfo,collect }
},
{
  persist: true,
}
)