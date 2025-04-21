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

/** 入库 */
export function inStoreHouseDataApi(data: Tables.InStoreHouseRequestData) {
  return request({
    url: "store-house/in-store/",
    method: "post",
    data
  })
}

/** 出库 */
export function outStoreHouseDataApi(data: Tables.OutStoreHouseRequestData) {
  return request({
    url: "store-house/out-store/",
    method: "post",
    data
  })
}
