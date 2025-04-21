export interface StoreHouseTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  name: string
}

export interface InStoreHouseRequestData {
  contract_number: ""
  item_number: ""
  in_store_count: 0
}

export interface OutStoreHouseRequestData {
  contract_number: ""
  item_number: ""
  out_store_count: 0
}

export interface StoreHouseTableData {
  store_house_id: number
  remain_count: number
  item_name: string
  contract_number: string
  item_number: string
  model: string
}

export type StoreHouseTableResponseData = ApiResponseData<{
  list: StoreHouseTableData[]
  total: number
}>
