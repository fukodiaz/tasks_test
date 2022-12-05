import {combineReducers} from 'redux';

import updateProjects from './projects';

export default combineReducers({
	projects: updateProjects,
});