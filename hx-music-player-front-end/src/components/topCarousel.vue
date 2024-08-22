<script setup>
  import { getBanners } from '@/api';
  import { onMounted, ref } from 'vue';
  const bannerList = ref([])
  onMounted(async() => {
    bannerList.value = await getBanners()
  })
</script>

<template>
  <div class="block text-center">
    <el-carousel height="618px">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <h3 class="small justify-center">
          <img :src="item.url" :alt="item.alt" style="width: 100%; height: 100%;" />
        </h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.demonstration {
  color: var(--el-text-color-secondary);
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
  text-align: center;
  height: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__item img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 适应图片尺寸 */
}
</style>
