// Auth.tsx
import React, { useState } from 'react';
import Input from '../../components/Form/Input';
import Constants from '../../utils/constants';
import { validateString } from '../../utils/utils';

interface AuthPageProps {
	initialPage?: 'login' | 'register';
}

const Auth: React.FC<AuthPageProps> = ({ initialPage = 'login' }) => {
	const { FORM, REGEX } = Constants;
	const [currentPage, setCurrentPage] = useState<'login' | 'register'>(
		initialPage,
	);

	const [inputValue, setInputValue] = useState<string>('');
	const [isValid, setIsValid] = useState<boolean>(false);
	const [isVerifying, setIsVerifying] = useState<boolean>(false);
	const [otp, setOtp] = useState<string>('');
	const [submit, setSubmit] = useState<boolean>(false);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		if (isVerifying) {
			setOtp(value);
		} else {
			setIsValid(validateString(value, REGEX.PHONE));
			setInputValue(value);
		}
	};

	const reset = (): void => {
		setInputValue('');
		setIsVerifying(false);
	};

	const togglePage = () => {
		reset();
		setCurrentPage(currentPage === 'login' ? 'register' : 'login');
	};

	const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		setIsVerifying(true);
		if (isValid) {
			setSubmit(true);
		}
	};

	const phoneProps = {
		type: isVerifying ? 'text' : 'tel',
		inputName: isVerifying ? 'otp' : 'mobile',
		labelName: isVerifying
			? `Enter your OTP sent to this number ${inputValue}`
			: 'Enter Phone number',
		value: isVerifying ? otp : inputValue,
		status: isVerifying,
		isInvalid: !isValid,
		errorMessage: isVerifying ? 'enter OTP' : 'Enter Phone number',
		placeHolder: isVerifying ? '000 000' : '0000 000 000',
		changeHandler: handleChange,
		required: true,
		validate: true,
	};

	const otpProps = {
		type: 'text',
		inputName: 'otp',
		labelName: `Enter your OTP sent to this number ${inputValue}`,
		value: otp,
		status: isVerifying,
		isInvalid: !isValid,
		errorMessage: isVerifying ? 'enter OTP' : 'Enter Phone number',
		placeHolder: isVerifying ? '000 000' : '0000 000 000',
		changeHandler: handleChange,
		required: true,
		validate: true,
	};

	return (
		<main className='w-screen h-screen flex flex-row bg-white rounded-md m-auto'>
			<div className='w-screen[50%] h-2/6 hidden lg:block sm:h-full sm:w-6/12 banner'>
				<img
					className='w-full h-full rounded-l-md'
					src='https://picsum.photos/300'
					alt='banner'
				/>
			</div>
			<div className='w-full mx-auto flex justify-center flex-col gap-5 p-6 form'>
				<h1 className='text-2xl text-left'>
					{currentPage === 'login'
						? FORM.LOGIN_LABEL
						: FORM.CREATE_ACCOUNT_LABEL}
				</h1>
				<div className='mt-3 flex flex-col items-start w-full form max-w-sm'>
					<Input {...(submit ? otpProps : phoneProps)} />
					<button
						type='submit'
						onClick={handleSubmit}
						className={`w-full text-white marker:font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  ${
							!isValid
								? 'cursor-not-allowed bg-blue-400'
								: `cursor-pointer  bg-blue-700 
								hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
								dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`
						}`}
						disabled={isVerifying}>
						{isVerifying
							? 'Verify now'
							: currentPage === 'login'
							? FORM.LOGIN_BUTTON_TEXT
							: FORM.CREATE_ACCOUNT_BUTTON_TEXT}
					</button>
				</div>
				<p className='text-sm text-gray-500 dark:text-gray-400'>
					{currentPage === 'login' ? FORM.CREATE_ACCOUNT_TEXT : FORM.LOGIN_TEXT}{' '}
					<button
						className='cursor-pointer inline h-9 text-blue-600 underline'
						onClick={togglePage}>
						{currentPage === 'login'
							? FORM.CREATE_ACCOUNT_BUTTON_TEXT
							: FORM.LOGIN_BUTTON_TEXT}
					</button>
					.
				</p>
			</div>
		</main>
	);
};

export default Auth;
