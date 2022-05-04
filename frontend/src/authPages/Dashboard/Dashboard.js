import React from 'react';
import { styled } from '@mui/material';
import SideBar from './SideBar/SideBar';
import FriendsSideBar from './FriendsSideBar/FriendsSideBar';
import Messenger from './Messenger/Messenger';
import Appbar from './Appbar/Appbar';

const Wrapper = styled('div')({
	width: '100%',
	height: '100vh',
	display: 'flex',
});
function Dashboard() {
	return (
		<Wrapper>
			<SideBar />
			<FriendsSideBar />
			<Messenger />
			<Appbar />
		</Wrapper>
	);
}

export default Dashboard;
