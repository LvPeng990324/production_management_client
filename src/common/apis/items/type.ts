import type { FormRules } from "element-plus"

export interface CreateOrUpdateItemTableRequestData {
  item_id?: number
  name: string
  item_type_value?: number
  order_id?: number
  parent_item_id?: number
  cost: number
  sell_price: number
  model: string
  num: number
  inspection_code_id_list: number[]
  jet_position: string
  item_number: string
  description: string
  material: string
  weight: number
  revision: string
  uom: string
  line_type: string
  supply_type: string
  eco_number: string
  danieli_standard: string
  classification: string
  paint_type: string
  color_number: string
  packing_number: string
  pay_money_1: number
  pay_money_2: number
  receive_goods_date_1: string
  receive_goods_date_2: string
  send_goods_date_1: string
  send_goods_date_2: string
  contract_number: string
  supplier_id?: number
}

export interface ItemTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  name: string
}

export interface ItemTableData {
  item_id: number
  name: string
  item_type_label: string
  order_num: string
  parent_item_name: string
  cost: number
  total_cost: number
  sell_price: number
  model: string
  level: number
  technical_change_count: number
  num: number
  total_num: number
  inspection_code_name_list: string[]
  jet_position: string
  item_number: string
  description: string
  material: string
  weight: number
  revision: string
  uom: string
  line_type: string
  supply_type: string
  eco_number: string
  danieli_standard: string
  classification: string
  paint_type: string
  color_number: string
  packing_number: string
  pay_money_1: number
  pay_money_2: number
  receive_goods_date_1: string
  receive_goods_date_2: string
  send_goods_date_1: string
  send_goods_date_2: string
  contract_number: string
  supplier_name: string
}

export type ItemTableResponseData = ApiResponseData<{
  list: ItemTableData[]
  total: number
}>

export type DeleteItemRequestDate = ApiResponseData<{
  item_id: number
}>

export const DEFAULT_ITEM_FORM_DATA: CreateOrUpdateItemTableRequestData = {
  item_id: 0,
  name: "",
  item_type_value: undefined,
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
  send_goods_date_2: "",
  contract_number: "",
  supplier_id: undefined
}

export const itemFormRules: FormRules<CreateOrUpdateItemTableRequestData> = {
  name: [{ required: true, trigger: "blur", message: "请输入名字" }],
  item_type_value: [{ required: true, trigger: "blur", message: "请选择物品类型" }]
}
