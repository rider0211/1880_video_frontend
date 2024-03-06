/** 

=========================================================
* Vision UI PRO React - v1.0.0
=========================================================


* Copyright 2021 Creative Tim (https://www.creative-tim.com/)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

import 'react-responsive-modal/styles.css';

import * as faceapi from "face-api.js";

import { getAvailableCameras, startCamera } from 'utils/camera';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';

import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import VuiBox from 'components/VuiBox';
import VuiButton from 'components/VuiButton';
import VuiSelect from 'components/VuiSelect';
import { action_type } from 'redux/action_type';
import localforage from 'localforage';
import { serializeCameraInfo } from 'utils/camera';

function WebCamCameraCompoent() {

    const camera_allow_status = useSelector((state) => state.webCamReducer.camera_allow);
    const selected_camera = useSelector((state) => state.webCamReducer.selected_camera);
    const available_cameras = useSelector((state) => state.webCamReducer.available_cameras);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    const dispatch = useDispatch();

    const setCameras = (cameras) => dispatch({ type: action_type.ADD_AVAILABLE_CAMERAS, available_cameras: cameras });
    const alertError = (msg) => dispatch({ type: action_type.ALERT_SNACK_BAR, snack_bar_open: true, snack_bar_type: 'error', snack_bar_text: "somethings wrong" });
    const selectCamera = (camera) => dispatch({ type: action_type.SET_SELECTED_CAMERA, selected_camera: camera });
    const setStorePhotos = (data) => dispatch({ type: action_type.ADD_CLIENT_PHOTO, client_photos: data });

    var take_left = false
    var take_right = false
    var take_front = false

    const loadModels = () => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models'),
        ]).then(() => {
            faceDetection();
        })
    };

    const startSelectCamera = async (deviceId) => {
        const video = await startCamera(deviceId);
        if (video.status) {
            videoRef.current.srcObject = video.data;
            videoRef.current.play().catch(error => console.log('error playing video since' + error));
        } else {
            console.log(video.errMsg)
        }
    }

    const allowCameraFunc = async (camera) => {
        try {
            if (camera) {
                startSelectCamera(camera?.deviceId);
            } else {
                const result = await getAvailableCameras();
                if (result.status) {
                    const cameras = result.videoDevices;
                    const serializeCameras = cameras.map((cameraItem) => serializeCameraInfo(cameraItem));
                    setCameras(serializeCameras);
                    startSelectCamera(serializeCameras[0]?.deviceId);
                    selectCamera(serializeCameras[0]);
                } else {
                    console.log(result.errMsg)
                }
            }
        } catch (error) {
            console.log(error);
            alertError(error)
        }
    }
    const faceDetection = () => {
        setInterval(async () => {
            const ctx = canvasRef.current.getContext('2d');
            const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
            var rx, ry, face_val, dx, dy;

            for (const face of detections) {
                var eye_right = getMeanPosition(face.landmarks.getRightEye());
                var eye_left = getMeanPosition(face.landmarks.getLeftEye());
                var nose = getMeanPosition(face.landmarks.getNose());
                var mouth = getTop(face.landmarks.getMouth(),);
                var jaw = getTop(face.landmarks.getJawOutline());

                rx = Math.abs((jaw - mouth));
                ry = (eye_left[0] + (eye_right[0] - eye_left[0]) / 2 - nose[0]) / 20;
                face_val = ry.toFixed(2);
            }

            canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(videoRef.current);

            faceapi.matchDimensions(canvasRef.current, {
                width: 640,
                height: 480,
            })

            detections.forEach(detection => {
                const { x, y } = detection.detection.box;
                dx = x;
                dy = y;
            });

            if (!take_front && (((120 < dx) && (dx < 200)) && ((80 < dy) && (dy < 150)))) {
                drawSelfieRect(160, 40, 320, 390, 30, '#1722eb', 3, ctx);
            }
            else if (((80 < dx) && (dx < 400)) && ((80 < dy) && (dy < 150))) {
                drawSelfieRect(160, 40, 320, 390, 30, '#1722eb', 3, ctx);
            }
            else {
                drawRecognizeRect(160, 40, 320, 390, 30, '#eb2617', 3, ctx);
                return
            }

            if (((rx < 90) || (120 < rx)) && rx != undefined)
                return

            if (face_val < -1.55) {
                if (!take_left) {
                    take_left = true;
                    flashOfLight();
                    takeSelfie(3)
                }
            }
            else if (face_val >= 1.55) {
                if (!take_right) {
                    take_right = true;
                    flashOfLight();
                    takeSelfie(2)
                }
            }
            else if (face_val > -0.2 && face_val < 0.2) {
                if (!take_front) {
                    take_front = true;
                    flashOfLight();
                    takeSelfie(1)
                }
            }
        }, 40)
    }

    const getTop = (l) => {
        return l.map((a) => a.y).reduce((a, b) => Math.min(a, b));
    }

    const getMeanPosition = (l) => {
        return l.map((a) => [a.x, a.y]).reduce((a, b) => [a[0] + b[0], a[1] + b[1]]).map((a) => a / l.length);
    }
    const drawRecognizeRect = (x, y, width, height, radius, strokeColor, lineWidth, ctx) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.quadraticCurveTo(x, y, x, y + radius);
        ctx.moveTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.moveTo(x, y + height - radius);
        ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
        ctx.moveTo(x + width - radius, y + height);
        ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke()
    }

    const drawSelfieRect = (x, y, width, height, radius, strokeColor, lineWidth, ctx) => {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
    }

    const flashOfLight = () => {
        let opacity = 1;
        function animate() {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, 640, 480);
            ctx.fillStyle = `rgba(0, 128, 255, ${opacity})`;
            ctx.fillRect(0, 0, 640, 480);
            opacity -= 0.1;
            if (opacity > 0) {
                requestAnimationFrame(animate);
            }
        }
        animate();
    }

    const takeSelfie = (side) => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(async (blob) => {
            const imageURL = URL.createObjectURL(blob);
            const key = `selfie_${Date.now()}`;
            const storeData = {
                side: side,
                key: key,
                imageURL: imageURL,
            }
            dispatch(setStorePhotos(storeData));
            await localforage.setItem(key, imageURL);
        }, 'image/png');
    }


    const onChangeSelect = (event) => {
        const updatedSelectCamera = available_cameras.filter((item) => item.deviceId === event.value)[0]
        selectCamera(updatedSelectCamera);
    }

    useEffect(() => {
        if (camera_allow_status) {
            allowCameraFunc();
            loadModels();
            localforage.clear();
        }
        return () => {
            console.log("destory")
        }
    }, [])

    useEffect(() => {
        allowCameraFunc(selected_camera);
    }, [selected_camera])
    return (
        <VuiBox>
            <VuiBox >
                <video crossOrigin='anonymous' ref={videoRef} id="video-preview" autoPlay style={{ borderRadius: '20px' }} />
                <canvas ref={canvasRef} style={{ marginTop: '-490px', position: 'absolute' }} />
            </VuiBox>
            <Divider light />
            <Grid container direction={'column'} spacing={1} justifyContent={'center'}>
                <VuiSelect
                    defaultValue={{ value: selected_camera.deviceId, label: selected_camera.label }}
                    options={available_cameras.map((item) => { return { value: item.deviceId, label: item.label } })}
                    onChange={onChangeSelect}
                />
                <VuiButton
                    variant="outlined"
                    size="small"
                    color={'white'}
                    sx={{ width: '100%', marginTop: '10px' }}
                >
                    take a picture
                </VuiButton>
            </Grid>
        </VuiBox>

    );
}

export default WebCamCameraCompoent;
