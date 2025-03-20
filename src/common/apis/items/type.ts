export interface CreateOrUpdateItemTableRequestData {
  item_id?: number
  name: string
  order_id?: number
  parent_item_id?: number
  cost: number
  inspection_code_id_list: number[]
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
  order_num: string
  parent_item_name: string
  cost: number
  total_cost: number
  technical_change_count: number
  inspection_code_name_list: string[]
}

export type ItemTableResponseData = ApiResponseData<{
  list: ItemTableData[]
  total: number
}>

export type DeleteItemRequestDate = ApiResponseData<{
  item_id: number
}>
