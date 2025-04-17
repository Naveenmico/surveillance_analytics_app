import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { config } from '../config/config';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Header from './Header';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import userImage from '../assests/user.png';

const UserProfile = () => {
    const [cameras, setCameras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { userData } = useUser();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        getCameras();
    }, []);

    const getCameras = async () => {
        try {
            const response = await axios.get(`${config.URL1}cameras`);
            setCameras(response.data.camera);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setError('Error fetching data.');
            setLoading(false);
        }
    };

    const handleEdit = (camera_id) => {
        navigate(`/edit-camera/${camera_id}`);
        console.log('Edit button clicked for camera with ID:', camera_id);
    };

    const deleteCamera = async (camera_id) => {
        const confirmed = window.confirm(`Do you really want to delete the camera with ID ${camera_id}?`);
        if (confirmed) {
            try {
                await axios.delete(`${config.URL}delete/${camera_id}`);
                enqueueSnackbar('Camera deleted successfully', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
                getCameras();
            } catch (error) {
                enqueueSnackbar('Error deleting camera', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
                console.error(error);
            }
        }
    };

    return (
        <>
            <Header />
            <Box display="flex" justifyContent="center" alignItems="center" style={{ padding: '20px', marginTop: 70 }}>
                <Paper style={{ padding: '20px', width: '80%', maxWidth: '900px' }}>
                    <Grid container alignItems="center">
                        <Grid item>
                            <Avatar alt={userData.username} src={userImage} style={{ width: '80px', height: '80px' }} />
                        </Grid>
                        <Grid item style={{ marginLeft: '20px' }}>
                            <Typography variant="h6">{userData.username}</Typography>
                            <Typography variant="body1">{userData.email}</Typography>
                        </Grid>
                    </Grid>
                    <Typography style={{ marginTop: '20px' }}>
                        You can edit and delete cameras. Remember, the Camera Name and Port should be correct. Do not provide random names or ports.
                    </Typography>

                    {loading ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <div>{error}</div>
                    ) : (
                        <TableContainer component={Paper} style={{ marginTop: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                            <Table size="small" aria-label="camera table">
                                <TableHead style={{ backgroundColor: '#f5f5f5' }}>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Camera ID</TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Camera Name</TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Camera Port</TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Rtsp</TableCell>
                                        <TableCell align="right" style={{ fontWeight: 'bold' }}>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cameras.map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell component="th" scope="row">
                                                {row.camera_id}
                                            </TableCell>
                                            <TableCell align="right">{row.camera_name}</TableCell>
                                            <TableCell align="right">{row.camera_port}</TableCell>
                                            <TableCell align="right">{row.attribute}</TableCell>
                                            <TableCell align="right">
                                                <Button variant="outlined" color="primary" onClick={() => handleEdit(row.camera_id)}>Edit</Button>
                                                <Button variant="outlined" color="secondary" onClick={() => deleteCamera(row.camera_id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Paper>
            </Box>
        </>
    );
};

export default UserProfile;
