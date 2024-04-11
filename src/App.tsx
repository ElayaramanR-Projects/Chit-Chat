import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Auth from './pages/Auth/Auth';
import Router from './router';

const App : React.FC = () => {
	const isLoggedIn = false;
  console.log('app')
	return (
      <Routes>
			{!isLoggedIn && <Route path='/auth' element={<Auth/>} />}
			<Route
				path='*'
				element={!isLoggedIn ? <Navigate to='/auth' /> : <Router />}
			/>
		</Routes>
	);
}

export default App;
