import React from 'react';
import { styled } from '@mui/material';

const MainContainer = styled('div')({
	width: '72px',
	height: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	backgroundColor: '#202225',
});

function SideBar() {
	return <MainContainer></MainContainer>;
}

export default SideBar;
