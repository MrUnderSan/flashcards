import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { clsx } from 'clsx'

import s from './table.module.scss'

export type ColsType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

type ThProps = {
  col?: ColsType
} & ComponentPropsWithoutRef<'th'>

type TdProps = {
  col?: ColsType
} & ComponentPropsWithoutRef<'td'>

const Root = forwardRef<HTMLTableElement, ComponentPropsWithoutRef<'table'>>((props, ref) => {
  const { className, ...rest } = props

  const classNames = clsx(s.table, className)

  return <table {...rest} className={classNames} ref={ref} />
})

const Head = forwardRef<ElementRef<'thead'>, ComponentPropsWithoutRef<'thead'>>((props, ref) => {
  const { className, ...rest } = props
  const classNames = clsx(s.thead, className)

  return <thead className={classNames} ref={ref} {...rest} />
})

const Row = forwardRef<ElementRef<'tr'>, ComponentPropsWithoutRef<'tr'>>((props, ref) => {
  const { className, ...rest } = props
  const classNames = clsx(s.tr, className)

  return <tr className={classNames} {...rest} ref={ref} />
})

const HeadCell = forwardRef<ElementRef<'th'>, ThProps>((props, ref) => {
  const { className, col, ...rest } = props
  const classNames = clsx(s.th, className)

  return <th ref={ref} {...rest} className={classNames} data-col={col} />
})

const Body = forwardRef<ElementRef<'tbody'>, ComponentPropsWithoutRef<'tbody'>>((props, ref) => {
  const { className, ...rest } = props
  const classNames = clsx(s.tbody, className)

  return <tbody ref={ref} {...rest} className={classNames} />
})

const Cell = forwardRef<ElementRef<'td'>, TdProps>((props, ref) => {
  const { className, col, ...rest } = props
  const classNames = clsx(s.td, className)

  return <td ref={ref} {...rest} className={classNames} data-col={col} />
})

export const Table = { Body, Cell, Head, HeadCell, Root, Row }
