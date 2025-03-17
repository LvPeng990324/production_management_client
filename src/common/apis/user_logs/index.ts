import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 查 */
export function getUserLogDataApi(params: Tables.UserLogTableRequestData) {
  return request<Tables.UserLogTableResponseData>({
    url: "system-management/get-user-log-list/",
    method: "get",
    params
  })
}
