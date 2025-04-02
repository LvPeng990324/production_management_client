export interface CreateOrUpdateTableRequestData {
  order_id?: number
  order_num: string
  order_status?: number
  order_start_time: string
  collect_money_1: number
  collect_money_2: number
  collect_money_3: number
}

export interface TableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  order_num: string
}

export interface OrderItem {
  name: string
  num: number
  cost: number
  total_cost: number
  sell_price: number
  total_sell_price: number
  model: string
  packing_number: string
}

export interface TableData {
  order_id: number
  order_num: string
  order_status: number
  order_start_time: string
  total_cost: number
  order_item_info_list: OrderItem[]
  collect_money_1: number
  collect_money_2: number
  collect_money_3: number
  pay_money_1: number
  pay_money_2: number
  receive_goods_date_1: string
  receive_goods_date_2: string
  send_goods_date_1: string
  send_goods_date_2: string
}

export type TableResponseData = ApiResponseData<{
  list: TableData[]
  total: number
}>

export type DeleteOrderRequestDate = ApiResponseData<{
  order_id: number
}>
