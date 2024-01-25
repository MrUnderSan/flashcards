import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/tableSortHeader'

export const useDeckSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortKey = searchParams.get('sortKey')
  const sortDirection = searchParams.get('sortDirection')
  const itemsPerPage = Number(searchParams.get('items')) || 10
  const page = Number(searchParams.get('page')) || 1
  const question = searchParams.get('question')

  const changePage = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }
  const changeQuestion = (question: string) => {
    if (question) {
      searchParams.set('question', question)
    } else {
      searchParams.delete('question')
    }
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }
  const changeItemsPerPage = (items: string) => {
    searchParams.set('items', items)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const changeSort = (sort: Sort) => {
    if (!sort) {
      searchParams.delete('sortKey')
      searchParams.delete('sortDirection')

      return
    }
    searchParams.set('sortKey', sort.key)
    searchParams.set('sortDirection', sort.direction)
    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const sort: Sort =
    sortDirection === 'asc' || sortDirection === 'desc'
      ? {
          direction: sortDirection,
          key: sortKey || '',
        }
      : null

  return {
    changeItemsPerPage,
    changePage,
    changeQuestion,
    changeSort,
    itemsPerPage,
    page,
    question,
    sort,
  }
}
