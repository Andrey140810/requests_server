import { useCallback } from "react";

export const useEditTask = (setTasks) => {
	const taskEdit = useCallback((taskId, newTitle) => {
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
	}, [setTasks])

	return taskEdit
}
