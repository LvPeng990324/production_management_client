import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 增 */
export function createOrderDataApi(data: Tables.CreateOrUpdateTableRequestData) {
  return request({
    url: "order/add-order/",
    method: "post",
    data
  })
}

/** 删 */
export function deleteOrderDataApi(order_id: number) {
  return request({
    url: `order/delete-order/`,
    method: "post",
    data: {
      order_id
    }
  })
}

/** 改 */
export function updateOrderDataApi(data: Tables.CreateOrUpdateTableRequestData) {
  return request({
    url: "order/edit-order/",
    method: "post",
    data
  })
}

/** 查 */
export function getOrderDataApi(params: Tables.TableRequestData) {
  return request<Tables.TableResponseData>({
    url: "order/get-order-list/",
    method: "get",
    params
  })
}
