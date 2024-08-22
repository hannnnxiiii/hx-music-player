<script setup>
import navBar from './components/navBar.vue';
import audioPlayer from './components/audioPlayer.vue';
import collectDialog from './components/collectDialog.vue';
import createDialog from './components/createDialog.vue';
</script>

<template>

  <div class="common-layout">
    <el-container>
      <el-header><navBar></navBar></el-header>     
      <el-scrollbar>
        <el-main>      
          <router-view></router-view>                
        </el-main>
      </el-scrollbar>  
        
      <el-footer><audioPlayer></audioPlayer></el-footer>
    </el-container>
    <collectDialog></collectDialog>
    <createDialog></createDialog>
    
  </div>


  
</template>

<style>
.el-container{
  height: 100vh; 
  justify-content: space-evenly;
}
*{
  margin: 0;
}

.el-main{
  width: 1140px;
  margin: 0 auto;
  padding-top: 0;
  padding-bottom: 0;
}

.el-footer{
  border-top: 1px solid #dcdfe6;
}


</style>