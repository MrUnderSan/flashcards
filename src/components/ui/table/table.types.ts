import { ComponentPropsWithoutRef } from 'react'

export type ColsType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

export type ThProps = {
  col?: ColsType
} & ComponentPropsWithoutRef<'th'>

export type TdProps = {
  col?: ColsType
} & ComponentPropsWithoutRef<'td'>
