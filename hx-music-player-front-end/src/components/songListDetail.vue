<script setup>
import musicTable from './musicTable.vue';
</script>

<template>
  <el-row>
    <el-col :span="8">
      <img src="../assets/pic/songListPics/songListPic1.jpg" alt="">
    </el-col>
    <el-col :span="16">
      <div class="list-detail-info">
        <p class="name">葬送的芙莉莲 BGM配乐 已排序</p>
        <p class="creator">hannnnxiiii</p>
        <div class="button-group">
          <el-button type="primary">播放</el-button>
          <el-button>收藏</el-button>
        </div>
        <p class="introduce"></p>
      </div>
    </el-col>
  </el-row>
  <musicTable></musicTable>
</template>

<style scoped>
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
