import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Grid,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook
import {config} from '../config/config';
import Header from './Header';

const AddCamera = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
  const [cameraData, setCameraData] = useState({
    camera_id: '',
    camera_port: '',
    camera_name: '',
    attribute: '', // Default JSON value as a string
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCameraData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  var token = localStorage.getItem('token');
  //console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${config.URL1}/add`, cameraData);
      // Assuming you have a proper response from the server
      //console.log(response.data);
      enqueueSnackbar('Camera added successfully', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } }); // Show snackbar
      navigate('/home');
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to add camera', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } }); // Show snackbar on error
    } finally {
      setLoading(false);
    }
  };

  return (
    token==null ? navigate('/'):(<>
      <Header/>
      <Container component="main" maxWidth="xs">
        <div style={{ marginTop: "100px" }}>
          <Typography component="h1" variant="h5" marginBottom="16px">
            Add Camera
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  id="camera_id"
                  label="Camera ID"
                  name="camera_id"
                  value={cameraData.camera_id}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="number"
                  id="camera_port"
                  label="Camera Port"
                  name="camera_port"
                  value={cameraData.camera_port}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="camera_name"
                  label="Camera Name"
                  name="camera_name"
                  value={cameraData.camera_name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  fullWidth
                  type='text'
                  id='attribute'
                  label="RTSP"
                  name='attribute'
                  value={cameraData.attribute}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <div style={{ display: 'flex' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ marginTop: '16px', marginRight: '5px', width: '50%' }}
              >
                {loading ? <CircularProgress size={24} /> : 'Add Camera'}
              </Button>
              <Button
                type="button"
                variant="contained"
                color="primary"
                disabled={loading}
                style={{ marginTop: '16px', width: '50%' }}
                onClick={() => navigate('/home')}
              >
                {loading ? <CircularProgress size={24} /> : 'Back'}
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </>)
  );
};

export default AddCamera;
