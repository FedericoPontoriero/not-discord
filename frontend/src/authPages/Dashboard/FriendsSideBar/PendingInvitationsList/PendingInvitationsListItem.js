import { Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import Avatar from '../../../../shared/components/avatar';
import InvitationDecisionButtons from './InvitationDecisionButtons';
import { connect } from 'react-redux';
import { getActions } from '../../../../store/actions/friendsActions';

function PendingInvitationsListItem({
	id,
	username,
	mail,
	acceptFriendInvitation = () => {},
	rejectFriendInvitation = () => {},
}) {
	const [buttonsDisabled, setButtonsDisabled] = useState(false);

	const handleAcceptInvitation = () => {
		acceptFriendInvitation({ id });
		setButtonsDisabled(true);
	};

	const handleRejectInvitation = () => {
		rejectFriendInvitation({ id });
		setButtonsDisabled(true);
	};

	return (
		<Tooltip title={mail}>
			<div style={{ width: '100%' }}>
				<Box
					sx={{
						width: '100%',
						height: '42px',
						marginTop: '10px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}>
					<Avatar username={username} />
					<Typography
						sx={{
							marginLeft: '7px',
							fontWeight: 700,
							color: '#8e9297',
							flexGrow: 1,
						}}
						variant='subtitle1'>
						{username}
					</Typography>
					<InvitationDecisionButtons
						disabled={buttonsDisabled}
						acceptInvitationHandler={handleAcceptInvitation}
						rejectInvitationHandler={handleRejectInvitation}
					/>
				</Box>
			</div>
		</Tooltip>
	);
}

const mapActionsToProps = dispatch => {
	return {
		...getActions(dispatch),
	};
};

export default connect(null, mapActionsToProps)(PendingInvitationsListItem);
