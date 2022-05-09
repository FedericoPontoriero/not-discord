const connectedUsers = new Map();

const addNewConnectedUser = ({ socketId, userId }) => {
	connectedUsers.set(socketId, { userId });
};

module.exports = {
	addNewConnectedUser,
};
