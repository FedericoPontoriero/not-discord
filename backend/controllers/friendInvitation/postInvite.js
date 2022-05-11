const user = require('../../models/user');
const FriendInvitation = require('../../models/friendInvitation');

const postInvite = async (req, res) => {
	const { targetMailAddress } = req.body;

	const { userId, mail } = req.user;

	// Check if the friend is not already user
	if (mail.toLowerCase() === targetMailAddress.toLowerCase) {
		return res
			.status(409)
			.send('Sorry, you cannot send an invitation to yourself');
	}

	const targetUser = await user.findOne({
		mail: targetMailAddress.toLowerCase(),
	});

	if (!targetUser) {
		return res
			.status(404)
			.send(`Friend of ${targetMailAddress} has not been found`);
	}

	// Check if the invitation has already been sent

	const invitationAlreadyReceived = await FriendInvitation.findOne({
		senderId: userId,
		receiverId: targetUser._id,
	});

	if (invitationAlreadyReceived) {
		return res.status(409).send('Invitation already sent');
	}

	// Check if the user has already accepted the invitation

	const userAlreadyFriend = targetUser.friends.find(
		friendId => friendId.toString() === userId.toString()
	);

	if (userAlreadyFriend) {
		return res.status(409).send('Friend already added');
	}

	// Create new invitation in database

	const newInvitation = await FriendInvitation.create({
		senderId: userId,
		receiverId: targetUser._id,
	});

	// Check if invitation has been created successfully and update friends invitations

	return res.status(201).send('Invitation sent successfully');
};

module.exports = postInvite;
