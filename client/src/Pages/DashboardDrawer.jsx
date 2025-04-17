import React, { useState, useEffect } from 'react';
import { Drawer, CssBaseline, List, Divider, ListItem, ListItemButton, ListItemText, InputLabel, MenuItem, FormControl, Select, Button, Checkbox, Stack, IconButton } from '@mui/material';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import OutlinedInput from '@mui/material/OutlinedInput';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Paper, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import Header from '../Components/Header';
import TreeView from '../Components/TreeView';
import PieArcLabel from '../Components/PieChart';
import SimpleLineChart from '../Components/LineChart';
import SimpleBarChart from '../Components/BarChart';
import DenseTable from '../Components/DashboardTable';
import { config } from '../config/config';
import DetectionCard from '../Components/DetectionCard';
const drawerWidth = 300;

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 300,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  position: 'relative', // Ensure relative positioning for the fullscreen icon
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const FullScreenCard = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  zIndex: 1300,
  padding: theme.spacing(2),
  width: '75%', // Adjusted width to 80%
  height: '70%', // Adjusted height to 80%
  overflow: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'rgba(255, 255, 255, 0.9)', // Added background with slight transparency
}));
export default function ClippedDrawer() {
  const [date_range, setDate_range] = useState('');
  const [timeFrom, setTimeFrom] = useState(dayjs('2023-12-31T15:30'));
  const [timeTo, setTimeTo] = useState(dayjs('2024-04-17T15:30'));
  const [modelName, setModelName] = useState([]);
  const [modelNames, setModelNames] = useState([]);
  const [treeData, setTreeData] = useState([]);
  const [data, setData] = useState([]);
  const [detectionCount, setDetectionCount] = useState([])
  const [filterCriteria, setFilterCriteria] = useState({
    dateRange: '',
    timeFrom: dayjs('2023-12-31T15:30'),
    timeTo: dayjs('2024-04-17T15:30'),
    modelName: []
  });
  const [fullscreenChart, setFullscreenChart] = useState(null);
  useEffect(() => {
    getTreeData();
    getDetectionData();
    getDetectionCount();
  }, []);

  const getDetectionCount = async () => {
    try {
      const response = await axios.get(`${config.URL}count`);
      setDetectionCount(response.data.data[0]);
      //console.log(response.data.data)
    } catch (error) {
      console.log('Error in fetching Data', error);
    }
  }

  const getDetectionData = async () => {
    try {
      const response = await axios.get(`${config.URL}data`);
      setData(response.data.data);
      const uniqueDetections = Array.from(new Set(response.data.data.map(item => item.detection.split('_')[1])));
      setModelNames(uniqueDetections);
      //console.log(response.data.data)
    } catch (error) {
      console.log('Error in fetching Data', error);
    }
  }

  const getTreeData = async () => {
    try {
      const response = await axios.get(`${config.URL}`);
      setTreeData(response.data.data);
      //console.log(response.data.data)
    } catch (error) {
      console.log('Error in fetching TreeView Data', error);
    }
  };
  const handleChangeModel = (event) => {
    const { value } = event.target;
    if (value.includes('Select All')) {
      setModelName(value.includes('Select All') ? modelNames : []);
    } else {
      setModelName(value);
    }
  };

  const handleResetFilter = () => {
    setDate_range('');
    setTimeFrom(dayjs('2023-12-31T15:30'));
    setTimeTo(dayjs('2024-04-17T15:30'));
    setModelName([]);
  };

  const handleChangeDate_range = (event) => {
    const { value } = event.target;
    setDate_range(value);

    let hoursToAdd = 0;
    switch (value) {
      case 6:
        hoursToAdd = -6;
        break;
      case 12:
        hoursToAdd = -12;
        break;
      case 24:
        hoursToAdd = -24;
        break;
      case 168:
        hoursToAdd = -24 * 7;
        break;
      default:
        break;
    }

    const newTimeTo = dayjs(); // Current time
    const newTimeFrom = dayjs().add(hoursToAdd, 'hours');

    setTimeFrom(newTimeFrom);
    setTimeTo(newTimeTo);
  };


  const handleApplyFilter = () => {
    const newFilterCriteria = {
      dateRange: date_range,
      timeFrom: timeFrom,
      timeTo: timeTo,
      modelName: modelName
    };

    setFilterCriteria(newFilterCriteria);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 4
  };

  const toggleFullScreen = (chart) => {
    setFullscreenChart(chart === fullscreenChart ? null : chart);
  };

  return (
    <>
      <CssBaseline />
      <Header />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          zIndex: 1,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          overflowX: 'hidden'
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Filter" />
              </ListItemButton>
            </ListItem>
          </List>
          <Box>
            <form>
              <FormControl sx={{ m: 1, width: 290 }}>
                <InputLabel id="demo-simple-select-helper-label">Date Range</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={date_range}
                  label="Date Range"
                  onChange={handleChangeDate_range}
                >
                  <MenuItem value={6}>Last 6 Hours</MenuItem>
                  <MenuItem value={12}>Last 12 Hours</MenuItem>
                  <MenuItem value={24}>Last 24 Hours</MenuItem>
                  <MenuItem value={168}>Last 1 Week</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDayjs} >
                <DemoContainer components={['DateTimePicker']} >
                  <DateTimePicker
                    label="Date & Time From"
                    value={timeFrom}
                    onChange={(newValue) => setTimeFrom(newValue)}
                  />
                  <DateTimePicker
                    label="Date & Time To"
                    value={timeTo}
                    onChange={(newValue) => setTimeTo(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>

              <FormControl >
                <InputLabel id="demo-multiple-checkbox-label">Analytic Type</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={modelName}
                  onChange={handleChangeModel}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(', ')}
                >
                  <MenuItem value="Select All">
                    <Checkbox checked={modelName.length === modelNames.length} />
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {modelNames.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={modelName.includes(name)} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
                <Box sx={{ marginTop: "5px" }}>
                  List of Cameras
                  <TreeView data={treeData} />
                </Box>
              </FormControl>
              <Divider />
              <Stack direction="row" spacing={2} sx={{ position: 'fixed', bottom: 16, left: 16, zIndex: 100 }}>
                <Button variant="outlined" onClick={handleResetFilter}>Reset</Button>
                <Button variant="contained" onClick={handleApplyFilter}>Apply Filter</Button>
              </Stack>
            </form>
          </Box>
        </Box>
      </Drawer>
      <Toolbar />
      <Slider {...settings} style={{ width: "80%", margin: "10px 0 0 275px", padding: "10px 0 0 10px", position: "relative" }}>
        <DetectionCard count={detectionCount.total_detection_count} label="Total Detection" />
        <DetectionCard count={detectionCount.person_count} percentage={detectionCount.person_percentage} label="PERSON" />
        <DetectionCard count={detectionCount.intrusion_count} percentage={detectionCount.intrusion_percentage} label="INTRUSION" />
        <DetectionCard count={detectionCount.wrong_direction_count} percentage={detectionCount.wrong_direction_percentage} label="Wrong DIRECTION" />
        <DetectionCard count={detectionCount.loitre_count} percentage={detectionCount.loitre_percentage} label="LOITER" />
      </Slider>

      <Box sx={{ margin: "0 0 0 260px", padding: "10px 0 0 10px" }}>
        <Stack direction="row" spacing={2} sx={{ marginTop: 4, marginBottom: 4 }}>
          <DemoPaper variant="elevation">
            <Box sx={{ alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 8, right: 8 }}>
              <IconButton onClick={() => toggleFullScreen('pie')}>
                <OpenInFullIcon />
              </IconButton>
            </Box>
            <PieArcLabel
              data={data}
              timeFrom={filterCriteria.timeFrom}
              timeTo={filterCriteria.timeTo}
              modelName={filterCriteria.modelName}
              width={450}
              height={250}
            />
          </DemoPaper>
          <DemoPaper variant="elevation">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 8, right: 8 }}>
              <IconButton onClick={() => toggleFullScreen('bar')}>
                <OpenInFullIcon />
              </IconButton>
            </Box>
            <SimpleBarChart
              data={data}
              timeFrom={filterCriteria.timeFrom}
              timeTo={filterCriteria.timeTo}
              modelName={filterCriteria.modelName}
              width={600}
              height={280}
            />
          </DemoPaper>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ marginTop: 4, marginBottom: 4 }}>
          <DemoPaper variant="elevation">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 8, right: 8 }}>
              <IconButton onClick={() => toggleFullScreen('line')}>
                <OpenInFullIcon />
              </IconButton>
            </Box>
            <SimpleLineChart
              data={data}
              timeFrom={filterCriteria.timeFrom}
              timeTo={filterCriteria.timeTo}
              modelName={filterCriteria.modelName}
              width={500}
              height={250}
            />
          </DemoPaper>
          <DemoPaper variant="elevation">
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'absolute', top: 8, right: 8 }}>
              <IconButton onClick={() => toggleFullScreen('table')}>
                <OpenInFullIcon />
              </IconButton>
            </Box>
            <DenseTable
              data={data}
              timeFrom={filterCriteria.timeFrom}
              timeTo={filterCriteria.timeTo}
              modelName={filterCriteria.modelName}
              width={610}
              height={235}
            />
          </DemoPaper>
        </Stack>
      </Box>
      {fullscreenChart && (
        <FullScreenCard>
          <IconButton onClick={() => toggleFullScreen(null)} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <CloseIcon />
          </IconButton>
          {fullscreenChart === 'pie' && (
            <PieArcLabel
              data={data}
              timeFrom={filterCriteria.timeFrom}
              timeTo={filterCriteria.timeTo}
              modelName={filterCriteria.modelName}
              width={700}
              height={400}
            />
          )}
          {fullscreenChart === 'bar' && (
            <SimpleBarChart
              data={data}
              timeFrom={filterCriteria.timeFrom}
              timeTo={filterCriteria.timeTo}
              modelName={filterCriteria.modelName}
              width={700}
              height={400}
            />
          )}
          {fullscreenChart === 'line' && (
            <SimpleLineChart
              data={data}
              timeFrom={filterCriteria.timeFrom}
              timeTo={filterCriteria.timeTo}
              modelName={filterCriteria.modelName}
              width={700}
              height={400}
            />
          )}
          {fullscreenChart === 'table' && (
            <DenseTable
              data={data}
              timeFrom={filterCriteria.timeFrom}
              timeTo={filterCriteria.timeTo}
              modelName={filterCriteria.modelName}
              width={900}
              height={500}
            />
          )}
        </FullScreenCard>
      )}
    </>
  );
}

