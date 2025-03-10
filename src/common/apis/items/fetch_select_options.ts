import type { SelectOption } from "@@/composables/useFetchSelect"
import { request } from "@/http/axios"

/** 模拟接口 */
export function get_item_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    // 模拟接口调用成功
    resolve(request({
      url: "item/get-item-select-list/",
      method: "get"
    }))
  })
}
