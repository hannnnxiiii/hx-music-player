import { ref } from 'vue'
import { defineStore } from 'pinia'
import { addSong } from '@/api/songLists'

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

  // 删除弹窗显隐参数
  const tipDiaVis = ref(false)

  // 改变删除弹窗显隐参数的方法
  const changeTipDiaVis = (newVal) => {
    tipDiaVis.value = newVal
  }

  const songList = ref([])

  // 存储请求来的数据
  const saveSongList = (newArr) => {  
    songList.value = newArr  
  }

  // 收藏的歌单
  const collectedList = ref([])

  // 存储请求来的收藏歌单
  const saveColList = (newArr) => {
    collectedList.value = newArr
  }

  // 单个歌单信息
  const currentSongList = ref({})

  // 存储单个歌单信息
  const saveCurrentList = (newObj) => {
    currentSongList.value = newObj
  }

  // 要操作的单曲
  const singleSong = ref({})

  // 存储要操作的单曲的方法
  const saveSingleSong = (newObj) => {
    singleSong.value = newObj
  }

  // 往对应歌单中收藏歌曲的方法
  const saveSongToList = async (listId, songObj) => {
    const index = songList.value.findIndex(item => item.id === listId)
    if(songList.value[index].songs.some(item => item.id === songObj.id)){
      return '歌单中已存在该单曲'
    }
    songList.value[index].songs.push(songObj)
    // 保存到服务器
    await addSong(songObj.name, songObj.singer, songObj.url, songObj.songUlr, songObj.id, listId)
    return '收藏成功'
  }

  return {
    dialogVisible,
    changeDiaVis,
    dialogFormVisible,
    changeDiaFormVis,
    tipDiaVis,
    changeTipDiaVis,
    songList,
    saveSongList,
    saveColList,
    collectedList,
    currentSongList,
    saveCurrentList,
    singleSong,
    saveSingleSong,
    saveSongToList
  }
})
