<script setup>
import { computed } from 'vue';
import musicTable from './musicTable.vue';
import { useCollectStore } from '@/stores/collect';
const collectStore = useCollectStore()
const currentSongList = computed(() => collectStore.currentSongList)
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
          <el-button type="primary">播放</el-button>
          <el-button>收藏</el-button>
        </div>
        <p class="introduce"></p>
      </div>
    </el-col>
  </el-row>
  <musicTable></musicTable>
  <!-- <el-row>
    <el-col :span="3"><div class="table-head"></div></el-col>
    <el-col :span="7"><div class="table-head">歌曲名</div></el-col>
    <el-col :span="7"><div class="table-head">歌手</div></el-col>
    <el-col :span="7"><div class="table-head">专辑</div></el-col>
  </el-row>
  <el-row>
    <el-col :span="3"><div class="table-body"></div></el-col>
    <el-col :span="7"><div class="table-body">歌曲名</div></el-col>
    <el-col :span="7"><div class="table-body">歌手</div></el-col>
    <el-col :span="7"><div class="table-body">专辑</div></el-col>
  </el-row> -->
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
