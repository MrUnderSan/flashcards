import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

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
