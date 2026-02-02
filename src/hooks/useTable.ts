import { nextTick, onMounted, Ref, ref, unref, watch } from 'vue'

export interface TableParams {
  pageNum: number
  pageSize: number
  total: number
}

export interface TableInstance {
  params: TableParams
  updateParams: (params: Partial<TableParams>) => void
}

export interface UseTableOptions {
  api?: (params: any) => Promise<any>
  searchInfo?: any
  listField?: string
  immediate?: boolean
  afterFetch?: (res: any) => any
  formatParams?: (params: any) => any
}

export interface UseTableReturn {
  data: any[]
  params: TableParams
  getList: () => Promise<void>
  reload: () => void
  loading: Ref<boolean>
}

export const useTable = (options: UseTableOptions = {}): [(instance: TableInstance) => void, UseTableReturn] => {
  const { api, searchInfo, listField = 'rows', afterFetch = '', formatParams = '', immediate = true } = options
  const params = ref<TableParams>({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })

  const loading = ref(false)

  const tableInstance = ref<TableInstance | null>(null)

  const data = ref<any[]>([])

  const pendingTasks: (() => void)[] = []

  const runWhenReady = (task: () => void) => {
    if (tableInstance.value) {
      task()
    } else {
      pendingTasks.push(task)
    }
  }

  const flushPendingTasks = () => {
    nextTick(() => {
      pendingTasks.forEach(fn => fn())
      pendingTasks.length = 0
    })
  }

  const regestTable = (instance: TableInstance) => {
    tableInstance.value = instance

    params.value.pageNum = instance.params.pageNum
    params.value.pageSize = instance.params.pageSize

    // 2. 建立监听：监听组件内的 params 变化（用户点击分页）
    // 因为组件里改成了 reactive，这里的引用是稳定的
    watch(
      [() => instance.params.pageNum, () => instance.params.pageSize],
      ([newPage, newSize]) => {
        // 同步 Hook 状态
        params.value.pageNum = newPage
        params.value.pageSize = newSize
        // 自动触发接口
        getList()
      }
    )
    flushPendingTasks()
  }

  const getList = async () => {
    try {
      loading.value = true
      let searchParams = {}
      if (formatParams && formatParams instanceof Function) {
        searchParams = formatParams(unref(searchInfo))
      } else {
        searchParams = unref(searchInfo)
      }
      const res = await api({ ...params.value, ...searchParams })
      data.value = res[listField] || []
      if (afterFetch && afterFetch instanceof Function) {
        data.value = afterFetch(data.value)
      }
      params.value.total = res.total || 0

      runWhenReady(() => {
        tableInstance.value.updateParams({ total: res.total || 0 })
      })
    } catch (error) {
      console.log(error)
    } finally {
      loading.value = false
    }
  }
  const reload = () => {
    params.value.pageNum = 1
    if (tableInstance.value) {
      tableInstance.value.updateParams({ pageNum: 1 })
    }
    getList()
  }

  onMounted(() => {
    if (immediate) {
      getList()
    }
  })

  return [regestTable, { data, params, getList, reload, loading }]
}
