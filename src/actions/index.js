const obtainCurProject = (payload) => ({
	type: 'OBTAIN_CUR_PROJECT',
	payload
});

const changeProject = (payload) => ({
	type: 'CHANGE_PROJECT',
	payload
});

export {
	obtainCurProject,
	changeProject
}