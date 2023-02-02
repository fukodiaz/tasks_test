import React, {useState, useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import {createNewTask, editeTask} from '../../actions';

import Modal from '../modal';
import TemplateModalTask from '../template-modal-task';
import './modal-task.scss';

const ModalTask = (props) => {
	const {onSwitch, dataTask= {}, flagCreation, flagEdite, idParentSubtask} = props;
	const listTasksByStatus = useSelector(state => state.projects.listTasksByStatus);

	const dispatch = useDispatch();
	const [task, setTask] = useState(dataTask);
	const [emptyFields, setEmptyFields] = useState(false);
	const [flagAnswer, setFlagAnswer] = useState(false);
	const [idActiveComment, setIdActiveComment] = useState(null);

	useEffect(() => {
		if (flagCreation) {
			setTask({
				...task,
				status: 'Queue',
				priority: 'medium',
				timeCreation: new Date().getTime() / 1000,
				timeEnding: 1734909669,
				comments: [],
				subtasks: [],
				idParentTask: idParentSubtask || idParentSubtask === 0 ? idParentSubtask : null 
			});
		}
	}, []);

	useEffect(() => {
		if (!flagCreation) {
			let activeColumn = listTasksByStatus?.find(({title}) => title === task.status);

			if (activeColumn?.listTasks?.length && (task?.idParentTask || task?.idParentTask === 0)) {
				setTask(
					activeColumn?.listTasks.find(({idParentTask, id}) => 
							idParentTask === task.idParentTask && id === task.id)
				);
			} else {
				setTask(activeColumn?.listTasks.find(({id}) => id === task.id));
			}
		}
	}, [listTasksByStatus, dataTask]);

	useEffect(() => {
		setEmptyFields(false);
	}, [task?.title, task?.description]);

	const onCreateTask = (task, idxParentSubtask) => {
		if (task.title && task.description) {
			dispatch(createNewTask({task, idxParentSubtask}));
			onSwitch(false);
		} else {
			setEmptyFields(true);
		}
	};

	const onEditeTask = (task) => {
		if (task.title && task.description) {
			dispatch(editeTask(task));
			onSwitch(false);
		} else {
			setEmptyFields(true);
		}
	};

	const onAnswer = (id, idActiveComment) => {
		if (id === idActiveComment) {
			setFlagAnswer(flag => !flag);
		}
		if (!idActiveComment) {
			setFlagAnswer(true);
		}
		setIdActiveComment(id);
	};

	useEffect(() => {
		if (!flagAnswer) {
			setIdActiveComment(null);
		}
	}, [flagAnswer]);

	return (
		<Modal onSwitch={onSwitch}>
			<TemplateModalTask onSwitch={onSwitch} task={task} setTask={setTask} flagCreation={flagCreation} 
									idParentSubtask={idParentSubtask} flagEdite={flagEdite} emptyFields={emptyFields}
									onCreateTask={onCreateTask} onEditeTask={onEditeTask} flagAnswer={flagAnswer}
									onAnswer={onAnswer} idActiveComment={idActiveComment} setFlagAnswer={setFlagAnswer}
			/>
		</Modal>
	);
};

export default ModalTask;