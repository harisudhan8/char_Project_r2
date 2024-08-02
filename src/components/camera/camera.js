import React, { useRef, useEffect } from 'react';
import './camera.css';

const Camera = ({ onClose, onCapture }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const videoElement = videoRef.current;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      })
      .catch(error => console.error('Error accessing webcam:', error));

    return () => {
      if (videoElement && videoElement.srcObject) {
        const stream = videoElement.srcObject;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const image = canvas.toDataURL('image/png');
      onCapture(image);
    }
  };

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay className="camera-video"></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <button onClick={handleCapture} className="camera-capture-btn">Capture</button>
      <button onClick={onClose} className="camera-close-btn">Close</button>
    </div>
  );
};

export default Camera;
