const DUMMY_MESSAGES = [
	{
		_id: 1,
		content: 'hello',
		sameAuthor: 'false',
		author: {
			username: 'Pepe',
		},
		date: '22/01/2022',
		sameDay: false,
	},
	{
		_id: 2,
		content: 'hello 2',
		sameAuthor: 'true',
		author: {
			username: 'Pepe',
		},
		date: '22/01/2022',
		sameDay: true,
	},
];

export default DUMMY_MESSAGES;
