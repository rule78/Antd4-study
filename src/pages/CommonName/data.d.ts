export interface TableListItem {
  code: string;
  createdBy: string;
  lastModifiedBy: string;
  name: string;
  remark: string;
  sort: string;
  request?: (values) => void;
}
export interface FormModalItem extends Partial<TableListItem>{};

export const FormModalData: FormModalItem = {
  sort: ''
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}

export interface TagItem {
  code?: string;
  createdBy?: string;                                                                                                                                                                                                                                                                 
  lastModifiedBy?: string;
  name?: string;
  remark?: string;
  sort?: string;
}

export interface MediumCategoryItem extends Partial<TagItem>{};
export type MediumCategoryList = Array<MediumCategoryItem>;

export interface FieldData {
  name: any;
  value?: string[];
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export type itemType = 'majoy' | 'medium' | 'min' | 'child';

export interface categorySubParamsType{
  pageSize?: number;
  current?: number; 
  parentCode?: string;
  [propName: string]: any;
}

export interface SearchFormProps {
  parentCode?: string;
  pageSize?: number;
  haveChild?: Boolean;
  fetchList: (params: categorySubParamsType) => void;
}
