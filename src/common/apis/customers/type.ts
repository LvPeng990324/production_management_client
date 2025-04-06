export interface CreateOrUpdateCustomerTableRequestData {
  customer_id?: number
  name: string
  contact_person: string
  phone: string
  email: string
  tax_number: string
  address: string
  bank_card_number: string
  bank_name: string
}

export interface CustomerTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  name: string
}

export interface CustomerTableData {
  customer_id: number
  name: string
  contact_person: string
  phone: string
  email: string
  tax_number: string
  address: string
  bank_card_number: string
  bank_name: string
}

export type CustomerTableResponseData = ApiResponseData<{
  list: CustomerTableData[]
  total: number
}>

export type DeleteCustomerRequestDate = ApiResponseData<{
  customer_id: number
}>
