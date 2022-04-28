const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postLogin = async (req, res) => {
	try {
		const { mail, password } = req.body;

		// Check if mail exists and password is correct
		const user = await User.findOne({ mail: mail.toLowerCase() });
		if (user && (await bcrypt.compare(password, user.password))) {
			// Send new Token
			const token = 'JWT_TOKEN';

			return res.status(200).json({
				userDetails: {
					mail: user.mail,
					token: token,
					username: user.username,
				},
			});
		}

		return res.status(400).send('Invalid credentials. Please try again.');
	} catch (error) {
		return res.status(500).send('Something went wrong. Please try again.');
	}
};

module.exports = postLogin;
