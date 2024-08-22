<script setup>
import topCarousel from '@/components/topCarousel.vue';
import songList from '@/components/songList.vue';
import { getSongLists, getSongList } from '@/api/songLists';
import { onMounted, ref } from 'vue';
import router from '@/router';
// 引入播放列表store
import { usePlaylistStore } from '@/stores/playlist';
const playlistStore = usePlaylistStore()
const songLists = ref([])
onMounted(async () => {
  songLists.value = await getSongLists()
})

// 点击头图跳转对应歌单
const redirectFromBanner = () => {
  router.push('/listdetailpage')
}

// 点击歌单跳转至对应歌单
const redirectFromList = (id,e) => {
  console.log(id,e.target.nodeName);
  // 点击按钮，播放并跳转
  // 更新播放列表
  if(e.target.nodeName === 'svg' || e.target.nodeName === 'path'){   
    const getSongListFn = async (id) => {         
      playlistStore.changePlaylist((await getSongList(id)).song)
    }
    getSongListFn(id)
    // 播放

    // 跳转
    router.push('/listdetailpage')
  } else if (e.target.nodeName === 'DIV'){
    // 点击封面，仅跳转
    router.push('/listdetailpage')
  }
  
  
  

}
</script>

<template>
  <el-row>
    <el-col :span="24">
      <div class="top-banner" @click="redirectFromBanner">
        <topCarousel></topCarousel>
      </div>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="24"><div class="hot-song-list">热门歌单</div></el-col>
  </el-row>
  <el-row :gutter="16">
    <el-col :span="4" v-for="item in songLists" :key="item.id">
      <songList @click="redirectFromList(item.id,$event)">
        <template #pic>
          <img :src="item.url" :alt="item.alt" class="song-list-img">
        </template>
        <template #name>{{ item.name }}</template>
      </songList>
    </el-col>
  </el-row>
  
</template>

<style lang="scss">
.el-row {
  margin-bottom: 20px;
}
.top-banner{
  cursor: pointer;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.grid-content:first-of-type{
  min-height: 0;
}

.hot-song-list{
  padding: 10px 0;
  border-bottom: 1px solid #409EFF;
}

.song-list-img{
  width: 170px;
  height: 170px;
  background-color: pink;
  object-fit: cover;
}
</style>
