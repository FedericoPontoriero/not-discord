import { Dialog, DialogTitle, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { validateMail } from '../../../shared/utils/validators';
import { DialogActions } from '@mui/material';
import { DialogContent } from '@mui/material';
import { DialogContentText } from '@mui/material';
import inputWithLabel from '../../../shared/components/inputWithLabel';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';
import { connect } from 'react-redux';
import { getActions } from '../../../store/actions/friendsActions';

function AddFriendDialog({
	IsDialogOpen,
	closeDialogHandler,
	sendFriendInvitation = () => {},
}) {
	const [mail, setMail] = useState('');
	const [isFormValid, setIsFormValid] = useState('');

	const handleSendInvitation = () => {
		sendFriendInvitation(
			{
				targetMailAddress: mail,
			},
			handleCloseDialog
		);
	};

	const handleCloseDialog = () => {
		closeDialogHandler();
		setMail('');
	};

	useEffect(() => {
		setIsFormValid(validateMail(mail));
	}, [mail, setIsFormValid]);

	return (
		<Dialog open={IsDialogOpen} onClose={handleCloseDialog}>
			<DialogTitle>
				<Typography>Invite a Friend</Typography>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					<Typography>
						Enter e-mail address of the friend you want to invite
					</Typography>
				</DialogContentText>
				<inputWithLabel
					label='Mail'
					type='text'
					value={mail}
					setValue={setMail}
					placeholder='Enter mail address'
				/>
			</DialogContent>
			<DialogActions>
				<CustomPrimaryButton
					onClick={handleSendInvitation}
					disabled={!isFormValid}
					label='Send'
					additionalStyles={{
						marginLeft: '15px',
						marginRight: '15px',
						marginBottom: '10px',
					}}
				/>
			</DialogActions>
		</Dialog>
	);
}

const mapActionsToProps = dispatch => {
	return {
		...getActions(dispatch),
	};
};

export default connect(null, mapActionsToProps)(AddFriendDialog);
