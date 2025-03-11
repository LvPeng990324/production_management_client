import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 增 */
export function createInspectionCodeDataApi(data: Tables.CreateOrUpdateInspectionCodeTableRequestData) {
  return request({
    url: "item/add-inspection-code/",
    method: "post",
    data
  })
}

/** 删 */
export function deleteInspectionCodeDataApi(inspection_code_id: number) {
  return request({
    url: `item/delete-inspection-code/`,
    method: "post",
    data: {
      inspection_code_id
    }
  })
}

/** 改 */
export function updateInspectionCodeDataApi(data: Tables.CreateOrUpdateInspectionCodeTableRequestData) {
  return request({
    url: "item/edit-inspection-code/",
    method: "post",
    data
  })
}

/** 查 */
export function getInspectionCodeDataApi(params: Tables.InspectionCodeTableRequestData) {
  return request<Tables.InspectionCodeTableResponseData>({
    url: "item/get-inspection-code-list/",
    method: "get",
    params
  })
}
