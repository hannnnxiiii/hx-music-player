<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><StarFilled /></el-icon>
          <span>我star的音乐</span>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><FolderChecked /></el-icon>
            <span>我创建的歌单</span>
          </template>
          <el-menu-item :index="item.id" v-for="item in songList" :key="item.id" @click="showListInfo">
            <div class="song-list">
              <img :src="item.picUrl" alt="">
              <p>{{ item.name }}</p>
            </div>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Files /></el-icon>
            <span>我收藏的歌单</span>
          </template>
          <el-menu-item index="3-1">item one</el-menu-item>
          <el-menu-item index="3-2">item two</el-menu-item>
        </el-sub-menu>   
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { useCollectStore } from '@/stores/collect';
const collectStore = useCollectStore()
const songList = collectStore.songList
songList.forEach(item => {
  item.picUrl = new URL(item.picUrl, import.meta.url).href
})
const showListInfo = (e) => {
  console.log(e.index);
  
}

const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
</script>

<style scoped>
.tac{
  width: 250px;
}

.song-list{
  width: 100%;
  height: 100%;
  display: flex;
  
}

.song-list p{
  text-overflow: ellipsis;
  white-space: nowrap;
    overflow: hidden;
}

.song-list img{
  width: 46px;
  height: 46px;
  object-fit: cover;
  margin-right: 5px;
}
</style>