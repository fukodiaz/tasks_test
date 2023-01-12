{
	column.listTasks.length ? column.listTasks.map(task => {
		if (task?.subtasks?.length) {
			return task.subtasks.map(subtask => {
				if (subtask.status === column.title) {
					return (
						<div className='boxTask'
							draggable={true}
							onDrop={(e) => onDrop(e, column, subtask)}
							onDragStart = {(e) => onDragStart(e, column, subtask)}
							onDragEnd={e => onDragEnd(e)}
							onDragOver={e => onDragOver(e)}
							onDragLeave={e => onDragLeave(e)}
						>
							<ul className='listItemsTask'>
								<li className='numberTask'>
									{`${task.id+1}.${subtask.id+1}.`}
								</li>
								<li className='titleTask'>
									{/* <span className='numberTask'>{`${task.id+1}.`}</span> */}
									{subtask.title}
								</li>
							</ul>
							<div className='boxBtnsTask'>
								{/* <button className='btnSubtask' type='button'
											onClick={() => onCreateSubtask(task.id)}>
									+ подзадача
								</button> */}
								<button className='btnDetails' type='button'
											onClick={() => onShowDetails(subtask)}>
									Подробнее
								</button>
								<button className='btnEditing' type='button'
											onClick={() => onEditeTask(subtask)}>
									Редактир
								</button>

							</div>
						</div>)
				}
		}
	)}
	}): null
} 


{
	columns.map(desk =>
		desk?.listTasks.map(task => {
			if (task?.subtasks?.length && task?.subtasks.some(subtask => subtask.status === column.title)) {
				//console.log(column.title, 67);
				return task.subtasks.map(subtask => {
					if (subtask.status === column.title) {
						//console.log(column.title, 12, subtask.status, 12, columns);
						return (
							<div className='boxTask'
								draggable={true}
								onDrop={(e) => onDrop(e, column, subtask, task.id)}
								onDragStart = {(e) => onDragStart(e, {
									...column, listTasks: [...column.listTasks, subtask]})}
								onDragEnd={e => onDragEnd(e)}
								onDragOver={e => onDragOver(e)}
								onDragLeave={e => onDragLeave(e)}
							>
								<ul className='listItemsTask'>
									<li className='numberTask'>
										{`${task.id+1}.${subtask.id+1}...`}
									</li>
									<li className='titleTask'>
										{/* <span className='numberTask'>{`${task.id+1}.`}</span> */}
										{subtask.title}
									</li>
								</ul>
								<div className='boxBtnsTask'>
									{/* <button className='btnSubtask' type='button'
												onClick={() => onCreateSubtask(task.id)}>
										+ подзадача
									</button> */}
									<button className='btnDetails' type='button'
												onClick={() => onShowDetails(subtask)}>
										Подробнее
									</button>
									<button className='btnEditing' type='button'
												onClick={() => onEditeTask(subtask)}>
										Редактир
									</button>

								</div>
							</div>)
					}
				})
			}
		}
		))
}