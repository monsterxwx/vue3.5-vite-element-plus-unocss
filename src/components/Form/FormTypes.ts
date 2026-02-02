export type FormItemType =
    | 'input'
    | 'select'
    | 'apiSelect'
    | 'treeSelect'
    | 'multipleSelect'
    | 'multipleTreeSelect'
    | 'date'
    | 'daterange'
    | 'timerange'
    | 'datetimerange'
    | 'monthrange'
    | 'upload'
    | 'slot'
    | 'slider'
    | 'radio'
    | 'checkbox'
    | 'time'
    | 'switch'
    | 'render' // Added render type
    | 'date-picker'; // In case it's used differently

export interface SelectOption {
    label: string;
    value: string | number | boolean;
    disabled?: boolean;
}

export interface UploadConfig {
    maxSize?: number; // MB
    fileType?: string[]; // e.g. ['png', 'jpg']
    tip?: string;
}

export interface FormItemProps {
    /**
     * 表单项类型
     * @default 'input'
     */
    type?: FormItemType;

    /**
     * 字段名 (对应 v-model 的键名)
     */
    prop: string;

    /**
     * 标签文本
     */
    label?: string;

    /**
     * 栅格布局配置 (ColProps)
     * 例如: { span: 12, xs: 24 }
     */
    col?: Record<string, any>;

    /**
     * 传递给组件内部的 props
     * 例如: { placeholder: '请输入', clearable: true }
     */
    props?: Record<string, any>;

    /**
     * 静态下拉选项 (用于 type='select')
     */
    options?: SelectOption[];

    /**
     * 动态数据 API (用于 type='apiSelect')
     */
    api?: (params?: any) => Promise<any>;

    /**
     * 传递给 API 的参数
     */
    apiParams?: Record<string, any>;

    /**
     * API 结果格式化函数
     * @param res API 返回的原始数据
     * @returns 格式化后的 SelectOption 数组
     */
    resultFormat?: (res: any) => SelectOption[];

    /**
     * API 数据中 label 对应的键名
     * @default 'label'
     */
    labelKey?: string;

    /**
     * API 数据中 value 对应的键名
     * @default 'value'
     */
    valueKey?: string;

    /**
     * API 数据中 disabled 对应的键名
     * @default 'disabled'
     */
    disabledKey?: string;

    /**
     * 动态控制是否显示
     * @param formData 当前表单数据
     */
    show?: (formData: any) => boolean;

    /**
     * 表单验证规则
     */
    rules?: any[];

    /**
     * 初始搜索参数 (用于 SearchForm 判断是否可清空)
     */
    initSearchParam?: any;

    /**
     * 日期范围拆分字段
     * 例如: ['startDate', 'endDate']
     */
    startEndKeys?: [string, string];

    /**
   * 上传组件配置
   */
    upload?: UploadConfig;

    // --- Missing Configs found by Lint ---

    /**
     * 单选/多选组的 props (type='radio' | 'checkbox')
     */
    groupProps?: Record<string, any>;

    /**
   * 单选按钮样式 ('radio-button' | undefined)
   */
    radioType?: 'radio-button';

    /**
     * 日期类型 (用于 el-date-picker 的 type 属性)
     */
    dateType?: 'year' | 'month' | 'date' | 'dates' | 'week' | 'datetime' | 'datetimerange' | 'daterange' | 'monthrange';

    /**
     * 自定义渲染函数 (type='render')
     */
    render?: (formData: any) => any;
}
