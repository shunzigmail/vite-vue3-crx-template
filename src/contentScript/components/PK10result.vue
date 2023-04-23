<template>
  <div class="h-100">
    <!-- <el-table :data="tableData" height="100%" style="width: 100%">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" />
    </el-table> -->
    <el-auto-resizer>
      <template #default="{ height, width }">
        <el-table-v2
          :row-height="30"
          :columns="columns"
          :data="data"
          :width="width"
          :height="height"
        />
      </template>
    </el-auto-resizer>
  </div>
</template>
<script setup lang="ts">
import type { Column } from 'element-plus'
const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    maxWidth: 300
    // width: 150
  }))

const generateData = (
  columns: ReturnType<typeof generateColumns>,
  length = 200,
  prefix = 'row-'
) =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    )
  })

const columns: Array<Column> = [
  {
    align: 'center',
    dataKey: 'column-0',
    title: '期号',
    width: 100
  },
  {
    align: 'center',
    dataKey: 'column-1',
    title: '开奖结果',
    width: 300
  }
]
const data = generateData(columns, 200)
</script>
<style lang="scss" scoped>
:deep(.el-table th.el-table__cell.is-leaf) {
  background-color: var(--el-color-info-light-5);
}
</style>
