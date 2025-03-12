<script lang="ts" setup>
import type { DashboardShowData } from "@@/apis/dashboard/type"
import { get_dashboard_show_data_api } from "@@/apis/dashboard"

const dashboard_show_data = ref<DashboardShowData>({
  order_count: 0,
  supplier_count: 0
})

// 获取展示数据
function getShowData() {
  get_dashboard_show_data_api().then(({ data }) => {
    dashboard_show_data.value = data
  })
}
getShowData()
</script>

<template>
  <div class="app-container">
    <el-row :gutter="16">
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="dashboard_show_data.order_count" title="订单数" />
        </div>
      </el-col>
      <el-col :span="8">
        <div class="statistic-card">
          <el-statistic :value="dashboard_show_data.supplier_count" title="供应商数" />
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
