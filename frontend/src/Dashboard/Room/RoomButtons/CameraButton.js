import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const CameraButton = () => {
	const [videoEnabled, setVideoEnabled] = useState(true);

	const handleToggleCamera = () => {
		setVideoEnabled(!videoEnabled);
	};

	return (
		<IconButton onClick={handleToggleCamera} style={{ color: 'white' }}>
			{videoEnabled ? <VideocamIcon /> : <VideocamOffIcon />}
		</IconButton>
	);
};

export default CameraButton;
