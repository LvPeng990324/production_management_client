import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 增 */
export function createItemDataApi(data: Tables.CreateOrUpdateItemTableRequestData) {
  return request({
    url: "item/add-item/",
    method: "post",
    data
  })
}

/** 删 */
export function deleteItemDataApi(item_id: number) {
  return request({
    url: `item/delete-item/`,
    method: "post",
    data: {
      item_id
    }
  })
}

/** 改 */
export function updateItemDataApi(data: Tables.CreateOrUpdateItemTableRequestData) {
  return request({
    url: "item/edit-item/",
    method: "post",
    data
  })
}

/** 查 */
export function getItemDataApi(params: Tables.ItemTableRequestData) {
  return request<Tables.ItemTableResponseData>({
    url: "item/get-item-list/",
    method: "get",
    params
  })
}
