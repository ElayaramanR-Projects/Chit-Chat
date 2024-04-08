import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/login';
import Router from './router';
function App() {
	const isLoggedIn = false;
	return (
    	<Routes>
			{!isLoggedIn && <Route path='/login' element={<Login/>} />}
			<Route
				path='*'
				element={!isLoggedIn ? <Navigate to='/login' /> : <Router />}
			/>
		</Routes>
	);
}

export default App;
