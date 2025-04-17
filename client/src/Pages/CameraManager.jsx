import Header from '../Components/Header';
import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { config } from '../config/config';
import { TextField, InputAdornment, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Card, CardContent, Typography, Toolbar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Slider from 'react-slick'; // Ensure you have installed react-slick and slick-carousel
import { Paper, Stack } from '@mui/material';
import PollIcon from '@mui/icons-material/Poll';
import { styled } from '@mui/material/styles';

const DetectionCardWrapper = styled(Paper)(({ theme }) => ({
    width: 300,
    height: 120,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

const CameraManager = () => {
    const [cameras, setCameras] = useState([]);
    const [filteredCameras, setFilteredCameras] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [cameraToDelete, setCameraToDelete] = useState(null);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { userData } = useUser();

    useEffect(() => {
        getCameras();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = cameras.filter((camera) =>
                camera.camera_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                camera.camera_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                camera.camera_port.toLowerCase().includes(searchQuery.toLowerCase()) ||
                camera.attribute.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCameras(filtered);
        } else {
            setFilteredCameras(cameras);
        }
    }, [searchQuery, cameras]);

    const getCameras = async () => {
        try {
            const response = await axios.get(`${config.URL1}cameras`);
            setCameras(response.data.camera);
            setFilteredCameras(response.data.camera);
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

    const handleDelete = (camera_id) => {
        setCameraToDelete(camera_id);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`${config.URL}delete/${cameraToDelete}`);
            enqueueSnackbar('Camera deleted successfully', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
            getCameras();
            setDeleteDialogOpen(false);
        } catch (error) {
            enqueueSnackbar('Error deleting camera', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
            console.error(error);
            setDeleteDialogOpen(false);
        }
    };

    const columns = [
        { field: 'camera_id', headerName: 'Camera ID', width: 150 },
        { field: 'camera_name', headerName: 'Camera Name', width: 150 },
        { field: 'camera_port', headerName: 'Camera Port', width: 150 },
        { field: 'attribute', headerName: 'Rtsp', width: 350 },
        {
            field: 'status', headerName: 'Status', width: 150,
            renderCell: (params) => (
                <span style={{ color: params.row.enabled ? 'green' : 'red' }}>{params.row.enabled ? 'Enabled' : 'Disabled'}</span>
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 200,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => handleEdit(params.row.camera_id)}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(params.row.camera_id)}
                    >
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    const totalCameras = cameras.length;
    const enabledCameras = cameras.filter(camera => camera.enabled).length;
    const disabledCameras = totalCameras - enabledCameras;

    const settings = {
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 3,
        slidesToScroll: 3,
    };

    return (
        <>
            <Header />
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <>
                <Toolbar/>
                    <Slider {...settings} style={{ width: '90%', margin: 'auto', padding: '10px 0' }}>
                        <DetectionCardWrapper elevation={3}>
                            <Stack direction="column" spacing={1}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                    <PollIcon sx={{ fontSize: 36, color: 'blue' }} />
                                    <Typography variant="body1" component="p" sx={{ fontSize: 30 }}>{totalCameras}</Typography>
                                </Stack>
                                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    Total Cameras
                                </Typography>
                            </Stack>
                        </DetectionCardWrapper>
                        <DetectionCardWrapper elevation={3}>
                            <Stack direction="column" spacing={1}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                    <PollIcon sx={{ fontSize: 36, color: 'green' }} />
                                    <Typography variant="body1" component="p" sx={{ fontSize: 30 }}>{enabledCameras}</Typography>
                                </Stack>
                                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    Enabled Cameras
                                </Typography>
                            </Stack>
                        </DetectionCardWrapper>
                        <DetectionCardWrapper elevation={3}>
                            <Stack direction="column" spacing={1}>
                                <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                                    <PollIcon sx={{ fontSize: 36, color: 'red' }} />
                                    <Typography variant="body1" component="p" sx={{ fontSize: 30 }}>{disabledCameras}</Typography>
                                </Stack>
                                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 'bold' }}>
                                    Disabled Cameras
                                </Typography>
                            </Stack>
                        </DetectionCardWrapper>
                    </Slider>
                    <div style={{ height: 400, width: '75%', margin: '20px auto', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <TextField
                            id="outlined-basic"
                            label="Search Camera"
                            variant="outlined"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{ marginBottom: '20px', width: '100%' }}
                        />
                        <DataGrid
                            rows={filteredCameras}
                            columns={columns}
                            getRowId={(row) => row.camera_id}
                            pageSize={5}
                            rowsPerPageOptions={[5, 10]}
                            checkboxSelection
                        />
                    </div>
                </>
            )}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            >
                <DialogTitle>Delete Camera</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this camera with ID {cameraToDelete}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default CameraManager;
