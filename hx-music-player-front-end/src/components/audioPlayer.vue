<template>
  <div class="audio-player" v-if="playlistStore.playlist[i]">
    <!-- 播放控件 -->
    <el-icon :size="30" @click="changeSong(-1)"><ArrowLeft /></el-icon>
    <el-icon :size="45" @click="playAudio" v-if="!isPlay"><VideoPlay /></el-icon>
    <el-icon :size="45" @click="stopAudio" v-else><VideoPause /></el-icon>
    <el-icon :size="30" @click="changeSong(1)"><ArrowRight /></el-icon>
    <img :src="playlistStore.playlist[i].url" alt="">
    <div class="slider-group">
      <p>{{playlistStore.playlist[i].name}}-{{playlistStore.playlist[i].singer}}&nbsp;&nbsp;&nbsp;&nbsp;{{currentTime}}/{{duration}}</p>
      <div class="slider-demo-block">
        <el-slider v-model="playTime" :step="step" :show-tooltip="false" size="small" @input="pauseAudio" @change="changeTime"/>
      </div>
    </div>
    <!-- 互动控件 -->
    <el-icon :size="20" class="like-button" v-if="!isStarred" @click="changeStarFn"><Star /></el-icon>
    <el-icon :size="20" class="like-button" style="color: #ffcc00;" v-else @click="changeStarFn"><StarFilled /></el-icon>
    <el-icon :size="20" class="like-button" @click="showDialog"><FolderAdd /></el-icon>
    <el-icon :size="20" class="like-button" @click="muteVolume"><Headset /></el-icon>
    <div class="volume-slider">
      <el-slider v-model="volumeValue" @change="changeVolume"/>
    </div>
    <el-icon :size="20" @click="playlistStore.changePlayVis(true)"><Files /></el-icon>
    <!-- 音乐文件 -->
    <audio :src="playlistStore.playlist[i].songUrl" ref="audio" preload="auto" @loadedmetadata="loadTime"></audio>
    <playlistDialog></playlistDialog>
  </div>
</template>

<script setup>
import { nextTick, ref, onMounted, computed, watch } from 'vue'
import { useCollectStore } from '@/stores/collect'
import { getCreatedList } from '@/api/songLists';
import { useUserInfoStore } from '@/stores/userInfo';
import playlistDialog from './playlistDialog.vue';
const userInfoStore = useUserInfoStore()
const collectStore = useCollectStore()
const audio = ref(null)
const step = ref(0.2)
let timer = null
const playTime = ref(0)
const volumeValue = ref(100)
const i = computed(() => playlistStore.i)
const isPlay = computed(() => playlistStore.isPlay)

const isStarred = computed(() => {
  return playlistStore.isStar(playlistStore.playlist[i.value].id);
});

// 引入播放列表
import { usePlaylistStore } from '@/stores/playlist'
const playlistStore = usePlaylistStore()

// 首次进入页面拉取默认歌单，优化用户体验
import { getSongList } from '@/api/songLists';
const getSongListFn = async (id) => {          
  playlistStore.changePlaylist((await getSongList(id)).songs) 
}

// 监听i，有变化时同步给playlistStore，方便共享
// watch(
//   i,
//   (newVal) => {
//     playlistStore.i = newVal
//   },
//   { immediate: true }
// )

// 获取我star的音乐
playlistStore.updateStarList()
onMounted(() => {
  getSongListFn('001')
})


// 时长相关
// 更改播放时间
const changeTime = () => {
  //更改音频实际值
  audio.value.currentTime = audio.value.duration * playTime.value / 100
  loadCurrentTime()
  timer = setInterval(() => {
    loadCurrentTime()
  },1000)
  if (isPlay.value) {
    audio.value.play()
  }
}

// 解决更改播放时间和计时器赋值的冲突
const pauseAudio = () => {
  if (audio.value && isPlay.value) {
    audio.value.pause()
    clearInterval(timer)
  }
}

// 加载当前播放时长
const currentTime = ref('00:00')
const duration = ref('00:00')
const loadCurrentTime = () => {
  const min = audio.value.currentTime/60 >= 10 ? parseInt(audio.value.currentTime/60) + '' : '0' + parseInt(audio.value.currentTime/60) 
  const sec = audio.value.currentTime%60 >= 10 ? parseInt(audio.value.currentTime%60) + '' : '0' + parseInt(audio.value.currentTime%60)
  currentTime.value = min + ':' + sec
  playTime.value = audio.value.currentTime * 100 / audio.value.duration
}

