<template>
  <el-table :data="playList" style="width: 100%">
    <el-table-column prop="name" label="歌曲标题" width="180" />
    <el-table-column prop="singer" label="歌手" width="180" />
    <el-table-column prop="name" label="专辑" />
  </el-table>
</template>

<script lang="ts" setup>
import { usePlaylistStore } from '@/stores/playlist';
const playListStore = usePlaylistStore()
const playList = playListStore.playlist
</script>
