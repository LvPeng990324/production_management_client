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
