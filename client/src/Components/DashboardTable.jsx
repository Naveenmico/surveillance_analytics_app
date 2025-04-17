import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Stack, Typography, Box, Tabs, Tab, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const transformData = (data, fromDate, toDate) => {
  let filteredData = data.filter(item => {
    const date = moment(new Date(item.date_time)).format('YYYY/MM/DD HH:mm:ss');
    return date >= fromDate && date <= toDate;
  });

  const aggregatedData = {};
  filteredData.forEach(entry => {
    const { detection, count } = entry;
    aggregatedData[detection] = (aggregatedData[detection] || 0) + count;
  });

  return aggregatedData;
}

export default function DenseTable({data, timeFrom, timeTo, modelName, width, height }) {
  const [value, setValue] = useState('one');
  const [rows, setRows] = useState([]);
  const [previousCounts, setPreviousCounts] = useState({});
  const [totalCounts, setTotalCounts] = useState({});

  let fromDate = new Date(timeFrom);
  let toDate = new Date(timeTo);
  fromDate = moment(fromDate).format('YYYY/MM/DD HH:mm:ss');
  toDate = moment(toDate).format('YYYY/MM/DD HH:mm:ss');

  useEffect(() => {
    if (modelName.length === 0) {
      modelName = ['PERSON', 'INTRUSION', 'LOITRE', 'DIRECTION'];
    }

    const transformedData = transformData(data, fromDate, toDate);
    setTotalCounts(transformedData);

    const calculatePreviousCounts = () => {
      let previousFromDate;
      let previousToDate;

      if (value === 'one') {
        previousFromDate = moment(fromDate).subtract(1, 'hours').format('YYYY/MM/DD HH:mm:ss');
        previousToDate = moment(toDate).subtract(1, 'hours').format('YYYY/MM/DD HH:mm:ss');
      } else if (value === 'two') {
        previousFromDate = moment(fromDate).subtract(1, 'days').format('YYYY/MM/DD HH:mm:ss');
        previousToDate = moment(toDate).subtract(1, 'days').format('YYYY/MM/DD HH:mm:ss');
      } else if (value === 'three') {
        previousFromDate = moment(fromDate).subtract(1, 'months').format('YYYY/MM/DD HH:mm:ss');
        previousToDate = moment(toDate).subtract(1, 'months').format('YYYY/MM/DD HH:mm:ss');
      } else {
        previousFromDate = moment(fromDate).subtract(1, 'years').format('YYYY/MM/DD HH:mm:ss');
        previousToDate = moment(toDate).subtract(1, 'years').format('YYYY/MM/DD HH:mm:ss');
      }

      const previousData = transformData(data, previousFromDate, previousToDate);
      setPreviousCounts(previousData);
    };

    calculatePreviousCounts();
  }, [data, fromDate, toDate, value, modelName]);

  const calculatePercentageChange = () => {
    const percentageChanges = {};
    Object.keys(totalCounts).forEach(detection => {
      const currentCount = totalCounts[detection];
      const previousCount = previousCounts[detection] || 0;
      const percentageChange = previousCount === 0 ? 100 : ((currentCount - previousCount) / previousCount) * 100;
      percentageChanges[detection] = percentageChange;
    });

    const rows = Object.keys(totalCounts).map(detection => ({
      name: detection,
      count: totalCounts[detection],
      percentageChange: percentageChanges[detection]
    }));

    setRows(rows);
  };

  useEffect(() => {
    calculatePercentageChange();
  }, [totalCounts, previousCounts]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <CalendarMonthIcon />
          <Typography variant="h7">{fromDate.split(' ')[0]} ---- {toDate.split(' ')[0]}</Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Hour" />
            <Tab value="two" label="Day" />
            <Tab value="three" label="Month" />
            <Tab value="four" label="Year" />
          </Tabs>
        </Stack>

        <TableContainer component={Paper} sx={{ width: width,height:height }}>
          <Table size="medium" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Detection Type</TableCell>
                <TableCell align="right">Total Count</TableCell>
                <TableCell align="right">Percentage Change</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    <b>{row.name.split('_')[1]}</b>
                  </TableCell>
                  <TableCell align="right"><b>{row.count}</b></TableCell>
                  <TableCell align="right" style={{ color: row.percentageChange >= 0 ? 'green' : 'red' }}>
                    <b>{row.percentageChange.toFixed(2)}%</b>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}


