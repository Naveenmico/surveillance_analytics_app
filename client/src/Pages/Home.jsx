import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Drawer, CssBaseline, Toolbar, List, Divider, ListItem, ListItemButton, ListItemText, Button, Checkbox, Stack, Paper, IconButton, styled, Typography, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Header from '../Components/Header';
import { VideoCall, ViewModule, GridOn } from '@mui/icons-material';
import OneVideoplayer from '../Components/OneVideoplayer';
import FourVideoplayer from '../Components/FourVideoplayer';
import Multiplayer from '../Components/Multiplayer';
import { useNavigate } from 'react-router-dom';
import { config } from '../config/config';

const drawerWidth = 250;
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
const CameraPlayer = () => {
    const [cameras, setCameras] = useState([]);
    const [selectedCameras, setSelectedCameras] = useState([]);
    const [numberOfPlayers, setNumberOfPlayers] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getCameras();
    }, []);

    const getCameras = async () => {
        try {
            const response = await axios.get(`${config.URL1}cameras`);
            setCameras(response.data.camera);
        } catch (error) {
            console.log(error);
        }
    };

    var token = localStorage.getItem('token');
    //console.log(token);

    const handleAddCamera = () => {
        navigate("/add-camera");
    };

    const handleCameraClick = (camera) => {
        const isSelected = selectedCameras.some((selected) => selected.camera_id === camera.camera_id);

        if (isSelected) {
            setSelectedCameras((prevSelected) =>
                prevSelected.filter((selected) => selected.camera_id !== camera.camera_id)
            );
        } else {
            setSelectedCameras((prevSelected) => [
                ...prevSelected,
                { ...camera, isPlaying: true },
            ]);
        }
    };

    const handleCheckboxChange = (camera) => {
        setSelectedCameras((prevSelected) =>
            prevSelected.map((selected) =>
                selected.camera_id === camera.camera_id
                    ? { ...selected, isPlaying: !selected.isPlaying }
                    : selected
            )
        );
    };

    const handleNumberOfPlayersChange = (iconType) => {
        const selectedValue = parseInt(iconType);
        console.log(selectedValue)
        setNumberOfPlayers(selectedValue);
        setSelectedCameras(selectedCameras.slice(0, selectedValue));
    };

    const filteredCameras = cameras.filter((camera) =>
        `${camera.camera_name}_id_${camera.camera_id}`.toLowerCase().includes(searchQuery.toLowerCase())
    );


    return (
        token === null ? navigate('/') :
            (<Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header />
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    zIndex: 1,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between', // Added this line
                    overflowX: 'hidden'
                }}
            >
                <Box>
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
                                />
                                {filteredCameras.map((camera) => (
                                    <li key={camera.camera_id} onClick={() => handleCameraClick(camera)}>
                                        <Checkbox checked={selectedCameras.some(
                                            (selected) => selected.camera_id === camera.camera_id
                                        )}
                                            onChange={() => handleCheckboxChange(camera)} />
                                        {camera.camera_name}_id_{camera.camera_id}
                                    </li>
                                ))}
                            </form>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ p: 2 }}> {/* Added this Box for the button */}
                    <Button variant='contained' onClick={handleAddCamera}>Add Camera</Button>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <Toolbar />
                <Stack
                    direction="row"
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    spacing={4} // Adjust the value as needed
                >
                    <IconButton color="inherit" onClick={() => handleNumberOfPlayersChange('1')} sx={{ fontSize: 40 }}>
                        <VideoCall fontSize="inherit" />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => handleNumberOfPlayersChange('4')} sx={{ fontSize: 40 }}>
                        <ViewModule fontSize="inherit" />
                    </IconButton>
                    <IconButton color="inherit" onClick={() => handleNumberOfPlayersChange('16')} sx={{ fontSize: 40 }}>
                        <GridOn fontSize="inherit" />
                    </IconButton>
                </Stack>
                <Box>
                    {numberOfPlayers === 1 && <OneVideoplayer selectedCameras={selectedCameras} />}
                    {numberOfPlayers === 4 && <FourVideoplayer selectedCameras={selectedCameras} />}
                    {numberOfPlayers === 16 && <Multiplayer selectedCameras={selectedCameras} />}
                </Box>
            </Box>
        </Box>        
        )
    );
};



export default CameraPlayer;
