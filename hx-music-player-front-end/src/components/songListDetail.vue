<script setup>
import { computed, nextTick } from 'vue';
import musicTable from './musicTable.vue';
import { useCollectStore } from '@/stores/collect';
import { usePlaylistStore } from '@/stores/playlist';
import { useUserInfoStore } from '@/stores/userInfo';
import { collectSongList } from '@/api/songLists';
const userInfoStore = useUserInfoStore()
const playlistStore = usePlaylistStore()
const collectStore = useCollectStore()
const currentSongList = computed(() => collectStore.currentSongList)
// 点击播放按钮，用歌单替换播放列表，并开始播放
const playAllList = () => {
  playlistStore.changePlaylist([])
  playlistStore.setI(0)
  playlistStore.changeIsPlay(false)
  nextTick(() => {  
    playlistStore.changePlaylist(currentSongList.value.songs)
    playlistStore.changeIsPlay(true)
  })
}
// 判断显示收藏或取消收藏的计算属性
const isCollected = computed(() => {
  return !userInfoStore.collect.some(item => item === currentSongList.value.id)
})

// 收藏该歌单
const collectThisList = async () => {
  if(currentSongList.value.creator === userInfoStore.userName){
    console.log('不能收藏自己的歌单哦~');
    return
  }
  const arr = userInfoStore.collect
  arr.push(currentSongList.value.id)
  userInfoStore.updateCollect(arr)
  await collectSongList(userInfoStore.id, arr)
}

// 取消收藏
const cancelCollect = async () => {
  let arr = userInfoStore.collect
  arr = arr.filter(item => item !== currentSongList.value.id)
  userInfoStore.updateCollect(arr)
  await collectSongList(userInfoStore.id, arr)
}
</script>

<template>
  <el-row>
    <el-col :span="8">
      <img :src="currentSongList.url" :alt="currentSongList.name">
    </el-col>
    <el-col :span="16">
      <div class="list-detail-info">
        <p class="name">{{currentSongList.name}}</p>
        <p class="creator">{{currentSongList.creator}}</p>
        <div class="button-group">
          <el-button type="primary" @click="playAllList">播放</el-button>
          <el-button v-if="isCollected" @click="collectThisList">收藏</el-button>
          <el-button v-else @click="cancelCollect">取消收藏</el-button>

        </div>
        <p class="introduce"></p>
      </div>
    </el-col>
  </el-row>
  <musicTable></musicTable>
</template>

<style scoped>
.table-head{
  background-color: pink;
  height: 30px;
  line-height: 30px;
  text-align: center;
}

.table-body{
  background-color: skyblue;
}

.name,.creator,.button-group,.introduce{
  margin: 10px;
}

.introduce{
  height: 100%;
}

.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.el-col img{
  width: 228px;
  height: 228px;
  margin: 50px 0 0 30px;
}

.list-detail-info{
  width: 476px;
  height: 228px;
  margin: 50px 0 0 40px;
  display: flex;
  flex-direction: column;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
