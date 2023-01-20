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

const addAnswerToComment = (data, idActiveComment, comment) => {
	return data.reduce((sum, cur) => {
		if (cur.id !== idActiveComment) {
			if (cur?.comments?.length) {
				sum.push({...cur, comments: addAnswerToComment(cur.comments, idActiveComment, comment)})
			} else {
				sum.push({...cur})
			}
			return sum;
		} else {
			if (cur?.comments?.length) {
				sum.push({...cur, comments: [...cur.comments, comment]})
			} else {
				sum.push({...cur, comments: [comment]})
			}
			return sum;
		}
	}, []);
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
									...curProject.listTasks.slice(idxParentSubtask + 1), newSubtask]};
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
			const {id: idTask=null, idParentTask: idParent = null} = action.payload;
			let idEditTask=null;
			if (!idParent && idParent !== 0) {
				idEditTask = idTask;
			} else {
				idEditTask = currProject.listTasks.findIndex(({id, idParentTask=null}) => 
												idParentTask === idParent  && id === idTask);
			}
			const novListTasks = [...currProject.listTasks.slice(0, idEditTask), action.payload,
				...currProject.listTasks.slice(idEditTask+1)];
			const novProject = {...currProject, listTasks: novListTasks};
			const novProjects = renewProjects(state, novProject);
			window.localStorage.setItem('dataProjects', JSON.stringify(novProjects));
			return {
				...state,
				dataProjects: novProjects,
				listTasksByStatus: defineListTasksByStatus(novProject.listTasks, state.listTasksByStatus)
			}
		case 'ADD_COMMENT':
			const crtProject = state.dataProjects[state.idxCurProject];
			const {task: dataTask, comment, idActiveComment} = action.payload;
			const {id: idxTask=null, idParentTask: idxParent = null} = dataTask;
			let idxEditTask=null;

			if (!idxParent && idxParent !== 0) {
				idxEditTask = idxTask;
			} else {
				idxEditTask = crtProject.listTasks.findIndex(({id, idParentTask=null}) => 
												idParentTask === idxParent  && id === idxTask);
			}
			
			let novTask = {};
			if (idActiveComment) { //ситуация с ответом на уже существующий комментарий
				const listComments = addAnswerToComment(dataTask?.comments, idActiveComment, comment); 
				novTask = {...dataTask, comments: listComments};
			} else {
				novTask = {...dataTask, comments: [...dataTask.comments, comment]};
			}
			
			const novelListTasks = [...crtProject.listTasks.slice(0, idxEditTask), novTask,
				...crtProject.listTasks.slice(idxEditTask+1)];
			const novelProject = {...crtProject, listTasks: novelListTasks};
			const nvlProjects = renewProjects(state, novelProject);
			window.localStorage.setItem('dataProjects', JSON.stringify(nvlProjects));
			
			console.log(defineListTasksByStatus(novelProject.listTasks, state.listTasksByStatus), 444);

			return {
				...state,
				dataProjects: nvlProjects,
				listTasksByStatus: defineListTasksByStatus(novelProject.listTasks, state.listTasksByStatus)
			}
		default:
			return state;
	}
};

export default updateProjects;