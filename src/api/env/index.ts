import { defHttp } from '/@/utils/http/axios';

export interface Ch2oInfo {
  time: string;
  value: number;
}

export interface Ch2oQuery {
  startTime: string;
  endTime: string;
}

enum Api {
  GetCh2o = '/env/getCh2os',
}

/**
 * @description: Get user menu based on id
 */

export const getCh2os = (params: Ch2oQuery) => {
  return defHttp.get<Ch2oInfo[]>({ url: Api.GetCh2o, params: params });
};
