const initialState = {
	currentListTasks: [],
	idxCurProject: JSON.parse(window.localStorage.getItem('idxCurProject')) >= 0 ?
						JSON.parse(window.localStorage.getItem('idxCurProject')) : null,
	dataProjects: JSON.parse(window.localStorage.getItem('dataProjects')) || 
		[
			{
				id: 0,
				heading: 'Калькулятор единиц измерения',
				listTasks: [
					{
						id: 0,
						title: 'Выбор единиц измерения',
						description: 'Создать раскрывающийся список с выбором единиц измерения',
						status: 'Queue',
						timeCreation: 1670250069,
						timeEnding: 1670311269,
						priority: 'high', 
						subtasks: [],
						comments: []
					},
					{
						id: 1,
						title: 'Конвертация из одних мер в другие',
						description: 'Написать соответствующий функционал',
						status: 'Queue',
						timeCreation: 1670325669,
						timeEnding: 1670613669,
						priority: 'high',
						subtasks: [],
						comments: []
					},
					{
						id: 2,
						title: 'Стилизация приложения',
						description: 'Произвольный дизайн',
						status: 'Development',
						timeCreation: 1670707269,
						timeEnding: 1670793669,
						priority: 'low',
						subtasks: [],
						comments: []
					},
					{
						id: 3,
						title: 'Реализовать сборку проекта',
						description: 'Собрать проект с помощью webpack',
						status: 'Queue',
						timeCreation: 1670880069,
						timeEnding: 1670973669,
						priority: 'medium',
						subtasks: [],
						comments: []
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

const renewProjects = (state, newProject) => {
	return [...state.dataProjects.slice(0, state.idxCurProject), newProject, 
		...state.dataProjects.slice(state.idxCurProject + 1)];
};

const updateProjects = (state = initialState, action) => {

	switch (action.type) {
		case 'OBTAIN_CUR_PROJECT':
			const {id=undefined, listTasks=[]} = action.payload;
			window.localStorage.setItem('idxCurProject', JSON.stringify(id));
			return {
				...state,
				currentListTasks: listTasks,
				idxCurProject: id,
				listTasksByStatus: defineListTasksByStatus(listTasks, state.listTasksByStatus)
			}
		case 'CHANGE_PROJECT':
			// const newDataProject = [...state.dataProjects.slice(0, state.idxCurProject), action.payload, 
			// 								...state.dataProjects.slice(state.idxCurProject + 1)];
			const newDataProject = renewProjects(state, action.payload);
			window.localStorage.setItem('dataProjects', JSON.stringify(newDataProject));
			return {
				...state,
				dataProjects: newDataProject
			}
		case 'CREATE_NEW_TASK':
			const {task={}, idxParentSubtask=null} = action.payload;
			const curProject = state.dataProjects[state.idxCurProject];
			let 	newBasicTask = {},
					novelDataProject={},
					novelProjects=[];

			if (idxParentSubtask === 0 || idxParentSubtask) {
				const parentTask = curProject.listTasks.find(item => item.id === idxParentSubtask);
				const newSubtask = {//create a new subtask
					...task,
					id: parentTask.subtasks.length
				}
				newBasicTask = {...parentTask, subtasks: [...parentTask.subtasks, newSubtask]};
				novelDataProject = {
					...curProject, 
					listTasks: [...curProject.listTasks.slice(0, idxParentSubtask), newBasicTask,
									...curProject.listTasks.slice(idxParentSubtask + 1)]};
			} else {
				newBasicTask = {
					...task,
					id: curProject.listTasks.length
				};
				novelDataProject = {
					...curProject, 
					listTasks: [...curProject.listTasks, newBasicTask]};
				// novelProjects = renewProjects(state, novelDataProject);
				// window.localStorage.setItem('dataProjects', JSON.stringify(novelProjects));
			}
			novelProjects = renewProjects(state, novelDataProject);
			window.localStorage.setItem('dataProjects', JSON.stringify(novelProjects));
			return {
				...state,
				dataProjects: novelProjects,
				listTasksByStatus: defineListTasksByStatus([...novelDataProject.listTasks], state.listTasksByStatus)
			}
		case 'EDITE_TASK':
			const currProject = state.dataProjects[state.idxCurProject];
			const idTask = action.payload.id;
			const novListTasks = [...currProject.listTasks.slice(0, idTask), action.payload,
										...currProject.listTasks.slice(idTask+1)];
			const novProject = {...currProject, listTasks: novListTasks};
			const novProjects = renewProjects(state, novProject);
			window.localStorage.setItem('dataProjects', JSON.stringify(novProjects));
			return {
				...state,
				dataProjects: novProjects,
				listTasksByStatus: defineListTasksByStatus(novProject.listTasks, state.listTasksByStatus)
			}
		default:
			return state;
	}
};

export default updateProjects;