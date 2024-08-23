import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userName = ref('')
  const token = ref('')
  const collect = ref([])
  const id = ref('')
  // 同步用户数据
  const saveInfo = (newToken, newUserName, newCollect, newId) => {
    token.value = newToken
    userName.value = newUserName
    collect.value = newCollect
    id.value = newId
  }
  // 更新收藏歌单的方法
  const updateCollect = (newArr) => {
    collect.value = newArr
  }
  return { 
    userName,
    token,
    saveInfo,
    collect,
    id,
    updateCollect
  }
},
{
  persist: true,
}
)