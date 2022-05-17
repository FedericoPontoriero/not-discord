import React, { useEffect } from 'react';
import { styled } from '@mui/material';
import SideBar from './SideBar/SideBar';
import FriendsSideBar from './FriendsSideBar/FriendsSideBar';
import Messenger from './Messenger/Messenger';
import AppBar from './Appbar/AppBar';
import { logout } from '../../shared/utils/auth';
import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authActions';
import { connectWithsocketServer } from '../../realtimeCommunication/socketConnection';

const Wrapper = styled('div')({
	width: '100%',
	height: '100vh',
	display: 'flex',
});
function Dashboard({ setUserDetails }) {
	useEffect(() => {
		const userDetails = localStorage.getItem('user');

		if (!userDetails) {
			logout();
		} else {
			setUserDetails(JSON.parse(userDetails));
			connectWithsocketServer(JSON.parse(userDetails));
		}
	}, []);
	return (
		<Wrapper>
			<SideBar />
			<FriendsSideBar />
			<Messenger />
			<AppBar />
		</Wrapper>
	);
}

const mapActionsToProps = dispatch => {
	return {
		...getActions(dispatch),
	};
};

export default connect(null, mapActionsToProps)(Dashboard);
