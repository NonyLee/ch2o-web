import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/env',
  name: 'Env',
  component: LAYOUT,
  redirect: '/env/ch2o',
  meta: {
    icon: 'ant-design:home-outlined',
    title: t('家庭环境'),
    orderNo: 11,
  },
  children: [
    {
      path: 'ch2o',
      name: 'Ch2o',
      component: () => import('/@/views/env/ch2o/index.vue'),
      meta: {
        title: t('甲醛'),
      },
    },
  ],
};

export default dashboard;
