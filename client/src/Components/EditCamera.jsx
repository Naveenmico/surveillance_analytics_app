import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
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
const EditCamera = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
    const [cameraData, setCameraData] = useState({
      camera_port: '',
      camera_name: '',
      attribute: '', 
    });
    const [loading, setLoading] = useState(false);
    const {camera_id} = useParams();
    //console.log(camera_id)
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCameraData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const getCamera = async () => {
      try{
         const response = await axios.get(`${config.URL1}camera/${camera_id}`);
         //console.log(response.data.camera)
         setCameraData({
          //camera_id: response.data.camera.camera_id,
          camera_name: response.data.camera[0].camera_name,
          camera_port: response.data.camera[0].camera_port,
          attribute: response.data.camera[0].attribute
        })
        //console.log(response.data.camera.camera_id)
        //console.log(cameraData)
      }catch(error){
        console.log(error)
      }
    }
  
    var token = localStorage.getItem('token');
    //console.log(token);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const response = await axios.put(`${config.URL}edit/${camera_id}`, cameraData);
        //console.log(response.data);
        enqueueSnackbar('Camera edited successfully', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } }); // Show snackbar
        navigate('/user');
      } catch (error) {
        console.error(error);
        enqueueSnackbar('Failed to edit camera', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } }); // Show snackbar on error
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate('/');
      }
      getCamera();
    }, [])
  
    return (
      token==null ? navigate('/'):(<>
        <Header/>
  
        <Container component="main" maxWidth="xs">
          <div style={{ marginTop: "100px" }}>
            <Typography component="h1" variant="h5" marginBottom="16px">
              Edit Camera Details
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
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
                  {loading ? <CircularProgress size={24} /> : 'Edit Camera'}
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  style={{ marginTop: '16px', width: '50%' }}
                  onClick={() => navigate('/user')}
                >
                  {loading ? <CircularProgress size={24} /> : 'Back'}
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </>)
    );
}

export default EditCamera