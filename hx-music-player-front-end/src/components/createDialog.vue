<template>
  <el-dialog v-model="collectStore.dialogFormVisible" width="500">
    <div class="form">
      <p>创建歌单</p>
      <el-input v-model="name" style="width: 340px" placeholder="歌单名称" />
      <el-button type="primary" @click="tryCreateList" size="large">确定</el-button>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import router from '@/router';
// 引入store中的dialogFormVisible，方便在各个路由控制该窗口显示
import { useCollectStore } from '@/stores/collect';
const collectStore = useCollectStore()
import { createSongList } from '@/api/songLists';
import { useUserInfoStore } from '@/stores/userInfo';
const userInfoStore = useUserInfoStore()
// 引入playlistStore，拿歌曲详细信息
import { usePlaylistStore } from '@/stores/playlist';
const playlistStore = usePlaylistStore()
// 引入添加歌曲至歌单的api
import { addSong } from '@/api/songLists';
const name = ref('')
// 点击确定按钮尝试创建歌单
const tryCreateList = async () => {
  collectStore.changeDiaFormVis(false)
  const obj = playlistStore.playlist[playlistStore.i]
  const res = await createSongList(name.value, obj.url, [], userInfoStore.userName) 
  console.log(res);
  collectStore.pushNewList(res)
  // 跳转到 /mymusic 页面并传递歌单 ID
  router.push({
    path: '/mymusic',
    query: { id: res.id }
  })
  collectStore.saveNewId(res.id)
  // 创建完成之后，把当前歌曲加入收藏夹，因为是从当前歌曲播放器点击收藏的
    
  const result = await addSong(obj.name, obj.singer, obj.url, obj.songUrl, obj.id, res.id)
  console.log(result);
  
  
  
}


</script>

<style scoped>
.form{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 250px;
  justify-content: space-around;
}

.form p{
  font-size: 30px;
}

.form .el-input{
  height: 50px;
  font-size: 20px
}

.form .el-button{
  font-size: 16px
}
</style>