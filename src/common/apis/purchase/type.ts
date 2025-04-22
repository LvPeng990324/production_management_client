export interface CreateOrUpdatePurchaseRequirementTableRequestData {
  purchase_requirement_id?: number
  item_id?: number
  count: number
  date: string
}

export interface PurchaseRequirementTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  item_name: string
}

export interface PurchaseRequirementTableData {
  purchase_requirement_id: number
  item_id: number
  item_name: string
  count: number
  date: string
}

export type PurchaseRequirementTableResponseData = ApiResponseData<{
  list: PurchaseRequirementTableData[]
  total: number
}>
