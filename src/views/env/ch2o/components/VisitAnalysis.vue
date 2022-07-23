<template>
  <div ref="chartRef" abc="123" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { basicProps } from './props';
</script>
<script lang="ts" setup>
  import { ref, Ref } from 'vue';
  import { useECharts } from '/@/hooks/web/useECharts';
  import { Ch2oInfo, getCh2os } from '/@/api/env';
  import dayjs from 'dayjs';

  defineProps({
    ...basicProps,
  });
  const chartRef = ref<HTMLDivElement | null>(null);
  const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

  const dXTitles = [...new Array(24)].map((_item, index) => `${index}`);

  function getType(startDate: string, endDate: string) {
    if (startDate == endDate && endDate != null) {
      return 'hour';
    }
    return 'day';
  }

  function getX(startDate: string, endDate: string): string[] {
    if (startDate == endDate && endDate != null) {
      return dXTitles;
    }

    let xs: string[] = [];

    let sDate = dayjs(startDate);
    let eDate = dayjs(endDate);
    let nDate = sDate;

    while (nDate.valueOf() != eDate.valueOf()) {
      xs.push(nDate.format('YY/MM/DD'));
      nDate = nDate.add(1, 'day');
    }

    return xs;
  }

  function getY(infos: Ch2oInfo[], size: number, type: string): number[][] {
    let max: number[] = [...new Array(size)].map((_item, _) => 0);
    let ave: number[] = [...new Array(size)].map((_item, _) => 0);
    let min: number[] = [...new Array(size)].map((_item, _) => Number.MAX_VALUE);
    let hCount = 0;
    let currentH = 0;
    for (let i = 0; i < infos.length; i++) {
      let info = infos[i];
      let d = dayjs(info.time, 'YYYY-MM-DD HH:mm:ss');
      //时间切换
      if (d[type]() != currentH) {
        ave[currentH] = hCount == 0 ? 0 : Math.floor((ave[currentH] / hCount) * 1000) / 1000;
        currentH = d[type]();
        hCount = 0;
      }
      hCount++;
      if (info.value > max[currentH]) {
        max[currentH] = info.value;
      }
      if (info.value < min[currentH]) {
        min[currentH] = info.value;
      }
      ave[currentH] += info.value;
    }
    if (hCount > 0) {
      ave[currentH] = Math.floor((ave[currentH] / hCount) * 1000) / 1000;
    }

    return [max, ave, min.map((item, _) => (item == Number.MAX_VALUE ? 0 : item))];
  }

  function setChart(xs: string[], ys: number[][]) {
    setOptions({
      legend: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          lineStyle: {
            width: 1,
            color: '#019680',
          },
        },
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: xs,
        splitLine: {
          show: true,
          lineStyle: {
            width: 1,
            type: 'solid',
            color: 'rgba(226,226,226,0.5)',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: [
        {
          type: 'value',
          splitNumber: 4,
          axisTick: {
            show: false,
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(255,255,255,0.2)', 'rgba(226,226,226,0.2)'],
            },
          },
        },
      ],
      grid: { left: '1%', right: '50', top: '2%', bottom: 0, containLabel: true },
      series: [
        {
          name: '最大',
          smooth: true,
          data: ys[0],
          type: 'line',
          // areaStyle: {},
          itemStyle: {
            color: '#FFDEAD',
          },
        },
        {
          name: '平均',
          smooth: true,
          data: ys[1],
          type: 'line',
          // areaStyle: {},
          itemStyle: {
            color: '#90EE90',
          },
        },
        {
          name: '最小',
          smooth: true,
          data: ys[2],
          type: 'line',
          // areaStyle: {},
          itemStyle: {
            color: '#87CEFA',
          },
          markLine: {
            symbol: 'none',
            lineStyle: {
              color: '#b6a2de',
            },
            data: [{ name: '国标', yAxis: 0.05 }],
          },
        },
      ],
    });
  }

  const loadCh2o = async (startDate: string, endDate: string) => {
    let infos = await getCh2os({
      startTime: startDate,
      // startTime: dayjs(endDate).add(-1, 'day').format('YYYY-MM-DD HH:mm:ss'),
      endTime: dayjs(endDate).add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    });

    let type = getType(startDate, endDate);
    let xs = getX(startDate, endDate);
    let ys = getY(infos, xs.length, type);

    setChart(xs, ys);
  };

  defineExpose({
    dXTitles,
    loadCh2o,
  });
</script>
