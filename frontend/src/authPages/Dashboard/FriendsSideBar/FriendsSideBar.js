import React from 'react';
import { styled } from '@mui/material';

const MainContainer = styled('div')({
	width: '224px',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	backgroundColor: '#2F3136',
});
function FriendsSideBar() {
	return <MainContainer></MainContainer>;
}

export default FriendsSideBar;
