import { useEffect, useState } from "react";
import { alert_proxy_not_working } from "redux/actions/warningMsgFunc";
import { useDispatch, useSelector } from "react-redux";
import VuiButton from "components/VuiButton";
import { Card, CardContent, CardHeader, Typography, Divider } from '@mui/material';
import { sendColoringPDF } from "redux/actions/tour_management";
import { Grid } from "@mui/material";

var mediaRecorder = null;
var recordedChunks = [];

const startRecording = (streamName, toogleRecording) => {
    try {
        const video = document.getElementById(streamName);
        const stream = video.captureStream();
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' });
        mediaRecorder.ondataavailable = function (event) {
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        mediaRecorder.onstop = function () {
            const blob = new Blob(recordedChunks, {
                type: 'video/webm'
            });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `${streamName}.webm`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        };
        mediaRecorder.start();
        toogleRecording();
    } catch (error) {
        console.log(error)
        dispatch(alert_proxy_not_working())
    }
}

const stopRecording = (toogleRecording) => {
    if (mediaRecorder) {
        mediaRecorder.stop();
        toogleRecording()
    }
}

const CameraItem = ({ camera_data, id }) => {
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.auth.userData);
    const streamurl = `rtsp://${camera_data.camera_user_name}:${camera_data.password}@${camera_data.camera_ip}:${camera_data.camera_port}/h264Preview_01_main`
    const activeStreams = {};
    const camera_name = `camera_${id}`
    const [recording, setRecording] = useState(false);
    const access_token = userdata.access;

    const toogleRecording = () => setRecording(!recording);
    
    useEffect(async () => {
        try {
            const response = await fetch('http://localhost:5000/start_stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ rtsp_url: streamurl, stream_name: camera_name })
            });

            if (response.ok) {
                const data = await response.json();
                await waitForStream(data.stream_name);
                addStreamPlayer(data.stream_name);
            } else {
                console.error("Rendering Stream Error")
            }
        } catch (error) {
            dispatch(alert_proxy_not_working())
        }
    }, [])

    useEffect(() => {
        return () => {
            stopStream(camera_name);
        };
    }, [])

    const stopStream = async (streamname) => {
        try {
            const response = await fetch('http://localhost:5000/stop_stream', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ stream_name: streamname })
            });

            if (response.ok) {
                const data = await response.json();
                // Stop polling for the stream
                if (activeStreams[streamName]) {
                    activeStreams[streamName].stop = true;
                    if (activeStreams[streamName].hls) {
                        activeStreams[streamName].hls.destroy();
                    }
                    delete activeStreams[streamName];
                }
                // Optionally remove the video element
                const video = document.getElementById(streamName);
                if (video) {
                    streamsDiv.removeChild(video);
                }
            } else {
                console.error('Failed to stop stream')
            }
        } catch (error) {
            dispatch(alert_proxy_not_working())
        }
    }

    const waitForStream = async (streamName) => {
        const videoSrc = `http://localhost:5000/stream/${streamName}/index.m3u8`;
        activeStreams[streamName] = { stop: false };
        while (true) {
            if (activeStreams[streamName].stop) {
                return;
            }
            try {
                const response = await fetch(videoSrc, { method: 'HEAD' });
                if (response.ok) {
                    return;
                }
            } catch (error) {
                console.error('Error checking stream:', error);
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }

    const addStreamPlayer = (streamName) => {
        const video = document.getElementById(streamName);

        const videoSrc = `http://localhost:5000/stream/${streamName}/index.m3u8`;

        if (Hls.isSupported()) {
            const hls = new Hls();
            activeStreams[streamName].hls = hls;
            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
            hls.on(Hls.Events.ERROR, function (event, data) {
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            // try to recover network error
                            console.error("fatal network error encountered, try to recover");
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error("fatal media error encountered, try to recover");
                            hls.recoverMediaError();
                            break;
                        default:
                            // cannot recover
                            hls.destroy();
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
            video.addEventListener('canplay', function () {
                video.play();
            });
        }
    }


    const cardHeader = (header) => {
        return <Typography alignSelf={'center'} color={"whitesmoke"}>{header}</Typography>
    }

    const send_coloring_pdf = (camera_id) => {
        const camera_info = { 'camera_id': camera_id }
        dispatch(sendColoringPDF(access_token, camera_info))
    }
    
    return (
        <Grid item xs={12} sm={6} lg={4} key={id} mt={8}>
            <Card>
                <CardHeader component={() => cardHeader(camera_name)} />
                <Divider light sx={{ marginTop: 5 }} />
                <CardContent>
                    <video controls autoPlay id={camera_name} style={{ width: '-webkit-fill-available' }}></video>
                    <Grid item>
                        <Grid container spacing={3}>
                            {recording === false ? <Grid item xs={12} sm={6} lg={6}>
                                <VuiButton
                                    variant="outlined"
                                    size="small"
                                    color={'info'}
                                    onClick={() => startRecording(camera_name, toogleRecording)}
                                >
                                    Start Recording
                                </VuiButton>
                            </Grid> : <Grid item xs={12} sm={6} lg={6}>
                                <VuiButton
                                    variant="outlined"
                                    size="small"
                                    color={'error'}
                                    onClick={() => stopRecording(toogleRecording)}
                                >
                                    Stop Recording
                                </VuiButton>
                            </Grid>}
                            <Grid item xs={12} sm={6} lg={6}>
                                <VuiButton
                                    variant="outlined"
                                    size="small"
                                    color={'success'}
                                    onClick={() => send_coloring_pdf(id)}
                                >
                                    Coloring PDF
                                </VuiButton>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Grid>

    );
};

export default CameraItem;
