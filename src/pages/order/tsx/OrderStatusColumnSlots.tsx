import type { VxeColumnPropTypes } from "vxe-table/types/column"

export const OrderStatusColumnSlots: VxeColumnPropTypes.Slots = {
  default: ({ row, column }) => {
    const cellValue = row[column.field] as keyof typeof type_def
    const type_def = {
      1: ['danger', '待启动'],
      2: ['warning', '制作中'],
      3: ['success', '已完成'],
    }
    const [type, value] = type_def[cellValue] || ['info', '未知']
    return [<span class={`el-tag el-tag--${type} el-tag--plain`}>{value}</span>]
  }
}
