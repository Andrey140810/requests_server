import { useState, useEffect, useCallback } from "react";
import { ref, onValue, push, set, remove, update } from 'firebase/database'
import { db } from '../firebase'

export const useTasks = () => {
	const [tasks, setTasks] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() =>{
		const tasksRef = ref(db, 'tasks')

		return onValue(tasksRef, (snapshot) => {
			const loadedTasks = snapshot.val()
			const taskList = loadedTasks
				? Object.entries(loadedTasks).map(([id, task]) => ({ id, ...task }))
				: []
			setTasks(taskList)
			setIsLoading(false)
		})
	}, [])

	const addTask = useCallback((title) => {
		if (!title.trim()) return

		const tasksDbRef = push(ref(db, 'tasks'))

		return set(tasksDbRef, {
			title,
			completed: false
		})
	}, [])

	const editTask = useCallback((taskId, newTitle) => {
		if (!taskId || !newTitle.trim()) return

		return update(ref(db, `tasks/${taskId}`), {
			title: newTitle.trim()
		}).then(() => {
			setTasks(task => task.map(task => task.id === taskId ? { ...task, title: newTitle.trim() } : task))
		})
	}, [])

	const deleteTask = useCallback((taskId) => {
		const questionDeleteTask = confirm('Вы действительно хотите удалить задачу?')
		if (!questionDeleteTask)
			return

		return remove(ref(db, `tasks/${taskId}`))
			.then(() => {
				setTasks(task => task.filter(task => task.id !== taskId))
			})
	}, [])

	const toggleTaskStatus = useCallback((taskId, currentCompleted) => {
		return update(ref(db, `tasks/${taskId}`), { completed: !currentCompleted })
			.then(() => {
				setTasks(task => task.map(task => task.id === taskId ? { ...task, completed: !currentCompleted } : task))
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