// 总播放时长赋值
const loadTime = () => {
  const min = audio.value.duration/60 >= 10 ? parseInt(audio.value.duration/60) + '' : '0' + parseInt(audio.value.duration/60) 
  const sec = audio.value.duration%60 >= 10 ? parseInt(audio.value.duration%60) + '' : '0' + parseInt(audio.value.duration%60)
  duration.value = min + ':' + sec
  audio.value.volume = volumeValue.value / 100
}


// 音量相关
// 更改音量
const volumeFlag = ref(1)
const muteFlag = ref(false)
const changeVolume = () => {
  if(audio.value){
    audio.value.volume = volumeValue.value / 100   
    volumeFlag.value = audio.value.volume
    muteFlag.value = false
  }
}

// 静音
const muteVolume = () => {
  if(!muteFlag.value){
    audio.value.volume = 0
    volumeValue.value = 0
    muteFlag.value = true
  }else{
    audio.value.volume = volumeFlag.value
    volumeValue.value = volumeFlag.value * 100
    muteFlag.value = false
  }
}

// 监听isPlay,根据值来进行播放或暂停
watch(isPlay,(newVal) => {  
  if(newVal){
    if(timer){
      clearInterval(timer)
    }
    playTime.value = 0
    nextTick(() => {
      playAudio()
    }) 
  }
})

// 播放控件方法
// 播放
const playAudio = () => {    
  audio.value.play()
  playlistStore.changeIsPlay(true)
  loadCurrentTime()
  timer = setInterval(() => {
    loadCurrentTime()
  },1000)
}

// 暂停
const stopAudio = () => {
  if(audio.value){
    audio.value.pause()
    playlistStore.changeIsPlay(false)
    clearInterval(timer)
  }
}

// 切歌
const changeSong = (n) => {
  if(timer){
    clearInterval(timer)
  }
  playTime.value = 0
  playlistStore.changeI(n)
  nextTick(() => {     
    if(audio.value){     
      loadCurrentTime()
    }    
    if(isPlay.value){
      playAudio()
    }
  })
}


// 互动控件相关
// 加星
import { addSong, delSong, changeCover } from '@/api/songLists';
const changeStarFn = async () => {
  const url = computed(() => {
    return playlistStore.starList[0].songs.length > 0 ? playlistStore.starList[0].songs[0].url : 'http://localhost:3000/pic/defaultSongListPic.jpg'
  })
  const res = playlistStore.changeStar(playlistStore.playlist[i.value].id)
  if(res){
    const obj = playlistStore.playlist[i.value]  
    console.log(obj);  
    await addSong(obj.name, obj.singer, obj.url, obj.songUrl, obj.id, userInfoStore.userName)   
    await changeCover(userInfoStore.userName, url.value)    
  }else{
    await delSong(userInfoStore.userName, playlistStore.playlist[i.value].id)
    await changeCover(userInfoStore.userName, url.value)
  }
}

// 收藏
// 获取用户创建的歌单

const showDialog = async () => {  
  collectStore.saveSongList(await getCreatedList(userInfoStore.userName))
  collectStore.changeDiaVis(true)
}



</script>


<style scoped>
.audio-player{
  display: flex;
  width: 1100px;
  margin: 0 auto;
  height: 59px;
  align-items: center;
}


.slider-group p{
  margin-left: 11px;
}

.slider-group{
  margin-right: 20px;
}

img{
  height: 45px;
  width: 45px;
  object-fit: contain;
  display: block;
  margin: 0 10px;
}

.like-button{
  margin: 0 5px;
}

.volume-slider{
  width: 120px; 
  display: flex;
  align-items: center;
}

.volume-slider .el-slider {
  margin-top: 0;
  margin-left: 12px;
}
.volume-slider .el-slider {
  flex: 0 0 70%;
}

.slider-demo-block {
  width: 600px;
  display: flex;
  align-items: center;
}

.slider-demo-block .el-slider {
  margin-top: 0;
  margin-left: 12px;
}

.slider-demo-block .demonstration + .el-slider {
  flex: 0 0 70%;
}

.el-icon:hover{
  cursor: pointer;
  color: #409EFF;
}

.el-icon{
  color: #40a0ffb7;
}
</style>