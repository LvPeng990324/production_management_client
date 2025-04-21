<script lang="ts" setup>
import type { OutStoreHouseRequestData } from "@@/apis/store_houses/type"
import type { SelectOption } from "@@/composables/useFetchSelect"
import type { FormInstance } from "element-plus"
import { get_contract_number_select_option_list, get_item_number_select_option_list } from "@@/apis/fetch_select_options"
import { outStoreHouseDataApi } from "@@/apis/store_houses"
import { useFetchSelect } from "@@/composables/useFetchSelect"
import { cloneDeep } from "lodash-es"
import { ref } from "vue"

const loading = ref<boolean>(false)
const item_number_options = ref<SelectOption[]>([])
const formRef = ref<FormInstance | null>(null)
const formData = ref<OutStoreHouseRequestData>(cloneDeep({
  contract_number: "",
  item_number: "",
  out_store_count: 0
}))

const { options: contract_number_options } = useFetchSelect({
  api: get_contract_number_select_option_list
})

// 监听合同号变化
function watchContractNumber() {
  get_item_number_select_option_list(formData.value.contract_number).then((res) => {
    item_number_options.value = res.data
  })
}

// 提交入库信息
function handle_in_store() {
  loading.value = true
  outStoreHouseDataApi(formData.value).then(() => {
    ElMessage.success("出库成功")
  }).finally(() => {
    loading.value = false
  })
}
</script>

<template>
  <div class="app-container">
    <el-card shadow="never">
      <div class="m-4">
        <p>出库流程</p>
        <el-form ref="formRef" :model="formData" label-width="100px" label-position="left">
          <el-form-item prop="contract_number" label="合同号">
            <el-select-v2 v-model="formData.contract_number" :options="contract_number_options" @change="watchContractNumber" filterable clearable placeholder="请选择" />
          </el-form-item>
          <el-form-item prop="item_number" label="图号" v-if="formData.contract_number">
            <el-select-v2 v-model="formData.item_number" :options="item_number_options" filterable clearable placeholder="请选择" />
          </el-form-item>
          <el-form-item prop="in_store_count" label="出库数量" v-if="formData.item_number">
            <el-input v-model="formData.out_store_count" type="number" placeholder="请输入" />
          </el-form-item>
        </el-form>
        <el-button type="primary" :loading="loading" @click="handle_in_store">
          确认
        </el-button>
      </div>
    </el-card>
  </div>
</template>
