<template>
  <el-dialog
    v-model="collectStore.dialogVisible"
    title="收藏到歌单"
    width="350"
  >
    <el-scrollbar max-height="550px">
      <div class="play-list" @click="goCreateList">
        <div class="plus-img">+</div>
        <p>创建歌单</p>
      </div>
      <div v-for="item in collectStore.songList" :key="item.id" @click="collectToList(item.id)">
        <div class="play-list" v-if="item.creator !== item.id">
          <img :src="item.url" :alt="item.alt">
          <p>{{item.name}}</p>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
import { useCollectStore } from '@/stores/collect'
const collectStore = useCollectStore()
// 点击创建歌单，隐藏当前窗口，显示创建歌单窗口
const goCreateList = () => {
  collectStore.changeDiaVis(false)
  collectStore.changeDiaFormVis(true)
}

// 收藏到对应歌单
const collectToList = async (id) => {
  console.log(await collectStore.saveSongToList(id, collectStore.singleSong));
  collectStore.changeDiaVis(false)
}

</script>

<style scoped>
.play-list{
  width: 100%;
  height: 90px;
  display: flex;
  transition: 0.3s;
}

.play-list:hover{
  background-color: #ddd;
  cursor: pointer;
}

.play-list .plus-img{
  width: 80px;
  height: 80px;
  margin: 5px;
  background-color: #eee;
  color: #ccc;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play-list img{
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin: 5px;
}

.play-list p{
  margin: 5px;
  display: flex;
  align-items: center;
}
</style>