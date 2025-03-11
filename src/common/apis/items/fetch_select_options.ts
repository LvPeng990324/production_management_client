import type { SelectOption } from "@@/composables/useFetchSelect"
import { request } from "@/http/axios"

/** 获取物品选择列表 */
export function get_item_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    // 模拟接口调用成功
    resolve(request({
      url: "item/get-item-select-list/",
      method: "get"
    }))
  })
}

/** 获取物品选择列表 */
export function get_inspection_code_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    // 模拟接口调用成功
    resolve(request({
      url: "item/get-inspection-code-select-list/",
      method: "get"
    }))
  })
}
