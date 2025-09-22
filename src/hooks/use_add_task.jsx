import { useCallback } from "react";

export const useAddTask = (setTasks) => {
	const addTask = useCallback((title) => {
		if (!title.trim()) return

		return fetch('http://localhost:3000/tasks', {
			method: 'POST',
			headers: { 'Content-Type' : 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title,
				completed: false
			})
		})
		 .then((rawResponse) => rawResponse.json())
		 .then((newTask) => {
			console.log('Задача добавлена, ответ сервера', newTask)
			setTasks((tasks) => [...tasks, newTask])
			return newTask
		 })
		 .catch((error) => {
			console.error('Ошибка загрузки', error)
		 })
	}, [setTasks])

	return addTask
}
