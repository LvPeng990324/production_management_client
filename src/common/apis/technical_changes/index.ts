import type * as Tables from "./type"
import { request } from "@/http/axios"

/** 增 */
export function createTechnicalChangeDataApi(data: Tables.CreateOrUpdateTechnicalChangeTableRequestData) {
  return request({
    url: "item/add-technical-change/",
    method: "post",
    data
  })
}

/** 删 */
export function deleteTechnicalChangeDataApi(technical_change_id: number) {
  return request({
    url: `item/delete-technical-change/`,
    method: "post",
    data: {
      technical_change_id
    }
  })
}

/** 改 */
export function updateTechnicalChangeDataApi(data: Tables.CreateOrUpdateTechnicalChangeTableRequestData) {
  return request({
    url: "item/edit-technical-change/",
    method: "post",
    data
  })
}

/** 查 */
export function getTechnicalChangeDataApi(params: Tables.TechnicalChangeTableRequestData) {
  return request<Tables.TechnicalChangeTableResponseData>({
    url: "item/get-technical-change-list/",
    method: "get",
    params
  })
}
