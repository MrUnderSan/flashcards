import { ComponentPropsWithoutRef } from 'react'

import ArrowSort from '@/assets/icons/arrowSort'
import { ColsType, Table } from '@/components/ui/table'
import { clsx } from 'clsx'

import s from './tableSortHeader.module.scss'

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

export const TableSortHeader = ({ columns, onSort, sort, ...restProps }: TableSortHeaderProps) => {
  const handleSort = (key: string, sortable?: boolean) => () => {
    if (!onSort || !sortable) {
      return
    }

    if (sort?.key !== key) {
      return onSort({ direction: 'asc', key })
    }

    if (sort.direction === 'desc') {
      return onSort(null)
    }

    return onSort({
      direction: sort?.direction === 'asc' ? 'desc' : 'asc',
      key,
    })
  }

  const iconClass = clsx(s.sortArrow, sort?.direction === 'asc' ? s.asc : s.desc)

  return (
    <Table.Head {...restProps}>
      <Table.Row>
        {columns.map(({ cols, key, sortable = true, title }) => (
          <Table.HeadCell
            className={s.align}
            col={cols}
            key={key}
            onClick={handleSort(key, sortable)}
          >
            {title}
            {sort && sort.key === key && (
              <span className={iconClass}>
                <ArrowSort />
              </span>
            )}
          </Table.HeadCell>
        ))}
      </Table.Row>
    </Table.Head>
  )
}
