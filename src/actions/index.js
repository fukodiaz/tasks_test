const obtainCurProject = (payload) => ({
	type: 'OBTAIN_CUR_PROJECT',
	payload
});

const changeProject = (payload) => ({
	type: 'CHANGE_PROJECT',
	payload
});

const createNewTask = (payload) => ({
	type: 'CREATE_NEW_TASK',
	payload
});

const editeTask = (payload) => ({
	type: 'EDITE_TASK',
	payload
});

const addComment = (payload) => ({
	type: 'ADD_COMMENT',
	payload
});

export {
	obtainCurProject,
	changeProject,
	createNewTask,
	editeTask,
	addComment
}