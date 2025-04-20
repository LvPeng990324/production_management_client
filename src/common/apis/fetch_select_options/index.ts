import type { SelectOption } from "@@/composables/useFetchSelect"
import { request } from "@/http/axios"

/** 获取订单选项列表 */
export function get_order_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    resolve(request({
      url: "order/get-order-select-list/",
      method: "get"
    }))
  })
}

/** 获取物品选择列表 */
export function get_item_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    resolve(request({
      url: "item/get-item-select-list/",
      method: "get"
    }))
  })
}

/** 获取检验代码选择列表 */
export function get_inspection_code_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    resolve(request({
      url: "item/get-inspection-code-select-list/",
      method: "get"
    }))
  })
}

/** 获取客户选择列表 */
export function get_costomer_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    resolve(request({
      url: "customer/get-customer-select-list/",
      method: "get"
    }))
  })
}

/** 获取供应商选择列表 */
export function get_supplier_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    resolve(request({
      url: "supplier/get-supplier-select-list/",
      method: "get"
    }))
  })
}

/** 获取合同号选择列表 */
export function get_contract_number_select_option_list() {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    resolve(request({
      url: "item/get-contract-number-select-list/",
      method: "get"
    }))
  })
}

/** 获取图号选择列表 */
export function get_item_number_select_option_list(contract_number: string) {
  return new Promise<ApiResponseData<SelectOption[]>>((resolve) => {
    resolve(request({
      url: "item/get-item-number-select-list/",
      method: "get",
      params: {
        contract_number
      }
    }))
  })
}
