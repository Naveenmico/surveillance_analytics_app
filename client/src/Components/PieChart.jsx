import * as React from 'react';
import { Box } from '@mui/material';
import moment from 'moment-timezone';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';

const transformData = (data, fromDate, toDate, selectedModeltypes) => {
  const formattedSelectedModeltypes = selectedModeltypes.map(model => `ET_${model.toUpperCase()}`);
  //console.log(fromDate)
  let filteredData = data.filter(item => {
    const date = moment(new Date(item.date_time)).format('YYYY/MM/DD HH:mm:ss');
    return date >= fromDate && date <= toDate;
  });

  if (formattedSelectedModeltypes.length > 0 && !formattedSelectedModeltypes.includes('ET_SELECT ALL')) {
    filteredData = filteredData.filter(item => formattedSelectedModeltypes.includes(item.detection));
  }

  const aggregatedData = {};

  filteredData.forEach(item => {
    const detection = item.detection.replace(/^ET_/, '');
    if (!aggregatedData[detection]) {
      aggregatedData[detection] = 0;
    }
    aggregatedData[detection] += item.count;
  });

  return Object.keys(aggregatedData).map(detection => ({
    value: aggregatedData[detection],
    label: detection,
  }));
};

export default function PieArcLabel({data, timeFrom, timeTo, modelName, width, height }) {
  const size = {
    width: width,
    height: height,
  };
  const fromDate = moment(new Date(timeFrom)).format('YYYY/MM/DD HH:mm:ss');
  const toDate = moment(new Date(timeTo)).format('YYYY/MM/DD HH:mm:ss');
  const transformedData = transformData(data, fromDate, toDate, modelName);
  // console.log(fromDate);
  // console.log(toDate);
  // console.log(modelName)
  // console.log(transformedData);
  return (
    <>
      <Box sx={{ position: 'absolute', top: 0, left: 0, fontWeight: 'bold' }}>Analytic wise Distribution</Box>
      <PieChart
        series={[
          {
            arcLabel: (item) => `${item.value}`,
            arcLabelMinAngle: 45,
            data: transformedData,
            innerRadius: 50,
            startAngle: -180,
            endAngle: 180,
      
          },
        ]}
        sx={{
          [`& .${pieArcLabelClasses.root}`]: {
            fill: 'white',
            fontWeight: 'bold',
          }, 
        }}
      {...size}
      />
    </>
  );
}

