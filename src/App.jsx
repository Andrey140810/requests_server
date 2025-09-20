import { useState } from 'react'
import style from './App.module.css'

export function App() {
	const [tasks, setTasks] = useState([])
	const [isLoading, setIsLoading] = useState(false)

	const loadTasks = () =>{
		setIsLoading(true)

		fetch('https://jsonplaceholder.typicode.com/todos')
			.then((response) => response.json())
			.then((loadedTasks) => {
				setTasks(loadedTasks)
			})
			.catch((error) => {
				console.error('Ошибка загрузки', error)
			})
			.finally(() => setIsLoading(false))
	}

  return (
	<div className={style.app}>
		<h1>Мой список дел</h1>
		<button disabled={isLoading} onClick={loadTasks}>{ isLoading ? 'Загрузка...' : 'Загрузить список дел'}</button>
		{isLoading ? (
			<div className={style.loader}></div>
		) : (
			tasks.map(({ id, title, completed }) => (
					<div className={style.taskItem} key={id}>
						<span className={style.taskTitle}>{title}</span>
						<span className={`${style.taskStatus} ${completed ? style.completed : style.pending}`}>
							{completed ? ' Выполнено' : ' В процессе'}
						</span>
					</div>
				))
		)}
	</div>
  )
}
