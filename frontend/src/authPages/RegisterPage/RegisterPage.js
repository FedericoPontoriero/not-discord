import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AuthBox from '../../shared/components/AuthBox';
import RegisterPageFooter from './RegistePageFooter';
import RegisterPageInputs from './RegisterPageInputs';
import { validateRegisterForm } from '../../shared/utils/validators';

function RegisterPage() {
	const [mail, setMail] = useState('');
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isFormValid, setIsFormValid] = useState(false);

	const handleRegister = () => {
		console.log(mail, username, password, 'registering');
	};

	useEffect(() => {
		setIsFormValid(validateRegisterForm({ mail, username, password }));
	}, [mail, username, password, setIsFormValid]);
	return (
		<AuthBox>
			<Typography variant='h5' sx={{ color: 'white' }}>
				Create an account
			</Typography>
			<RegisterPageInputs
				mail={mail}
				setMail={setMail}
				username={username}
				setUsername={setUsername}
				password={password}
				setPassword={setPassword}
			/>
			<RegisterPageFooter
				handleRegister={handleRegister}
				isFormValid={isFormValid}
			/>
		</AuthBox>
	);
}

export default RegisterPage;
