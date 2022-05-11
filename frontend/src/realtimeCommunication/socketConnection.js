import io from 'socket.io-client';
import { setPendingFriendsInvitations } from '../store/actions/friendsActions';

let socket = null;

export const connectWithSoketServer = userDetails => {
	const jwtToken = userDetails.token;

	socket = io('http://localhost:5002', {
		auth: {
			token: jwtToken,
		},
	});

	socket.on('connect', () => {
		console.log('succesfully connected with socket.io server', socket.id);
	});

	socket.on('friends-invitations', data => {
		const { pendingInvitations } = data;

		store.dispatch(setPendingFriendsInvitations(pendingInvitations));
	});
};
