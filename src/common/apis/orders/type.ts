export interface CreateOrUpdateTableRequestData {
  order_id?: number
  order_num: string
  order_status?: number
  delivery_date: string
  collect_money_1: number
  collect_money_2: number
  collect_money_3: number
  customer_id?: number
  pay_method: string
  pay_money_rate_1?: number
  pay_money_rate_2?: number
  pay_money_rate_3?: number
  pay_money_rate_4?: number
  pay_money_rate_5?: number
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
  delivery_date: string
  total_cost: number
  order_item_info_list: OrderItem[]
  collect_money_1: number
  collect_money_2: number
  collect_money_3: number
  receive_goods_date_1: string
  receive_goods_date_2: string
  send_goods_date_1: string
  send_goods_date_2: string
  worker_name: string
  customer_name: string
  pay_method: string
  pay_money_rate_1: number
  pay_money_rate_2: number
  pay_money_rate_3: number
  pay_money_rate_4: number
  pay_money_rate_5: number
}

export type TableResponseData = ApiResponseData<{
  list: TableData[]
  total: number
}>

export type DeleteOrderRequestDate = ApiResponseData<{
  order_id: number
}>
