<script lang="ts" setup>
import type { CreateOrUpdateItemTableRequestData } from "@@/apis/items/type"
import type { CreateOrUpdateTableRequestData, TableData } from "@@/apis/orders/type"
import type { FormInstance, FormRules } from "element-plus"
import { get_costomer_select_option_list, get_supplier_select_option_list } from "@@/apis/fetch_select_options"
import { createItemDataApi, updateItemDataApi } from "@@/apis/items"
import { DEFAULT_ITEM_FORM_DATA, item_type_options, itemFormRules } from "@@/apis/items/type"
import { createOrderDataApi, deleteOrderDataApi, getOrderDataApi, updateOrderDataApi } from "@@/apis/orders"
import { useFetchSelect } from "@@/composables/useFetchSelect"
import { usePagination } from "@@/composables/usePagination"
import { CirclePlus, Delete, Download, Refresh, RefreshRight, Search } from "@element-plus/icons-vue"
import { cloneDeep } from "lodash-es"

defineOptions({
  // 命名当前组件
  name: "Order"
})

const { options: customer_options } = useFetchSelect({
  api: get_costomer_select_option_list
})
const { options: supplier_options } = useFetchSelect({
  api: get_supplier_select_option_list
})

const loading = ref<boolean>(false)
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()

// #region 增
const DEFAULT_ORDER_FORM_DATA: CreateOrUpdateTableRequestData = {
  order_id: 0,
  order_num: "",
  order_status: undefined,
  delivery_date: "",
  collect_money_1: 0,
  collect_money_2: 0,
  collect_money_3: 0,
  customer_id: undefined,
  pay_method: ""
}
const orderDialogVisible = ref<boolean>(false)
const itemDialogVisible = ref<boolean>(false)
const orderFormRef = ref<FormInstance | null>(null)
const itemFormRef = ref<FormInstance | null>(null)
const orderFormData = ref<CreateOrUpdateTableRequestData>(cloneDeep(DEFAULT_ORDER_FORM_DATA))
const itemFormData = ref<CreateOrUpdateItemTableRequestData>(cloneDeep(DEFAULT_ITEM_FORM_DATA))
const orderFormRules: FormRules<CreateOrUpdateTableRequestData> = {
  order_num: [{ required: true, trigger: "blur", message: "请输入订单号" }],
  order_status: [{ required: true, trigger: "blur", message: "请选择订单状态" }],
  customer_id: [{ required: true, trigger: "blur", message: "请选择客户" }]
}
function handleOrderCreateOrUpdate() {
  orderFormRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = orderFormData.value.order_id === 0 ? createOrderDataApi : updateOrderDataApi
    api(orderFormData.value).then(() => {
      ElMessage.success("操作成功")
      orderDialogVisible.value = false
      getTableData()
    }).finally(() => {
      loading.value = false
    })
  })
}
function handleItemCreateOrUpdate() {
  itemFormRef.value?.validate((valid) => {
    if (!valid) {
      ElMessage.error("表单校验不通过")
      return
    }
    loading.value = true
    const api = itemFormData.value.item_id === 0 ? createItemDataApi : updateItemDataApi
    api(itemFormData.value).then(() => {
      ElMessage.success("操作成功")
      itemDialogVisible.value = false
      getTableData()
    }).finally(() => {
      loading.value = false
    })
  })
}
function resetForm() {
  orderFormRef.value?.clearValidate()
  orderFormData.value = cloneDeep(DEFAULT_ORDER_FORM_DATA)
}
// #endregion

