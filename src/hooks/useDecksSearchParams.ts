import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Sort } from '@/components/tableSortHeader'

export const useDecksSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const sortKey = searchParams.get('sortKey') || null
  const sortDirection = searchParams.get('sortDirection') || null
  const itemsPerPage = Number(searchParams.get('items')) || 10
  const minCards = Number(searchParams.get('minCards')) || 0
  const maxCards = Number(searchParams.get('maxCards')) || 50
  const page = Number(searchParams.get('page')) || 1
  const value = searchParams.get('value')

  const [rangeValue, setRangeValue] = useState<number[]>([minCards, maxCards])
  const changeMinMaxCard = (values: number[]) => {
    if (values[0] !== 0 || values[1] !== 50) {
      searchParams.set('minCards', values[0].toString())
      searchParams.set('maxCards', values[1].toString())
    } else {
      searchParams.delete('minCards')
      searchParams.delete('maxCards')
    }
    setRangeValue(values)
    setSearchParams(searchParams)
  }

  const changePage = (page: number) => {
    searchParams.set('page', page.toString())
    setSearchParams(searchParams)
  }
  const changeValue = (value: string) => {
    if (value) {
      searchParams.set('value', value)
    } else {
      searchParams.delete('value')
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
    if (sort === null) {
      searchParams.delete('sortKey')
      searchParams.delete('sortDirection')
    } else {
      searchParams.set('sortKey', sort.key)
      searchParams.set('sortDirection', sort.direction)
    }
    setSearchParams(searchParams)
  }

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
    changeValue,
    itemsPerPage,
    maxCards,
    minCards,
    page,
    rangeValue,
    sort,
    value,
  }
}
