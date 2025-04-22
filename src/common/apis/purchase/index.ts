import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 增 */
export function createPurchaseRequirementDataApi(data: Tables.CreateOrUpdatePurchaseRequirementTableRequestData) {
  return request({
    url: "purchase/add-purchase-requirement/",
    method: "post",
    data
  })
}

/** 改 */
export function updatePurchaseRequirementDataApi(data: Tables.CreateOrUpdatePurchaseRequirementTableRequestData) {
  return request({
    url: "purchase/edit-purchase-requirement/",
    method: "post",
    data
  })
}

/** 查 */
export function getPurchaseRequirementDataApi(params: Tables.PurchaseRequirementTableRequestData) {
  return request<Tables.PurchaseRequirementTableResponseData>({
    url: "purchase/get-purchase-requirement-list/",
    method: "get",
    params
  })
}
