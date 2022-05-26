import React from 'react';
import { styled } from '@mui/system';
import CameraButton from './CameraButton';
import MicButton from './MicButton';
import CloseRoomButton from './CloseRoomButton';
import ScreenShareButton from './ScreenShareButton';
import { connect } from 'react-redux';

const MainContainer = styled('div')({
	height: '15%',
	width: '100%',
	backgroundColor: '#5865F2',
	borderTopLeftRadius: '8px',
	borderTopRightRadius: '8px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const RoomButtons = ({ localStream }) => {
	return (
		<MainContainer>
			<ScreenShareButton />
			<MicButton localStream={localStream} />
			<CloseRoomButton />
			<CameraButton localStream={localStream} />
		</MainContainer>
	);
};

const mapStoreStateToProps = ({ room }) => {
	return {
		...room,
	};
};

export default connect(mapStoreStateToProps)(RoomButtons);
