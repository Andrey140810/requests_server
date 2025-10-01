import { useState, useMemo } from "react";

export const useSortAndFilteredTasks = (tasks, searchQuery) => {
	const [isSorted, setIsSorted] = useState(false)

	const filteredAndSortedTasks = useMemo(() => {
		let result = tasks.filter((task) =>
				task.title.toLowerCase().includes(searchQuery.toLowerCase())
			)

			if (isSorted) {
				result.sort((a, b) => a.title.localeCompare(b.title, 'ru', { sensitivity: 'base' }))
			}
		return result
	}, [tasks, searchQuery, isSorted])

	return {
		isSorted,
		setIsSorted,
		filteredAndSortedTasks
	}
}
