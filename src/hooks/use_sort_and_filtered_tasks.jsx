import { useState, useMemo } from "react";

export const useSortAndFilteredTasks = (tasks) => {
	const [searchQuery, setSearchQuery] = useState('')
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
		searchQuery,
		setSearchQuery,
		isSorted,
		setIsSorted,
		filteredAndSortedTasks
	}
}
