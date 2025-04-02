<script lang="ts" setup>
import type { CreateOrUpdateItemTableRequestData, ItemTableData } from "@@/apis/items/type"
import type { FormInstance, FormRules } from "element-plus"
import { get_inspection_code_select_option_list, get_item_select_option_list, get_order_select_option_list } from "@@/apis/fetch_select_options"
import { createItemDataApi, deleteItemDataApi, getItemDataApi, updateItemDataApi } from "@@/apis/items"
import { useFetchSelect } from "@@/composables/useFetchSelect"
import { usePagination } from "@@/composables/usePagination"
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "Item"
})

const { options: order_options } = useFetchSelect({
  api: get_order_select_option_list
})
const { options: item_options } = useFetchSelect({
  api: get_item_select_option_list
})
const { options: inspection_code_options } = useFetchSelect({
  api: get_inspection_code_select_option_list
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 增
const DEFAULT_FORM_DATA: CreateOrUpdateItemTableRequestData = {
  item_id: 0,
  name: "",
  order_id: undefined,
  parent_item_id: undefined,
  cost: 0,
  sell_price: 0,
  model: "",
  num: 0,
  inspection_code_id_list: [],
  jet_position: "",
  item_number: "",
  description: "",
  material: "",
  weight: 0,
  revision: "",
  uom: "",
  line_type: "",
  supply_type: "",
  eco_number: "",
  danieli_standard: "",
  classification: "",
  paint_type: "",
  color_number: "",
  packing_number: "",
  pay_money_1: 0,
  pay_money_2: 0,
  receive_goods_date_1: "",
  receive_goods_date_2: "",
  send_goods_date_1: "",
  send_goods_date_2: ""
}
const dialogVisible = ref<boolean>(false)
const formRef = ref<FormInstance | null>(null)
const formData = ref<CreateOrUpdateItemTableRequestData>(cloneDeep(DEFAULT_FORM_DATA))
const formRules: FormRules<CreateOrUpdateItemTableRequestData> = {
  name: [{ required: true, trigger: "blur", message: "请输入名字" }]
}
function handleCreateOrUpdate() {
  formRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = formData.value.item_id === 0 ? createItemDataApi : updateItemDataApi
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

// #region 删
function handleDelete(row: ItemTableData) {
  ElMessageBox.confirm(`正在删除物品：${row.name}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteItemDataApi(row.item_id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
// #endregion

// #region 改
function handleUpdate(row: CreateOrUpdateItemTableRequestData) {
  dialogVisible.value = true
  formData.value = cloneDeep(row)
}
// #endregion

// #region 查
const tableData = ref<ItemTableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  name: ""
})
function getTableData() {
  loading.value = true
  getItemDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    name: searchData.name
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
        <el-form-item prop="name" label="名字">
          <el-input v-model="searchData.name" placeholder="请输入" />
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
          <el-button type="primary" :icon="CirclePlus" @click="dialogVisible = true;formData.item_id = 0">
            新增
          </el-button>
          <el-button type="danger" :icon="Delete">
            批量删除
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
          <el-table-column prop="name" label="名字" align="center" />
          <el-table-column prop="cost" label="自身成本" align="center" />
          <el-table-column prop="total_cost" label="总成本" align="center" />
          <el-table-column prop="sell_price" label="销售单价" align="center" />
          <el-table-column prop="model" label="型号" align="center" />
          <el-table-column prop="num" label="数量" align="center" />
          <el-table-column prop="total_num" label="总数量" align="center" />
          <el-table-column prop="order_num" label="订单号" align="center" />
          <el-table-column prop="level" label="层级" align="center" />
          <el-table-column prop="parent_item_name" label="上级物品" align="center" />
          <el-table-column prop="technical_change_count" label="技术变更数" align="center" />
          <el-table-column prop="inspection_code_name_list" label="检验代码" align="center" />
          <el-table-column prop="jet_position" label="JetPosition" align="center" />
          <el-table-column prop="item_number" label="ItemNumber" align="center" />
          <el-table-column prop="description" label="Description" align="center" />
          <el-table-column prop="material" label="Material" align="center" />
          <el-table-column prop="weight" label="Weight" align="center" />
          <el-table-column prop="revision" label="Revision" align="center" />
          <el-table-column prop="uom" label="Uom" align="center" />
          <el-table-column prop="line_type" label="LineType" align="center" />
          <el-table-column prop="supply_type" label="SupplyType" align="center" />
          <el-table-column prop="eco_number" label="EcoNumber" align="center" />
          <el-table-column prop="danieli_standard" label="DanieliStandard" align="center" />
          <el-table-column prop="classification" label="Classification" align="center" />
          <el-table-column prop="paint_type" label="油漆种类" align="center" />
          <el-table-column prop="color_number" label="色号" align="center" />
          <el-table-column prop="packing_number" label="箱单号" align="center" />
          <el-table-column prop="pay_money_1" label="付款1" align="center" />
          <el-table-column prop="pay_money_2" label="付款2" align="center" />
          <el-table-column prop="receive_goods_date_1" label="收货1" align="center" />
          <el-table-column prop="receive_goods_date_2" label="收货2" align="center" />
          <el-table-column prop="send_goods_date_1" label="发货2" align="center" />
          <el-table-column prop="send_goods_date_2" label="发货2" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-button type="primary" text bg size="small" @click="handleUpdate(scope.row)">
                修改
              </el-button>
              <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">
                删除
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
      :title="formData.item_id === 0 ? '新增物品' : '修改物品'"
      width="50%"
      @closed="resetForm"
    >
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="100px" label-position="left">
        <el-form-item prop="name" label="名字">
          <el-input v-model="formData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="cost" label="成本">
          <el-input v-model="formData.cost" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="sell_price" label="销售单价">
          <el-input v-model="formData.sell_price" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="model" label="型号">
          <el-input v-model="formData.model" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="num" label="数量">
          <el-input v-model="formData.num" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="order_id" label="订单">
          <el-select-v2 v-model="formData.order_id" :options="order_options" filterable clearable placeholder="请选择" />
        </el-form-item>
        <el-form-item prop="parent_item_id" label="上级物品">
          <el-select-v2 v-model="formData.parent_item_id" :options="item_options" filterable clearable placeholder="请选择" />
        </el-form-item>
        <el-form-item prop="inspection_code_id_list" label="检验代码">
          <el-select-v2 v-model="formData.inspection_code_id_list" :options="inspection_code_options" filterable multiple placeholder="请选择" />
        </el-form-item>
        <el-form-item prop="jet_position" label="JetPosition">
          <el-input v-model="formData.jet_position" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="item_number" label="ItemNumber">
          <el-input v-model="formData.item_number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="description" label="Description">
          <el-input v-model="formData.description" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="material" label="Material">
          <el-input v-model="formData.material" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="weight" label="Weight">
          <el-input v-model="formData.weight" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="revision" label="Revision">
          <el-input v-model="formData.revision" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="uom" label="Uom">
          <el-input v-model="formData.uom" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="line_type" label="LineType">
          <el-input v-model="formData.line_type" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="supply_type" label="SupplyType">
          <el-input v-model="formData.supply_type" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="eco_number" label="EcoNumber">
          <el-input v-model="formData.eco_number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="danieli_standard" label="DanieliStandard">
          <el-input v-model="formData.danieli_standard" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="classification" label="Classification">
          <el-input v-model="formData.classification" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="paint_type" label="油漆种类">
          <el-input v-model="formData.paint_type" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="color_number" label="色号">
          <el-input v-model="formData.color_number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="packing_number" label="箱单号">
          <el-input v-model="formData.packing_number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="pay_money_1" label="付款1">
          <el-input v-model="formData.pay_money_1" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="pay_money_2" label="付款2">
          <el-input v-model="formData.pay_money_2" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="receive_goods_date_1" label="收货1">
          <el-input v-model="formData.receive_goods_date_1" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="receive_goods_date_2" label="收货2">
          <el-input v-model="formData.receive_goods_date_2" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="send_goods_date_1" label="发货1">
          <el-input v-model="formData.send_goods_date_1" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="send_goods_date_2" label="发货2">
          <el-input v-model="formData.send_goods_date_2" placeholder="请输入" />
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
