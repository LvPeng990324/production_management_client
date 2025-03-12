import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 获取首页展示数据 */
export function get_dashboard_show_data_api() {
  return request<Tables.DashboardShowDataResposeData>({
    url: "dashboard/get-dashboard-show-data/",
    method: "get"
  })
}
