<script lang="ts" setup>

</script>

<template>
  <div class="app-container">
    <el-steps
      style="max-width: 600px"
      :space="200"
      :active="1"
      finish-status="success"
    >
      <el-step title="Done" />
      <el-step title="Processing" />
      <el-step title="Step 3" />
    </el-steps>
  </div>
</template>
