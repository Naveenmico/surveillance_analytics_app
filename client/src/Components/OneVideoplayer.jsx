import React from 'react';
import VideoPlayer from './Videoplayer';
import { Box,Paper } from '@mui/material';
import defaultImage from '../assests/cam.jpg';
import FourVideoplayer from './FourVideoplayer';
const OneVideoplayer = ({ selectedCameras,numberOfPlayers }) => {

  let scaleX = 1080/1080;
  let scaleY = 610/607;
  // Check if no camera is selected
  if (!selectedCameras || selectedCameras.length === 0) {
    // Render the default image if no camera is selected
    return (
        <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          width: '1080px',
          height: '607px',
          margin: '70px 10px 10px 10px',
          border: '2px solid #ccc',
        }}
      >
        <Box
          component="img"
          src={defaultImage}
          alt="Default"
          sx={{ width: '100%', height: '100%', border: '2px solid #ccc' }}
        />
      </Paper>
    </Box>

    );
  }

  if (selectedCameras.length > 1) {
    return <FourVideoplayer selectedCameras={selectedCameras} />;
  }
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Paper
        sx={{
          width: '1080px',
          height: '607px',
          margin: '70px 10px 10px 10px',
          border: '2px solid #ccc',
        }}
      >
      <VideoPlayer
        key={selectedCameras[0].camera_id}
        camera_id={selectedCameras[0].camera_id}
        camera_name={selectedCameras[0].camera_name}
        camera_port={selectedCameras[0].camera_port}
        isPlaying={selectedCameras[0].isPlaying}
        width={1080} // Pass width prop to VideoPlayer
        height={610} // Pass height prop to VideoPlayer
        roi={selectedCameras[0].roi}
        scaleX={scaleX}
        scaleY={scaleY}
      />
      </Paper>
    </Box>

  );
};

export default OneVideoplayer;

