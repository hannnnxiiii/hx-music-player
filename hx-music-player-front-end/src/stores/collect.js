import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCollectStore = defineStore('collect', () => {
  const dialogVisible = ref(false)
  const changeDiaVis = (newVal) => {
    dialogVisible.value = newVal
  }
  // 控制创建歌单显隐参数
  const dialogFormVisible = ref(false)
  // 改变创建歌单显隐参数的方法
  const changeDiaFormVis = (newVal) => {
    dialogFormVisible.value = newVal
  }

  const songList = ref([])

  // 存储请求来的数据
  const saveSongList = (newArr) => {  
    songList.value = newArr  
  }
  return {
    dialogVisible,
    changeDiaVis,
    dialogFormVisible,
    changeDiaFormVis,
    songList,
    saveSongList
  }
})
