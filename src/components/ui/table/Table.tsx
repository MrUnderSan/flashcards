import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

import { TdProps, ThProps } from './table.types'

const Root = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.table, className)

    return <table {...rest} className={classNames} ref={ref} />
  }
)

const Head = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.thead, className)

    return <thead className={classNames} ref={ref} {...rest} />
  }
)

const Row = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.tr, className)

    return <tr className={classNames} {...rest} ref={ref} />
  }
)

const HeadCell = forwardRef<ElementRef<'th'>, ThProps>(({ className, col, ...rest }, ref) => {
  const classNames = clsx(s.th, className)

  return <th ref={ref} {...rest} className={classNames} data-col={col} />
})

const Body = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>(
  ({ className, ...rest }, ref) => {
    const classNames = clsx(s.tbody, className)

    return <tbody ref={ref} {...rest} className={classNames} />
  }
)

const Cell = forwardRef<ElementRef<'td'>, TdProps>(({ className, col, ...rest }, ref) => {
  const classNames = clsx(s.td, className)

  return <td ref={ref} {...rest} className={classNames} data-col={col} />
})

export const Table = { Body, Cell, Head, HeadCell, Root, Row }
