<template>
  <el-dialog
    v-model="collectStore.tipDiaVis"
    title="温馨提示"
    width="500"
    align-center
  >
    <slot name="message"></slot>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="collectStore.changeTipDiaVis(false)">取消</el-button>
        <slot name="confirm"></slot>
      </div>
    </template>
  </el-dialog>
</template>

<script  setup>
import { useCollectStore } from '@/stores/collect';
const collectStore = useCollectStore()
</script>