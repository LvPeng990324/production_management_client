<script lang="ts" setup>
import type { UserLogTableData } from "@@/apis/user_logs/type"
import type { FormInstance } from "element-plus"
import { getUserLogDataApi } from "@@/apis/user_logs"
import { usePagination } from "@@/composables/usePagination"
import { Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"

defineOptions({
  // 命名当前组件
  name: "UserLog"
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 查
const tableData = ref<UserLogTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  user_name: "",
  action: "",
  detail: ""
})
function getTableData() {
  loading.value = true
  getUserLogDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    user_name: searchData.user_name,
    action: searchData.action,
    detail: searchData.detail
  }).then(({ data }) => {
    paginationData.total = data.total
    tableData.value = data.list
  }).catch(() => {
    tableData.value = []
  }).finally(() => {
    loading.value = false
  })
}
function handleSearch() {
  paginationData.currentPage === 1 ? getTableData() : (paginationData.currentPage = 1)
}
function resetSearch() {
  searchFormRef.value?.resetFields()
  handleSearch()
}
// #endregion

// 监听分页参数的变化
watch([() => paginationData.currentPage, () => paginationData.pageSize], getTableData, { immediate: true })
</script>

<template>
  <div class="app-container">
    <el-card v-loading="loading" shadow="never" class="search-wrapper">
      <el-form ref="searchFormRef" :inline="true" :model="searchData">
        <el-form-item prop="user_name" label="名字">
          <el-input v-model="searchData.user_name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="action" label="行为">
          <el-input v-model="searchData.action" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="detail" label="详情">
          <el-input v-model="searchData.detail" placeholder="请输入" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleSearch">
            查询
          </el-button>
          <el-button :icon="Refresh" @click="resetSearch">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card v-loading="loading" shadow="never">
      <div class="toolbar-wrapper">
        <div>
          <el-tooltip content="下载">
            <el-button type="primary" :icon="Download" circle />
          </el-tooltip>
          <el-tooltip content="刷新当前页">
            <el-button type="primary" :icon="RefreshRight" circle @click="getTableData" />
          </el-tooltip>
        </div>
      </div>
      <div class="table-wrapper">
        <el-table :data="tableData">
          <el-table-column prop="create_time" label="时间" align="center" />
          <el-table-column prop="user_name" label="用户" align="center" />
          <el-table-column prop="action" label="行为" align="center" />
          <el-table-column prop="detail" label="详情" align="center">
            <template #default="scope">
              <div v-html="scope.row.detail.replace(/\n/g, '<br/>')" />
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager-wrapper">
        <el-pagination
          background
          :layout="paginationData.layout"
          :page-sizes="paginationData.pageSizes"
          :total="paginationData.total"
          :page-size="paginationData.pageSize"
          :current-page="paginationData.currentPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.search-wrapper {
  margin-bottom: 20px;
  :deep(.el-card__body) {
    padding-bottom: 2px;
  }
}

.toolbar-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.table-wrapper {
  margin-bottom: 20px;
}

.pager-wrapper {
  display: flex;
  justify-content: flex-end;
}
</style>
