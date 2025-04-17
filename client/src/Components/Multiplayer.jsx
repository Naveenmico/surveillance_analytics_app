import React from 'react';
import { Paper, Stack,Box } from '@mui/material';
import VideoPlayer from './Videoplayer';
import defaultImage from '../assests/cam.jpg';

const Multiplayer = ({ selectedCameras }) => {
  const numberOfSelectedCameras = selectedCameras.length;
  const numberOfDefaultImages = Math.max(16 - numberOfSelectedCameras, 0);
  const columns = 4; // Fixed number of columns for a 4x4 grid

  let scaleX = 200 / 1080;
  let scaleY = 112.5 / 607;

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '70px 10px 10px 10px',

    }}>
      <Stack direction="row" spacing={1} sx={{ width: 1080, height: 610, border: '2px solid #ccc', display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap: '1px' }}>
        {selectedCameras.map((camera, index) => (
          <Paper
            key={camera.camera_id}
            sx={{
              width: 'calc(25% - 5px)',
              marginBottom: index % columns === columns - 1 ? '0px' : '5px',
            }}
          >
            <VideoPlayer
              camera_id={camera.camera_id}
              camera_name={camera.camera_name}
              camera_port={camera.camera_port}
              isPlaying={camera.isPlaying}
              width={200}
              height={112.5}
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
              width: 'calc(25% - 5px)',
              marginBottom: '5px',
            }}
          >
            <img
              src={defaultImage}
              alt="Default"
              style={{
                width: '200px',
                height: '112.5px',
                objectFit: 'cover',
                borderRadius: '5px', 
              }}
            />
          </Paper>
        ))}
      </Stack>
    </Box>
  );
};

export default Multiplayer;
