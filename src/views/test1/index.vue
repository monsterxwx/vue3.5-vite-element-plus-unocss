<template>
  <BaseBox class="p-20px">
    <BaseTable
      v-loading="loading"
      @register="regestTable"
      :columns="columns"
      :data="data"
    >
      <template #header>
        <SearchForm
          v-bind="searchConfig"
          @search="handleSearch"
        />
      </template>
    </basetable>
  </BaseBox>
</template>

<script setup>
import { informationList } from '@/api/comon'
import { useTable } from '@/hooks/useTable'
import searchConfig from './searchConfig'
import { reactive } from 'vue'

const columns = [
  {
    type: 'index',
    label: '序号',
    width: 60
  },
  {
    label: '名字',
    prop: 'name'
  },
  {
    label: '职位',
    prop: 'postCn'
  },
  {
    label: '性别',
    prop: 'sexCn'
  }
]

const searchInfo = reactive({
  test: '1'
})
const handleSearch = (params) => {
  Object.assign(searchInfo, params)
  reload()
}

const [regestTable, { data, loading, reload }] = useTable({
  api: informationList,
  searchInfo
})
</script>

<style lang="scss" scoped>

</style>
