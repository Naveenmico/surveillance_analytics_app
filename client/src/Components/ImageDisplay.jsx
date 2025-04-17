import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack'; // Import useSnackbar hook
import { config } from '../config/config';
import Header from './Header';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
const ImageDisplay = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar(); // Destructure enqueueSnackbar from useSnackbar
    const [imageSrc, setImageSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${config.URL1}/image/${id}`, {
                    responseType: 'arraybuffer',
                });
                const blob = new Blob([response.data], { type: 'image/png' });
                const imageUrl = URL.createObjectURL(blob);
                setImageSrc(imageUrl);
                setIsLoading(false);
            } catch (error) {
                enqueueSnackbar(`Capture the image for this camera C002${id} first`, { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
                navigate('/home');
                console.error('Error fetching image:', error);
            }
        };

        fetchData();

        return () => {
            if (imageSrc) {
                URL.revokeObjectURL(imageSrc);
            }
        };
    }, [id]); // Only run this effect when `id` changes

    useEffect(() => {
        const drawCanvas = (imageUrl) => {
            if (canvasRef.current && imageUrl) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const image = new Image();
                image.src = imageUrl;
                image.onload = () => {
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

                    // Draw ROI points and lines
                    ctx.fillStyle = 'red';
                    ctx.strokeStyle = 'red';
                    ctx.lineWidth = 2;

                    // Redraw lines between consecutive points
                    ctx.beginPath();
                    coordinates.forEach(({ x, y }, index) => {
                        if (index === 0) {
                            ctx.moveTo(x, y);
                        } else {
                            ctx.lineTo(x, y);
                        }
                    });
                    ctx.stroke();

                    // Redraw points
                    coordinates.forEach(({ x, y }) => {
                        ctx.beginPath();
                        ctx.arc(x, y, 5, 0, 2 * Math.PI);
                        ctx.fill();
                    });
                };
            }
        };

        drawCanvas(imageSrc); // Call drawCanvas with the current image source
    }, [imageSrc, coordinates]); // Call the effect whenever imageSrc or coordinates change

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setCoordinates(prevCoordinates => [...prevCoordinates, { x, y }]);
        //console.log(`Clicked at (${x}, ${y})`);
    };

    const handleSaveButtonClick = async () => {
        try {
            const roiString = JSON.stringify(coordinates);
            const response = await axios.put(`${config.URL1}/roi`, {
                camera_id: id,
                roi: roiString
            });
            enqueueSnackbar('ROI saved successfully', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
            navigate('/');
        } catch (error) {
            console.error('Error updating ROI:', error);
            enqueueSnackbar('Failed to save ROI', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
        }
    };
    var token = localStorage.getItem('token');
    //console.log(token);
    return (
        token == null ? navigate('/') : (<div>
            <Header />
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',marginTop:80 }}>
                    <canvas
                        ref={canvasRef}
                        width={1080}
                        height={607}
                        onClick={handleCanvasClick}
                        style={{ border: '2px solid #ccc', marginBottom: '10px',zIndex:1 }}
                    />
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={handleSaveButtonClick}>Save Roi</Button>
                        <Button variant="outlined" onClick={() => navigate('/home')}>Back</Button>
                    </Stack>
              </div>
            )}
        </div>)
    );
};

export default ImageDisplay;




