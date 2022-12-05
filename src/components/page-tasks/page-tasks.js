import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {changeProject} from '../../actions';

import './page-tasks.scss';

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

	const onDrop = (e, column, task) => {
		e.preventDefault();
		const idx = activeColumn.listTasks.indexOf(activeTask);
		activeColumn.listTasks.splice(idx, 1);
		const idxDrop = column.listTasks.indexOf(task);
		const sortedTask = {...activeTask, status: column.title};
		column.listTasks.splice(idxDrop+1, 0, sortedTask);
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
		if (e.target.className === 'listItemsTask') {
			e.target.style.boxShadow = '2px 4px 7px rgba(0,0,0,.2)'
		}
	}; 

	const onDragLeave = (e) => {
		e.target.style.boxShadow = 'none';
	};

	const onDropColumn = (e, column) => {
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
		dispatch(changeProject(newDataProject));
	};

	return (
		<section className='containerTasks'>
			<ul className='listColumnsStatus'>
				{
					columnStatus.length ? columnStatus.map((column) => 
						<li className='columnTasks'
								onDragOver={e => onDragOver(e)}
								onDrop={(e) => onDropColumn(e, column)} 
								>
							<h3 className='titleColumn'>{column.title}</h3>
							{
								column.listTasks.length ? column.listTasks.map(task =>
									<ul className='listItemsTask'
											draggable={true}
											onDrop={(e) => onDrop(e, column, task)}
											onDragStart = {(e) => onDragStart(e, column, task)}
											onDragEnd={e => onDragEnd(e)}
											onDragOver={e => onDragOver(e)}
											onDragLeave={e => onDragLeave(e)} >
										<li className='numberTask'>
											{`${task.id+1}.`}
										</li>
										<li className='titleTask'>
											{task.title}
										</li>
									</ul>
								) : null
							}
						</li>
						) : null
				}
			</ul>
		</section>
	);
};

export default PageTasks;