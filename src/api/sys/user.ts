// import { defHttp } from '/@/utils/http/axios';
import { StringDecoder } from 'string_decoder';
import { LoginParams } from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

/**
 * @description: user login api
 */
export async function loginApi(params: LoginParams, mode = 'modal') {
  return {
    userId: '1',
    username: 'test',
    realName: '游客',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
    desc: 'manager',
    password: '123456',
    token: 'fakeToken1',
    homePath: '/dashboard/analysis',
    roles: [
      {
        roleName: 'Super Admin',
        value: 'super',
      },
    ],
  };
}

/**
 * @description: getUserInfo
 */
export async function getUserInfo() {
  return {
    userId: '1',
    username: 'test',
    realName: '游客',
    avatar: 'https://q1.qlogo.cn/g?b=qq&nk=190848757&s=640',
    desc: 'manager',
    password: '123456',
    token: 'fakeToken1',
    homePath: '/dashboard/analysis',
    roles: [
      {
        roleName: 'Super Admin',
        value: 'super',
      },
    ],
  };
}

export async function getPermCode() {
  return ['1000', '3000', '5000'];
}

export async function doLogout() {
  return {};
}
