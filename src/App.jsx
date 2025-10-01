import { useState } from 'react'
import style from './App.module.css'
import {
	useSortAndFilteredTasks,
	useTasks,
	useDebounce
} from './hooks'

export function App() {
	const { tasks, isLoading, addTask, editTask, deleteTask, toggleTaskStatus } = useTasks()

	const [searchQuery, setSearchQuery] = useState('')
	const debounceSearchQuery = useDebounce(searchQuery, 300)

	const {
		isSorted,
		setIsSorted,
		filteredAndSortedTasks
	} = useSortAndFilteredTasks(tasks, debounceSearchQuery)

	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [editingTaskId, setEditingTaskId] = useState(null)

	const handleEditClick = (taskId) => {
		setEditingTaskId(taskId)

		const taskToEdit = tasks.find((task) => task.id === taskId)
		if (taskToEdit) {
			setNewTaskTitle(taskToEdit.title)
		}
	}

	const handleSaveOrAdd = () => {
		if (editingTaskId) {
			editTask(editingTaskId, newTaskTitle).then(() => {
				setEditingTaskId(null)
				setNewTaskTitle('')
			})
		} else {
			addTask(newTaskTitle).then(() => {
				setNewTaskTitle('')
			})
		}
	}

  return (
	<div className={style.app}>
		<h1>Мой список дел</h1>
		<input className={style['task-input']} type="text" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder='Введите название задачи'/>
		<button disabled={isLoading} onClick={handleSaveOrAdd}>{editingTaskId ? 'Сохранить' : 'Добавить задачу'}</button>
		<input className={style['task-input']} type="text" placeholder='Поиск задач' value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
		<button onClick={() => setIsSorted(!isSorted)}>{!isSorted ? 'Сортировать по алфавиту' : 'Отменить сортировку'}</button>
		{isLoading ? (
			<div className={style.loader}></div>
		) : (
			filteredAndSortedTasks.map(({ id, title, completed }) => (
					<div className={style['task-item']} key={id}>
						<span className={`${style['task-title']} ${completed ? style['task-completed'] : ''}`}>{title}</span>
						<div className={style['task-item-button']}>
							<button disabled={isLoading} onClick={() => {
								if (editingTaskId === id) {
									handleSaveOrAdd()
								} else {
									handleEditClick(id)
								}
							}}>Редактировать
							</button>
							<button disabled={isLoading} onClick={() => {deleteTask(id)}}>Удалить</button>
							<input type='checkbox' onChange={() => {toggleTaskStatus(id, completed)}}/>
						</div>

					</div>
				))
		)}
	</div>
  )
}
