import React from 'react';
import { Paper, Stack, Typography } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import { styled } from '@mui/material/styles';

const DetectionCardWrapper = styled(Paper)(({ theme }) => ({
  width: 300,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

const DetectionCard = ({ count, percentage, label }) => (
  <DetectionCardWrapper elevation={3}>
    <Stack direction="column" spacing={1}>
      <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
        <PollIcon sx={{ fontSize: 36, color: 'blue' }} />
        <Typography variant="body1" component="p" sx={{ fontSize: 30 }}>{count}</Typography>
        {percentage !== undefined && (
          <Typography variant="body2" color="textSecondary" sx={{ fontSize: 15 }}>
            {percentage}%
          </Typography>
        )}
      </Stack>
      <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
        {label}
      </Typography>
    </Stack>
  </DetectionCardWrapper>
);

export default DetectionCard;



{/* <DemoPaper1
          elevation={3}
        >
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <PollIcon sx={{ fontSize: 36, color: 'blue' }} />
              <Typography variant="body1" component="p" sx={{ fontSize: 30 }}>{detectionCount.total_detection_count}</Typography>
            </Stack><Typography variant="h6" component="h3" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Total Detection
            </Typography>
          </Stack>
        </DemoPaper1>
        <DemoPaper1
          elevation={3}
        >
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <PollIcon sx={{ fontSize: 36, color: 'blue' }} />
              <Typography variant="body2" component="p" sx={{ fontSize: 30 }}>{detectionCount.person_count}
              </Typography><Typography variant="body2" color="textSecondary" sx={{ fontSize: 15 }}>
                {detectionCount.person_percentage}%
              </Typography>
            </Stack>

            <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Person
            </Typography></Stack>
        </DemoPaper1>

        <DemoPaper1
          elevation={3}
        >
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <PollIcon sx={{ fontSize: 36, color: 'blue' }} />
              <Typography variant="body1" component="p" sx={{ fontSize: 30 }}>{detectionCount.intrusion_count}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: 15 }}>
                {detectionCount.intrusion_percentage}%
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Intrusion
            </Typography>
          </Stack>


        </DemoPaper1>
        <DemoPaper1
          elevation={3}
        >
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <PollIcon sx={{ fontSize: 36, color: 'blue' }} />
              <Typography variant="body1" component="p" sx={{ fontSize: 30 }}>{detectionCount.loitre_count}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: 15 }}>
                {detectionCount.loitre_percentage}%
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Loitre
            </Typography>
          </Stack>
        </DemoPaper1>
        <DemoPaper1
          elevation={3}
        >
          <Stack direction="column" spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
              <PollIcon sx={{ fontSize: 36, color: 'blue' }} />
              <Typography variant="body1" component="p" sx={{ fontSize: 30 }}>{detectionCount.wrong_direction_count}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ fontSize: 15 }}>
                {detectionCount.wrong_direction_percentage}%
              </Typography>
            </Stack>
            <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
              Wrong Direction
            </Typography>
          </Stack>
        </DemoPaper1>
        <DemoPaper1
          elevation={3}
        ></DemoPaper1> */}