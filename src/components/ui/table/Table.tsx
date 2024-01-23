import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import ArrowSort from '@/assets/icons/arrowSort'
import { clsx } from 'clsx'

import s from './table.module.scss'

type ColsType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

type ThProps = {
  col?: ColsType
} & ComponentPropsWithoutRef<'th'>

type TdProps = {
  col?: ColsType
} & ComponentPropsWithoutRef<'td'>

export const Table = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  (props, ref) => {
    const { className, ...rest } = props

    const classNames = clsx(s.table, className)

    return <table {...rest} className={classNames} ref={ref} />
  }
)

export const TableHead = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = clsx(s.thead, className)

    return <thead className={classNames} ref={ref} {...rest} />
  }
)

export const TableRow = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = clsx(s.tr, className)

    return <tr className={classNames} {...rest} ref={ref} />
  }
)

export const TableHeadCell = forwardRef<ElementRef<'th'>, ThProps>((props, ref) => {
  const { className, col, ...rest } = props
  const classNames = clsx(s.th, className)

  return <th ref={ref} {...rest} className={classNames} data-col={col} />
})

export const TableBody = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  (props, ref) => {
    const { className, ...rest } = props
    const classNames = clsx(s.tbody, className)

    return <tbody ref={ref} {...rest} className={classNames} />
  }
)

export const TableDataCell = forwardRef<ElementRef<'td'>, TdProps>((props, ref) => {
  const { className, col, ...rest } = props
  const classNames = clsx(s.td, className)

  return <td ref={ref} {...rest} className={classNames} data-col={col} />
})

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

export type TableHeaderType = Omit<
  ComponentPropsWithoutRef<'thead'> & {
    columns: Column[]
    onSort?: (sort: Sort) => void
    sort?: Sort
  },
  'children'
>

export const TableHeader = ({ columns, onSort, sort, ...restProps }: TableHeaderType) => {
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
    <TableHead {...restProps}>
      <TableRow>
        {columns.map(({ cols, key, sortable = true, title }) => (
          <TableHeadCell
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
          </TableHeadCell>
        ))}
      </TableRow>
    </TableHead>
  )
}
