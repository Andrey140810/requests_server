import { useCallback } from "react";

export const useToggleTaskStatus = (setTasks) => {
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
		}, [setTasks])

	return toggleTaskStatus
}
