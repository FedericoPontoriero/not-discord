const FriendInvitation = require('../../models/friendInvitation');
const friendsUpdates = require('../../socketHandlers/updates/friends');

const postReject = async (req, res) => {
	try {
		const { id } = req.body;
		const { userId } = req.user;

		// Remove the invitation from the collection
		const invitationExists = await FriendInvitation.exists({ _id: id });

		if (invitationExists) {
			await FriendInvitation.findByIdAndDelete(id);
		}

		// Update the invitations
		friendsUpdates.updateFriendsPendingInvitations(userId);

		return res.status(200).send('Invitation rejected.');
	} catch (error) {
		return res.status(500).send('Something went wrong');
	}
};

module.exports = postReject;
