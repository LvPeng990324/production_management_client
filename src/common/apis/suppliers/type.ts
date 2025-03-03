export interface CreateOrUpdateSupplierTableRequestData {
  name: string
  phone: string
}

export interface SupplierTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  phone: string
}

export interface SupplierTableData {
  supplier_id: number
  name: string
  phone: string
}

export type SupplierTableResponseData = ApiResponseData<{
  list: SupplierTableData[]
  total: number
}>

export type DeleteSupplierRequestDate = ApiResponseData<{
  supplier_id: number
}>
