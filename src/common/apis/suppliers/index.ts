import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 增 */
export function createSupplierDataApi(data: Tables.CreateOrUpdateSupplierTableRequestData) {
  return request({
    url: "supplier/add-supplier/",
    method: "post",
    data
  })
}

/** 删 */
export function deleteSupplierDataApi(supplier_id: number) {
  return request({
    url: `supplier/delete-supplier/`,
    method: "post",
    data: {
      supplier_id
    }
  })
}

/** 改 */
export function updateSupplierDataApi(data: Tables.CreateOrUpdateSupplierTableRequestData) {
  return request({
    url: "supplier/edit-supplier/",
    method: "post",
    data
  })
}

/** 查 */
export function getSupplierDataApi(params: Tables.SupplierTableRequestData) {
  return request<Tables.SupplierTableResponseData>({
    url: "supplier/get-supplier-list/",
    method: "get",
    params
  })
}
