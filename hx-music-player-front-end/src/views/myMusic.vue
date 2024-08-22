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
</script>

<style scoped>
.common-layout{
  height: 825px;
}

.el-container{
  height: 100%;
}
</style>