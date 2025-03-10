import type { SelectOption } from "@@/composables/useFetchSelect"
import { request } from "@/http/axios"

/** 模拟接口 */
export function get_order_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    // 模拟接口调用成功
    resolve(request({
      url: "order/get-order-select-list/",
      method: "get"
    }))
  })
}
