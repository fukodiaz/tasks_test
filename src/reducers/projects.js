const initialState = {
	idxCurProject: null,
	currentListTasks: [],
	dataProjects: JSON.parse(window.localStorage.getItem('dataProjects')) || 
		[
			{
				id: 0,
				heading: 'Учеба',
				listTasks: [
					{
						id: 0,
						title: 'TS',
						status: 'Queue'
					},
					{
						id: 1,
						title: 'Done',
						status: 'Queue'
					},
					{
						id: 2,
						title: 'PHP',
						status: 'Development'
					},
					{
						id: 3,
						title: 'C++',
						status: 'Queue'
					}
				]
			},
			{
				id: 1,
				heading: 'Работа',
				listTasks: [
					{
						id: 0,
						title: 'Верстка',
						status: 'Development'
					},
					{
						id: 1,
						title: 'Написание функционала',
						status: 'Development'
					}
				]
			},
			{
				id: 2,
				heading: 'Хобби',
				listTasks: [

				]
			}
		],
	listTasksByStatus: JSON.parse(window.localStorage.getItem('listTasksByStatus')) || 
		[
			{
				id: 0, 
				title: 'Queue',
				listTasks: [

				]
			},
			{
				id: 1,
				title: 'Development',
				listTasks: [

				]
			},
			{
				id: 2,
				title: 'Done',
				listTasks: [

				]
			}
		]
};

const defineListTasksByStatus = (listCurTasks, listTasksByStatus) => {
	return listTasksByStatus.map((item) => {
		return {
			...item,
			listTasks: listCurTasks.filter((task) => item.title === task.status)
		}
	});
};

const updateProjects = (state = initialState, action) => {

	switch (action.type) {
		case 'OBTAIN_CUR_PROJECT':
			const {id=undefined, listTasks=[]} = action.payload;
			return {
				...state,
				currentListTasks: listTasks,
				idxCurProject: id,
				listTasksByStatus: defineListTasksByStatus(listTasks, state.listTasksByStatus)
			}
		case 'CHANGE_PROJECT':
			const newDataProject = [...state.dataProjects.slice(0, state.idxCurProject), action.payload, 
											...state.dataProjects.slice(state.idxCurProject + 1)];
			window.localStorage.setItem('dataProjects', JSON.stringify(newDataProject));
			return {
				...state,
				dataProjects: newDataProject
			}
		default:
			return state;
	}
};

export default updateProjects;