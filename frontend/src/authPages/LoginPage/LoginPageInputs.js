import React from 'react';
import InputWithLabel from '../../shared/components/InputWithLabel';

function LoginPageInputs({ mail, setMail, password, setPassword }) {
	return (
		<>
			<InputWithLabel
				value={mail}
				setValue={setMail}
				label='E-mail'
				type='text'
				placeholder='Enter e-mail adress'
			/>

			<InputWithLabel
				value={password}
				setValue={setPassword}
				label='password'
				type='password'
				placeholder='Enter Password'
			/>
		</>
	);
}

export default LoginPageInputs;
