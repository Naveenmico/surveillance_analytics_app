import React, { useState, useEffect, useRef } from 'react';
import flvjs from 'flv.js';
import axios from 'axios';
import { Button,Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { config } from '../config/config';

const VideoPlayer = ({ camera_id, camera_name, camera_port, isPlaying, width, height, roi, scaleX, scaleY }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null); // Reference to the canvas element
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [flvPlayer, setFlvPlayer] = useState(null);
    const [showShape, setShowShape] = useState(false); // Toggle shape visibility
    const parseRoi = JSON.parse(roi);

    useEffect(() => {
        const initFlvPlayer = (url, setFlvPlayer) => {
            if (flvjs.isSupported()) {
                const player = flvjs.createPlayer({
                    type: 'flv',
                    url: url,
                });

                player.attachMediaElement(videoRef.current);
                player.load();
                setFlvPlayer(player);

                return () => {
                    player.destroy();
                };
            }
        };

        if (camera_id) {
            setShowShape(true);
            const cleanup = initFlvPlayer(`${config.HOST}${camera_port}/live/${camera_name}.flv`, setFlvPlayer);
            return () => {
                cleanup();
            };
        }
    }, [camera_id, camera_name, camera_port]);

    useEffect(() => {
        if (flvPlayer) {
            flvPlayer.pause();
        }
    }, [isPlaying, flvPlayer]);

    useEffect(() => {
        if (showShape && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            if (parseRoi && parseRoi.length > 0) {
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
                ctx.beginPath();
                //ctx.moveTo(parseRoi[0].x, parseRoi[0].y);
                for (let i = 0; i < parseRoi.length; i++) {
                    ctx.lineTo(parseRoi[i].x * (scaleX), parseRoi[i].y * (scaleY));
                    //console.log(parseRoi[i].x,parseRoi[i].y)
                }
                ctx.closePath();
                ctx.stroke();
            }
        }
    }, [showShape, parseRoi]);

    const captureImage = async (camera_id) => {
        if (!videoRef.current) return;

        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a blob
        canvas.toBlob(async (blob) => {
            if (!blob) {
                console.error('Failed to create blob from canvas.');
                return;
            }

            // Create a File object from the blob
            const file = new File([blob], `${camera_id}.png`, { type: "image/png" });

            // Read the file as base64
            const reader = new FileReader();
            reader.onload = function () {
                const formData = new FormData();
                formData.append('image', file);
                formData.append('camera_id', camera_id);

                // Send the captured image to the backend
                sendImageToBackend(formData);
            };
            reader.readAsDataURL(file);
        }, 'image/png');
    };

    const sendImageToBackend = async (formData) => {
        try {
            const response = await axios.post(`${config.URL1}/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Image uploaded:', response.data);
            enqueueSnackbar('Image captured and uploaded successfully', { variant: 'success', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
        } catch (error) {
            console.error('Error uploading image:', error);
            enqueueSnackbar('Failed to capture and upload image', { variant: 'error', anchorOrigin: { vertical: 'top', horizontal: 'center' } });
        }
    };

    const showImage = () => {
        navigate(`get-image/${camera_id}`);
    }

    return (
        <>
            <div style={{position: 'relative' }}>
                <div style={{ width: width, height: height, position: 'relative' }}>
                    <svg
                        width={width}
                        height={height}
                        style={{ position: 'absolute' }}
                    >
                        <rect x="0" y="0" width={80} height={25} fontSize='30px' fill="black" />
                        <text x="10" y="15" fill="white">{camera_name}{camera_id}</text>
                    </svg>
                    {showShape && (
                        <canvas
                            ref={canvasRef}
                            width={width}
                            height={height}
                            style={{ position: 'absolute' }} l
                        />
                    )}
                    <video
                        ref={videoRef}
                        controls
                        style={{ width: '100%', height: '100%' }}
                    />
                </div>
                
                    <Stack direction="row" spacing={2} justifyContent='center'>
                        <Button onClick={() => setShowShape(prevState => !prevState)}>Toggle Shape</Button>
                        <Button onClick={() => captureImage(camera_id)}>Capture Image</Button>
                        <Button onClick={showImage}>Show Image</Button>
                    </Stack>
            </div>
        </>
    );
};

export default VideoPlayer;

