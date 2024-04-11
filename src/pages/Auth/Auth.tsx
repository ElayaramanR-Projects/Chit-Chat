import React, { useState } from 'react';
import Constants from '../../utils/constants';
import './Auth.module.scss';

interface AuthPageProps {
	initialPage?: 'login' | 'register';
}

const Auth: React.FC<AuthPageProps> = ({ initialPage = 'login' }) => {
	const { FORM, REGEX } = Constants;
	const [currentPage, setCurrentPage] = useState<'login' | 'register'>(
		initialPage,
	);

	const [phone, setPhone] = useState<string>();
	const [isValid, setIsValid] = useState<boolean>(true);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setPhone(value);
		validatePhoneNumber(value);
		setIsValid(!isValid);
	};

	const togglePage = () => {
		setCurrentPage(currentPage === 'login' ? 'register' : 'login');
	};

	const validatePhoneNumber = (value: string) => {
		const pattern = REGEX.PHONE;
		setIsValid(pattern.test(value));
	};

	return (
		<main className='min-h-screen bg-blue-300 flex'>
			<section className='bg-white flex rounded-md m-auto'>
				<div className='w-6/12 banner'>
					<img
						className='w-full h-full rounded-l-md'
						src='https://picsum.photos/300'
						alt='banner'
					/>
				</div>
				<div className='flex flex-col form w-6/12 p-6'>
					<h1 className='text-2xl text-left'>
						{currentPage === 'login'
							? FORM.LOGIN_LABEL
							: FORM.CREATE_ACCOUNT_LABEL}
					</h1>
					<form className='mt-3 flex flex-col items-start w-full form max-w-sm mx-auto'>
						<label
							htmlFor='mobile'
							className='block mb-2 text-sm font-medium text-gray-900'>
							Enter Phone number
						</label>
						<input
							type='tel'
							id='mobile'
							aria-describedby='auth-form-input'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
							placeholder='000-000-0000'
							value={phone}
							onChange={handleChange}
						/>
						<p
							className={`validation-msg text-xs text-red-500 ${
								isValid ? 'invisible' : ''
							}`}>
							Enter a valid phone number
						</p>
					</form>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						{currentPage === 'login'
							? FORM.CREATE_ACCOUNT_TEXT
							: FORM.LOGIN_TEXT}{' '}
						<h1
							className='cursor-pointer inline h-9 text-blue-600 '
							onClick={togglePage}>
							{currentPage === 'login'
								? FORM.CREATE_ACCOUNT_BUTTON_TEXT
								: FORM.LOGIN_BUTTON_TEXT}
						</h1>
						.
					</p>
				</div>
			</section>
		</main>
	);
};

export default Auth;
