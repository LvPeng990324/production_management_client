export interface CreateOrUpdateInspectionCodeTableRequestData {
  inspection_code_id?: number
  name: string
}

export interface InspectionCodeTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  name: string
}

export interface InspectionCodeTableData {
  inspection_code_id: number
  name: string
}

export type InspectionCodeTableResponseData = ApiResponseData<{
  list: InspectionCodeTableData[]
  total: number
}>

export type DeleteInspectionCodeRequestDate = ApiResponseData<{
  inspection_code_id: number
}>
