<script lang="ts" setup>
import type { TableResponseData } from "@@/apis/tables/type"
import type { ElMessageBoxOptions } from "element-plus"
import type { VxeFormInstance, VxeFormProps, VxeGridInstance, VxeGridProps, VxeModalInstance, VxeModalProps } from "vxe-table"
import { createOrderDataApi, deleteOrderDataApi, getOrderDataApi, updateOrderDataApi } from "@@/apis/orders"
import { OrderStatusColumnSlots } from "./tsx/OrderStatusColumnSlots"

defineOptions({
  // 命名当前组件
  name: "VxeTable"
})

// #region vxe-grid
interface RowMeta {
  id: number
  order_num: string
  order_status: string
  order_start_time: string
  /** vxe-table 自动添加上去的属性 */
  _VXE_ID?: string
}
const xGridDom = ref<VxeGridInstance>()
const xGridOpt: VxeGridProps = reactive({
  loading: true,
  autoResize: true,
  /** 分页配置项 */
  pagerConfig: {
    align: "right"
  },
  /** 表单配置项 */
  formConfig: {
    items: [
      {
        field: "order_num",
        itemRender: {
          name: "$input",
          props: {
            placeholder: "订单号",
            clearable: true
          }
        }
      },
      {
        itemRender: {
          name: "$buttons",
          children: [
            {
              props: {
                type: "submit",
                content: "查询",
                status: "primary"
              }
            },
            {
              props: {
                type: "reset",
                content: "重置"
              }
            }
          ]
        }
      }
    ]
  },
  /** 工具栏配置 */
  toolbarConfig: {
    refresh: true,
    custom: true,
    slots: {
      buttons: "toolbar-btns"
    }
  },
  /** 自定义列配置项 */
  customConfig: {
    /** 是否允许列选中  */
    checkMethod: ({ column }) => !["username"].includes(column.field)
  },
  /** 列配置 */
  columns: [
    {
      type: "checkbox",
      width: "50px"
    },
    {
      field: "order_num",
      title: "订单号"
    },
    {
      field: "order_status",
      title: "状态",
      slots: OrderStatusColumnSlots
    },
    {
      field: "order_start_time",
      title: "开始时间"
    },
    {
      title: "操作",
      width: "150px",
      fixed: "right",
      showOverflow: false,
      slots: {
        default: "row-operate"
      }
    }
  ],
  /** 数据代理配置项（基于 Promise API） */
  proxyConfig: {
    /** 启用动态序号代理 */
    seq: true,
    /** 是否代理表单 */
    form: true,
    /** 是否自动加载，默认为 true */
    autoLoad: true,
    props: {
      total: "total"
    },
    ajax: {
      query: ({ page, form }) => {
        xGridOpt.loading = true
        crudStore.clearTable()
        return new Promise((resolve) => {
          let total = 0
          let result: RowMeta[] = []
          // 加载数据
          const callback = (res: TableResponseData) => {
            if (res?.data) {
              // 总数
              total = res.data.total
              // 列表数据
              result = res.data.list
            }
            xGridOpt.loading = false
            // 返回值有格式要求，详情见 vxe-table 官方文档
            resolve({ total, result })
          }
          // 接口需要的参数
          const params = {
            order_num: form.order_num || "",
            order_status: form.order_status || "",
            size: page.pageSize,
            currentPage: page.currentPage
          }
          // 调用接口
          getOrderDataApi(params).then(callback).catch(callback)
        })
      }
    }
  }
})
// #endregion

// #region vxe-modal
const xModalDom = ref<VxeModalInstance>()
const xModalOpt: VxeModalProps = reactive({
  title: "",
  showClose: true,
  escClosable: true,
  maskClosable: true,
  beforeHideMethod: () => {
    xFormDom.value?.clearValidate()
    return Promise.resolve()
  }
})
// #endregion

// #region vxe-form
const xFormDom = ref<VxeFormInstance>()
const xFormOpt: VxeFormProps = reactive({
  span: 24,
  titleWidth: "100px",
  loading: false,
  /** 是否显示标题冒号 */
  titleColon: false,
  /** 表单数据 */
  data: {
    id: "",
    order_num: "",
    order_status: "",
    order_start_time: ""
  },
  /** 项列表 */
  items: [
    {
      field: "order_num",
      title: "订单号",
      itemRender: {
        name: "$input",
        props: {
          placeholder: "请输入"
        }
      }
    },
    {
      field: "order_status",
      title: "订单状态",
      itemRender: {
        name: "$select",
        props: {
          placeholder: "请选择"
        },
        options: [ // TODO 改成从接口获取
          { value: 1, label: "待启动" },
          { value: 2, label: "制作中" },
          { value: 3, label: "已完成" }
        ]
      }
    },
    {
      field: "order_start_time",
      title: "开始时间",
      itemRender: {
        name: "$input",
        props: {
          type: "datetime",
          placeholder: "请选择时间"
        },
      }
    },
    {
      align: "right",
      itemRender: {
        name: "$buttons",
        children: [
          {
            props: {
              content: "取消"
            },
            events: {
              click: () => xModalDom.value?.close()
            }
          },
          {
            props: {
              type: "submit",
              content: "确定",
              status: "primary"
            },
            events: {
              click: () => crudStore.onSubmitForm()
            }
          }
        ]
      }
    }
  ],
  /** 校验规则 */
  rules: {
    // order_num: [
    //   {
    //     required: true,
    //     validator: ({ itemValue }) => {
    //       switch (true) {
    //         case !itemValue:
    //           return new Error("请输入")
    //         case !itemValue.trim():
    //           return new Error("空格无效")
    //       }
    //     }
    //   }
    // ],
  }
})
// #endregion

