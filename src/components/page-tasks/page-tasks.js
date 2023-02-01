import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {changeProject} from '../../actions';

import ModalTask from '../modal-task';
import './page-tasks.scss';
import threePoints from './three-points.svg';
import pencil from './pencil.svg';

const PageTasks = (props) => {
	const currentListTasks = useSelector(state => state.projects.currentListTasks);
	const idxCurProject = useSelector(state => state.projects.idxCurProject);
	const listTasksByStatus = useSelector(state => state.projects.listTasksByStatus);
	const dataProjects = useSelector(state => state.projects.dataProjects);
	const dispatch = useDispatch();
	console.log(listTasksByStatus, 'listStatus');
	
	const [columnStatus, setColumnStatus] = useState(listTasksByStatus);
	const [activeColumn, setActiveColumn] = useState(null);
	const [activeTask, setActiveTask] = useState(null);

	useEffect(() => {
		window.localStorage.setItem('listTasksByStatus', JSON.stringify(columnStatus));
	}, [columnStatus]);

	useEffect(() => {
		setColumnStatus(listTasksByStatus);
	}, [listTasksByStatus]);
	//drag and drop
	const onDrop = (e, column, task) => {
		e.preventDefault();
		e.target.style.boxShadow = 'none';

		const idx = activeColumn.listTasks.indexOf(activeTask);
		activeColumn.listTasks.splice(idx, 1);
		const idxDrop = column.listTasks.indexOf(task);
		//const sortedTask = {...activeTask, status: column.title};
		column.listTasks.splice(idxDrop+1, 0, {...activeTask, status: column.title});
		console.log(column, 'column');
		setColumnStatus(columnStatus.map(el => {
			switch (el.id) {
				case column.id:
					return column;
				case activeColumn.id:
					return activeColumn;
				default:
					return el;
			}
		}));
	}; 

	const onDragStart = (e, column, task) => {
		setActiveColumn(column);
		setActiveTask(task);
	};

	const onDragEnd = (e) => {
		e.target.style.boxShadow = 'none';
	};

	const onDragOver = (e) => {
		e.preventDefault();
		if (e.target.className === 'boxTask') {
			e.target.style.boxShadow = '3px 5px 11px rgba(0,0,0,.2)';
		}
	}; 

	const onDragLeave = (e) => {
		e.target.style.boxShadow = 'none';
	};

	const onDropColumn = (e, column) => {
		if (e.target.className === 'columnTasks' || e.target.className === 'titleColumn') {
			const sortedTask = {...activeTask, status: column.title};
			column.listTasks.push(sortedTask);
			const idx = activeColumn.listTasks.indexOf(activeTask);
			activeColumn.listTasks.splice(idx, 1);
			setColumnStatus(columnStatus.map(el => {
				switch (el.id) {
					case column.id:
						return column;
					case activeColumn.id:
						return activeColumn;
					default:
						return el;
				}
			}));

			let newListTasks =  columnStatus.map(({listTasks}) => listTasks).flat(Infinity);
			let newDataProject = {
				...dataProjects[idxCurProject],
				listTasks: newListTasks
			};
			dispatch(changeProject({newDataProject, listTasksStatus: columnStatus}));
		}
	};

	//pop-up for tasks
	// const [flagDetails, setFlagDetails] = useState(false);
	// const [flagCreation, setFlagCreation] = useState(false);
	const [openPopUp, setOpenPopUp] = useState(false) 
	const [flagCreation, setFlagCreation] = useState(false);
	const [flagEdite, setFlagEdite] = useState(false);
	const [idParentSubtask, setIdParentSubtask] = useState(null);

	const onShowDetails = (task) => {
		setActiveTask(task);
		setOpenPopUp(true);
	};

	const onCreateTask = () => {
		setFlagCreation(true);
		setOpenPopUp(true);
	};

	const onEditeTask = (task) => {
		setFlagEdite(true);
		setActiveTask(task);
		setOpenPopUp(true);
	};

	const onCreateSubtask = (id) => {
		setIdParentSubtask(id);
		setFlagCreation(true);
		setOpenPopUp(true);
	};

	return (
		<section className='containerTasks'>
			<p className='boxBtnCreateTask'>
				<button className='btnCreateTask' type='button'
							onClick={onCreateTask}>
					Создать задачу
				</button>
			</p>
			<ul className='listColumnsStatus'>
				{
					columnStatus.length ? columnStatus.map((column, idxColumn, columns) => 
						<li className='columnTasks'
								onDragOver={e => onDragOver(e)}
								onDrop={(e) => onDropColumn(e, column)} 
								>
							<h3 className='titleColumn'>{column.title}</h3>
							{
								column.listTasks.length ? column.listTasks.map(task => {
									
									return (
										
										<div className='boxTask'
												draggable={true}
												onDrop={(e) => onDrop(e, column, task)}
												onDragStart = {(e) => onDragStart(e, column, task)}
												onDragEnd={e => onDragEnd(e)}
												onDragOver={e => onDragOver(e)}
												onDragLeave={e => onDragLeave(e)}
										>
											<ul className='listItemsTask'>
												<li className='numberTask'>
													{task.idParentTask ? `${task.idParentTask+1}.${task.id+1}.` : `${task.id+1}.`}
												</li>
												<li className='titleTask'>
													{/* <span className='numberTask'>{`${task.id+1}.`}</span> */}
													{task.title}
												</li>
											</ul>
											<button className='btnDetails' type='button'
															onClick={() => onShowDetails(task)}> 
												<p className='svgBoxDetails'>
													<svg width="100%" height="100%">	
														<use href={`${threePoints}#threePoints`}></use>
													</svg>
												</p>
											</button>
											<div className='boxBtnsTask'>
												{!task.idParentTask ? (
													<button className='btnSubtask' type='button'
																onClick={() => onCreateSubtask(task.id)}>
														+ подзадача
													</button>) : null
												}
												{/* <button className='btnDetails' type='button'
															onClick={() => onShowDetails(task)}>
													Подробнее
												</button> */}
												<button className='btnEditing' type='button'
															onClick={() => onEditeTask(task)}>
													<p className='svgBoxEditing'>
														<svg width="100%" height="100%">	
															<use href={`${pencil}#pencil`}></use>
														</svg>
													</p>
												</button>

											</div>
										</div>
									);
								}) : null
							}
						</li>
						) : null
				}
			</ul>
			{
				openPopUp ? (
					<ModalTask 
						dataTask={!flagCreation ? activeTask : {}}
						flagCreation={flagCreation}
						flagEdite={flagEdite}
						idParentSubtask={idParentSubtask}
						onSwitch={(flag) => {
							setOpenPopUp(flag);
							setFlagCreation(flag);
							setFlagEdite(flag);
							setIdParentSubtask(null);
						}}
					/>) : null
			}
		</section>
	);
};

export default PageTasks;