<template>
  <Card title="甲醛" v-bind="$attrs">
    <template #extra>
      <div :style="{ marginTop: '16px' }">
        <RadioGroup v-model:value="queryType" size="small" @change="onQueryChanged">
          <!-- <Radio.Button value="y">年</Radio.Button> -->
          <Radio.Button value="m">月</Radio.Button>
          <Radio.Button value="w">周</Radio.Button>
          <Radio.Button value="d">日</Radio.Button>
          <Radio.Button value="ld">昨天</Radio.Button>
        </RadioGroup>
      </div>
    </template>
    <VisitAnalysis ref="ch2oChart" />
  </Card>
</template>
<script lang="ts" setup>
  import VisitAnalysis from './VisitAnalysis.vue';
  import { onMounted, ref } from 'vue';
  import { Card, RadioGroup, Radio } from 'ant-design-vue';
  import dayjs from 'dayjs';

  const ch2oChart = ref<InstanceType<typeof VisitAnalysis>>();
  const queryType = ref<string>('d');

  const onQueryChanged = () => {
    switch (queryType.value) {
      case 'd':
        ch2oChart.value.loadCh2o(dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'));
        break;
      case 'ld':
        ch2oChart.value.loadCh2o(dayjs().add(-1, 'day').format('YYYY-MM-DD'), dayjs().add(-1, 'day').format('YYYY-MM-DD'));
        break;
      case 'w':
        ch2oChart.value.loadCh2o(dayjs().startOf('week').format('YYYY-MM-DD'), dayjs().endOf('week').format('YYYY-MM-DD'));
        break;
      case 'm':
        ch2oChart.value.loadCh2o(dayjs().startOf('M').format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'));
        break;
    }
  };

  onMounted(() => {
    ch2oChart.value.loadCh2o(dayjs().format('YYYY-MM-DD'), dayjs().format('YYYY-MM-DD'));
  });
</script>
