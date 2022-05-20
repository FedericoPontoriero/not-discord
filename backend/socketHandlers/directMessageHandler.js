const Message = require('../models/message');
const Conversation = require('../models/conversation');

const directMessageHandler = async (socket, data) => {
	try {
		const { userId } = socket.user;
		const { receiverUserId, content } = data;

		// create a new message
		const message = await Message.create({
			content: content,
			authorId: userId,
			date: new Date(),
			type: 'DIRECT',
		});

		// Check if the conversation already exists and create a new one if not

		const conversation = await Conversation.findOne({
			participants: { $all: [userId, receiverUserId] },
		});

		if (conversation) {
			conversation.messages.push(message._id);
			await conversation.save();

			// update if online
		} else {
			// create a new conversation

			const newConversation = await Conversation.create({
				messages: [message._id],
				participants: [userId, receiverUserId],
			});

			// update if online
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports = directMessageHandler;
