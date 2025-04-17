import * as React from 'react';
import moment from 'moment-timezone';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts';
import { Box } from '@mui/material';

const transformData = (data, fromDate, toDate, modelName) => {
  const formattedSelectedModeltypes = modelName.map(model => `ET_${model.toUpperCase()}`);
  const transformedData = [];

  const aggregatedData = {};

  data.forEach(item => {
    const itemDate = moment(new Date(item.date_time)).format('YYYY/MM/DD HH:mm:ss');
    if (itemDate >= fromDate && itemDate <= toDate) {
      const hour = moment(new Date(item.date_time)).format('HH'); // Get hour in 24-hour format

      if (!formattedSelectedModeltypes.includes('ET_SELECT ALL') && !formattedSelectedModeltypes.includes(item.detection)) {
        return;
      }

      if (!aggregatedData[hour]) {
        aggregatedData[hour] = { hour: hour };
      }

      if (!aggregatedData[hour][item.detection]) {
        aggregatedData[hour][item.detection] = 0;
      }

      aggregatedData[hour][item.detection] += item.count;
    }
  });

  for (const hour in aggregatedData) {
    transformedData.push(aggregatedData[hour]);
  }

  return transformedData;
};

const DEFAULT_MODELS = ['PERSON', 'INTRUSION', 'LOITER', 'DIRECTION'];

export default function BarsDataset({data, timeFrom, timeTo, modelName = [], width, height }) {
  const chartSetting = {
    yAxis: [
      {
        label: 'Count',
        visible: true,
        gridLines: { color: '#e0e0e0' },
      },
    ],
    xAxis: [
      {
        label: 'Hour',
        scaleType: 'band',
        visible: true,
        gridLines: { color: '#e0e0e0' },
        dataKey: 'hour',
      },
    ],
    width: width,
    height: height,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-20px, 0)',
      },
      [`.${axisClasses.bottom} .${axisClasses.label}`]: {
        transform: 'translate(0, 10px)',
      },
    },
    grid: {
      vertical: true,
      horizontal: true,
    },
  };

  let fromDate = moment(new Date(timeFrom)).format('YYYY/MM/DD HH:mm:ss');
  let toDate = moment(new Date(timeTo)).format('YYYY/MM/DD HH:mm:ss');

  if (modelName.length === 0) {
    modelName = DEFAULT_MODELS;
  }

  const transformedData = transformData(data, fromDate, toDate, modelName);

  return (
    <>
      <Box sx={{ position: 'absolute', top: 0, left: 0, fontWeight: 'bold' }}>Analytic detection vs Time</Box>
      <BarChart
        dataset={transformedData}
        xAxis={[{ scaleType: 'band', dataKey: 'hour' }]}
        series={modelName.map(detectionType => ({
          dataKey: `ET_${detectionType.toUpperCase()}`,
          label: detectionType,
          valueFormatter: value => `${value}`,
        }))}
        {...chartSetting}
      />
    </>
  );
}
