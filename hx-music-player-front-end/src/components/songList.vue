<script setup>
</script>

<template>
  <div class="song-list">
    <div class="img-group">
      <slot name="pic"></slot>
      <div class="mask"></div>
      <el-icon :size="40" color="#ddd" class="playIcon"><VideoPlay /></el-icon>
      
    </div>
    <p class="song-list-name">
      <slot name="name"></slot>
    </p>
  </div>
</template>

<style scoped>
.song-list{
  position:relative
}

.song-list-img{
  width: 170px;
  height: 170px;
  background-color: pink;
  object-fit: cover;
}

.img-group{
  cursor: pointer;
  height: 170px;
}

.song-list-name{
  font-size: 14px;
  word-break: break-all;
}

.mask{
  background-color: black;
  width: 170px;
  height: 170px;
  position: absolute;
  opacity: 0.3;
  top: 0;
  left: 0;
}

.playIcon{
  position: absolute;
  top: 65px;
  left: 65px;
}

.playIcon:hover{
  color: white
}
</style>