import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, HashRouter} from 'react-router-dom';

import ErrorBoundry from './components/error-boundry';
import {TasksServiceProvider} from './components/tasks-service-context';
import App from './components/app';

import store from './store';
import TasksService from './services/tasks-service';

const tasksService = new TasksService();

//basename='/tasks_test/'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<ErrorBoundry>
			<TasksServiceProvider value={tasksService}>
				<Router basename=''>
						<App />
				</Router>
			</TasksServiceProvider>
		</ErrorBoundry>
	</Provider>
);