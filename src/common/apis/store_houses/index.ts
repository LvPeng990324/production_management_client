import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 查 */
export function getStoreHouseDataApi(params: Tables.StoreHouseTableRequestData) {
  return request<Tables.StoreHouseTableResponseData>({
    url: "store-house/get-store-house-list/",
    method: "get",
    params
  })
}
