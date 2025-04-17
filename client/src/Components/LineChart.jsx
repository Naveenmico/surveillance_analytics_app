import React from 'react';
import moment from 'moment-timezone';
import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

const transformData = (data, fromDate, toDate, modelName) => {
  const formattedSelectedModeltypes = modelName.map(model => `ET_${model.toUpperCase()}`);
  const allModelTypes = ['ET_PERSON', 'ET_INTRUSION', 'ET_LOITRE', 'ET_DIRECTION'];

  const effectiveModelTypes = formattedSelectedModeltypes.includes('ET_SELECT ALL')
    ? allModelTypes
    : formattedSelectedModeltypes;

  const transformedData = [];
  const aggregatedData = {};

  data.forEach(item => {
    const itemDate = moment(new Date(item.date_time)).format('YYYY/MM/DD HH:mm:ss');
    if (itemDate >= fromDate && itemDate <= toDate) {
      const hour = moment(new Date(item.date_time)).format('HH');
      if (!effectiveModelTypes.includes(item.detection)) {
        return;
      }

      if (!aggregatedData[hour]) {
        aggregatedData[hour] = { hour: hour, counts: {} };
      }

      if (!aggregatedData[hour].counts[item.detection]) {
        aggregatedData[hour].counts[item.detection] = 0;
      }

      aggregatedData[hour].counts[item.detection] += item.count;
    }
  });

  for (const hour in aggregatedData) {
    transformedData.push({ hour: aggregatedData[hour].hour, ...aggregatedData[hour].counts });
  }

  return transformedData;
};

const SimpleLineChart = ({ data, timeFrom, timeTo, modelName, width, height }) => {
  let fromDate = new Date(timeFrom);
  let toDate = new Date(timeTo);
  fromDate = moment(fromDate).format('YYYY/MM/DD HH:mm:ss');
  toDate = moment(toDate).format('YYYY/MM/DD HH:mm:ss');
  if (modelName.length === 0) {
    modelName = ['PERSON', 'INTRUSION', 'LOITRE', 'DIRECTION'];
  }

  const transformedData = transformData(data, fromDate, toDate, modelName);

  const filteredModelNames = modelName.includes('SELECT ALL')
    ? ['PERSON', 'INTRUSION', 'LOITRE', 'DIRECTION']
    : modelName;

  const series = filteredModelNames.map(model => {
    const dataKey = `ET_${model.toUpperCase()}`;
    return {
      data: transformedData.map(item => item[dataKey] || 0),
      label: model
    };
  });

  return (
    <>
      <Box sx={{ position: 'absolute', top: 0, left: 0, fontWeight: 'bold' }}>Analytic detection vs Time</Box>
      <LineChart
        width={width}
        height={height}
        series={series}
        xAxis={[{ scaleType: 'point', data: transformedData.map(item => item.hour) }]}
        grid={{ vertical: true, horizontal: true }}
      />
    </>
  );
};

export default SimpleLineChart;