// #region 删
function handleDelete(row: TableData) {
  ElMessageBox.confirm(`正在删除订单：${row.order_num}，确认删除？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteOrderDataApi(row.order_id).then(() => {
      ElMessage.success("删除成功")
      getTableData()
    })
  })
}
// #endregion

// #region 改
function handleOrderUpdate(row: CreateOrUpdateTableRequestData) {
  orderDialogVisible.value = true
  orderFormData.value = cloneDeep(row)
}
// #endregion

// #region 查
const tableData = ref<TableData[]>([])
const searchFormRef = ref<FormInstance | null>(null)
const searchData = reactive({
  order_id: ""
})
function getTableData() {
  loading.value = true
  getOrderDataApi({
    currentPage: paginationData.currentPage,
    size: paginationData.pageSize,
    order_num: searchData.order_id
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
        <el-form-item prop="order_id" label="订单号">
          <el-input v-model="searchData.order_id" placeholder="请输入" />
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
          <el-button type="primary" :icon="CirclePlus" @click="orderDialogVisible = true;orderFormData.order_id = 0">
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
        <el-table :data="tableData" :border="true">
          <el-table-column type="expand">
            <template #default="table_datas">
              <div m="4">
                <p m="t-0 b-2">
                  总成本: {{ table_datas.row.total_cost }}
                </p>
                <p m="t-0 b-2">
                  收款: {{ table_datas.row.collect_money_1 }} | {{ table_datas.row.collect_money_2 }} | {{ table_datas.row.collect_money_3 }}
                </p>
                <h3>订单物品</h3>
                <el-table :data="table_datas.row.order_item_info_list" :border="true">
                  <el-table-column label="名字" prop="name" align="center" />
                  <el-table-column label="采购" align="center">
                    <el-table-column label="数量" prop="num" align="center" />
                    <el-table-column label="成本" prop="cost" align="center" />
                    <el-table-column label="总成本" prop="total_cost" align="center" />
                  </el-table-column>
                  <el-table-column label="销售" align="center">
                    <el-table-column label="数量" prop="num" align="center" />
                    <el-table-column label="单价" prop="sell_price" align="center" />
                    <el-table-column label="总价" prop="total_sell_price" align="center" />
                  </el-table-column>
                  <el-table-column label="收货" align="center">
                    <el-table-column label="收货1" prop="receive_goods_date_1" align="center" />
                    <el-table-column label="收货2" prop="receive_goods_date_2" align="center" />
                  </el-table-column>
                  <el-table-column label="发货" align="center">
                    <el-table-column label="发货1" prop="send_goods_date_1" align="center" />
                    <el-table-column label="发货2" prop="send_goods_date_2" align="center" />
                  </el-table-column>
                  <el-table-column label="型号" prop="model" align="center" />
                  <el-table-column label="箱单号" prop="packing_number" align="center" />
                </el-table>
              </div>
            </template>
          </el-table-column>

          <el-table-column type="selection" width="50" align="center" />
          <el-table-column prop="order_num" label="订单号" align="center" />
          <el-table-column prop="status" label="状态" align="center">
            <template #default="scope">
              <el-tag v-if="scope.row.order_status === 1" type="info" effect="plain" disable-transitions>
                待启动
              </el-tag>
              <el-tag v-else-if="scope.row.order_status === 2" type="warning" effect="plain" disable-transitions>
                制作中
              </el-tag>
              <el-tag v-else-if="scope.row.order_status === 3" type="success" effect="plain" disable-transitions>
                已完成
              </el-tag>
              <el-tag v-else type="danger" effect="plain" disable-transitions>
                未知
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="delivery_date" label="交货时间" align="center" />
          <el-table-column prop="customer_name" label="客户" align="center" />
          <el-table-column prop="pay_method" label="付款方式" align="center" />
          <el-table-column prop="worker_name" label="录入人" align="center" />
          <el-table-column fixed="right" label="操作" width="150" align="center">
            <template #default="scope">
              <el-dropdown trigger="click">
                <el-button type="primary">
                  操作
                </el-button>
                <template #dropdown>
                  <el-button type="primary" text bg size="small" @click="handleOrderUpdate(scope.row)">
                    修改
                  </el-button>
                  <el-button type="primary" text bg size="small" @click="itemDialogVisible = true;itemFormData.item_id = 0;itemFormData.order_id = scope.row.order_id">
                    新增物品
                  </el-button>
                  <el-button type="danger" text bg size="small" @click="handleDelete(scope.row)">
                    删除
                  </el-button>
                </template>
              </el-dropdown>
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
    <!-- 新增/修改订单 -->
    <el-dialog
      v-model="orderDialogVisible"
      :title="orderFormData.order_id === 0 ? '新增订单' : '修改订单'"
      width="50%"
      @closed="resetForm"
    >
      <el-form ref="orderFormRef" :model="orderFormData" :rules="orderFormRules" label-width="100px" label-position="left">
        <el-form-item prop="order_num" label="订单号">
          <el-input v-model="orderFormData.order_num" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="order_status" label="订单状态">
          <el-select v-model="orderFormData.order_status" placeholder="请选择">
            <el-option :value="1" label="待启动" />
            <el-option :value="2" label="制作中" />
            <el-option :value="3" label="已完成" />
          </el-select>
        </el-form-item>
        <el-form-item prop="delivery_date" label="交货日期">
          <el-date-picker
            v-model="orderFormData.delivery_date"
            type="date"
            placeholder="选择日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item prop="customer_id" label="客户">
          <el-select-v2 v-model="orderFormData.customer_id" :options="customer_options" filterable clearable placeholder="请选择" />
        </el-form-item>
        <el-form-item prop="pay_method" label="付款方式">
          <el-select v-model="orderFormData.pay_method" placeholder="请选择">
            <el-option value="现金" label="现金" />
            <el-option value="电汇" label="电汇" />
            <el-option value="承兑" label="承兑" />
          </el-select>
        </el-form-item>
        <el-form-item prop="collect_money_1" label="收款1">
          <el-input v-model="orderFormData.collect_money_1" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="collect_money_2" label="收款2">
          <el-input v-model="orderFormData.collect_money_2" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="collect_money_3" label="收款3">
          <el-input v-model="orderFormData.collect_money_3" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="collect_money_3" label="付款比例">
          <div class="inline-input-group">
          <el-input v-model="orderFormData.collect_money_3" placeholder="预付款" />
          <el-input v-model="orderFormData.collect_money_3" placeholder="进度款" />
          <el-input v-model="orderFormData.collect_money_3" placeholder="发货款" />
          <el-input v-model="orderFormData.collect_money_3" placeholder="安装款" />
          <el-input v-model="orderFormData.collect_money_3" placeholder="质保款" />
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="orderDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleOrderCreateOrUpdate">
          确认
        </el-button>
      </template>
    </el-dialog>

    <!-- 新增/修改物品 -->
    <el-dialog
      v-model="itemDialogVisible"
      :title="itemFormData.item_id === 0 ? '新增物品' : '修改物品'"
      width="50%"
      @closed="resetForm"
    >
      <el-form ref="itemFormRef" :model="itemFormData" :rules="itemFormRules" label-width="100px" label-position="left">
        <el-form-item prop="name" label="名字">
          <el-input v-model="itemFormData.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="item_type_value" label="类型">
          <el-select-v2 v-model="itemFormData.item_type_value" :options="item_type_options" filterable clearable placeholder="请选择" />
        </el-form-item>
        <el-form-item prop="num" label="数量">
          <el-input v-model="itemFormData.num" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="cost" label="成本">
          <el-input v-model="itemFormData.cost" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="sell_price" label="单价">
          <el-input v-model="itemFormData.sell_price" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="model" label="型号">
          <el-input v-model="itemFormData.model" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="supplier_id" label="供应商" v-if="itemFormData.item_type_value === 1">
          <el-select-v2 v-model="itemFormData.supplier_id" :options="supplier_options" filterable clearable placeholder="请选择" />
        </el-form-item>
        <el-form-item prop="contract_number" label="合同号" v-if="itemFormData.item_type_value === 1">
          <el-input v-model="itemFormData.contract_number" placeholder="请输入" />
        </el-form-item>
        <el-form-item prop="contract_number" label="发票(待做)" v-if="itemFormData.item_type_value === 1">
          <el-input v-model="itemFormData.contract_number" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="orderDialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" :loading="loading" @click="handleItemCreateOrUpdate">
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

.inline-input-group {
  display: flex;
  gap: 0px; /* 控制输入框之间的间距 */
  align-items: center; /* 垂直居中对齐 */
}
</style>
