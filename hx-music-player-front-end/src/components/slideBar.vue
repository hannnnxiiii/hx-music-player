<template>
  <el-row class="tac">
    <el-col :span="24">   
      <el-scrollbar>
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
            <el-menu-item :index="item.id" v-for="item in songList" :key="item.id" @click="showListInfo" :class="{hide: item.creator ===item.id}">
              <div class="song-list">
                <img :src="item.url" :alt="item.name">
                <p>{{ item.name }}</p>
              </div>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Files /></el-icon>
              <span>我收藏的歌单</span>
            </template>
            <el-menu-item index="3-1" v-for="item in collectedList" :key="item.id">
              <div class="song-list">
                <img :src="item.url" :alt="item.name">
                <p>{{ item.name }}</p>
              </div>
            </el-menu-item>
          </el-sub-menu>   
        </el-menu>
      </el-scrollbar>
    </el-col>
  </el-row>
</template>

<script setup>
import { useCollectStore } from '@/stores/collect';
const collectStore = useCollectStore()
import { useUserInfoStore } from '@/stores/userInfo';
const userInfoStore = useUserInfoStore()
// 引入获取我创建的歌单api，导航栏加载时调用
import { getCreatedList } from '@/api/songLists';
import { computed, nextTick, onMounted } from 'vue';
const getCreatedListFn = async (name) => {
  collectStore.saveSongList(await getCreatedList(name))
}

getCreatedListFn(userInfoStore.userName)
const songList = computed(() => collectStore.songList)

// 引入获取我收藏的歌单api，导航栏加载时调用
import { getCollectedList } from '@/api/songLists';
const getCollectedListFn = async (collect) => { 
  console.log(await getCollectedList(collect));
  
  collectStore.saveColList(await getCollectedList(collect))
}
getCollectedListFn(userInfoStore.collect)
const collectedList = computed(() => collectStore.collectedList)


// collectStore.saveSongList(res)


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
.hide{
  display: none
}

.tac{
  width: 250px;
}

.el-col{
  border-right: 1px solid #dcdfe6;
}

.el-menu{
  border-right: 0;
  height: 825px;
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