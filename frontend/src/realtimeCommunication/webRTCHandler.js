import store from '../store/store';
import { setLocalStream, setRemoteStreams } from '../store/actions/roomActions';
import Peer from 'simple-peer';
import * as socketConnection from './socketConnection';

const getConfiguration = () => {
	const turnIceServers = null;

	if (turnIceServers) {
		// fetch use turn server credentials
	} else {
		console.warn('using only STUN server');
		return {
			iceServers: [
				{
					urls: 'stun:stun.l.google.com:19302',
				},
			],
		};
	}
};

const onlyAudioConstraints = {
	audio: true,
	video: false,
};

const defaultConstraints = {
	video: true,
	audio: true,
};

export const getLocalStreamPreview = (onlyAudio = false, callbackFunction) => {
	const constraints = onlyAudio ? onlyAudioConstraints : defaultConstraints;

	navigator.mediaDevices
		.getUserMedia(constraints)
		.then(stream => {
			store.dispatch(setLocalStream(stream));
			callbackFunction();
		})
		.catch(err => {
			console.log(err, 'Error: Cannot get access to local stream');
		});
};

let peers = {};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
	const localStream = store.getState().room.localStream;

	if (isInitiator) {
		console.log('preparing new connection as initiator');
	} else {
		console.log('preparing new connection as not a initiator');
	}

	peers[connUserSocketId] = new Peer({
		initiator: isInitiator,
		config: getConfiguration(),
		stream: localStream,
	});

	peers[connUserSocketId].on('signal', data => {
		const signalData = {
			signal: data,
			connUserSocketId: connUserSocketId,
		};

		socketConnection.signalPeerData(signalData);
	});

	peers[connUserSocketId].on('stream', remoteStream => {
		// add new remoteStream to server store
		console.log('remoteStream', remoteStream);

		remoteStream.connUserSocketId = connUserSocketId;
		addNewRemoteStream(remoteStream);
	});
};

export const handleSignalingData = data => {
	const { connUserSocketId, signal } = data;

	if (peers[connUserSocketId]) {
		peers[connUserSocketId].signal(signal);
	}
};

export const addNewRemoteStream = remoteStream => {
	const remoteStreams = store.getState().room.remoteStreams;
	const newRemoteStreams = [...remoteStreams, remoteStream];

	store.dispatch(setRemoteStreams(newRemoteStreams));
};

export const closeAllConnections = () => {
	Object.entries(peers).forEach(mappedObject => {
		const connUserSocketId = mappedObject[0];
		if (peers[connUserSocketId]) {
			peers[connUserSocketId].destroy();
			delete peers[connUserSocketId];
		}
	});
};

export const handleParticipantLeftRoom = data => {
	const { connUserSocketId } = data;

	if (peers[connUserSocketId]) {
		peers[connUserSocketId].destroy();
		delete peers[connUserSocketId];
	}

	const remoteStreams = store.getState().room.remoteStreams;
	const newRemoteStreams = remoteStreams.filter(
		remoteStream => remoteStream.connUserSocketId !== connUserSocketId
	);
	store.dispatch(setRemoteStreams(newRemoteStreams));
};
