import React, { useState } from 'react';
import Constants from '../../utils/constants';
import { validateString } from '../../utils/utils';
import './Auth.module.scss';

interface AuthPageProps {
	initialPage?: 'login' | 'register';
}

const Auth: React.FC<AuthPageProps> = ({ initialPage = 'login' }) => {
	const { FORM, REGEX } = Constants;
	const [currentPage, setCurrentPage] = useState<'login' | 'register'>(
		initialPage,
	);

	const [phone, setPhone] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(true);
	const [isVerfing, setIsVerfing] = useState<boolean>(false);
	const [otp, setOtp] = useState<string>('');

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (isVerfing) {
			setOtp(value);
			return;
		}
		setIsValid(validateString(value, REGEX.PHONE));
		setPhone(value);
	};

	const reset=():void => {
		setPhone('');
		setIsVerfing(false);
	}

	const togglePage = () => {
		reset();
		setCurrentPage(currentPage === 'login' ? 'register' : 'login');
	};

	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
		console.log('get otp');

		event.preventDefault();
		setIsVerfing(true);
	};

	return (
		<div className='flex justify-center items-center h-screen bg-blue-300'>
			<section
				className='w-screen h-full flex flex-col sm:flex-row sm:h-[500px] 
			md:w-[720px] bg-white  rounded-md m-auto'>
				<div className='w-full h-2/6 sm:h-full sm:w-6/12 banner'>
					<img
						className='w-full h-full rounded-l-md'
						src='https://picsum.photos/300'
						alt='banner'
					/>
				</div>
				<div className='w-[360px] mx-auto flex flex-col gap-5 sm:w-6/12 p-6 form'>
					<h1 className='text-2xl text-left'>
						{currentPage === 'login'
							? FORM.LOGIN_LABEL
							: FORM.CREATE_ACCOUNT_LABEL}
					</h1>
					<div className='mt-3 flex flex-col items-start w-full form max-w-sm '>
						{isVerfing ? (
							<>
								<label
									htmlFor='mobile'
									className='block mb-2 text-sm font-medium text-gray-900'>
									enter your OTP sent to this number {phone}
								</label>
								<input
									type='tel'
									id='mobile'
									aria-describedby='auth-form-input'
									className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
									placeholder='000-000-0000'
									value={otp}
									disabled={!isVerfing}
									onChange={handleChange}
									required={true}
								/>
								<p
									className={`validation-msg pl-2 text-xs text-red-500 ${
										isValid ? 'invisible' : ''
									}`}>
									Enter a valid phone number
								</p>
								<button
									type='submit'
									className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
									disabled={!isValid || isVerfing}>
									Verify now
								</button>
							</>
						) : (
							<>
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
									disabled={isVerfing}
									onChange={handleChange}
									required={true}
								/>
								<p
									className={`validation-msg pl-2 text-xs text-red-500 ${
										isValid ? 'invisible' : ''
									}`}>
									Enter a valid phone number
								</p>
								<button
									onClick={handleSubmit}
									className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
									disabled={!isValid}>
									{currentPage === 'login'
										? FORM.LOGIN_BUTTON_TEXT
										: FORM.CREATE_ACCOUNT_BUTTON_TEXT}
								</button>
							</>
						)}
					</div>
					<p className='text-sm text-gray-500 dark:text-gray-400'>
						{currentPage === 'login'
							? FORM.CREATE_ACCOUNT_TEXT
							: FORM.LOGIN_TEXT}{' '}
						<span
							className='cursor-pointer inline h-9 text-blue-600 underline'
							onClick={togglePage}>
							{currentPage === 'login'
								? FORM.CREATE_ACCOUNT_BUTTON_TEXT
								: FORM.LOGIN_BUTTON_TEXT}
						</span>
						.
					</p>
				</div>
			</section>
		</div>
	);
};

export default Auth;
