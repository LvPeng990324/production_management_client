<script lang="ts" setup>
import type { FormInstance, FormRules } from "element-plus"
import { reactive, ref } from "vue"

const ruleFormRef = ref<FormInstance>()

function checkAge(rule: any, value: any, callback: any) {
  if (!value) {
    return callback(new Error("Please input the age"))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error("Please input digits"))
    } else {
      if (value < 18) {
        callback(new Error("Age must be greater than 18"))
      } else {
        callback()
      }
    }
  }, 1000)
}

function validatePass(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the password"))
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField("checkPass")
    }
    callback()
  }
}
function validatePass2(rule: any, value: any, callback: any) {
  if (value === "") {
    callback(new Error("Please input the password again"))
  } else if (value !== ruleForm.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const ruleForm = reactive({
  pass: "",
  checkPass: "",
  age: ""
})

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
  age: [{ validator: checkAge, trigger: "blur" }]
})

function submitForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!")
    } else {
      console.log("error submit!")
    }
  })
}

function resetForm(formEl: FormInstance | undefined) {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="app-container">
    <el-card>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
      >
        <el-form-item label="Password" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item label="Confirm" prop="checkPass">
          <el-input
            v-model="ruleForm.checkPass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="Age" prop="age">
          <el-input v-model.number="ruleForm.age" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)">
            Submit
          </el-button>
          <el-button @click="resetForm(ruleFormRef)">
            Reset
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
