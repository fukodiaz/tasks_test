import React, {useState, useEffect} from 'react';

import { useDispatch } from 'react-redux';
import {addComment} from '../../actions';

import './form-comments.scss';

const FormComments = ({task, flagAnswer, setFlagAnswer=()=>{}, idActiveComment}) => {

	const dispatch = useDispatch();
	const [author, setAuthor] = useState('');
	const [textComment, setTextComment] = useState('');
	const [err, setErr] = useState(false);

	useEffect(() => {
		if (author === '' || textComment === '') {
			setErr(true);
		} else {setErr(false);}
	}, [author, textComment]);

	const onSubmit = (e) => {
		e.preventDefault();
		if (!err) { 
			const formData = new FormData(e.target);
			const objForm = Object.fromEntries(formData.entries(formData));
			const time = new Date().getTime() / 1000;
			dispatch(addComment({
				task, 
				comment: {
					...objForm, 
					time, 
					id: +time + Math.random() * 25
				},
				idActiveComment
			}));
			setAuthor('');
			setTextComment('');
			setFlagAnswer(false);
		} else {
			console.log('It has some empty fields!');
		}
	};

	return (
		<div className='boxFormComments'>
			<form className='formComments'
					onSubmit={onSubmit}>
				<div className='blockAuthorComment'>
					<label for='author' className='labelAuthor'>
						Автор:
					</label>
					<input type='text' id='author' name='author'
								className='inputAuthor' value={author} 
								onChange={(e) => setAuthor(e.target.value)} />
				</div>
				<div className='blockTextComment'>
					<label for='textComment' className='labelTextComment'>
						Комментарий:
					</label>
					<textarea type='text' id='textComment' name='textComment'
								className='areaTextComment'	value={textComment}
								onChange={(e) => setTextComment(e.target.value)} />
				</div>
				<div className='boxBtnAddComment'>
					<button type='submit' className='btnAddComment'>
						{ !flagAnswer ? '+ Комментарий' : 'ответить'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default FormComments;