import { useState, useEffect, useCallback } from "react";

export const useTasks = () => {
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
	}, [])

	const editTask = useCallback((taskId, newTitle) => {
		if (!taskId || !newTitle.trim()) return

		return fetch(`http://localhost:3000/tasks/${taskId}`, {
			method: 'PATCH',
			headers: { 'Content-Type' : 'application/json;charset=utf-8' },
			body: JSON.stringify({ title: newTitle })
		})
		 .then((response) => response.json())
		 .then((updatedTask) => {
			setTasks((tasks) =>
				tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
			)
			return updatedTask
		 })
		 .catch((error) => {
			console.error('Ошибка загрузки', error)
			throw error
		 });
	}, [])

	const deleteTask = useCallback((taskId) => {
			const questionDeleteTask = confirm('Вы действительно хотите удалить задачу?')
			if (!questionDeleteTask)
				return

			return fetch(`http://localhost:3000/tasks/${taskId}`, {
				method: 'DELETE'
			})
			 .then(() => {
				setTasks((tasks) => tasks.filter((task) => task.id !== taskId)
				)
			 })
			 .catch((error) => {
				console.error('Ошибка удаления', error)
				throw error
			 })
		}, [])

	const toggleTaskStatus = useCallback((taskId, currentCompleted) => {
			fetch(`http://localhost:3000/tasks/${taskId}`, {
				method: 'PATCH',
				headers: { 'Content-Type' : 'application/json;charset=utf-8' },
				body: JSON.stringify({ completed: !currentCompleted })
			})
			 .then((response) => response.json())
			 .then((newStatus) => {
				setTasks((tasks) => tasks.map((task) => (task.id === newStatus.id ? newStatus : task))
			 	); return newStatus

			 })
			 .catch((error) => {
				console.error('Ошибка обновления статуса', error)
				throw error
			 })
		}, [])

	return {
		tasks,
		isLoading,
		addTask,
		editTask,
		deleteTask,
		toggleTaskStatus
	}
}
