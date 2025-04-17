
import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Box, IconButton, Stack } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ZoomOutIcon from '@mui/icons-material/ZoomOut';
import Header from './Header';

const socket = io.connect('http://localhost:8001/');

function OnvifCamera() {
    const canvasRef = useRef(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [zoom, setZoom] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        socket.on('data', (data) => {
            const img = new Image();
            const url = URL.createObjectURL(new Blob([new Uint8Array(data)], { type: 'application/octet-binary' }));
            img.onload = () => {
                URL.revokeObjectURL(url);
                ctx.drawImage(img, 0, 0);
            };
            img.src = url;
        });

        return () => {
            socket.off('data');
        };
    }, []);

    const handleMove = (deltaX, deltaY) => {
        // Convert degrees to normalized values and update state
        const newX = Math.max(-180, Math.min(180, x + deltaX));
        const newY = Math.max(-180, Math.min(180, y + deltaY));

        setX(newX);
        setY(newY);

        const normalizedX = newX / 180;  // Assuming x is in the range of -180 to 180 degrees
        const normalizedY = newY / 180;  // Assuming y is in the range of -180 to 180 degrees

        axios.post('http://localhost:8001/move', { x: normalizedX, y: normalizedY, zoom: zoom / 100 })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error moving the camera!', error);
            });
    };

    const handleZoom = (deltaZoom) => {
        // Update zoom state
        const newZoom = Math.max(0, Math.min(100, zoom + deltaZoom));

        setZoom(newZoom);

        axios.post('http://localhost:8000/move', { x: x / 180, y: y / 180, zoom: newZoom / 100 })
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('There was an error zooming the camera!', error);
            });
    };

    return (
        <>
            <Header/>
            <Toolbar />
            <Box>
                <Stack direction="column" alignItems="center" spacing={2} mt={2}>
                    <canvas ref={canvasRef} width="768" height="432" style={{ border: '1px solid #ccc' }}></canvas>
                    <Stack direction="column" alignItems="center" spacing={1} mt={2}>
                        <IconButton onClick={() => handleMove(0, -10)} color="primary">
                            <ArrowCircleUpIcon fontSize="large" />
                        </IconButton>
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <IconButton onClick={() => handleZoom(10)} color="secondary">
                                <ZoomInIcon fontSize="large" />
                            </IconButton>
                            <IconButton onClick={() => handleMove(-10, 0)} color="primary">
                                <ArrowCircleLeftIcon fontSize="large" />
                            </IconButton>
                            <IconButton onClick={() => handleMove(10, 0)} color="primary">
                                <ArrowCircleRightIcon fontSize="large" />
                            </IconButton>
                            <IconButton onClick={() => handleZoom(-10)} color="secondary">
                                <ZoomOutIcon fontSize="large" />
                            </IconButton>
                        </Stack>
                        <IconButton onClick={() => handleMove(0, 10)} color="primary">
                            <ArrowCircleDownIcon fontSize="large" />
                        </IconButton>
                    </Stack>
                    {/* <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                        
                        
                    </Stack> */}
                </Stack>
            </Box>
        </>
    );
}

export default OnvifCamera;
