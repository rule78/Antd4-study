import request from '@/utils/request';
import { categorySubParamsType } from '@/pages/CommonName/data';
interface categoryParamsType {
  pageSize?: number;
  parentCode?: string;
}

export async function fetchCategory(params?: categoryParamsType): Promise<any> {
  return request.get('/purchase/api/v3/product/category/parent', {params});
}

export async function queryCategorySub(params?: categorySubParamsType): Promise<any> {
  return request('/purchase/api/v3/product/category/sub', {params});
}

export async function queryCategoryInfo(code?: string): Promise<any> {
  return request(`/purchase/api/v3/product/category/${code}`);
}
