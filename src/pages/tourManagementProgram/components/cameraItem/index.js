import { useEffect } from "react";
import { alert_proxy_not_working } from "redux/actions/warningMsgFunc";
import { useDispatch, useSelector } from "react-redux";

const CameraItem = ({ camera_data, id }) => {
    const dispatch = useDispatch();
    const streamurl = `rtsp://${camera_data.camera_user_name}:${camera_data.password}@${camera_data.camera_ip}:${camera_data.camera_port}/h264Preview_01_main`
    const activeStreams = {};
    const camera_name = `camera_${id}`

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
    return (
        <video controls autoPlay id={`camera_${id}`} style={{ width: '-webkit-fill-available' }}></video>
    );
};

export default CameraItem;