<template>
  <el-drawer
    v-model="playlistStore.dialogPlaylistVisible"
    title="播放列表"
    direction="rtl"
    size="25%"
  >
  <div class="singleSong" v-for="item in playlistStore.playlist" :key="item.id">
    <img :src="item.url" :alt="item.name">
    <div class="info">
      <p :class="{blue:playlistStore.playlist[playlistStore.i].id === item.id}">{{item.name}}</p>
      <p>{{item.singer}}</p>
    </div>
    <div class="button">
      <el-icon size="25" @click="goPlay(item.id)"><VideoPlay /></el-icon>
      <el-icon size="25" @click="goDelete(item.id)"><Delete /></el-icon>
    </div>
  </div>
  </el-drawer>
</template>

<script setup>
import { nextTick, ref } from 'vue'
// import { ElDrawer} from 'element-plus'
import { usePlaylistStore } from '@/stores/playlist';
const playlistStore = usePlaylistStore()
// 点击播放按钮，跳转至对应歌曲播放
const goPlay = (id) => {
  playlistStore.changeIsPlay(false)
  nextTick(() => {
    playlistStore.playSongNow(id)
  })
}
// 点击删除按钮，将对应歌曲从播放列表中删除，如果删除的是正在播放的歌曲，跳转至下一曲
const goDelete = (id) => {
  if(playlistStore.deleteSong(id)){
    return
  }
  console.log(playlistStore.playlist);
  if(playlistStore.isPlay){
    playlistStore.changeIsPlay(false)
    nextTick(() => {
      playlistStore.changeIsPlay(true)
    })
  }
}
</script>

<style scoped>
.singleSong{
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  transition: 0.3s;
}

.singleSong:hover{
  background-color: #ddd;
}

.singleSong img{
  width: 80px;
  height: 80px;
  margin: 0 10px 0 10px;
}

.info{
  line-height: 40px;
  width: 250px;
  font-size: 18px;
}

.info p:last-child{
  color: #7C828F;
}

.button{
  width: 60px;
  display: flex;
  justify-content: space-between;
  margin-left: 15px;
}

.singleSong:hover .el-icon{
  color: #40a0ffb7;
}

.singleSong:hover .el-icon:hover{
  cursor: pointer;
  color: #409EFF;
}

.el-icon{
  color: #40a0ff00;
  transition: 0.3s;
}

.blue{
  color: #409EFF;
}
</style>