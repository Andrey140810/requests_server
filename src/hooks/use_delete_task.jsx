import { useCallback } from "react";

export const useDeleteTask = (setTasks) => {
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
		}, [setTasks])

	return deleteTask
}
