import React from 'react';
import CustomPrimaryButton from '../../../shared/components/CustomPrimaryButton';

const additonalStyles = {
	marginTop: '10px',
	marginLeft: '5px',
	width: '80%',
	height: '30px',
	background: '#3ba55d',
};

function AddFriendButton() {
	const handleOpenAddFriendDialog = () => {};

	return (
		<>
			<CustomPrimaryButton
				additionalStyles={additonalStyles}
				label='Add Friend'
				onClick={handleOpenAddFriendDialog}
			/>
		</>
	);
}

export default AddFriendButton;
