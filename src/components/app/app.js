import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Projects from '../projects';
import PageTasks from '../page-tasks';

import './app.scss';

const App = () => {
	return (
		<main className='mainWrapper'>
			<Routes>
				<Route path='/' exact element={<Projects />} />
				<Route path='/tasks' element={<PageTasks />} />
			</Routes>
		</main>
	);
};

export default App;