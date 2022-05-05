import React from 'react';
import { Button, Typography } from '@mui/material';
import avatar from '../../../../shared/components/avatar';

function FriendsListItem({ id, username, isOnline }) {
	return (
		<Button
			style={{
				width: '100%',
				height: '42px',
				marginTop: '10px',
				display: 'flex',
				alignItems: 'flex-start',
				textTransform: 'none',
				color: 'black',
				position: 'relative',
			}}>
			<avatar username={username} />
			<Typography
				style={{ marginLeft: '7px', fontWeight: 700, color: '#8e9297' }}
				variant='subtitle1'
				align='left'>
				{username}
			</Typography>
		</Button>
	);
}

export default FriendsListItem;
