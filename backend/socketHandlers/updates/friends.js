const user = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');
const serverStore = require('../../serverStore');

const updateFriendsPendingInvitations = async userId => {
	try {
		const pendingInvitations = await FriendInvitation.find({
			receiverId: userId,
		}).populate('senderId', '_id username mail');

		// find active connections

		const receiverList = serverStore.getActiveConnections(userId);

		const io = serverStore.getSocketServerInstance();

		receiverList.forEach(receiverSocketId => {
			io.to(receiverSocketId).emit('friends-invitations', {
				pendingInvitations: pendingInvitations ? pendingInvitations : [],
			});
		});
	} catch (err) {
		console.log(err);
	}
};

const updateFriends = async userId => {
	try {
		// find active connections of specific id
		const receiverList = serverStore.getActiveConnections(userId);

		if (receiverList > 0) {
			const User = await user
				.findById(userId, { _id: 1, friends: 1 })
				.populate('friends', '_id username mail');
			if (User) {
				const friendsList = User.friends.map(f => {
					return {
						id: f.id,
						mail: f.mail,
						username: f.username,
					};
				});

				// get io instance
				const io = serverStore.getSocketServerInstance();

				receiverList.forEach(receiverSocketId => {
					io.to(receiverSocketId).emit('friends-list', {
						friends: friendsList ? friendsList : [],
					});
				});
			}
		}
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	updateFriendsPendingInvitations,
	updateFriends,
};
