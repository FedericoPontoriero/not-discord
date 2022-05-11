const postInvite = async (req, res) => {
	const { targetMailAddress } = req.body;

	return res.send(`${targetMailAddress}`);
};

module.exports = postInvite;
