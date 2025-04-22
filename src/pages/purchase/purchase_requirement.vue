<script lang="ts" setup>
import type { CreateOrUpdatePurchaseRequirementTableRequestData, PurchaseRequirementTableData } from "@@/apis/purchase/type"
import type { FormInstance, FormRules } from "element-plus"
import { get_item_select_option_list } from "@@/apis/fetch_select_options"
import { createPurchaseRequirementDataApi, getPurchaseRequirementDataApi, updatePurchaseRequirementDataApi } from "@@/apis/purchase"
import { useFetchSelect } from "@@/composables/useFetchSelect"
import { usePagination } from "@@/composables/usePagination"
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "PurchaseRequirement"
})

const { options: item_options } = useFetchSelect({
  api: get_item_select_option_list
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 增
const DEFAULT_FORM_DATA: CreateOrUpdatePurchaseRequirementTableRequestData = {
  purchase_requirement_id: 0,
  item_id: undefined,
  count: 0,
  date: ""
}
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = ref<CreateOrUpdatePurchaseRequirementTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))
const formRules: FormRules<CreateOrUpdatePurchaseRequirementTableRequestData> = {
  // name: [{ required: true, trigger: "blur", message: "请输入名字" }],
}
function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = formData.value.purchase_requirement_id === 0 ? createPurchaseRequirementDataApi : updatePurchaseRequirementDataApi
    api(formData.value).then(() => {
      ElMessage.success("操作成功")
      dialogVisible.value = false
      getTableData()
    }).finally(() => {
      loading.value = false
    })
  })
}
function resetForm() {
  formRef.value?.clearValidate()
  formData.value = cloneDeep(DEFAULT_FORM_DATA)
}
// #endregion

// #region 改
function handleUpdate(row: CreateOrUpdatePurchaseRequirementTableRequestData) {
  dialogVisible.value = true
  formData.value = cloneDeep(row)
}
// #endregion

// #region 查
const tableData = ref<PurchaseRequirementTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  item_name: ""
})
function getTableData() {
  loading.value = true
  getPurchaseRequirementDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    item_name: searchData.item_name
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
        <el-form-item prop="item_name" label="物品名字">
          <el-input v-model="searchData.item_name" placeholder="请输入" />
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
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true;formData.purchase_requirement_id = 0">
            新增
          </el-button>
        </div>
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
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="order_num" label="订单号" align="center" />
          <el-table-column prop="item_name" label="物品" align="center" />
          <el-table-column prop="count" label="数量" align="center" />
          <el-table-column prop="date" label="需求日期" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">
                修改
              </el-button>
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
    <!-- 新增/修改 -->
    <el-dialog
      v-model="dialogVisible"
      :title="formData.purchase_requirement_id === 0 ? '新增采购需求' : '修改采购需求'"
      width="50%"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="item_id" label="物品">
          <el-select-v2 v-model="formData.item_id" :options="item_options" filterable placeholder="请选择" />
        </el-form-item>
        <el-form-item prop="count" label="数量">
          <el-input v-model="formData.count" type="number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="date" label="需求日期">
          <el-date-picker
            v-model="formData.date"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleCreateOrUpdate">
          确认
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.el-alert {
  margin-bottom: 20px;
}

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
