import { ComponentPropsWithoutRef } from 'react'

import { ColsType } from '../ui/table/table.types'

export type Column = {
  cols: ColsType
  key: string
  sortable?: boolean
  title: string
}

export type Sort = {
  direction: 'asc' | 'desc'
  key: string
} | null

export type TableSortHeaderProps = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  },
  'children'
>
