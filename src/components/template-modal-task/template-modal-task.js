import React from 'react';

import ListComments from '../list-comments';
import FormComments from '../form-comments';
import DateSelector from '../date-selector';
import Select from '../select';
import {dateTransform} from '../../utils';
import './template-modal-task.scss';

const TemplateModalTask = (props) => {
	const {onSwitch, flagCreation, idParentSubtask, flagEdite, task, setTask,
			onCreateTask, onEditeTask, flagAnswer, onAnswer, idActiveComment,
			setFlagAnswer, emptyFields} = props;

	const listStatus = [
		{id: 0, label: 'Queue'},
		{id: 1, label: 'Development'},
		{id: 2, label: 'Done'}
	];

	const listPriority = [
		{id: 0, label: 'low'},
		{id: 1, label: 'medium'},
		{id: 2, label: 'high'}
	];

	const showStatus = (status) => {
		//return listStatus.filter(({label}) => label === status)[0]['label'];
		switch (status) {
			case 'Queue':
				return 'В очереди';
			case 'Development':
				return 'В разработке';
			case 'Done':
				return 'Завершена';
			default:
				return null;
		}
	};

	return (
		<div className='boxModalTask'>
			<button className='modalClose' type='button'
						onClick={() => onSwitch(false)} />
			<table className='tableTask'>
				<thead>
					<tr>
						<th colSpan={2} className='headingTableTasks'>
							{
								flagCreation && idParentSubtask === 0 || idParentSubtask ? 'Создание подзадачи' 
									: flagCreation ? 'Создание задачи'
									: flagEdite ? 'Редактирование задачи'
									: 'Информация о задаче'
							}
						</th>
					</tr>
				</thead>
				<tbody>
					{
						!flagCreation ? (
							<tr className='rowTask'>
								<td colSpan={2}>
									{task?.idParentTask || task?.idParentTask === 0 ? 
										`№ ${task?.idParentTask + 1}.${task?.id + 1}` : `№ ${task?.id + 1}`}
								</td>
							</tr>) : null
					}
					<tr className='rowTask'>
						<td className='tdHeaderTask'>Заголовок</td>
						<td>
							{
								flagCreation || flagEdite ? (
									<input 
										className='headerTask'
										type='text'
										name='titleTask'
										value={task?.title}
										onChange={e => setTask({...task, title: e.target.value})}
									/>
							) : task?.title}
						</td>
					</tr>
					<tr className='rowTask'>
						<td className='tdDescripTask'>Описание</td>
						<td>
							{
								flagCreation || flagEdite ? (
									<textarea 
										className='textareaDescription'
										name='descriptionTask'
										value={task?.description}
										onChange={e => setTask({...task, description: e.target.value})}
									/>
								) : task?.description}
						</td>
					</tr>
					<tr className='rowTask'>
						<td>Дата создания</td>
						<td className='blockTimeCreaction'>
							{
								flagCreation || flagEdite ? (
									<DateSelector date={task?.timeCreation} 
														setDate={(date) => setTask({...task, timeCreation: date})} />
								) : task?.timeCreation ? dateTransform(task.timeCreation) : null
							}
						</td>
					</tr>
					<tr className='rowTask'>
						<td>Дата окончания</td>
						<td>
							{
								flagCreation || flagEdite ? (
									<DateSelector date={flagCreation ? 1734909669 : task.timeEnding}
														flagEnding={true}
														setDate={(date) => setTask({...task, timeEnding: date})} />
								) : task?.timeEnding ? dateTransform(task.timeEnding) : null
							}
						</td>
					</tr>
					<tr className='rowTask'>
						<td>Приоритет</td>
						<td>
							<div className='contentPriorityTask'>
								{
									flagCreation || flagEdite ? (
										<Select 	name='priorityTask'
													value={{value: task?.priority, label: task?.priority}}
													onChange={(e) => 
														setTask({
															...task,
															priority: e.value,
														})
													}
													options={
														listPriority.map(({label}) => (
															{value: label, label}
														))
													}
													styles={{
														dot: {color: '#062A3F', fontSize: '16px', lineHeight: '19px', padding: '8px 23px 7px 13px'},
														control: {border: '1px solid #B6B7BA', maxHeight: '36px',
																		before: {top: '17px', right: '11px', width: '6px', height: '1px', color: '#062A3F'},
																		after: {right: '7px'}},
														menu: {fontSize: '16px', margin: '5px 0 0 0'},
														menuList: {maxHeight: '183px'},
														option: {padding: '8px 7px 7px 13px', lineHeight: '19px', color: '#062A3F'}
													}}
										/>
									) : task?.priority}
							</div>
						</td>
					</tr>
					<tr className='rowTask'>
						<td>Текущий статус</td>
						<td>
							<div className='contentSatusTask'>
								{
									flagCreation || flagEdite ? (
										<Select 	name='statusTask'
													value={{value: task?.status, label: task?.status}}
													onChange={(e) => 
														setTask({
															...task,
															status: e.value,
														})
													}
													options={
														listStatus.map(({label}) => (
															{value: label, label}
														))
													}
													styles={{
														dot: {color: '#062A3F', fontSize: '16px', lineHeight: '19px', padding: '8px 23px 7px 13px'},
														control: {border: '1px solid #B6B7BA', maxHeight: '36px',
																		before: {top: '17px', right: '11px', width: '6px', height: '1px', color: '#062A3F'},
																		after: {right: '7px'}},
														menu: {fontSize: '16px', margin: '5px 0 0 0'},
														menuList: {maxHeight: '183px'},
														option: {padding: '8px 7px 7px 13px', lineHeight: '19px', color: '#062A3F'}
													}}
										/>
									) : showStatus(task?.status)}
							</div>
						</td>
					</tr>
				</tbody>
			</table>
			{
				emptyFields ? <p className='messErr'>Необходимо ввести все данные</p> : null
			}
			{
				flagCreation || flagEdite ? (
					<div className='containerBtnsTask'>
						{
							flagCreation ? (
								<button className='btnConfirm' type='button'
											onClick={() => onCreateTask(task, idParentSubtask)}>
									Добавить
								</button>
							) : flagEdite ? (
								<button className='btnConfirm' type='button'
											onClick={() => onEditeTask(task)}>
									Редактировать
								</button>
							) : null
						}
						<button className='btnCancel' type='button'
									onClick={() => onSwitch(false)}>
							Отменить
						</button>
					</div>
				) : null
			}
			{
				!flagCreation && !flagEdite && !flagAnswer ? <FormComments task={task} /> : null
			}
			<div className='containerListsComments'>
				{
					!flagCreation && !flagEdite && task?.comments?.length ? (
						<ListComments task={task} comments={task.comments} onAnswer={onAnswer} 
								flagAnswer={flagAnswer} idActiveComment={idActiveComment} setFlagAnswer={setFlagAnswer} />
					) : null
				}
			</div>
		</div>
	);
};

export default TemplateModalTask;