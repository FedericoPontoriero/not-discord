import React from 'react';
import CustomPrimaryButton from '../../shared/components/CustomPrimaryButton';
import RedirectInfo from '../../shared/components/RedirectInfo';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const getFormNotValidMessage = () => {
	return 'Username should contain between 3 and 12 characters and password should contain between 6 and 12 characters. Also a valid e-mail should be provided.';
};

const getFormValidMessage = () => {
	return 'Press to Register!';
};
function RegisterPageFooter({ handleRegister, isFormValid }) {
	const navigate = useNavigate();

	const handlePushToLoginPage = () => {
		navigate('/login');
	};

	return (
		<>
			<Tooltip
				title={!isFormValid ? getFormNotValidMessage() : getFormValidMessage}>
				<div>
					<CustomPrimaryButton
						label='Register'
						additionalStyles={{ marginTop: '30px' }}
						disabled={!isFormValid}
						onClick={handleRegister}
					/>
				</div>
			</Tooltip>
			<RedirectInfo
				redirectText='Already have an account? '
				additionalStyles={{ marginTop: '5px' }}
				redirectHandler={handlePushToLoginPage}
			/>
		</>
	);
}

export default RegisterPageFooter;
