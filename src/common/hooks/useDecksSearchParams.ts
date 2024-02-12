import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/tableSortHeader'
import { useGetMinMaxCardsQuery } from '@/services'

export const useDecksSearchParams = () => {
  const { data: minMaxCards } = useGetMinMaxCardsQuery()
  const [searchParams, setSearchParams] = useSearchParams()

  const sortKey = searchParams.get('sortKey') || null
  const sortDirection = searchParams.get('sortDirection') || null
  const itemsPerPage = Number(searchParams.get('items')) || 10
  const minCards = Number(searchParams.get('minCards') || 0)
  const maxCards = Number(searchParams.get('maxCards') || 61)
  const page = Number(searchParams.get('page')) || 1
  const searchValue = searchParams.get('value')
  const tabValue = searchParams.get('tab') || 'all'

  const changeSearchParams = (field: string, params: string) => {
    if (!params) {
      searchParams.delete(field)
    } else {
      searchParams.set(field, params)
    }

    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const changeTabValue = (tabValue: string) => changeSearchParams('tab', tabValue)

  const changePage = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }

  const changeValue = (value: string) => changeSearchParams('value', value)

  const changeMinMaxCard = (values: number[]) => {
    searchParams.set('minCards', values[0].toString())
    searchParams.set('maxCards', values[1].toString())

    if (values[0] === minMaxCards?.min) {
      searchParams.delete('minCards')
    }

    if (values[1] === minMaxCards?.max) {
      searchParams.delete('maxCards')
    }

    searchParams.set('page', '1')
    setSearchParams(searchParams)
  }

  const changeItemsPerPage = (items: string) => changeSearchParams('items', items)

  const changeSort = (sort: Sort) => {
    if (!sort) {
      searchParams.delete('sortKey')
      searchParams.delete('sortDirection')
    } else {
      searchParams.set('sortKey', sort.key)
      searchParams.set('sortDirection', sort.direction)
    }

    setSearchParams(searchParams)
  }

  const clearFilter = () => setSearchParams({})

  const sort: Sort =
    sortDirection === null || sortKey === null
      ? null
      : {
          direction: sortDirection as 'asc' | 'desc',
          key: sortKey,
        }

  return {
    changeItemsPerPage,
    changeMinMaxCard,
    changePage,
    changeSort,
    changeTabValue,
    changeValue,
    clearFilter,
    itemsPerPage,
    maxCards,
    minCards,
    minMaxCards,
    page,
    searchValue,
    sort,
    tabValue,
  }
}
