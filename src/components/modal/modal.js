import React from 'react';

import './modal.scss';

const Modal = (props) => {
	const { onSwitch = ()=>{}, timerHide = 0, children } = props;
	if (timerHide) {
		setTimeout(() => onSwitch(false), timerHide);
	}

	return (
		<section className='modalContainer'
			onClick={() => {
				onSwitch(false);
			}}
		>
			<div className='boxModalContent'
					onClick={(e) => e.stopPropagation()}>
				{children}
			</div>
		</section>
	);
};

export default Modal;