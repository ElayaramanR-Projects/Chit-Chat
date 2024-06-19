// Input.tsx
import React from 'react';

interface InputProps {
	type: string;
	inputName: string;
	labelName: string;
	errorMessage: string;
	value: string;
	status: boolean;
	placeHolder: string;
	isInvalid: boolean;
	changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
	required?: boolean;
	validate: boolean;
}

const Input: React.FC<InputProps> = ({
	type,
	inputName,
	labelName,
	errorMessage,
	value,
	status,
	isInvalid,
	placeHolder,
	changeHandler,
	required = true,
	validate = false,
}) => {
	const inputProps = {
		type,
		name: inputName,
		id: inputName,
		'aria-describedby': 'form-input' + inputName,
		className:
			'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5',
		placeholder: placeHolder,
		value,
		disabled: status,
		onChange: changeHandler,
		required,
	};

	return (
		<>
			<label
				htmlFor={inputName}
				className='block mb-2 text-sm font-medium text-gray-900'>
				{labelName}
			</label>
			<input {...inputProps} />
			<span className='validation-msg pl-2 text-xs block h-5 text-red-500'>
				{validate && isInvalid && errorMessage}
			</span>
		</>
	);
};

export default Input;
