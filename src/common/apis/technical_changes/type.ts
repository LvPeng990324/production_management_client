export interface CreateOrUpdateTechnicalChangeTableRequestData {
  technical_change_id?: number
  name: string
  item_id?: number
}

export interface TechnicalChangeTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  name: string
}

export interface TechnicalChangeTableData {
  technical_change_id: number
  name: string
  item_name: string
}

export type TechnicalChangeTableResponseData = ApiResponseData<{
  list: TechnicalChangeTableData[]
  total: number
}>

export type DeleteTechnicalChangeRequestDate = ApiResponseData<{
  technical_change_id: number
}>
