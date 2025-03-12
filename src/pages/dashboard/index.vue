<script lang="ts" setup>
import { ref } from "vue"

const order_count = ref(0)
const supplier_count = ref(0)

order_count.value = 10
</script>

<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="order_count">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                订单数
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="supplier_count">
            <template #title>
              <div style="display: inline-flex; align-items: center">
                供应商数
              </div>
            </template>
          </el-statistic>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: 20px;
  border-radius: 4px;
  background-color: var(--el-bg-color-overlay);
}
</style>
