import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useUserInfoStore } from './userInfo'
import { getCreatedList } from '@/api/songLists'
export const usePlaylistStore = defineStore('playlist', () => {
  const playlist = ref([])
  const userInfoStore = useUserInfoStore()
  const changePlaylist = (newPlaylist) => {
    playlist.value = newPlaylist
  }
  // 拿到当前播放歌曲的id，去starList里面查找，有就把它去掉，没有就把对应id的歌曲信息push
  const changeStar = (id) => {
    if(starList.value[0].songs.some(item => item.id === id)){
      starList.value[0].songs = starList.value[0].songs.filter(item => item.id !== id)
      return false
    }else{  
      const arr = playlist.value.filter(item => item.id === id)  
      const obj = arr[0]
      starList.value[0].songs.push(obj)    
      return true     
    }  
  }

  // 传入id，有则直接播放，无则发请求push进去
  const playSongNow = (id) => {
    const checkSongIndex = playlist.value.findIndex(item => item.id === id)  
    if(checkSongIndex !== -1){
      i.value = checkSongIndex
      isPlay.value = true
    }
  }

  // 记录当前播放的歌曲在playlist中的位置
  const i = ref(0)

  // 修改i值的方法
  const changeI = (num) => {
    i.value +=num
    if (i.value < 0) {
      i.value = playlist.value.length - 1;
    } else if (i.value >= playlist.value.length) {
      i.value = 0;
    }
  }

  // 将starList的数据存入store用于共享
  const starList = ref([])

  // 提供更新starList的方法
  const updateStarList = async () => {
    starList.value = await getCreatedList(userInfoStore.userName, '我喜欢的音乐') 
  }

  

  // 提供判断是否被star的方法
  function isStar(id) { 
    if(!starList.value[0]){
      return
    }      
    const isStarred = starList.value[0].songs.some(song => song.id === id);
    
    return isStarred
  }
  
  // 控制侧边播放列表参数
  const dialogPlaylistVisible = ref(false)

  // 侧边播放列表显示隐藏方法
  const changePlayVis = (newVal) => {
    dialogPlaylistVisible.value = newVal
  }

  // 共享播放器播放状态
  const isPlay = ref(false)

  // 修改播放状态的方法
  const changeIsPlay = (newVal) => {
    isPlay.value = newVal
    return true
  }

  // 删除播放列表歌曲的方法
  const deleteSong = (id) => {
    if(playlist.value.length === 1){
      return true
    }
    playlist.value = playlist.value.filter(item => item.id !== id)
    if(i.value >= playlist.value.length){
      i.value = 0
    }
  }

  return { 
    playlist,
    changeI,
    i,
    changeStar,
    changePlaylist,
    starList,
    updateStarList,
    isStar,
    dialogPlaylistVisible,
    changePlayVis,
    playSongNow,
    isPlay,
    changeIsPlay,
    deleteSong
  }
}
)