// #region 增删改查
const crudStore = reactive({
  /** 表单类型，true 表示修改，false 表示新增 */
  isUpdate: true,
  /** 加载表格数据 */
  commitQuery: () => xGridDom.value?.commitProxy("query"),
  /** 清空表格数据 */
  clearTable: () => xGridDom.value?.reloadData([]),
  /** 点击显示弹窗 */
  onShowModal: (row?: RowMeta) => {
    if (row) {
      crudStore.isUpdate = true
      xModalOpt.title = "修改"
      // 赋值
      xFormOpt.data.order_id = row.id
      xFormOpt.data.order_num = row.order_num
      xFormOpt.data.order_status = row.order_status
      xFormOpt.data.order_start_time = row.order_start_time
    } else {
      crudStore.isUpdate = false
      xModalOpt.title = "新增"
    }
    // 禁用表单项
    const props = xFormOpt.items?.[0]?.itemRender?.props
    props && (props.disabled = crudStore.isUpdate)
    xModalDom.value?.open()
    nextTick(() => {
      !crudStore.isUpdate && xFormDom.value?.reset()
      xFormDom.value?.clearValidate()
    })
  },
  /** 确定并保存 */
  onSubmitForm: () => {
    if (xFormOpt.loading) return
    xFormDom.value?.validate((errMap) => {
      if (errMap) return
      xFormOpt.loading = true
      const callback = () => {
        xFormOpt.loading = false
        xModalDom.value?.close()
        ElMessage.success("操作成功")
        !crudStore.isUpdate && crudStore.afterInsert()
        crudStore.commitQuery()
      }
      if (crudStore.isUpdate) {
        // 调用修改接口
        const params = {
          order_id: xFormOpt.data.order_id,
          order_num: xFormOpt.data.order_num,
          order_status: xFormOpt.data.order_status,
          order_start_time: xFormOpt.data.order_start_time
        }
        updateOrderDataApi(params).then(callback).catch(callback)
      } else {
        // 调用新增接口
        const params = {
          order_num: xFormOpt.data.order_num,
          order_status: xFormOpt.data.order_status,
          order_start_time: xFormOpt.data.order_start_time
        }
        createOrderDataApi(params).then(callback).catch(callback)
      }
    })
  },
  /** 新增后是否跳入最后一页 */
  afterInsert: () => {
    const pager = xGridDom.value?.getProxyInfo()?.pager
    if (pager) {
      const currentTotal = pager.currentPage * pager.pageSize
      if (currentTotal === pager.total) {
        ++pager.currentPage
      }
    }
  },
  /** 删除 */
  onDelete: (row: RowMeta) => {
    const tip = `确定 <strong style="color: var(--el-color-danger);"> 删除 </strong> 订单 <strong style="color: var(--el-color-primary);"> ${row.order_num} </strong> ？`
    const config: ElMessageBoxOptions = {
      type: "warning",
      showClose: true,
      closeOnClickModal: true,
      closeOnPressEscape: true,
      cancelButtonText: "取消",
      confirmButtonText: "确定",
      dangerouslyUseHTMLString: true
    }
    ElMessageBox.confirm(tip, "提示", config).then(() => {
      deleteOrderDataApi({order_id: row.id}).then(() => {
        ElMessage.success("删除成功")
        crudStore.afterDelete()
        crudStore.commitQuery()
      })
    })
  },
  /** 删除后是否返回上一页 */
  afterDelete: () => {
    const tableData: RowMeta[] = xGridDom.value!.getData()
    const pager = xGridDom.value?.getProxyInfo()?.pager
    if (pager && pager.currentPage > 1 && tableData.length === 1) {
      --pager.currentPage
    }
  },
  /** TODO 获取订单状态选项 */
  getOrderStatusList: () => {
    return [
      { value: 1, label: "待处理" }
    ]
  },
  /** 更多自定义方法 */
  moreFn: () => {}
})
// #endregion
</script>

<template>
  <div class="app-container">
    <!-- 表格 -->
    <vxe-grid ref="xGridDom" v-bind="xGridOpt">
      <!-- 左侧按钮列表 -->
      <template #toolbar-btns>
        <vxe-button status="primary" icon="vxe-icon-add" @click="crudStore.onShowModal()">
          新增
        </vxe-button>
        <vxe-button status="danger" icon="vxe-icon-delete">
          批量删除
        </vxe-button>
      </template>
      <!-- 操作 -->
      <template #row-operate="{ row }">
        <el-button link type="primary" @click="crudStore.onShowModal(row)">
          修改
        </el-button>
        <el-button link type="danger" @click="crudStore.onDelete(row)">
          删除
        </el-button>
      </template>
    </vxe-grid>
    <!-- 弹窗 -->
    <vxe-modal ref="xModalDom" v-bind="xModalOpt">
      <!-- 表单 -->
      <vxe-form ref="xFormDom" v-bind="xFormOpt" />
    </vxe-modal>
  </div>
</template>
