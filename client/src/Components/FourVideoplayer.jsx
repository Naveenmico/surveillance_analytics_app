import React from 'react';
import { Box, Paper, Stack } from '@mui/material';
import VideoPlayer from './Videoplayer';
import defaultImage from '../assests/cam.jpg';
import MultiPlayer from './Multiplayer';

const FourVideoplayer = ({ selectedCameras }) => {
  const numberOfSelectedCameras = selectedCameras.length;
  const numberOfDefaultImages = Math.max(4 - numberOfSelectedCameras, 0);
  const scaleX = 440 / 1080;
  const scaleY = 270 / 607;
  const columns = 2;
  if (selectedCameras.length > 4) {
    return <MultiPlayer selectedCameras={selectedCameras} />;
  }

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '70px 10px 10px 10px',
      
    }}>
      <Stack direction="row" spacing={2} sx={{ width:1080,height:610,border: '2px solid #ccc',display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '5px' }}>
        {selectedCameras.map((camera, index) => (
          <Paper
            key={camera.camera_id}
            sx={{
              width: 445,
              marginBottom: index % columns === columns - 1 ? '0px' : '10px',
            }}
          >
            <VideoPlayer
              key={camera.camera_id}
              camera_id={camera.camera_id}
              camera_name={camera.camera_name}
              camera_port={camera.camera_port}
              isPlaying={camera.isPlaying}
              width={441}
              height={248}
              roi={camera.roi}
              scaleX={scaleX}
              scaleY={scaleY}
            />
          </Paper>
        ))}
        {/* Render default images for remaining slots */}
        {Array.from({ length: numberOfDefaultImages }, (_, index) => (
            <Paper
              key={`default-image-${index}`}
              sx={{
                width: 445,
                marginBottom: '5px',
              }}
            >
              <img
                src={defaultImage}
                alt="Default"
                style={{
                  width: '441px',
                  height: '248px',
                  objectFit: 'cover',
                  borderRadius: '5px', // Add border radius styling here
                }}
              />
            </Paper>
          ))}
          </Stack>
    </Box>
  );
};

export default FourVideoplayer;
