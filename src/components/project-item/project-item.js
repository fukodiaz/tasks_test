import React from 'react';

import './project-item.scss';

const ProjectItem = ({heading='', number='', }) => {

	return (
		<div className='contentProject'>
			<span className='spanNumber'>{`${number}.`}</span>
			<h2 className='headingProject'>{heading}</h2>
		</div>
	);
};

export default ProjectItem;