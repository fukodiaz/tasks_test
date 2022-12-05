import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ProjectItem from '../project-item';
import {obtainCurProject} from '../../actions';
import './projects.scss';

const Projects = (props) => {
	const dataProjects = useSelector(state => state.projects.dataProjects);
	const dispatch = useDispatch();
	let navigate = useNavigate();

	const onProjectClick = (curProject) => {
		navigate('tasks');
		dispatch(obtainCurProject(curProject));
	};

	const createProjectItem = (project) => {
		const {id, heading, listTasks} = project;
		return (
			<li key={id} className='itemProject'
					onClick={() => onProjectClick(project)} >
				<ProjectItem number={id+1} heading={heading} />
			</li>
		);
	};
	
	return (
		<section>
			<h2 className='headingProjects'>Текущие проекты</h2>
			<ul className='listProjects'>
				{
					dataProjects.length ? dataProjects.map(createProjectItem) : null
				}
			</ul>
		</section>
	);
};

export default Projects;