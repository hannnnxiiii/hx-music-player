<template>
  <el-table :data="collectStore.currentSongList.songs" style="width: 100%" stripe>
    <el-table-column prop="id">
      <template #default="scope">
        <div class="icon-group">
          <el-icon :size="23" @click="goPlay(scope.row.id)"><VideoPlay /></el-icon>
          <el-icon :size="23" v-if="!(starList[0].songs).some(item => item.id === scope.row.id)" @click="changeStarFn(scope.row)"><Star /></el-icon>
          <el-icon :size="23" v-else class="like-button" @click="changeStarFn(scope.row)"><StarFilled /></el-icon>
          <el-icon :size="23" @click="goCollect(scope.row)"><FolderAdd /></el-icon>
          <el-icon :size="23" @click="ShowDelDialog(scope.row.id)"><Delete /></el-icon>
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="歌曲标题" width="220"/>
    <el-table-column prop="singer" label="歌手" width="220"/>
    <el-table-column prop="name" label="专辑" width="220"/>
  </el-table>
  <tipsDialog>
    <template #message>
      <span>你确定要从歌单中删除该单曲吗？</span>
    </template>
    <template #confirm>
      <el-button type="primary" @click="goDelete(songId)">
        确定
      </el-button>
    </template>
  </tipsDialog>
</template>

<script setup>
import { usePlaylistStore } from '@/stores/playlist';
const playlistStore = usePlaylistStore()
const starList = computed(() => playlistStore.starList)
import tipsDialog from './tipsDialog.vue';

import { useCollectStore } from '@/stores/collect';
import { computed, nextTick, onMounted, ref } from 'vue';
const collectStore = useCollectStore()

// 点击播放按钮，跳转至对应歌曲播放
const goPlay = (id) => {
  playlistStore.changeIsPlay(false)
  nextTick(() => {
    playlistStore.playSongNow(id)
  })
}

// 保存点击的单曲，打开收藏页面
const goCollect = (songObj) => {
  collectStore.saveSingleSong(songObj)
  collectStore.changeDiaVis(true)
}

// 加星
import { addSong, delSong } from '@/api/songLists';
import { useUserInfoStore } from '@/stores/userInfo';
const userInfoStore = useUserInfoStore()
const changeStarFn = async (obj) => {
  const res = playlistStore.changeStar(obj.id)
  
  if(res){  
    console.log(obj);
    
    await addSong(obj.name, obj.singer, obj.url, obj.songUrl, obj.id, userInfoStore.userName)  
  }else{
    await delSong(userInfoStore.userName, obj.id)
  }
}

const songId = ref('')
// 显示删除弹窗
const ShowDelDialog = (id) => {
  collectStore.changeTipDiaVis(true)
  songId.value = id
}

// 在本地和云端删除对应单曲
const goDelete = (songId) => {
  console.log(collectStore.currentSongList.id, songId );
  const currentSongList = collectStore.currentSongList
  currentSongList.songs = currentSongList.songs.filter(item => item.id !== songId)
  collectStore.saveCurrentList(currentSongList)
  delSong(collectStore.currentSongList.id, songId)
  collectStore.changeTipDiaVis(false)
}
</script>

<style scoped>
.icon-group{
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: space-around;
}

.el-table__row:hover .el-icon{
  color: #40a0ffb7;
  transition: 0.3s;
}

.el-table__row:hover .el-icon:hover{
  cursor: pointer;
  color: #409EFF;
}

.el-icon{
  color: #40a0ff00;
}

.like-button{
  color: rgba(255, 204, 0,0);
}

.el-table__row:hover .like-button{
  color: rgb(255, 204, 0);
}
.el-table__row:hover .like-button:hover{
  color: rgb(255, 204, 0);
}
</style>