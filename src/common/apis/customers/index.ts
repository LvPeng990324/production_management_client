import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 增 */
export function createCustomerDataApi(data: Tables.CreateOrUpdateCustomerTableRequestData) {
  return request({
    url: "customer/add-customer/",
    method: "post",
    data
  })
}

/** 删 */
export function deleteCustomerDataApi(customer_id: number) {
  return request({
    url: `customer/delete-customer/`,
    method: "post",
    data: {
      customer_id
    }
  })
}

/** 改 */
export function updateCustomerDataApi(data: Tables.CreateOrUpdateCustomerTableRequestData) {
  return request({
    url: "customer/edit-customer/",
    method: "post",
    data
  })
}

/** 查 */
export function getCustomerDataApi(params: Tables.CustomerTableRequestData) {
  return request<Tables.CustomerTableResponseData>({
    url: "customer/get-customer-list/",
    method: "get",
    params
  })
}
