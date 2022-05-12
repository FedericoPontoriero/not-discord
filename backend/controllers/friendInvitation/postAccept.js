const FriendInvitation = require('../../models/friendInvitation');
const user = require('../../models/user');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postAccept = async (req, res) => {
	try {
		const { id } = req.body;

		const invitation = await FriendInvitation.findById(id);

		if (!invitation) {
			return res.status(401).send('Error ocurred. Try again');
		}

		const { senderId, receiverId } = invitation;

		// Add friends to users
		const senderUser = await user.findById(senderId);
		senderUser.friends = [...senderUser.friends, receiverId];

		const receiverUser = await user.findById(receiverId);
		receiverUser.friends = [...receiverUser, senderId];

		await senderUser.save();
		await receiverUser.save();

		// Delete invitation
		await FriendInvitation.findByIdAndDelete(id);

		// Update list of friends if online

		// Update list of pendingInvitations
		friendsUpdates.updateFriendsPendingInvitations(receiverId.toString());
		return res.status(200).send('Friend successfully added');
	} catch (error) {
		return res.status(500).send('Something went wrong');
	}
};

module.exports = postAccept;
