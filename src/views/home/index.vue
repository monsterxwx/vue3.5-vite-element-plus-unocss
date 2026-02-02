<template>
  <el-row :gutter="20" :style="{ marginTop: showWorkTab ? '0' : '10px' }" class="card-list">
    <el-col
      v-for="(item, index) in dataList"
      :key="index"
      :sm="12"
      :md="6"
      :lg="6"
    >
      <BaseBox class=" art-custom-card">
        <span class="des color-$el-text-color-regular">{{ item.des }}</span>
        <CountTo class="text-26px" :end-val="item.num" />
        <div class="change-box">
          <span class="change-text">较上周</span>
          <span
            class="change"
            :class="[item.change.indexOf('+') === -1 ? 'text-danger' : 'text-success']"
          >
            {{ item.change }}
          </span>
        </div>
        <div class="iconfont-sys">
          <SvgIcon
            size="26"
            :name="item.icon"
          />
        </div>
      </BaseBox>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue'
import CountTo from '@/components/CountTo.vue'

const dataList = reactive([
  {
    des: '总访问次数',
    icon: 'say',
    startVal: 0,
    duration: 1000,
    num: 9120,
    change: '+20%'
  },
  {
    des: '在线访客数',
    icon: 'look',
    startVal: 0,
    duration: 1000,
    num: 182,
    change: '+10%'
  },
  {
    des: '点击量',
    icon: 'money',
    startVal: 0,
    duration: 1000,
    num: 9520,
    change: '-12%'
  },
  {
    des: '新用户',
    icon: 'vip',
    startVal: 0,
    duration: 1000,
    num: 156,
    change: '+30%'
  }
])

const option = ref({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    axisLabel: {
      fontSize: '14px'
    }
  },
  grid: {
    left: '10px',
    right: '20px',
    top: '20px',
    bottom: '10px',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    },
    textStyle: {
      fontSize: '14px'
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      fontSize: '14px'
    }
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line',
      label: {
        fontSize: '14px'
      },
      lineStyle: {
        width: '2)px'// 调整线条宽度
      },
      symbolSize: '8)px'
    }
  ]
})
</script>

  <style lang="scss" scoped>
  .card-list {
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    gap: 20px 0;
    background-color: transparent !important;
    .art-custom-card {
      position: relative;
      display: flex;
      justify-content: center;
      padding: 0 18px;
      width: 100%;
      height: 140px;
      list-style: none;
      transition: all 0.3s ease;
      box-sizing: border-box;
      flex-direction: column;
      gap: 10px;

      $icon-size: 52px;
      .iconfont-sys {
        position: absolute;
        top: 0;
        right: 20px;
        bottom: 0;
        overflow: hidden;
        margin: auto;
        width: $icon-size;
        height: $icon-size;
        font-size: 22px;
        border-radius: 12px;
        text-align: center;
        color: var(--el-color-primary) !important;
        background-color: var(--el-color-primary-light-9);
        line-height: $icon-size;
      }
      .des {
        display: block;
        height: 14px;
        font-size: 14px;
        line-height: 14px;
      }
      .number {
        display: block;
        margin-top: 10px;
        font-size: 28px;
        font-weight: 400;
      }
      .change-box {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .change-text {
          display: block;
          font-size: 13px;
          color: var(--el-text-color-placeholder);
        }
        .change {
          display: block;
          margin-left: 5px;
          font-size: 13px;
          font-weight: bold;
          &.text-success {
            color: var(--el-color-success);
          }
          &.text-danger {
            color: var(--el-color-danger);
          }
        }
      }
    }
  }
  .dark {
    .card-list {
      .art-custom-card {
        .iconfont-sys {
          background-color: #232323 !important;
        }
      }
    }
  }
  </style>
