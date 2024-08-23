<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="250px">
          <slideBar></slideBar>
        
      </el-aside>
      <el-main>

          <songListDetail></songListDetail>
    
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import slideBar from '@/components/slideBar.vue';
import songListDetail from '@/components/songListDetail.vue';
import { useUserInfoStore } from '@/stores/userInfo';
import { getCollectedId } from '@/api/songLists';
import { nextTick, onMounted } from 'vue';
const userInfoStore = useUserInfoStore()
// 进入我的音乐页面要刷新收藏的歌单
const updateCollectFn = async () => {
  const res = await getCollectedId(userInfoStore.userName)
  console.log(res[0].collect)
  
  userInfoStore.updateCollect(res[0].collect)
}
updateCollectFn()
</script>

<style scoped>
.common-layout{
  height: 825px;
}

.el-container{
  height: 100%;
}
</style>