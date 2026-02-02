<template>
  <div class="w-100% h-100% flex flex-col gap-10px">
    <slot name="header" />
    <div class="flex-[1_0] min-h-0 w-100%">
      <el-table
        class="table-class"
        ref="tableRef"
        height="100%"
        :show-header="showheader"
        v-bind="$attrs"
      >
        <TableColumn v-for="item in columns" :key="item.prop || item.label" :col="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColumn>
      </el-table>
    </div>
    <div v-show="pagination" class="flex justify-end">
      <el-pagination
        v-model:current-page="params.pageNum"
        v-model:page-size="params.pageSize"
        :page-sizes="[10, 50, 100, 300]"
        layout="total, prev, pager, next, sizes, jumper"
        :total="params.total"
      />
    </div>
  </div>
</template>

<script setup>
import { getCurrentInstance, onMounted, reactive, ref, unref } from 'vue'
import TableColumn from './TableColumn.vue'
defineProps({
  columns: {
    type: Array,
    required: true
  },
  showheader: {
    type: Boolean,
    default: true
  },
  pagination: {
    type: Boolean,
    default: true
  }
})

const params = reactive({
  pageNum: 1,
  pageSize: 10,
  total: 0
})
const updateParams = (newParams) => {
  Object.assign(params, newParams)
}

const emits = defineEmits(['register'])

const tableRef = ref(null)

onMounted(() => {
  emits('register', getCurrentInstance()?.exposed || {})
})

// 单选
const setSingleSelect = (row) => {
  unref(tableRef).setCurrentRow(row)
}

defineExpose({
  tableRef,
  setSingleSelect,
  updateParams,
  params
})
</script>

<style lang="scss" scoped>

</style>
