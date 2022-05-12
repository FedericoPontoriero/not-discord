const serverStore = require('../serverStore');
const friendsUpdate = require('../socketHandlers/updates/friends');

const newConnectionHandler = async (socket, io) => {
	const userDetails = socket.user;

	serverStore.addNewConnectedUser({
		socketId: socket.id,
		userId: userDetails.userId,
	});
	// Update the list of invitations
	friendsUpdate.updateFriendsPendingInvitations(userDetails.userId);
};

module.exports = newConnectionHandler;