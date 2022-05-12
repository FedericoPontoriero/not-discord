import React from 'react';
import { styled } from '@mui/system';
import FriendsListItem from './FriendsListItem';
import { connect } from 'react-redux';

const DUMMY_FRIENDS = [
	{
		id: 1,
		username: 'Mark',
		isOnline: true,
	},
	{
		id: 2,
		username: 'Anna',
		isOnline: true,
	},
	{
		id: 3,
		username: 'John',
		isOnline: false,
	},
];

const MainContainer = styled('div')({
	flexGrow: 1,
	width: '100%',
});

function FriendsList(friends) {
	return (
		<MainContainer>
			{friends.map(f => (
				<FriendsListItem
					username={f.username}
					id={f.id}
					key={f.id}
					isOnline={f.isOnline}
				/>
			))}
		</MainContainer>
	);
}
const mapStoreStateToProps = ({ friends }) => {
	return {
		...friends,
	};
};

export default connect(mapStoreStateToProps)(FriendsList);
