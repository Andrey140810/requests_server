import { useState, useEffect } from "react"

export const useFetchTasks = () => {
	const [tasks, setTasks] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() =>{
		setIsLoading(true)

		fetch('http://localhost:3000/tasks')
			.then((loadedData) => loadedData.json())
			.then(setTasks)
			.catch((error) => {
				console.error('Ошибка загрузки', error)
			})
			.finally(() => setIsLoading(false))
	}, [])

	return { tasks, setTasks, isLoading}
}
