import {
	setOpenRoom,
	setRoomDetails,
	setActiveRooms,
	setLocalStream,
} from '../store/actions/roomActions';
import store from '../store/store';
import * as socketConnection from './socketConnection';
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () => {
	const succesCallbackFunction = () => {
		store.dispatch(setOpenRoom(true, true));
		socketConnection.createNewRoom();
	};

	const audioOnly = store.getState().room.audioOnly;
	webRTCHandler.getLocalStreamPreview(audioOnly, succesCallbackFunction);
};

export const newRoomCreated = data => {
	const { roomDetails } = data;

	store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = data => {
	const { activeRooms } = data;

	const friends = store.getState().friends.friends;

	const rooms = [];

	activeRooms.forEach(room => {
		friends.forEach(f => {
			if (f.id === room.roomCreator.userId) {
				rooms.push({ ...room, creatorUsername: f.username });
			}
		});
	});

	store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = roomId => {
	const succesCallbackFunction = () => {
		store.dispatch(setRoomDetails({ roomId }));
		store.dispatch(setOpenRoom(false, true));
		socketConnection.joinRoom({ roomId });
	};

	const audioOnly = store.getState().room.audioOnly;
	webRTCHandler.getLocalStreamPreview(audioOnly, succesCallbackFunction);
};

export const leaveRoom = () => {
	const roomId = store.getState().room.roomDetails.roomId;

	const localStream = store.getState().room.localStream;
	if (localStream) {
		localStream.getTracks().forEach(track => track.stop());
		store.dispatch(setLocalStream(null));
	}

	webRTCHandler.closeAllConnections();

	socketConnection.leaveRoom({ roomId });
	store.dispatch(setRoomDetails(null));
	store.dispatch(setOpenRoom(false, false));
};
