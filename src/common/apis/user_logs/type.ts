export interface UserLogTableRequestData {
  /** 当前页码 */
  currentPage: number
  /** 查询条数 */
  size: number
  user_name: string
  action: string
  detail: string
}

export interface UserLogTableData {
  user_log_id: number
  user_name: string
  action: string
  detail: string
  create_time: string
}

export type UserLogTableResponseData = ApiResponseData<{
  list: UserLogTableData[]
  total: number
}>
