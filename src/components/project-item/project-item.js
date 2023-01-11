import React from 'react';

import './project-item.scss';

const ProjectItem = ({heading='', number='', }) => {

	return (
		<div className='contentProject'>
			<h2 className='headingProject'>
				<span className='spanNumber'>{`${number}.`}</span>
				{heading}
			</h2>
		</div>
	);
};

export default ProjectItem;