import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import NotFound from './pages/errors/NotFound';

const Router: React.FC = () => {
    console.log('Router')
	return (
		<Routes>
			<Route path='/' element={<NotFound />}></Route>
			<Route path='/login' element={<Auth initialPage='login' />}></Route>
		</Routes>
	);
};

export default Router;
