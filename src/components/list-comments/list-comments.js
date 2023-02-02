import React from 'react';

import FormComments from '../form-comments';
import {dateTransform_2} from '../../utils';
import './list-comments.scss';

const ListComments = (props) => {
	const {task, comments, onAnswer, flagAnswer, idActiveComment, setFlagAnswer} = props;

	return (
		<ul className='listComments'>
			{
				comments?.map((item={}) => {
					const {author, textComment, time, id} = item;
					return (
						<li className='itemComment'>
							<div className='boxComment'>
								<p className='timeComment'>
									{dateTransform_2(time)}
								</p>
								<p className='authorComment'>
									{author}
								</p>
								<p className='contentComment'>
									{textComment}
								</p>
								<button className='btnAnswer'
											onClick={() => onAnswer(id, idActiveComment)} />
							</div>
							{
								flagAnswer &&  idActiveComment === id ?
									<FormComments task={task} flagAnswer={flagAnswer}
											setFlagAnswer={setFlagAnswer}
											idActiveComment={idActiveComment} /> : null
							}
							{
								Array.isArray(item.comments) && item.comments.length ? 
									<ListComments task={task} comments={item.comments} onAnswer={onAnswer}
										flagAnswer={flagAnswer} idActiveComment={idActiveComment}
										setFlagAnswer={setFlagAnswer}  /> : null
							}
						</li>
					);
				})
			}
		</ul>
	);
};

export default ListComments;